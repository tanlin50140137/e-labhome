import os
import json
import zipfile
from urllib import request, parse


class versionupdate:

    def unzip_file(self, file_name, save_path):
        try:
            f = zipfile.ZipFile(file_name, 'r')
            for file in f.namelist():
                f.extract(file, save_path)
            f.close()
        except Exception as err:
            return False

    def download(self, path_name, filename):
        try:
            with request.urlopen(path_name) as filezip:
                res = filezip.read()
                with open(filename, 'wb') as f:
                    f.write(res)
        except Exception as err:
            return False

    def delete_directory(self, name):
        try:
            for root, dirs, files in os.walk(name, topdown=False):
                # 先删除文件
                for name in files:
                    os.remove(os.path.join(root, name))
                # 再删除空目录
                for name in dirs:
                    os.rmdir(os.path.join(root, name))
            #删除主目录
            os.rmdir(name)
            # 返回删除状态
            return True if not os.path.isdir(name) else False
        except Exception as err:
            return False

    def set_user(self, userid):
        try:
            s = json.dumps({"userid": userid})
            with open('template/data/userid.json', 'w', encoding="utf-8") as f:
                f.write(s)
        except Exception as err:
            pass

    def update_status(self, parameter):
        try:
            para = parse.urlencode(parameter)
            info = para.encode('ascii')
            with request.urlopen('http://py.e-labhome.cn/version.php', info) as f:
                res = f.read().decode('utf-8')
        except Exception as err:
            return False

    def upgrade_file(self, url, parameter, userid, sn):
        try:
            # 添加请求头
            req = request.Request(url, headers={
                "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:22.0) Gecko/20100101 Firefox/22.0"
            })
            para = parse.urlencode(parameter)
            info = para.encode('ascii')
            # 当前是POST方式
            with request.urlopen(req, info) as response:
                # URL返回的内容是二进制
                res = response.read().decode('utf-8')
                dd = json.loads(res)
                if dd['code'] == 0:
                    filename = f"{dd['msg']['package_name']}_{dd['msg']['version_number']}.{dd['msg']['suffix_name']}"
                    if dd['msg']['status'] == '1':
                        # 版本升级
                        # 下载版本包
                        self.download(dd['msg']['path_name'], filename)
                        # 运行更新文件
                        os.system("%s \"%s\" \"%s\" \"%s\"" % ("update.exe", userid, filename, sn))
                    else:
                        # 只更新模板
                        # 热更新-先删除原来的模板
                        # if os.path.isdir('./template'):
                        #     self.delete_directory('./template')
                        # 下载模板包
                        self.download(dd['msg']['path_name'], filename)
                        # 解压
                        self.unzip_file(filename, './')
                        # 删除解压包
                        if os.path.isfile(filename):
                            os.remove(filename)
                        # 设置用户ID
                        self.set_user(userid)
                        # 更新状态
                        self.update_status({'act': 'updateStatus', 'userid': userid, 'sn': sn})

                    state = True
                else:
                    state = False

            return state
        except Exception as err:
            return False
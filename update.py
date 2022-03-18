import json
import os
import sys
import time
import zipfile
from urllib import request, parse

import win32api

"""
版本升级
"""


def delete_directory(name):
    try:
        for root, dirs, files in os.walk(name, topdown=False):
            # 先删除文件
            for name in files:
                os.remove(os.path.join(root, name))
            # 再删除空目录
            for name in dirs:
                os.rmdir(os.path.join(root, name))
        # 删除主目录
        os.rmdir(name)
        # 返回删除状态
        return True if not os.path.isdir(name) else False
    except Exception as err:
        return False


def unzip_file(file_name, save_path):
    try:
        f = zipfile.ZipFile(file_name, 'r')
        for file in f.namelist():
            f.extract(file, save_path)
        f.close()
    except Exception as err:
        return False


def set_user(userid):
    try:
        s = json.dumps({"userid": userid})
        with open('template/data/userid.json', 'w', encoding="utf-8") as f:
            f.write(s)
    except Exception as err:
        pass


def update_status(parameter):
    try:
        para = parse.urlencode(parameter)
        info = para.encode('ascii')
        with request.urlopen('http://py.e-labhome.cn/version.php', info) as f:
            res = f.read().decode('utf-8')
    except Exception as err:
        return False


if __name__ == "__main__":
    userid = sys.argv[1]
    filename = sys.argv[2]
    sn = sys.argv[3]
    # 关闭主程序
    os.system(r'taskkill /F /IM elabserver.exe')
    os.system(r'taskkill /F /IM elabhome.exe')
    time.sleep(2)
    # 先删除原来的模板
    # if os.path.isdir('./template'):
    #     delete_directory('./template')
    # 删除主程序
    # if os.path.isfile('./elabhome.exe'):
    #     os.remove('./elabhome.exe')
    # 解压新版本
    unzip_file(filename, './')
    # 删除解压包
    if os.path.isfile(filename):
        os.remove(filename)
    # 设置用户ID
    set_user(userid)
    # 更新状态
    update_status({'act': 'updateStatus', 'userid': userid, 'sn': sn})
    # 启动主程序
    # win32api.ShellExecute(0, 'open', 'elabhome.exe', '', '', 1)
    os.system("%s" % ("start.bat"))
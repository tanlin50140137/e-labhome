import os
import shutil
import sys
import time
from PyQt5.QtWidgets import *
from PyQt5.QtGui import *
from PyQt5.QtCore import QThread, pyqtSignal, Qt
import requests
import zipfile
import win32api

"""
版本升级
pyinstaller -F -w -i template/img/logo.ico ./update.py
"""


# 删除目录函数
def deleteDirectory(name):
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

# 下载zip文件
class downFileThread(QThread):
    download = pyqtSignal(dict)
    downloadEnd = pyqtSignal(int)

    def __init__(self, url, filepath):
        super(downFileThread, self).__init__()
        self.url = url
        self.filepath = filepath
        self.date_list = {}
        self.stop = 1

    def set_stop(self, i):
        self.stop = i

    def run(self):
        # start = time.time()
        response = requests.get(self.url, stream=True)
        size = 0
        chunk_size = 1024
        content_size = int(response.headers['content-length'])
        try:
            if response.status_code == 200:
                # print('Start download,[File size]:{size:.2f} MB'.format(size=content_size / chunk_size / 1024))
                self.date_list['file_size'] = content_size / chunk_size / 1024
                # filepath = path + '\Pikachu.zip'
                with open(self.filepath, 'wb') as file:
                    for data in response.iter_content(chunk_size=chunk_size):
                        file.write(data)
                        size += len(data)
                        # print('\r' + '[下载进度]:%s%.2f%%' % ('>' * int(size * 50 / content_size), float(size / content_size * 100)), end=' ')
                        self.date_list['size'] = size / chunk_size / 1024
                        self.date_list['progress'] = int(size / content_size * 100)
                        self.download.emit(self.date_list)  # 发射信号

                        # 停止下载
                        if self.stop == 0:
                            break

            # end = time.time()
            # print('Download completed!,times: %.2f秒' % (end - start))
            time.sleep(1)
            self.downloadEnd.emit(self.stop)
        except Exception as arr:
            print(arr)


# 下载zip文件模板
class dowZipWin(QDialog):
    dowOutEnd = pyqtSignal(int)

    def __init__(self, url, path):
        super(dowZipWin, self).__init__()
        self.setWindowTitle('下载最新版本')
        self.resize(679, 112)  # 初始化大小
        self.setMaximumSize(679, 112)  # 固定窗口大小
        self.setMinimumSize(679, 112)  # 固定窗口大小
        self.setupUi()

        self.url = url
        self.path = path

        # 实例化线程
        self.downFileThread = downFileThread(self.url, self.path)
        # 绑定槽函数
        self.downFileThread.download.connect(self.progressSlot)
        self.downFileThread.downloadEnd.connect(self.downloadEndSlot)
        # 打开线程
        self.downFileThread.start()


    def setupUi(self):
        # 添加一根垂直弹簧
        self.verticalSpacer_1 = QSpacerItem(20, 40, QSizePolicy.Minimum, QSizePolicy.Expanding)
        #　添加进度条
        self.progressBar1 = QProgressBar()
        self.progressBar1.setValue(0)
        #　添加一个标签
        self.label = QLabel()
        self.label.setText("正在下载文件...")
        # 添加一根垂直弹簧
        self.verticalSpacer_2 = QSpacerItem(20, 40, QSizePolicy.Minimum, QSizePolicy.Expanding)
        # 垂直布局
        self.verticalLayout = QVBoxLayout()
        self.verticalLayout.addItem(self.verticalSpacer_1)
        self.verticalLayout.addWidget(self.progressBar1)
        self.verticalLayout.addWidget(self.label)
        self.verticalLayout.addItem(self.verticalSpacer_2)
        # 设置为窗口布局
        self.setLayout(self.verticalLayout)

    def progressSlot(self, lis):
        self.progressBar1.setValue(lis['progress'])
        self.label.setText("%.2fMB/%.2fMB" % (lis['size'], lis['file_size']))

    def downloadEndSlot(self, i):
        if i == 1:
            # 发送信号通知已经下载完成
            self.dowOutEnd.emit(1)

    def closeEvent(self, event):
        # 先停止线程
        self.downFileThread.set_stop(0)
        # 打开主程序
        if os.path.isfile(os.getcwd() + '\\start.bat'):
            win32api.ShellExecute(0, 'open', 'start.bat', '', os.getcwd() + '\\', 0)
        time.sleep(1)
        # 删除文件
        if os.path.isfile(self.path):
            os.remove(self.path)


# 文件解压
class UnzipZipThread(QThread):
    unZipFile = pyqtSignal(dict)
    unZipFileEnd = pyqtSignal(int)

    def __init__(self, filename):
        super(UnzipZipThread, self).__init__()
        self.filename = filename
        self.backInfo = {}
        self.stop = 1

    def set_stop(self, i):
        self.stop = i

    def run(self):
        self.unZipFileEnd.emit(0)

        # 解压在固定目录上
        folder_abs = os.getcwd() + "\\version"
        if not os.path.isdir(folder_abs):
            os.mkdir(folder_abs, 777)

        self.backInfo['unzip_dir'] = folder_abs

        # 计算文件大小
        fsize = os.path.getsize(self.filename)
        fsize = fsize / float(1024 * 1024)

        self.backInfo['unzip_size'] = fsize

        # 执行文件解压
        zip_file = zipfile.ZipFile(self.filename)
        zip_list = zip_file.namelist()  # 得到压缩包里所有文件
        for f in zip_list:
            self.backInfo['unzip_path'] = f
            self.unZipFile.emit(self.backInfo)  # 发关处理结果信号
            zip_file.extract(f, folder_abs)  # 循环解压文件到指定目录

            # 停止解压
            if self.stop == 0:
                break

        zip_file.close()  # 关闭文件，必须有，释放内存

        time.sleep(1)
        self.unZipFileEnd.emit(1)


# 解压ZIP文件
class UnzipZIPFile(QDialog):
    unZipFileEnd = pyqtSignal(int)

    def __init__(self, filename):
        super(UnzipZIPFile, self).__init__()
        self.setWindowTitle('解压文件')
        self.resize(850, 350)  # 初始化大小
        self.setMaximumSize(850, 350)  # 固定窗口大小
        self.setMinimumSize(850, 350)  # 固定窗口大小
        self.setupUi()

        self.unZipFile = filename

        self.unZipThread = UnzipZipThread(self.unZipFile)
        self.unZipThread.unZipFile.connect(self.unZipFileSlot)
        self.unZipThread.unZipFileEnd.connect(self.unZipFileEndSlot)
        self.unZipThread.start()

    def setupUi(self):
        self.Label1 = QLabel()
        self.Label1_2 = QLabel()
        self.Label1_2.setText("解压内容：")
        self.TextBrowser = QTextBrowser()
        self.Label2 = QLabel()

        self.Layout = QVBoxLayout()
        self.Layout.addWidget(self.Label1)
        self.Layout.addWidget(self.Label1_2)
        self.Layout.addWidget(self.TextBrowser)
        self.Layout.addWidget(self.Label2)

        self.setLayout(self.Layout)

        self.update()

    def unZipFileSlot(self, ls):
        self.Label1.setText(f"解压目录：{ls['unzip_dir']}")
        self.TextBrowser.append(ls['unzip_path'])
        self.Label2.setText("解压大小：%.2fMB" % (ls['unzip_size']))

    def unZipFileEndSlot(self, i):
        if i == 1:
            if os.path.isfile(self.unZipFile):
                os.remove(self.unZipFile)
            # 关出信号解压完成
            self.unZipFileEnd.emit(1)

    def closeEvent(self, event):
        self.unZipThread.set_stop(0)
        if os.path.isfile(os.getcwd() + '\\start.bat'):
            win32api.ShellExecute(0, 'open', 'start.bat', '', os.getcwd() + '\\', 0)
        time.sleep(1)
        deleteDirectory(self.unZipFile)


# 更新文件线程
class copyFileThread(QThread):
    copyFileSignal = pyqtSignal(dict)
    copyEndSignal = pyqtSignal(int)

    def __init__(self, src):
        super(copyFileThread, self).__init__()

        self.copyList = {}
        self.src = src
        self.dist = None
        self.count = 0
        self.stop = 1

    def set_stop(self, i):
        self.stop = i

    def run(self):
        self.copyEndSignal.emit(0)

        # 获取源文件路径
        for root, dirs, files in os.walk(self.src, topdown=False):
            for name in files:
                # 如果遇到正在执行的文件就跳过
                if name == 'update.exe':
                    continue
                else:
                    self.count = self.count + 1
                    self.copyList['count'] = self.count

                    self.dist_tmp = root.replace("\\version", "")
                    self.dist = os.path.join(self.dist_tmp, "")
                    if not os.path.isdir(self.dist):
                        os.makedirs(self.dist, 777)

                    src = os.path.join(root, name)
                    self.copyList['src'] = root.replace(os.getcwd()+"\\", "")

                    dist = "%s%s" % (self.dist, name)
                    self.copyList['dist'] = dist.replace(os.getcwd()+"\\", "")

                    self.copyFileSignal.emit(self.copyList)
                    # 覆盖文件
                    try:
                        shutil.copyfile(src, dist)
                    except Exception as err:
                        print(err)

                    # 结束线程
                    if self.stop == 0:
                        break

            # 结束线程
            if self.stop == 0:
                break

        time.sleep(1)
        self.copyEndSignal.emit(1)


# 覆盖文件
class copyFileWin(QDialog):
    def __init__(self):
        super(copyFileWin, self).__init__()
        self.setWindowTitle('安装最新版本')
        self.resize(850, 350)  # 初始化大小
        self.setMaximumSize(850, 350)  # 固定窗口大小
        self.setMinimumSize(850, 350)  # 固定窗口大小
        self.setupUi()

        self.src = os.getcwd() + "\\version"

        self.copyFileThread = copyFileThread(self.src)
        self.copyFileThread.copyFileSignal.connect(self.copyFileSlot)
        self.copyFileThread.copyEndSignal.connect(self.copyEndSlot)
        self.copyFileThread.start()

    def setupUi(self):
        self.Label1 = QLabel()
        self.Label2 = QLabel()
        self.TextBrowser = QTextBrowser()
        self.Label3 = QLabel()

        self.Layout = QVBoxLayout()
        self.Layout.addWidget(self.Label1)
        self.Layout.addWidget(self.Label2)
        self.Layout.addWidget(self.TextBrowser)
        self.Layout.addWidget(self.Label3)

        self.setLayout(self.Layout)

        self.update()

    def copyFileSlot(self, ls):
        self.Label1.setText("源始：%s" % (ls['src']))
        self.Label2.setText("目标：%s" % (ls['dist']))

        appstr = "%s->%s" % (ls['src'], ls['dist'])
        self.TextBrowser.append(appstr)

        self.Label3.setText("总共：%d 个文件" % (ls['count']))

    def copyEndSlot(self, i):
        self.Label3.setText("安装成功，正在启动程序中...")
        if i == 1:
            time.sleep(1)
            if os.path.isdir("./version"):
                deleteDirectory("./version")
            time.sleep(3)
            # 启动主窗口
            if os.path.isfile(os.getcwd() + '\\start.bat'):
                os.system("%s" % ("start.bat"))

    def closeEvent(self, event):
        self.copyFileThread.set_stop(0)
        if os.path.isfile(os.getcwd() + '\\start.bat'):
            win32api.ShellExecute(0, 'open', 'start.bat', '', os.getcwd() + '\\', 0)
        time.sleep(1)
        deleteDirectory(self.src)


# 显示窗口类
class mainWin:
    def __init__(self, url, path):
        self.win = None
        self.icon = QIcon("./template/img/logo.ico")
        self.url = url
        self.path = path

    def show(self):
        self.dowZipWin()

    # 文件下载
    def dowZipWin(self):
        self.win = dowZipWin(self.url, self.path)
        self.win.setWindowIcon(self.icon)
        self.win.setWindowFlags(Qt.WindowCloseButtonHint)  # 将窗口的右上角问号按钮去掉
        self.win.dowOutEnd.connect(self.dowOutSlot)  # 下载完成，通知到槽函数
        self.win.show()

    # 下载完成，进行解压
    def dowOutSlot(self, i):
        if i == 1:
            # 解压文件
            self.win = UnzipZIPFile(self.path)
            self.win.setWindowIcon(self.icon)
            self.win.setWindowFlags(Qt.WindowCloseButtonHint)  # 将窗口的右上角问号按钮去掉
            self.win.unZipFileEnd.connect(self.unZipEndSlot)  # 解压完成，通知到槽函数
            self.win.show()

    # 解压完成，进行文件覆盖更新
    def unZipEndSlot(self, i):
        if i == 1:
            self.win = copyFileWin()
            self.win.setWindowFlags(Qt.WindowCloseButtonHint)  # 将窗口的右上角问号按钮去掉
            self.win.setWindowIcon(self.icon)
            self.win.show()


if __name__ == '__main__':
    # 接收外部传参
    userid, zip_url, sn = ('', '', '')
    if len(sys.argv) == 3:
        userid = sys.argv[1]
        zip_url = sys.argv[2]
    elif len(sys.argv) == 4:
        userid = sys.argv[1]
        zip_url = sys.argv[2]
        sn = sys.argv[3]

    # 更新前先关闭所有程序
    win32api.ShellExecute(0, 'open', 'kill.bat', '', os.getcwd() + '\\', 0)
    time.sleep(1)

    # 解压文件名
    zip_path = "123.zip"

    # 打开窗口
    app = QApplication(sys.argv)
    win = mainWin(zip_url, zip_path)
    win.show()
    sys.exit(app.exec())

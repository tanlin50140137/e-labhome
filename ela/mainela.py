"""
内置浏览器模块
"""
import os
import time
import urllib
from os import system
import win32api
from PyQt5 import QtCore
from PyQt5.QtCore import QUrl, Qt, QDir
from PyQt5.QtWidgets import QWidget, QMessageBox
from PyQt5.QtWebEngineWidgets import QWebEngineView, QWebEngineSettings
from PyQt5 import QtWebEngineWidgets, QtWebChannel
import threading
import json
from ela.factorial import *
from ela.elabprinter import *
from ela.connectwifi import *
from ela.recordvideo import *
from ela.elabversionupdate import *
from ela.elabcommunicat import *

channel = QtWebChannel.QWebChannel()  # 只能在全局中定义
factorial = Factorial()  # 只能在全局中定义
elprinter = Elabprinter()
conntwifi = ConnetWifi()
recovideo = recordvideo()


# 自定义一个类继承QWebEngineView
class WebEngineView(QWebEngineView):
    # 重写 createWindow 方法自身对像
    def createWindow(self, QWebEnginePage_WebWindowType):
        # 实例化浏览器对像
        page = WebEngineView(self)
        # urlChanged连接变化时信号与槽关联
        page.urlChanged.connect(self.on_url_changed)
        return page

    # 点击a标签时获取链接
    def on_url_changed(self, url):
        # 设置动态连接，也是鼠标点击过的连接
        self.setUrl(url)


class Elamain:
    """
    内置浏览器模块
    """
    def __init__(self, window, parent=False):
        self.parent = parent
        self.width = window.width()
        self.height = window.height()
        # 获取本地的HTML路径
        url = os.getcwd() + "/template/resetlogin.html"
        # 如果文件不存在
        # if not os.path.isfile(url):
        #     pass
        #     return
        # 网络链接
        # url = 'http://8.135.103.186/template/resetlogin.html'

        # 创建浏览器对像
        self.browser = WebEngineView()

        # 设置视频
        self.browser.settings().setAttribute(QtWebEngineWidgets.QWebEngineSettings.PluginsEnabled, True)
        self.browser.settings().setAttribute(QtWebEngineWidgets.QWebEngineSettings.JavascriptEnabled, True)
        self.browser.settings().setAttribute(QtWebEngineWidgets.QWebEngineSettings.FullScreenSupportEnabled, True)
        self.browser.page().fullScreenRequested.connect(self._fullScreenRequested)

        # 清空缓存
        objProfile = self.browser.page().profile()
        objProfile.clearHttpCache()
        # 隐藏滚动条
        # self.browser.page().settings().setAttribute(QtWebEngineWidgets.QWebEngineSettings.ShowScrollBars, False)
        # 设置背景色透明
        self.browser.setStyleSheet("background-color:transparent;")
        self.browser.page().setBackgroundColor(Qt.transparent)
        # 禁用右击弹出上下文菜单
        self.browser.setContextMenuPolicy(Qt.NoContextMenu)
        # 加载本地HTML
        self.browser.load(QUrl.fromLocalFile(url))
        # 网络链接
        # self.browser.load(QtCore.QUrl(url))

        # 添加浏览器控件到主窗口中
        window.setCentralWidget(self.browser)

        # 注册槽到JavaScript中
        channel.registerObject("obj", factorial)
        # 将channel对像映射到浏览器中
        self.browser.page().setWebChannel(channel)

        # 绑定信号
        factorial.signalHtml.connect(self.sendSignalHtml)
        # 绑定信号
        factorial.signalHtml2.connect(self.sendSignalHtml2)
        # 绑定信号
        factorial.signalHtml3.connect(self.sendSignalHtml3)
        # 绑定信号
        factorial.signalHtml4.connect(self.sendSignalHtml4)
        # 绑定信号
        factorial.signalHtml5.connect(self.sendSignalHtml5)
        # 绑定信号
        factorial.signalHtml8.connect(self.sendSignalHtml8)
        # 绑定信号
        factorial.signalHtml9.connect(self.sendSignalHtml9)
        # 绑定信号
        factorial.signalHtml15.connect(self.sendSignalHtml15)
        # 绑定信号-电子秤
        factorial.signalHtml19.connect(self.sendSignalHtml19)
        # 绑定信号-温湿度
        factorial.signalHtmWsd.connect(self.signalHtmWsd)
        # 绑定信号-温湿度-关闭
        factorial.signalHtmBack.connect(self.signalHtmBack)
        # 绑定信号-温湿度-远程访问
        factorial.signalEnableWsd.connect(self.signalEnableWsd)

    # 缩放视频
    def _fullScreenRequested(self, request):
        request.accept()
        self.browser.showFullScreen()

    # 执行打印-线程调用
    def abc(self, n):
        # 调用打印机
        elprinter.ExecutePrinting(n)

    # 打印线程
    def sendSignalHtml(self, n):
        # 在线程中执行
        threading.Thread(target=self.abc, name='abc', args=(n,)).start()

    # 执行重启和关闭
    def sendSignalHtml2(self, s):
        # 重启
        if s == '1':
            system("shutdown -r -t 00")
        # 关闭
        if s == '2':
            system("shutdown -s -t 00")

    # 写入文件-线程调用
    def writeFileData(self, s):
        try:
            with open('template/data/data.json', 'w', encoding="utf-8") as f:
                f.write(s)
        except Exception as err:
            pass

    # 写入文件线程
    def sendSignalHtml3(self, s):
        self.writeFileData(s)

    # 临时采购清单
    def purchase(self, s):
        try:
            with open('template/data/purchase.json', 'w', encoding="utf-8") as f:
                f.write(s)
        except Exception as err:
            pass

    # 写入文件线程
    def sendSignalHtml4(self, s):
        self.purchase(s)

    # 设置wifi
    def setingwifi(self, s):
        # 记录下wifi账号密码
        try:
            with open('template/data/wifidata.json', 'w', encoding="utf-8") as f:
                f.write(s)
            # 转成字典
            d = json.loads(s)
            conntwifi.connect_wifi(d['wifiname'], d['password'])
        except Exception as err:
            pass

    # 设置wifi线程
    def sendSignalHtml5(self, s):
        threading.Thread(target=self.setingwifi, name='setingwifi', args=(s,)).start()

    # 录制视频
    def recordvideo(self, s):
        d = json.loads(s)
        if d['flag'] == 'start':
            # 目录是否存在，不存在就生成
            if not os.path.isdir("./photograph"):
                os.mkdir('./photograph')
            # 生成视频
            text_list = d['text'].split("-")
            w_text = f"{text_list[0]}\n{text_list[1]}\n{text_list[2]}\n{text_list[3]}"
            filename = d['filename']
            video_path = f"./photograph/{filename}.mp4"
            img_path = f"./photograph/{filename}.jpg"
            needle = int(d['needle'])
            recovideo.read_usb_capture(w_text, video_path, img_path, filename, needle)
        else:
            pass
            # recovideo.record_end()

    # 录制视频
    def sendSignalHtml8(self, s):
        threading.Thread(target=self.recordvideo, name='recordvideo', args=(s,)).start()

    # 打开外部软件
    def externalSoftware(self, s):
        pass
        # win32api.ShellExecute(0, 'open', 'C:\\Program Files\\Common Files\\Microsoft Shared\\ink\\tabtip.exe', '', '', 1)

    def sendSignalHtml9(self, s):
        threading.Thread(target=self.externalSoftware, name='externalSoftware', args=(s,)).start()

    # 后台升级版本
    def background_update(self, s):
        try:
            info = s.split('-')
            userid = info[0]
            sn = info[2]
            data = {'act': 'getVersionIdInfo', 'id': info[1]}
            versionup = versionupdate()
            versionup.upgrade_file('http://py.e-labhome.cn/version.php', data, userid, sn)
        except Exception as err:
            pass

    def sendSignalHtml15(self, s):
        threading.Thread(target=self.background_update, name='background_update', args=(s,)).start()

    def run_communication(self, s):
        if s == 'open':
            self.Engine1 = Communication("COM1", 9600, 0.5)
            self.Engine1.recive_data(0)
        else:
            self.Engine1.set_flag()
            self.run_thread.join()

    def sendSignalHtml19(self, s):
        if s == 'open':
            self.run_thread = threading.Thread(target=self.run_communication, name='run_communication', args=(s,))
            self.run_thread.start()
        else:
            self.run_thread2 = threading.Thread(target=self.run_communication, name='run_communication', args=(s,))
            self.run_thread2.start()
            time.sleep(1)
            self.run_thread2.join()

    # 温湿度
    def wsd_communication(self, s):
        p = json.loads(s)
        self.wenshidu = Communication(p['port'], 9600, 1)
        self.wenshidu.set_end_hex(0)
        self.wenshidu.set_enable_wsd(p['enable_v'])
        self.wenshidu.recive_data_once(p['command'], p['userId'], p['rate'])

    def signalHtmWsd(self, s):
        # 打开温湿度串口-打开
        self.run_thread = threading.Thread(target=self.wsd_communication, name='run_communication', args=(s,))
        self.run_thread.start()

    def signalHtmBack(self, s):
        # 结束温湿度串口-关闭
        self.wenshidu.set_end_hex(1)

    def signalEnableWsd(self, s):
        # 结束温湿度串口-关闭
        self.wenshidu.set_enable_wsd(s)
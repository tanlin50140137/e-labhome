import json
import os
import threading
import urllib
import numpy as np
import win32api
import win32print
from PyQt5.QtCore import *
import pywifi, time
# 保存包中写义的常量
from pywifi import const
from ela.elabversionupdate import *

class Factorial(QObject):
    # 发送3个参数的信号
    signalHtml = pyqtSignal(str)  # 类型为字符串、整型
    signalHtml2 = pyqtSignal(str)  # 类型为字符串、整型
    signalHtml3 = pyqtSignal(str)  # 类型为字符串、整型
    signalHtml4 = pyqtSignal(str)  # 类型为字符串、整型
    signalHtml5 = pyqtSignal(str)  # 类型为字符串、整型
    signalHtml8 = pyqtSignal(str)  # 类型为字符串、整型
    signalHtml9 = pyqtSignal(str)  # 类型为字符串、整型
    signalHtml15 = pyqtSignal(str)  # 类型为字符串、整型
    signalHtml19 = pyqtSignal(str)  # 类型为字符串、整型
    signalHtml20 = pyqtSignal(str)  # 类型为字符串、整型

    @pyqtSlot(str, result=str)
    def factorial(self, s):
        self.signalHtml.emit(s)  # 发送信号返回一个参数
        return s

    @pyqtSlot(str, result=str)
    def factorial2(self, s):
        self.signalHtml2.emit(s)  # 发送信号返回一个参数
        return s

    @pyqtSlot(str, result=str)
    def factorial3(self, s):
        self.signalHtml3.emit(s)  # 发送信号返回一个参数
        return s

    @pyqtSlot(str, result=str)
    def factorial4(self, s):
        self.signalHtml4.emit(s)  # 发送信号返回一个参数
        return s

    @pyqtSlot(str, result=str)
    def factorial5(self, s):
        self.signalHtml5.emit(s)  # 发送信号返回一个参数
        return s

    @pyqtSlot(str, result=str)
    def factorial6(self, s):
        # 监测网络连接状态
        url = "http://www.baidu.com"
        try:
            response1 = urllib.request.urlopen(url, timeout=1)
            isok = '1'
        except urllib.request.URLError as err:
            isok = '0'

        return isok

    @pyqtSlot(str, result=str)
    def factorial7(self, s):
        # 监测网络连接状态
        url = "http://www.baidu.com"
        try:
            response1 = urllib.request.urlopen(url, timeout=1)
            isok = '1'
        except urllib.request.URLError as err:
            isok = '0'

        return isok

    @pyqtSlot(str, result=str)
    def factorial8(self, s):
        self.signalHtml8.emit(s)  # 发送信号返回一个参数
        return s

    @pyqtSlot(str, result=str)
    def factorial9(self, s):
        self.signalHtml9.emit(s)  # 发送信号返回一个参数
        return s

    @pyqtSlot(str, result=str)
    def factorial10(self, s):
        # 扫苗附件wifi
        wifi = pywifi.PyWiFi()
        iface = wifi.interfaces()[0]
        iface.scan()  # 扫苗附件wifi
        time.sleep(1)
        basewifi = iface.scan_results()
        wflist = []
        wflistgb18030 = []
        for i in basewifi:
            # 展示用utf-8
            wfname = i.ssid.encode('raw_unicode_escape', 'strict').decode('utf-8', 'ignore')
            wflist.append(wfname)
            # 连接使用-WIFI识别国标18030编码格式
            wfnamegb18030 = i.ssid.encode('raw_unicode_escape', 'strict').decode('gb18030', 'ignore')
            wflistgb18030.append(wfnamegb18030)

        list = json.dumps({"show": '<br/>'.join(wflist), "net": '<br/>'.join(wflistgb18030)})

        return list

    @pyqtSlot(str, result=str)
    def factorial11(self, s):
        # *#kzy000000#* 登入终端口令
        flag = ""
        data = ""
        if s == '*#kzy000000#*':
            with open('template/data/userid.json', 'r', encoding="utf-8") as f:
                chunk = 1024*1024*2
                r = f.read(chunk)
                data = json.loads(r)
            flag = json.dumps({"code": 'OK', "data": data['userid']})
        else:
            flag = json.dumps({"code": 'NO', "data": ''})

        return flag

    @pyqtSlot(str, result=str)
    def factorial12(self, s):
        try:
            data = ""
            with open('template/data/userid.json', 'r', encoding="utf-8") as f:
                chunk = 1024 * 1024 * 2
                r = f.read(chunk)
                data = json.loads(r)
            return data['userid']
        except Exception as err:
            return ""

    @pyqtSlot(str, result=str)
    def factorial13(self, s):
        try:
            # 记录userid
            with open('template/data/userid.json', 'w', encoding="utf-8") as f:
                f.write(s)
        except Exception as err:
            pass
        return s

    @pyqtSlot(str, result=str)
    def factorial14(self, s):
        """热更新与同步升级版本"""
        try:
            info = s.split('-')
            userid = info[0]
            data = {'act': 'getVersionIdInfo', 'id': info[1]}
            versionup = versionupdate()
            bool_s = versionup.upgrade_file('http://py.e-labhome.cn/version.php', data, userid)
            if bool_s:
                res = 'OK'
            else:
                res = 'NO'
        except Exception as err:
            res = 'NO'

        return res

    @pyqtSlot(str, result=str)
    def factorial15(self, s):
        """进入后台升级版本"""
        self.signalHtml15.emit(s)  # 发送信号返回一个参数
        return s

    @pyqtSlot(str, result=str)
    def factorial16(self, s):
        """设置标签打印机"""
        try:
            dataList = list()
            printers = win32print.EnumPrinters(win32print.PRINTER_ENUM_CONNECTIONS + win32print.PRINTER_ENUM_LOCAL)
            try:
                with open('./template/data/defaultPrinter.txt', 'r', encoding="utf-8") as f:
                    d = f.read()
                    if d == '':
                        defaultPrinter = win32print.GetDefaultPrinter()
                    else:
                        defaultPrinter = str(d)
            except Exception as err:
                defaultPrinter = win32print.GetDefaultPrinter()
            for i in printers:
                if i[2].find('POS58L') > -1:
                    if defaultPrinter == i[2]:
                        temp = {"name": i[2], "df": "1"}
                    else:
                        temp = {"name": i[2], "df": "0"}
                    dataList.append(temp)
            data = json.dumps(dataList)
        except Exception as err:
            data = json.dumps([])
        return data

    @pyqtSlot(str, result=str)
    def factorial17(self, s):
        """设置成默认的打印机"""
        try:
            with open('./template/data/defaultPrinter.txt', 'w', encoding="utf-8") as f:
                f.write(s)
            success = '设置成功'
        except Exception as err:
            success = err

        return success

    @pyqtSlot(str, result=str)
    def factorial18(self, s):
        """添加安装打印驱动"""
        try:
            path = os.getcwd()
            exe_filename = f"{path}\\printdrive\\POS58LSetup_20180720.exe"
            win32api.ShellExecute(0, 'open', exe_filename, '', '', 1)
        except Exception as err:
            print(err)
        return s

    @pyqtSlot(str, result=str)
    def factorial19(self, s):
        """打开COM1串口"""
        self.signalHtml19.emit(s)  # 发送信号返回一个参数
        return s

    @pyqtSlot(str, result=str)
    def factorial20(self, s):
        self.signalHtml20.emit(s)  # 发送信号返回一个参数
        return s
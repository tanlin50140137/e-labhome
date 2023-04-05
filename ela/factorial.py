import json
import os
import subprocess
import threading
import urllib
from urllib import request, parse
import numpy as np
import psutil
import win32api
import win32print
from PyQt5.QtCore import *
import pywifi
import time
# 保存包中写义的常量
from pywifi import const
from desktopela.ela.elabversionupdate import *
from desktopela.ela.x80xclient import *
from desktopela.ela.x80xnetwork import *
from desktopela.ela import webcam
from desktopela.ela.webcam import *

class Factorial(QObject):
    # 发送3个参数的信号
    signalHtml = pyqtSignal(str)       # 类型为字符串、整型
    signalHtml2 = pyqtSignal(str)      # 类型为字符串、整型
    signalHtml3 = pyqtSignal(str)      # 类型为字符串、整型
    signalHtml4 = pyqtSignal(str)      # 类型为字符串、整型
    signalHtml5 = pyqtSignal(str)      # 类型为字符串、整型
    signalHtml8 = pyqtSignal(str)      # 类型为字符串、整型
    signalHtml9 = pyqtSignal(str)      # 类型为字符串、整型
    signalHtml15 = pyqtSignal(str)     # 类型为字符串、整型
    signalHtml19 = pyqtSignal(str)     # 类型为字符串、整型
    signalHtml20 = pyqtSignal(str)     # 类型为字符串、整型
    signalHtmWsd = pyqtSignal(str)     # 类型为字符串、整型
    signalHtmBack = pyqtSignal(str)    # 类型为字符串、整型
    signalEnableWsd = pyqtSignal(str)  # 类型为字符串、整型
    signalWsdSocket = pyqtSignal(str)  # 类型为字符串、整型

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
        isok = '0'
        try:
            url = "https://www.baidu.com/"
            # response1 = urllib.request.urlopen(url, timeout=1)
            with urllib.request.urlopen(url, timeout=1):
                pass
            isok = '1'
        except urllib.request.URLError as err:
            isok = '0'

        return isok

    def client_wifi_connect(self, s):
        isok = '0'
        try:
            url = "https://www.baidu.com/"
            # response1 = urllib.request.urlopen(url, timeout=1)
            with urllib.request.urlopen(url, timeout=1):
                pass
            isok = '1'
        except urllib.request.URLError as err:
            isok = '0'
        # 记录链接状态
        try:
            with open('template/data/wifistate.json', 'w', encoding="utf-8") as f:
                f.write(isok)
        except BaseException as err:
            pass

    @pyqtSlot(str, result=str)
    def factorial7(self, s):
        # 监测网络连接状态
        threading.Thread(target=self.client_wifi_connect, name='client_wifi_connect', args=(s,)).start()
        return s

    @pyqtSlot(str, result=str)
    def client_wifi_state(self, s):
        d = '0'
        try:
            with open('template/data/wifistate.json', 'r', encoding="utf-8") as f:
                d = f.read()
                if d == '':
                    d = '0'
        except Exception as err:
            d = '0'
        return d

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
        list = json.dumps({"show": [], "net": []})
        try:
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

        except Exception as err:
            list = json.dumps({"show": [], "net": []})

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
            sn = info[2]
            data = {'act': 'getVersionIdInfo', 'id': info[1]}
            versionup = versionupdate()
            bool_s = versionup.upgrade_file('http://py.e-labhome.cn/version.php', data, userid, sn)
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
            success = '设置失败'

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
    def factorial_wsd(self, s):
        """打开串口-温湿度"""
        self.signalHtmWsd.emit(s)  # 发送信号返回一个参数
        return s

    @pyqtSlot(str, result=str)
    def factorial_back(self, s):
        """打开串口-温湿度-关闭串口"""
        self.signalHtmBack.emit(s)  # 发送信号返回一个参数
        return s

    @pyqtSlot(str, result=str)
    def factorial_Enable(self, s):
        """打开串口-温湿度-远程访问"""
        self.signalEnableWsd.emit(s)  # 发送信号返回一个参数
        return s

    @pyqtSlot(str, result=str)
    def factorial_stop(self, s):
        """打开串口-温湿度-远程访问"""
        self.signalWsdSocket.emit(s)  # 发送信号返回一个参数
        return s

    @pyqtSlot(str, result=str)
    def factorial20(self, s):
        self.signalHtml20.emit(s)  # 发送信号返回一个参数
        return s

    def client_x80x_cmd(self, s):
        # 第一次进来
        try:
            p = json.loads(s)
            with open('./template/data/x80x.json', 'r', encoding="utf-8") as f:
                d = f.read()
                if d == '':
                    if p['type'] == 0:
                        d = {"Alm": p['flag'], "Tmax": '30', "Tmin": '0', "Hmax": '90', "Hmin": '0'}
                    elif p['type'] == 1:
                        d = {"Alm": 0, "Tmax": p['Tmax'], "Tmin": p['Tmin'], "Hmax": p['Hmax'], "Hmin": p['Hmin']}
                    if p['type'] != 10:
                        with open('template/data/x80x.json', 'w', encoding="utf-8") as f:
                            f.write(d)
        except Exception as err:
            pass

        u_list = json.loads(d)

        # 记录x80x参数设置
        try:
            # 设置报警
            if p['type'] == 0:
                u_list['Alm'] = p['flag']
            # 设置温度湿度值
            elif p['type'] == 1:
                u_list['Tmax'] = p['Tmax']
                u_list['Tmin'] = p['Tmin']
                u_list['Hmax'] = p['Hmax']
                u_list['Hmin'] = p['Hmin']
            # 写入文件
            if p['type'] != 10:
                data = json.dumps(u_list)
                with open('template/data/x80x.json', 'w', encoding="utf-8") as f:
                    f.write(data)
        except Exception as err:
            pass

        # 下发命令
        try:
            tcp = x80xClient(host=p['host'], port=int(p['port']))
            callback = tcp.tcpClient(p['cmd'])
            # 成功返回客户端响应，失败返回None
            # print(callback)
        except Exception as e:
            pass

    @pyqtSlot(str, result=str)
    def factorial_cmd(self, s):
        threading.Thread(target=self.client_x80x_cmd, name='client_x80x_cmd', args=(s,)).start()
        return "操作成功"

    @pyqtSlot(str, result=str)
    def factorial_cmd_read(self, s):
        # 获取默认数据
        d = 'NULL'
        try:
            with open('./template/data/x80x.json', 'r', encoding="utf-8") as f:
                d = f.read()
        except Exception as err:
            d = 'NULL'
        # 修改默认数据
        if d != 'NULL':
            list = json.loads(d)
            try:
                with open('./template/data/x80xsocket.json', 'r', encoding="utf-8") as f:
                    txt = f.read()
                    if txt != '':
                        p = json.loads(txt)
                        list['server_state'] = p['server_state']
                        list['ip'] = p['ip']
                        list['gateway'] = p['gateway']
                        list['netmask'] = p['netmask']
                        list['dns'] = p['dns']
                        list['time'] = p['time']
                        list['update_state'] = p['update_state']
                        list['description'] = p['description']
                        list['connect_state'] = p['connect_state']
                        list['port'] = p['port']
                        d = json.dumps(list)
            except Exception as err:
                pass

        return d

    def set_network_html(self, s):
        try:
            p = json.loads(s)
            network = setNetwork(ip=p['ip'], gateway=p['gateway'], netmask=p['netmask'], dns=p['dns'], port=p['port'])
            # 修改为静态IP
            network.set_static()
            # 保存当前信息
            network.save_update_return()
        except Exception as err:
            pass

    @pyqtSlot(str, result=str)
    def factorial_set_network(self, s):
        # 设置以太网
        threading.Thread(target=self.set_network_html, name='set_network_html', args=(s,)).start()
        return s

    @pyqtSlot(str, result=str)
    def factorial_get_network(self, s):
        # 获取数据
        path = "template/data/x80xsocket.json"
        try:
            with open(path, 'r', encoding="utf-8") as f:
                d = f.read()
        except Exception as err:
            d = json.dumps({"code": 1})

        return d

    @pyqtSlot(str, result=str)
    def factorial_refresh_network(self, s):
        # 获取数据
        path = "template/data/x80xsocket.json"
        try:
            with open(path, 'r', encoding="utf-8") as f:
                d = f.read()
        except Exception as err:
            d = json.dumps({"code": 1})
        try:
            p = json.loads(s)
            refresh_network = setNetwork(ip=p['ip'], gateway=p['gateway'], netmask=p['netmask'], dns=p['dns'])
            # 保存当前信息
            connect_state = refresh_network.check_network()
        except Exception as err:
            connect_state = 0

        # 解析JSON
        list = json.loads(d)
        if list['code'] == 0:
            list['connect_state'] = connect_state
            # 记录回去
            try:
                # 检查接收数据是否打开
                flag = 0
                for proc in psutil.process_iter():
                    if proc.name() == "X80XTCPIP.exe":
                        flag = 1
                list['server_state'] = flag

                # 写入
                with open(path, 'w', encoding="utf-8") as f:
                    f.write(json.dumps(list))

            except Exception as err:
                pass

        return json.dumps(list)

    def set_socket_open(self, s):
        try:
            q = json.loads(s)
            # 获取 X80XTCPIP.exe 决定路径
            path = os.getcwd() + "\\bin\\X80XTCPIP.exe"
            # 0表示在后台运行，1表示在前台运行, 在后台运行
            win32api.ShellExecute(0, 'open', path, q['host']+' '+q['port'], '', 0)
        except Exception as err:
            print(err)

    @pyqtSlot(str, result=str)
    def factorial_socket_open(self, s):
        # 打开socket服务器
        thr_app = threading.Thread(target=self.set_socket_open, name='set_socket_open', args=(s,))
        thr_app.setDaemon(True)
        thr_app.start()
        return s

    def update_server_state(self, state):
        # 修改服务器状态 表示服务器退出state=0 , 表示服务器正常启动state=1
        path = "template/data/x80xsocket.json"
        try:
            with open(path, 'r', encoding="utf-8") as f:
                d = f.read()
                if d == '':
                    s = json.dumps({"code": 0, "server_state": state, "connect_state": 0, "update_state": "未设置", "ip": "192.168.0.10", "gateway": "192.168.0.1", "netmask": "255.255.255.0", "dns": "114.114.114.114", "time": time.strftime('%Y-%m-%d %H:%M:%S'), "description": "", "port": "12388"})
                    with open(path, 'w', encoding="utf-8") as f:
                        f.write(s)
                else:
                    list = json.loads(d)
                    list['server_state'] = state
                    s = json.dumps(list)
                    with open(path, 'w', encoding="utf-8") as f:
                        f.write(s)
        except Exception as err:
            pass

    def set_socket_close(self, s):
        try:
            self.update_server_state(0)
            # 获取win所有进程pid关闭,通过进程pid杀死进程
            for proc in psutil.process_iter():
                # 找到名为X80XTCPIP.exe进程程序
                if proc.name() == "X80XTCPIP.exe":
                    # 关闭X80XTCPIP.exe进程程序
                    subprocess.Popen("taskkill /F /T /PID " + str(proc.pid), shell=True)
        except Exception as err:
            print(err)

    @pyqtSlot(str, result=str)
    def factorial_socket_close(self, s):
        # 关闭socket服务器
        threading.Thread(target=self.set_socket_close, name='set_socket_close', args=(s,)).start()
        return s

    def set_save_menjin(self, s):
        try:
            a = json.loads(s)
            with open('./template/data/x80x.json', 'r', encoding="utf-8") as f:
                d = f.read()
                if d == '':
                    p = {"Alm": 0, "Tmax": '0', "Tmin": '0', "Hmax": '0', "Hmin": '0'}
                    with open('./template/data/x80x.json', 'w', encoding="utf-8") as f:
                        f.write(json.dumps(p))
                else:
                    p = json.loads(d)
                    p['server_url'] = a['server_url']
                    p['device_num1'] = a['device_num1']
                    p['device_num2'] = a['device_num2']
                    with open('./template/data/x80x.json', 'w', encoding="utf-8") as f:
                        f.write(json.dumps(p))
        except Exception as err:
            pass

    @pyqtSlot(str, result=str)
    def factorial_save_menjin(self, s):
        threading.Thread(target=self.set_save_menjin, name='set_save_menjin', args=(s,)).start()
        return s

    # 远程开锁
    def open_control_unlocking(self, s):
        res1 = {"code": 1, "SN": "0", "cmd": "0", "describe": "开锁失败", "unlock": "failed", "msg": "未执行"}
        res2 = {"code": 1, "SN": "0", "cmd": "0", "describe": "开锁失败", "unlock": "failed", "msg": "未执行"}
        obj = [res1, res2]
        try:
            with open('./template/data/x80x.json', 'r', encoding="utf-8") as f:
                d = f.read()
                if d != '':
                    p = json.loads(d)
                    # 前门后门同时开
                    if s == '1':
                        obj[0]['SN'] = p['device_num1']
                        # 执行远程开锁-前门
                        if p['device_num1'] != "0":
                            para = parse.urlencode({"SN": p['device_num1'], "Cmdvalue": "1", "userName": "物管台"})
                            data = para.encode('ascii')
                            with request.urlopen(f"{p['server_url']}/api/device/remote_open", data) as f:
                                res1 = f.read().decode('utf-8')
                                rep1 = json.loads(res1)
                                rep1['SN'] = p['device_num1']
                            obj[0] = rep1
                        # 延长一秒
                        time.sleep(1)
                        if p['device_num2'] != "0":
                            obj[1]['SN'] = p['device_num2']
                            # 执行远程开锁-后门
                            para = parse.urlencode({"SN": p['device_num2'], "Cmdvalue": "1", "userName": "物管台"})
                            data = para.encode('ascii')
                            with request.urlopen(f"{p['server_url']}/api/device/remote_open", data) as f:
                                res2 = f.read().decode('utf-8')
                                rep2 = json.loads(res2)
                                rep2['SN'] = p['device_num2']
                            obj[1] = rep2
                    # 只开前门
                    elif s == '2':
                        # 执行远程开锁-前门
                        para = parse.urlencode({"SN": p['device_num1'], "Cmdvalue": "1", "userName": "物管台"})
                        data = para.encode('ascii')
                        with request.urlopen(f"{p['server_url']}/api/device/remote_open", data) as f:
                            res1 = f.read().decode('utf-8')
                            rep1 = json.loads(res1)
                            rep1['SN'] = p['device_num1']
                        obj[0] = rep1
                    # 只开后门
                    elif s == '3':
                        # 执行远程开锁-后门
                        para = parse.urlencode({"SN": p['device_num2'], "Cmdvalue": "1", "userName": "物管台"})
                        data = para.encode('ascii')
                        with request.urlopen(f"{p['server_url']}/api/device/remote_open", data) as f:
                            res2 = f.read().decode('utf-8')
                            rep2 = json.loads(res2)
                            rep2['SN'] = p['device_num2']
                        obj[1] = rep2
        # 异常处理
        except Exception as err:
            res1 = {"code": 1, "SN": "0", "cmd": "0", "describe": "开锁失败", "unlock": "failed", "msg": "执行出错"}
            res2 = {"code": 1, "SN": "0", "cmd": "0", "describe": "开锁失败", "unlock": "failed", "msg": "执行出错"}
            obj[0] = res1
            obj[1] = res2
        # 记录开锁
        try:
            back = json.dumps(obj)
            with open('./template/data/x80xlocking.json', 'w', encoding="utf-8") as f:
                f.write(back)
        except Exception as err:
            pass

    @pyqtSlot(str, result=str)
    def factorial_control_unlocking(self, s):
        threading.Thread(target=self.open_control_unlocking, name='open_control_unlocking', args=(s,)).start()
        return s

    @pyqtSlot(str, result=str)
    def factorial_callback_unlocking(self, s):
        d = json.dumps([{"code": "1", "msg": "执行失败"}, {"code": "1", "msg": "执行失败"}])
        try:
            with open('./template/data/x80xlocking.json', 'r', encoding="utf-8") as f:
                d = f.read()
                if d == '':
                    d = json.dumps([{"code": "1", "msg": "执行失败"}, {"code": "1", "msg": "执行失败"}])
        except Exception as err:
            d = json.dumps([{"code": "1", "msg": "执行失败"}, {"code": "1", "msg": "执行失败"}])
        return d

    def dynamic_set_ip(self, s):
        try:
            network = setNetwork()
            # 修改为静态IP
            network.set_dhcp()
            # 获取win所有进程pid关闭,通过进程pid杀死进程,动态ip是主机不能上传数据
            for proc in psutil.process_iter():
                # 找到名为X80XTCPIP.exe进程程序
                if proc.name() == "X80XTCPIP.exe":
                    # 关闭X80XTCPIP.exe进程程序
                    subprocess.Popen("taskkill /F /T /PID " + str(proc.pid), shell=True)
            # 修改状态
            with open('template/data/x80xsocket.json', 'r', encoding="utf-8") as f:
                d = f.read()
                if d != '':
                    p = json.loads(d)
                    p['update_state'] = '动态获取IP'
                    with open('template/data/x80xsocket.json', 'w', encoding="utf-8") as f:
                        f.write(json.dumps(p))
        except Exception as err:
            pass

    @pyqtSlot(str, result=str)
    def factorial_dynamic_setip(self, s):
        threading.Thread(target=self.dynamic_set_ip, name='dynamic_set_ip', args=(s,)).start()
        return s

    @pyqtSlot(str, result=str)
    def factorial_get_settings(self, s):
        p = {"innerIP": "0", "innerport": "0", "remoteport": "9690", "url": "pmp.e-labhome.cn", "serverIP": "8.135.103.186", "serverport": "9601"}
        try:
            with open(os.getcwd()+"\\bin\\frp\\frpc.ini", 'r', encoding="utf-8") as f:
                d = f.read()
                if d != '':
                    if d.find("[common]") > -1:
                        common = d[d.find("[common]"):]
                        p['serverIP'] = common[common.find("server_addr"):common.find("server_port")].replace('\n', '').replace(' ', '').split("=")[1]
                        p['serverport'] = common[common.find("server_port"):common.find("[ssh0001]")].replace('\n', '').replace(' ', '').split("=")[1]
                    if d.find("[ssh0001]") > -1:
                        ssh0001 = d[d.find("[ssh0001]"):]
                        p['innerIP'] = ssh0001[ssh0001.find("local_ip"):ssh0001.find("local_port")].replace('\n', '').replace(' ', '').split("=")[1]
                        p['innerport'] = ssh0001[ssh0001.find("local_port"):ssh0001.find("remote_port")].replace('\n', '').replace(' ', '').split("=")[1]
                        p['remoteport'] = ssh0001[ssh0001.find("remote_port"):ssh0001.find("custom_domains")].replace('\n', '').replace(' ', '').split("=")[1]
                        if d.find("[ssh0002]") > -1:
                            p['url'] = ssh0001[ssh0001.find("custom_domains"):ssh0001.find("[ssh0002]")].replace('\n', '').replace(' ', '').split("=")[1]
                        else:
                            p['url'] = ssh0001[ssh0001.find("custom_domains"):].replace('\n', '').replace(' ', '').split("=")[1]
        except Exception as err:
            p = {"innerIP": "0", "innerport": "0", "remoteport": "9690", "url": "pmp.e-labhome.cn", "serverIP": "8.135.103.186", "serverport": "9601"}
        return json.dumps(p)

    @pyqtSlot(str, result=str)
    def factorial_save_settings(self, s):
        text = ""
        p_common = {}
        p_ssh0002 = {}
        try:
            p = json.loads(s)
            with open(os.getcwd() + "\\bin\\frp\\frpc.ini", 'r', encoding="utf-8") as f:
                d = f.read()
                if d != '':
                    if d.find("[common]") > -1:
                        common = d[d.find("[common]"):]
                        p_common['serverIP'] = common[common.find("server_addr"):common.find("server_port")].replace('\n', '').replace(' ', '').split("=")[1]
                        p_common['serverport'] = common[common.find("server_port"):common.find("[ssh0001]")].replace('\n', '').replace(' ', '').split("=")[1]
                    if d.find("[ssh0002]") > -1:
                        ssh0002 = d[d.find("[ssh0002]"):]
                        p_ssh0002['innerIP'] = ssh0002[ssh0002.find("local_ip"):ssh0002.find("local_port")].replace('\n', '').replace(' ', '').split("=")[1]
                        p_ssh0002['innerport'] = ssh0002[ssh0002.find("local_port"):ssh0002.find("remote_port")].replace('\n', '').replace(' ', '').split("=")[1]
                        p_ssh0002['remoteport'] = ssh0002[ssh0002.find("remote_port"):ssh0002.find("custom_domains")].replace('\n', '').replace(' ', '').split("=")[1]
                        p_ssh0002['url'] = ssh0002[ssh0002.find("custom_domains"):d.find("[ssh0002]")].replace('\n', '').replace(' ', '').split("=")[1]
            # 修改frpc的配置文件
            text += "[common]\n"
            text += "server_addr = "+p['serverIP']+"\n"
            text += "server_port = "+p['serverport']+"\n\n"

            if p_ssh0002 == {}:
                text += "[ssh0001]\n"
                text += "type = tcp\n"
                text += "local_ip = "+p['innerIP']+"\n"
                text += "local_port = "+p['innerport']+"\n"
                text += "remote_port = "+p['remoteport']+"\n"
                text += "custom_domains = "+p['url']+"\n"
            else:
                text += "[ssh0001]\n"
                text += "type = tcp\n"
                text += "local_ip = " + p['innerIP'] + "\n"
                text += "local_port = " + p['innerport'] + "\n"
                text += "remote_port = " + p['remoteport'] + "\n"
                text += "custom_domains = " + p['url'] + "\n\n"
                text += "[ssh0002]\n"
                text += "type = tcp\n"
                text += "local_ip = " + p_ssh0002['innerIP'] + "\n"
                text += "local_port = " + p_ssh0002['innerport'] + "\n"
                text += "remote_port = " + p_ssh0002['remoteport'] + "\n"
                text += "custom_domains = " + p_ssh0002['url'] + "\n"
            #　写入frpc.ini配置文件
            with open(os.getcwd()+"\\bin\\frp\\frpc.ini", 'w', encoding="utf-8") as f:
                num = f.write(text)
        except Exception as err:
            num = 0
        return str(num)

    def mapping_start(self, s):
        try:
            # 起用内网穿透
            if s == '1':
                win32api.ShellExecute(0, 'open', 'frpc.exe', '-c frpc.ini', os.getcwd() + '\\bin\\frp\\', 0)
            # 禁止内网穿透
            elif s == '2':
                # 获取win所有进程pid关闭,通过进程pid杀死进程
                for proc in psutil.process_iter():
                    # 找到名为frpc.exe进程程序
                    if proc.name() == "frpc.exe":
                        # 关闭frpc.exe进程程序
                        subprocess.Popen("taskkill /F /T /PID " + str(proc.pid), shell=True)
        except Exception as err:
            pass

    @pyqtSlot(str, result=str)
    def factorial_mapping_start(self, s):
        thr_app = threading.Thread(target=self.mapping_start, name='mapping_start', args=(s,))
        thr_app.setDaemon(True)
        thr_app.start()
        return s

    @pyqtSlot(str, result=str)
    def factorial_mapping_state(self, s):
        state = '0'
        try:
            # 检查进程是否存在
            for proc in psutil.process_iter():
                # 找到名为frpc.exe进程程序
                if proc.name() == "frpc.exe":
                    state = '1'
        except Exception as err:
            state = '0'
        return json.dumps({"enable": s, "state": state})

    def enable_system_state(self, s):
        try:
            # 上传的数据
            p = json.loads(s)

            # 获原来的数据
            d = [{"sysid": 1, "enable": 0}, {"sysid": 2, "enable": 0}, {"sysid": 3, "enable": 0},
                 {"sysid": 4, "enable": 0}, {"sysid": 5, "enable": 0}, {"sysid": 6, "enable": 0}]
            with open("template/data/x80xenable.json", 'r', encoding="utf-8") as f:
                data = f.read()
                if data != '':
                    d = json.loads(data)

            # 修改数据
            if int(p['sysid']) == 1:
                a = {'sysid': p['sysid'], 'enable': p['enable']}
                if len(d) == 0:
                    d.append(a)
                else:
                    d[0] = a
            elif int(p['sysid']) == 2:
                a = {'sysid': p['sysid'], 'enable': p['enable']}
                if len(d) == 1:
                    d.append(a)
                else:
                    d[1] = a
            elif int(p['sysid']) == 3:
                a = {'sysid': p['sysid'], 'enable': p['enable']}
                if len(d) == 2:
                    d.append(a)
                else:
                    d[2] = a
            elif int(p['sysid']) == 4:
                a = {'sysid': p['sysid'], 'enable': p['enable']}
                if len(d) == 3:
                    d.append(a)
                else:
                    d[3] = a
            elif int(p['sysid']) == 5:
                a = {'sysid': p['sysid'], 'enable': p['enable']}
                if len(d) == 4:
                    d.append(a)
                else:
                    d[4] = a
            elif int(p['sysid']) == 6:
                a = {'sysid':p['sysid'], 'enable':p['enable']}
                if len(d) == 5:
                    d.append(a)
                else:
                    d[5] = a
            # 记录修改数据
            with open("template/data/x80xenable.json", 'w', encoding="utf-8") as f:
                f.write(json.dumps(d))

        except Exception as err:
            pass

    @pyqtSlot(str, result=str)
    def factorial_enable_system(self, s):
        threading.Thread(target=self.enable_system_state, name='enable_system_state', args=(s,)).start()
        return s

    @pyqtSlot(str, result=str)
    def factorial_get_enable_system(self, s):
        d = []
        try:
            with open("template/data/x80xenable.json", 'r', encoding="utf-8") as f:
                data = f.read()
                if data != '':
                    d = json.loads(data)
        except Exception as err:
            d = []
        return json.dumps(d)

    # 打开外部软件
    def open_external_software(self, s):

        win32api.ShellExecute(0, 'open', 'CMS.exe', '', os.getcwd() + '\\bin\\CMS\\', 1)

    @pyqtSlot(str, result=str)
    def factorial_open_external_software(self, s):
        threading.Thread(target=self.open_external_software, name='open_external_software', args=(s,)).start()
        return s

    def saveStsp(self, lit):
        strLit = json.dumps(lit)
        with open("template/data/stsp.json", 'w', encoding="utf-8") as f:
            f.write(strLit)

    @pyqtSlot(str, result=str)
    def factorial_save_applet_settings(self, s):
        text = ""
        p_common = {}
        p_ssh0001 = {}
        # 转成字典
        s_list = json.loads(s)
        # 保存stsp
        self.saveStsp(s_list['stsp'])
        # 设置frp配置文件
        try:
            with open(os.getcwd() + "\\bin\\frp\\frpc.ini", 'r', encoding="utf-8") as f:
                d = f.read()
                if d != '':
                    if d.find("[common]") > -1:
                        common = d[d.find("[common]"):]
                        p_common['serverIP'] = common[common.find("server_addr"):common.find("server_port")].replace('\n', '').replace(' ', '').split("=")[1]
                        p_common['serverport'] = common[common.find("server_port"):common.find("[ssh0001]")].replace('\n', '').replace(' ', '').split("=")[1]
                    if d.find("[ssh0001]") > -1:
                        ssh0001 = d[d.find("[ssh0001]"):]
                        p_ssh0001['innerIP'] = ssh0001[ssh0001.find("local_ip"):ssh0001.find("local_port")].replace('\n', '').replace(' ', '').split("=")[1]
                        p_ssh0001['innerport'] = ssh0001[ssh0001.find("local_port"):ssh0001.find("remote_port")].replace('\n', '').replace(' ', '').split("=")[1]
                        p_ssh0001['remoteport'] = ssh0001[ssh0001.find("remote_port"):ssh0001.find("custom_domains")].replace('\n', '').replace(' ', '').split("=")[1]
                        p_ssh0001['url'] = ssh0001[ssh0001.find("custom_domains"):ssh0001.find("[ssh0002]")].replace('\n', '').replace(' ', '').split("=")[1]

            # 修改frpc的配置文件]
            text += "[common]\n"
            text += "server_addr = " + s_list['frp'][2] + "\n"
            text += "server_port = " + s_list['frp'][3] + "\n\n"

            if p_ssh0001 == {}:
                text += "[ssh0002]\n"
                text += "type = tcp\n"
                text += "local_ip = " + s_list['frp'][0] + "\n"
                text += "local_port = " + s_list['frp'][1] + "\n"
                text += "remote_port = " + s_list['frp'][4] + "\n"
                text += "custom_domains = " + s_list['frp'][5] + "\n"
            else:
                text += "[ssh0001]\n"
                text += "type = tcp\n"
                text += "local_ip = " + p_ssh0001['innerIP'] + "\n"
                text += "local_port = " + p_ssh0001['innerport'] + "\n"
                text += "remote_port = " + p_ssh0001['remoteport'] + "\n"
                text += "custom_domains = " + p_ssh0001['url'] + "\n\n"
                text += "[ssh0002]\n"
                text += "type = tcp\n"
                text += "local_ip = " + s_list['frp'][0] + "\n"
                text += "local_port = " + s_list['frp'][1] + "\n"
                text += "remote_port = " + s_list['frp'][4] + "\n"
                text += "custom_domains = " + s_list['frp'][5] + "\n"

            # 写入frpc.ini配置文件
            with open(os.getcwd() + "\\bin\\frp\\frpc.ini", 'w', encoding="utf-8") as f:
                num = f.write(text)

        except Exception as err:
            num = 0

        if num > 0:
            return "保存成功"
        else:
            return "保存失败"

    @pyqtSlot(str, result=str)
    def factorial_get_applet_settings(self, s):
        d_stsp = ["", "", "", "", "", "", "", "", ""]
        p = {"innerIP": "", "innerport": "", "remoteport": "", "url": "", "serverIP": "", "serverport": "", "stsp": d_stsp}
        try:
            # 获取frp配置文件
            with open(os.getcwd() + "\\bin\\frp\\frpc.ini", 'r', encoding="utf-8") as f:
                d = f.read()
                if d != '':
                    if d.find("[common]") > -1:
                        common = d[d.find("[common]"):]
                        p['serverIP'] = common[common.find("server_addr"):common.find("server_port")].replace('\n', '').replace(' ', '').split("=")[1]
                        p['serverport'] = common[common.find("server_port"):common.find("[ssh0001]")].replace('\n', '').replace(' ', '').split("=")[1]
                    if d.find("[ssh0002]") > -1:
                        ssh0002 = d[d.find("[ssh0002]"):]
                        p['innerIP'] = ssh0002[ssh0002.find("local_ip"):ssh0002.find("local_port")].replace('\n', '').replace(' ', '').split("=")[1]
                        p['innerport'] = ssh0002[ssh0002.find("local_port"):ssh0002.find("remote_port")].replace('\n', '').replace(' ', '').split("=")[1]
                        p['remoteport'] = ssh0002[ssh0002.find("remote_port"):ssh0002.find("custom_domains")].replace('\n', '').replace(' ', '').split("=")[1]
                        p['url'] = ssh0002[ssh0002.find("custom_domains"):].replace('\n', '').replace(' ', '').split("=")[1]
            # 获取stsp视频源链接
            with open("template/data/stsp.json", 'r', encoding="utf-8") as f:
                d = f.read()
                if d != '':
                    d_stsp = json.loads(d)

            # 获取stsp_state视频源链接
            with open("template/data/stsp_state.json", 'r', encoding="utf-8") as f:
                d = f.read()
                if d != '':
                    p['stsp_state'] = json.loads(d)

            p['stsp'] = d_stsp

        except Exception as err:
            p = {"innerIP": "", "innerport": "", "remoteport": "", "url": "", "serverIP": "", "serverport": "", "stsp": d_stsp}

        return json.dumps(p)

    @pyqtSlot(str, result=str)
    def factorial_set_rtsp_video(self, s):
        try:
            s_list = json.loads(s)
            # 获取视频链接
            with open("template/data/stsp.json", 'r', encoding="utf-8") as f:
                d = f.read()
                if d != '':
                    d_stsp = json.loads(d)
            # 获取状态
            with open("template/data/stsp_state.json", 'r', encoding="utf-8") as f:
                d = f.read()
                if d != '':
                    d_list = json.loads(d)
            # 修改
            d_list[s_list['index']] = s_list['flag']
            with open("template/data/stsp_state.json", 'w', encoding="utf-8") as f:
                f.write(json.dumps(d_list))
        except Exception as err:
            print(err)

        flag = 0
        try:
            if s_list['flag'] == 1:
                video = videoWebcamThread(d_stsp[s_list['index']], s_list['index'])
                webcam.ThreadList[s_list['index']] = video
                video.setDaemon(True)
                video.start()
            else:
                webcam.ThreadList[s_list['index']].setStop(True)
            flag = 1
        except Exception as err:
            print(err)
            flag = 0

        return f"{s_list['index']}-{flag}-{s_list['flag']}"
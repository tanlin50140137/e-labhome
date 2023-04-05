import sys
import os
import datetime
import socket
import threading
import logging
import json
import asyncio
import websockets
import wmi
import time

""""
当前模块是一个socket，tcp/ip协议，主要用来接收下位机发送上来的传感器数据，接到的数据转到到　X80XTCPWEB　模块。
X80XTCPWEB　模块是一个websocket模块，用来接收　X80XTCPIP　模块的发送上来的数据。
打包命令必须是:
pyinstaller --hidden-import=websockets.legacy.auth --hidden-import=websockets.client --hidden-import=websockets.server -F -w -i template/img/logo.ico ./X80XTCPIP.py
"""
# TCP Server
class ChatServer:
    def __init__(self, ip='192.168.0.10', port=12388):
        self.flag = 0
        self.addr = None
        self.socket = None
        # 客户端fd
        self.clinents = {}
        # 下发命令人
        self.commands = None
        # 数据量传感器
        self.DataNorm = []
        # 开关量传感器
        self.ALM = []
        # 主机fd
        self.SensorHost = None
        # 调用
        self.create(ip, port)

    def create(self, ip, port):
        self.addr = (ip, port)
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # 快速复用
        self.socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

    def start(self):
        # 绑定
        self.socket.bind(self.addr)
        # 监听
        self.socket.listen(5)
        # 记录为启动状态
        self.update_server_state(1)
        # 客户端连接
        while True:
            if self.flag == 1:
                print("服务器退出了!")
                break
            s, raddr = self.socket.accept()
            ip, port = raddr
            print("connect:{}; from:{}:{}".format(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),ip,port))
            threading.Thread(target=self.recv, name='recv', args=(s,)).start()

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

    def recv(self, sock):
        while True:
            data = None
            list_d = []
            self.DataNorm = []
            self.ALM = []
            try:
                # 获取客户端数据
                data = sock.recv(1024)
                print(data)
                list_d = data.decode('GBK').split(";")
                # 下面部分正常处理信息
                if len(list_d) > 1:
                    # 解析传感器数据
                    # 集合中数量大于1表示处理传感器数据
                    if list_d[1].find('DataNorm') >= 0:
                        # 传感器主机fd
                        if self.SensorHost == None:
                            self.SensorHost = sock

                        self.DataNorm = list_d[1].split("=")[1]
                        self.ALM = list_d[2].split("=")[1]

                        self.DataNorm = self.DataNorm.split(",")
                        alm = []
                        for i in range(len(self.ALM)):
                            alm.append(self.ALM[i])
                        self.ALM = alm

                    elif list_d[0] == "cmd":
                        # 客户端下发命令格式：cmd;NET:ALARM=OFF , cmd;为表示命令标志，NET:ALARM=OFF为主机命令集
                        self.commands = sock
                        self.SensorHost.send(list_d[1].encode('GBK'))
                    else:
                        # 表示其它操作
                        self.clinents[sock.getpeername()] = sock
                else:
                    # 表示其它操作
                    self.clinents[sock.getpeername()] = sock

            except BaseException as e:
                print(e)
                self.DataNorm = []
                self.ALM = []
                self.SensorHost = None
                sock.close()
                break

            if not data:
                self.clinents.pop(sock.getpeername())
                sock.close()
                break

            # 数据
            msg = {}
            if self.DataNorm != None:
                msg["userid"] = "all"
                msg["type"] = "all"
                msg["msg"] = {"DataNorm": self.DataNorm, "ALM": self.ALM}
                # print(json.dumps(msg))
                msg = json.dumps(msg).encode()

                try:
                    # 发送到webSocket
                    async def send(uri):
                        async with websockets.connect(uri) as websocket:
                            await websocket.send(msg)
                    loop = asyncio.new_event_loop()
                    asyncio.set_event_loop(loop)
                    asyncio.get_event_loop().run_until_complete(send('ws://localhost:9502'))
                except BaseException as e:
                    pass

            # 下发命令响应
            if (len(list_d) == 2) and (list_d[0].find("MyID") >= 0):
                try:
                    # 响应下发者
                    self.commands.send(data)
                    # 响应主机
                    self.SensorHost.send(data)
                except Exception as e:
                    print(e)

            # 响应客户端
            if len(self.clinents) > 0:
                try:
                    for s in self.clinents.values():
                        s.send(data)
                except Exception as e:
                    print(e)

    def stop(self):
        for s in self.clinents.values():
            s.close()
        self.socket.close()


# 执行socket
if __name__ == '__main__':
    if len(sys.argv) != 3:
        exit(0)
    cs = ChatServer(ip=sys.argv[1], port=int(sys.argv[2]))
    cs.start()
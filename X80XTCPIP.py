import datetime
import socket
import threading
import logging
import json
import asyncio
import websockets
import wmi

""""
当前模块是一个socket，tcp/ip协议，主要用来接收下位机发送上来的传感器数据，接到的数据转到到　X80XTCPWEB　模块。
X80XTCPWEB　模块是一个websocket模块，用来接收　X80XTCPIP　模块的发送上来的数据。
打包命令必须是:
pyinstaller --hidden-import=websockets.legacy.auth --hidden-import=websockets.client --hidden-import=websockets.server -F -w -i template/img/logo.ico ./X80XTCPIP.py
"""
# TCP Server
class ChatServer:
    def __init__(self, ip='192.168.0.10', port=12388):
        self.addr = None
        self.socket = None
        # 客户端fd
        self.clinents = {}
        # 数据量传感器
        self.DataNorm = None
        # 开关量传感器
        self.ALM = None
        # 主机fd
        self.SensorHost = None
        # 获取直连网关配置信息
        self.nic_configs = None

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
        # 客户端连接
        while True:
            s, raddr = self.socket.accept()
            ip, port = raddr
            print("connect:{}; from:{}:{}".format(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),ip,port))
            threading.Thread(target=self.recv, name='recv', args=(s,)).start()

    def recv(self, sock):
        while True:
            try:
                data = sock.recv(1024)
                list_d = data.decode('GBK').split(";")
                if len(list_d) > 1:
                    # 集合中数量大于1表示处理传感器数据
                    if list_d[1].find('DataNorm') >= 0:
                        # 主机fd
                        if self.SensorHost == None:
                            self.SensorHost = sock

                        self.DataNorm = list_d[1].split("=")[1]
                        self.ALM = list_d[2].split("=")[1]

                        self.DataNorm = self.DataNorm.split(",")
                        alm = []
                        for i in range(len(self.ALM)):
                            alm.append(self.ALM[i])
                        self.ALM = alm

                    else:
                        # 表示其它操作
                        self.clinents[sock.getpeername()] = sock
                else:
                    # 表示其它操作
                    self.clinents[sock.getpeername()] = sock

            except BaseException as e:
                print(e)
                self.DataNorm = None
                self.ALM = None
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
                print(json.dumps(msg))
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

            # 响应客户端
            if len(self.clinents) > 0:
                for s in self.clinents.values():
                    try:
                        s.send(data)
                    except Exception as e:
                        print(e)

    def stop(self):
        for s in self.clinents.values():
            s.close()
        self.socket.close()


# 执行socket
if __name__ == '__main__':
    cs = ChatServer()
    cs.start()
import binascii
import json
import serial
import serial.tools.list_ports
import asyncio
import websockets
import threading

class Communication():

    # 初始化
    def __init__(self, com, bps, timeout):
        self.port = com
        self.bps = bps
        self.timeout = timeout
        self.flag = 0
        self.enable_wsd = 0
        self.flag_wsd = 0
        self.i = 0
        global Ret
        try:
            # 打开串口，并得到串口对象
            self.main_engine = serial.Serial(self.port, self.bps, timeout=self.timeout)
            # 判断是否打开成功
            if self.main_engine.is_open:
                Ret = True
                self.flag = 0
        except Exception as e:
            print("---异常---：", e)

    # 打印设备基本信息
    def Print_Name(self):
        print(self.main_engine.name)  # 设备名字
        print(self.main_engine.port)  # 读或者写端口
        print(self.main_engine.baudrate)  # 波特率
        print(self.main_engine.bytesize)  # 字节大小
        print(self.main_engine.parity)  # 校验位
        print(self.main_engine.stopbits)  # 停止位
        print(self.main_engine.timeout)  # 读超时设置
        print(self.main_engine.writeTimeout)  # 写超时
        print(self.main_engine.xonxoff)  # 软件流控
        print(self.main_engine.rtscts)  # 软件流控
        print(self.main_engine.dsrdtr)  # 硬件流控
        print(self.main_engine.interCharTimeout)  # 字符间隔超时

    # 打开串口
    def Open_Engine(self):
        self.main_engine.open()

    # 关闭串口
    def Close_Engine(self):
        self.main_engine.close()
        print(self.main_engine.is_open)  # 检验串口是否打开

    # 打印可用串口列表
    @staticmethod
    def Print_Used_Com():
        port_list = list(serial.tools.list_ports.comports())
        print(port_list)

    # 接收指定大小的数据
    # 从串口读size个字节。如果指定超时，则可能在超时后返回较少的字节；如果没有指定超时，则会一直等到收完指定的字节数。
    def Read_Size(self, size):
        return self.main_engine.read(size=size)

    # 接收一行数据
    # 使用readline()时应该注意：打开串口时应该指定超时，否则如果串口没有收到新行，则会一直等待。
    # 如果没有超时，readline会报异常。
    def Read_Line(self):
        return self.main_engine.readline()

    # 发数据
    def Send_data(self, data, m=0):
        if m == 0:
            data = bytes(data, encoding='utf-8')
            # 发送文本模式
            self.main_engine.write(data)
        else:
            # 发送HEX模式
            data = bytes.fromhex(data)
            self.main_engine.write(data)
    # 更多示例
    # self.main_engine.write(chr(0x06).encode("utf-8"))  # 十六制发送一个数据
    # print(self.main_engine.read().hex())  #  # 十六进制的读取读一个字节
    # print(self.main_engine.read())#读一个字节
    # print(self.main_engine.read(10).decode("gbk"))#读十个字节
    # print(self.main_engine.readline().decode("gbk"))#读一行
    # print(self.main_engine.readlines())#读取多行，返回列表，必须匹配超时（timeout)使用
    # print(self.main_engine.in_waiting)#获取输入缓冲区的剩余字节数
    # print(self.main_engine.out_waiting)#获取输出缓冲区的字节数
    # print(self.main_engine.readall())#读取全部字符。

    # 设置发送状态
    def set_flag(self):
        if self.main_engine.is_open:
            self.main_engine.close()
        self.flag = 1

    # 接收文本模式
    # 一个整型数据占两个字节
    # 一个字符占一个字节
    def recive_data(self, way):
        # 循环接收数据，此为死循环，可用线程实现
        while True:
            # 结束发送
            if self.flag == 1:
                break
            # 继续发送
            try:
                # 一个字节一个字节的接收
                if way == 0:
                    sb = self.Read_Line()
                    list = self.get_info(sb)
                    if float(list[len(list)-2]) == 0.00:
                        continue
                    if float(list[len(list)-2]) > 0.00:
                            try:
                                data = json.dumps({"type": "send", "userid": "COM1", "msg": "-".join(list)})
                                async def send(uri):
                                    async with websockets.connect(uri) as websocket:
                                        await websocket.send(data)

                                loop = asyncio.new_event_loop()
                                asyncio.set_event_loop(loop)
                                asyncio.get_event_loop().run_until_complete(send('ws://localhost:9501'))
                            except Exception as e:
                                break
                if way == 1:
                    break
            except Exception as e:
                break

    # 结束HEX模式
    def set_end_hex(self, s):
        self.flag_wsd = int(s)

    def set_enable_wsd(self, s):
        self.enable_wsd = int(s)

    # 只接HEX模式
    def recive_data_once(self, command, userId, t=0.5):
        while True:
            # 结束发送
            if self.flag_wsd == 1 and self.enable_wsd == 0:
                break
            try:
                self.Send_data(command, t)
                sb = self.Read_Line()
                list = self.get_HEX(sb)
                st_l = "-".join('%s' %id for id in list)
                try:
                    # 本机内网
                    data1 = json.dumps({"type": "send", "userid": "wsd", "msg": st_l})
                    self.websocket_sned_data1('ws://localhost:9501', data1)
                    # 远程外网
                    if self.enable_wsd == 1:
                        data2 = json.dumps({"type": "send", "userid": userId, "msg": st_l})
                        self.websocket_sned_data2('ws://8.135.103.186:9512', data2)

                except Exception as e:
                    break
            except Exception as e:
                break
        # 关闭串口
        try:
            self.main_engine.close()
        except Exception as e:
            print(e)

    # websocket
    def websocket_sned_data1(self, uri, data):
        try:
            async def send1(wsurl):
                async with websockets.connect(wsurl) as websocket:
                    await websocket.send(data)
            loop1 = asyncio.new_event_loop()
            asyncio.set_event_loop(loop1)
            asyncio.get_event_loop().run_until_complete(send1(uri))
        except Exception as e:
            pass

    def websocket_sned_data2(self, uri, data):
        try:
            async def send2(wsurl):
                async with websockets.connect(wsurl) as websocket:
                    await websocket.send(data)
            loop2 = asyncio.new_event_loop()
            asyncio.set_event_loop(loop2)
            asyncio.get_event_loop().run_until_complete(send2(uri))
        except Exception as e:
            pass

    # 解析串口数据
    def get_info(self, sb):
        st = str(sb, encoding="utf-8")
        s = st.replace("\r\n", "")
        d = s.split(" ")
        l = []
        for v in d:
            if v != "":
                l.append(v)
        return l

    # 解析HEX模式返回数据
    def get_HEX(self, sb):
        data = str(binascii.b2a_hex(sb))[2:-1]
        if data == '' or len(data) != 18:
            return ['00.0', '00.0']
        wendu = int(data[6:10], 16) / 10
        shidu = int(data[10:14], 16) / 10
        return [wendu, shidu]
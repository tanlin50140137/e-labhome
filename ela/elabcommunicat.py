import binascii
import json
import serial
import serial.tools.list_ports
import asyncio
import websockets
import threading

class Communication():

    # 初始化
    def __init__(self, com, bps, timeout, command, format, userId):
        self.port = com
        self.bps = bps
        self.timeout = timeout
        self.command = command
        self.format = format
        self.userId = userId
        self.flag = 0
        self.enable_wsd = 0
        self.flag_wsd = 0
        self.stop_wsd = 0
        self.openok = False
        self.i = 0
        global Ret
        try:
            # 打开串口，并得到串口对象
            # self.main_engine = serial.Serial(self.port, self.bps, timeout=self.timeout)
            # 判断是否打开成功
            # if self.main_engine.is_open:
            # 自动识别串口
            self.openok = self.comConnect()
            if self.openok:
                Ret = True
                self.flag = 0
                self.stop_wsd = 0
        except Exception as e:
            pass
            # print("---异常---：", e)

    # 智能接入串口
    def comConnect(self):
        # 打开串口，并得到串口对象
        openok = False
        # 连接COM1
        try:
            self.main_engine = serial.Serial("COM1", self.bps, timeout=self.timeout)           # COM1
            if self.main_engine.is_open:
               self.Send_data(self.command, self.format)
               sb = self.Read_Line()
               if self.format == 0:
                   info = self.get_info(sb)
                   if len(info) == 0:
                       self.main_engine.close()
                       openok = False
                   else:
                       openok = True
               elif self.format == 1:
                   info = self.get_HEX(sb)
                   if info[0] == '00.0' and info[1] == '00.0':
                       self.main_engine.close()
                       openok = False
                   else:
                       openok = True
        except Exception as e:
            pass
        if openok == True:
            return openok
        # 连接COM2
        try:
            if openok == False:
                self.main_engine = serial.Serial("COM2", self.bps, timeout=self.timeout)     # COM2
                if self.main_engine.is_open:
                    self.Send_data(self.command, self.format)
                    sb = self.Read_Line()
                    if self.format == 0:
                        info = self.get_info(sb)
                        if len(info) == 0:
                            self.main_engine.close()
                            openok = False
                        else:
                            openok = True
                    elif self.format == 1:
                        info = self.get_HEX(sb)
                        if info[0] == '00.0' and info[1] == '00.0':
                            self.main_engine.close()
                            openok = False
                        else:
                            openok = True
        except Exception as e:
            pass

        return openok


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
        self.time_end = 0
        if self.openok == False:
            return False
        # 循环接收数据，此为死循环，可用线程实现
        while True:
            # 结束发送
            if self.flag == 1:
                break
            # 如果接口拔除10秒后自动关闭串口
            if self.time_end == 10:
                self.main_engine.close()
                break
            # 继续发送
            try:
                # 一个字节一个字节的接收
                if way == 0:
                    self.Send_data(self.command, 0)
                    sb = self.Read_Line()
                    list = self.get_info(sb)
                    # 如果接口拔除自动结束, 推出规则
                    if len(list) == 0:
                        self.time_end = self.time_end+1
                    else:
                        self.time_end =0
                    # 上传数据
                    if float(list[len(list)-2]) == 0.00:
                        continue
                    if float(list[len(list)-2]) > 0.00:
                            try:
                                data = json.dumps({"type": "send", "userid": "tp", "msg": "-".join(list)})
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
        if self.flag_wsd == 1:
            self.main_engine.close()
    # 结束远程
    def set_enable_wsd(self, s):
        self.enable_wsd = int(s)

    # 结束本地
    def set_socket_stop(self, s):
        self.stop_wsd = int(s)

    # 只接HEX模式
    def recive_data_once(self):
        self.time_end = 0
        if self.openok == False:
            return False
        while True:
            # 结束
            if self.flag_wsd == 1:
                break
            # 如果本地和远程都停止
            if self.stop_wsd == 1 and self.enable_wsd == 0:
                self.main_engine.close()
                break
            # 如果接口拔除10秒后自动关闭串口
            if self.time_end == 10:
                self.main_engine.close()
                break
            try:
                self.Send_data(self.command, 1)
                sb = self.Read_Line()
                list = self.get_HEX(sb)
                # 如果接口拔除自动结束, 推出规则
                if list[0] == '00.0' and list[1] == '00.0':
                    self.time_end = self.time_end + 1
                else:
                    self.time_end = 0
                # 上传数据
                st_l = "-".join('%s' %id for id in list)
                try:
                    # 本机内网
                    if self.stop_wsd == 0:
                        data1 = json.dumps({"type": "send", "userid": "wsd", "msg": st_l})
                        self.websocket_sned_data1('ws://localhost:9501', data1)
                    # 远程外网
                    if self.enable_wsd == 1:
                        data2 = json.dumps({"type": "send", "userid": self.userId, "msg": st_l})
                        self.websocket_sned_data2('ws://8.135.103.186:9512', data2)

                except Exception as e:
                    break
            except Exception as e:
                break

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
        # 解析数据
        st = str(sb, encoding="utf-8")
        s = st.replace("\r\n", "")
        d = s.split(" ")
        # 处理数据
        l = []
        for v in d:
            if v != "":
                l.append(v)
        # 兼容处理
        c = []
        if len(l) == 4 and l[0] == 'K':  # 上海越平科学仪器(苏州)制造有限公司  兼容 常州诺德电器有限公司 数据格式
            c.append("S1+")
            c.append(l[2])
            c.append(l[3])
        elif len(l) == 3 and l[0] == 'K*+':  # 上海越平科学仪器(苏州)制造有限公司  兼容 常州诺德电器有限公司 数据格式
            c.append("S0+")
            c.append(l[1])
            c.append(l[2])
        else:
            c = l     # 默认是常州诺德电器有限公司
        # 返回数据
        return c

    # 解析HEX模式返回数据
    def get_HEX(self, sb):
        data = str(binascii.b2a_hex(sb))[2:-1]
        if data == '' or len(data) != 18:
            return ['00.0', '00.0']
        wendu = int(data[6:10], 16) / 10
        shidu = int(data[10:14], 16) / 10
        return [wendu, shidu]
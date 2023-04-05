import socket
"""
x80x_socket_client
使用方法：
if __name__ == '__main__':
    tcp = x80xClient(host="192.168.0.10", port=12388)
    callback = tcp.tcpClient("cmd;NET:ALARM=OFF")
    成功返回客户端响应，失败返回None
    print(callback)
"""


class x80xClient:

    def __init__(self, host="192.168.0.10", port=12388):
        self.host = host
        self.port = port
        self.data = None

    def tcpClient(self, cmd):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((self.host, self.port))
        message = cmd.encode()
        s.send(message)
        try:
            data = s.recv(1024)
        except Exception as e:
            print(e)
            s.close()
            return None

        self.data = data.decode('GBK')

        s.close()

        return self.data
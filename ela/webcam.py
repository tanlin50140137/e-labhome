"""
网络摄像头
"""
import base64
import threading
import cv2 as cv
import asyncio
import websockets

# 线程队列
ThreadList = {}


# 网络视频驱动
class videoWebcamThread(threading.Thread):
    def __init__(self, url, name=0):
        super(videoWebcamThread, self).__init__(name=name)
        # 网络摄像机连接rtsp
        self.url = url
        # 线程名
        self.name = name
        # 线程停止标志
        self.stop = False
        # 发送类型
        self.type = "send"
        # 推送线程名
        self.publish = int(self.getName())
        # 推送线程名
        self.server = "ws://localhost:9855"

    # 停止一个线程
    def setStop(self, stop=False):
        self.stop = stop

    # 启动一个线程
    def run(self):
        try:
            self.camera = cv.VideoCapture(self.url)
            self.bools = self.camera.isOpened()
            while self.bools:
                self.ret, self.frame = self.camera.read()
                if self.ret == True:
                    # 转为图片
                    self.ret, self.jpg = cv.imencode('.jpg', self.frame)
                    self.img_bytes = self.jpg.tobytes()
                    self.b64 = base64.standard_b64encode(self.img_bytes)
                    self.jpeg_data = self.b64.decode(encoding="utf-8")
                    # 发送到webSocket
                    try:
                        async def send(uri):
                            async with websockets.connect(uri) as websocket:
                                await websocket.send(f"{self.type},{self.publish},{self.jpeg_data}")
                        self.loop = asyncio.new_event_loop()
                        asyncio.set_event_loop(self.loop)
                        asyncio.get_event_loop().run_until_complete(send(self.server))
                    except Exception as err:
                        print("websocket:", err)
                    # 结束视频
                    if self.stop:
                        break
                else:
                    break
        except Exception as err:
            print("VideoCapture:", err)
        # 线程结束释放资源
        self.camera.release()
        cv.destroyAllWindows()


# if __name__ == '__main__':
#     name = 0
#     video = videoWebcamThread("rtsp://192.168.50.200:554/user=admin&password=&channel=1&stream=1.sdp?", name)
#     ThreadList[name] = video
#     video.start()

    # print(ThreadList)
    # ThreadList[0].setStop(True)

import base64
import json
import os
import sys
import time
import urllib.request
import urllib.parse
from PIL import Image, ImageDraw, ImageFont
import cv2
import numpy as np
from PyQt5.QtCore import QTimer
from PyQt5.QtGui import QImage, QPixmap
from PyQt5.QtWidgets import QApplication, QMainWindow, QWidget, QLabel, QVBoxLayout, QDialog
from PyQt5 import QtGui, QtCore


class Mywin(QDialog):

    def __init__(self):
        super(Mywin, self).__init__()
        self.timer_camera = QTimer()  # 初始化定时器
        self.cap = cv2.VideoCapture(0)  # 初始化摄像头
        # 告诉OpenCV使用人脸识别分类器
        self.classfier = cv2.CascadeClassifier("./template/xml/haarcascade_frontalface_alt2.xml")
        self.photograph = 100
        self.chinese_logo = "开始扫描脸部「」对准框"
        self.color_logo = (0, 255, 0)
        self.verification = ""
        self.initUI()


    def initUI(self):
        self.setWindowTitle('人脸识别')
        # self.setWindowIcon(QtGui.QIcon('../template/img/logo.ico'))
        self.resize(800, 550)
        # 禁止调整大小
        self.setFixedSize(self.width(), self.height())
        v_layout = QVBoxLayout(self)

        self.labal = QLabel()
        self.labal.setText("这里显示摄像头图像")
        self.labal.setStyleSheet("QLabel{text-align:center;}")
        v_layout.addWidget(self.labal)

        # 计时器
        self.timer_camera.timeout.connect(self.show_camera)
        self.timer_camera.start()

    # 在图片上显示支持中文
    def cv2ImgAddText(self, img, text, left, top, textColor=(0, 255, 0), textSize=20):
        if (isinstance(img, np.ndarray)):  # 判断是否OpenCV图片类型
            img = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        # 创建一个可以在给定图像上绘图的对象
        draw = ImageDraw.Draw(img)
        # 字体的格式
        fontStyle = ImageFont.truetype("./font/simsun.ttc", textSize, encoding="utf-8")
        # 绘制文本
        draw.text((left, top), text, textColor, font=fontStyle)
        # 转换回OpenCV格式
        return cv2.cvtColor(np.asarray(img), cv2.COLOR_RGB2BGR)

    def show_camera(self):
        ok, self.frame = self.cap.read()
        if not ok:
            self.closeCamera()
        # 将当前帧转换成灰度图像
        grey = cv2.cvtColor(self.frame, cv2.COLOR_BGR2GRAY)
        # 人脸检测，1.2和2分别为图片缩放比例和需要检测的有效点数
        faceRects = self.classfier.detectMultiScale(grey, scaleFactor=1.2, minNeighbors=3, minSize=(32, 32))
        if len(faceRects) > 0:  # 大于0则检测到人脸
            for faceRect in faceRects:  # 单独框出每一张人脸
                x, y, w, h = faceRect
                # 保存并剪切图片
                if self.photograph == 250:
                    v_file = "./face.jpg"
                    save_image = self.frame[y - 10: y + h + 10, x - 10: x + w + 10]
                    cv2.imwrite(v_file, save_image)
                    if os.path.isfile(v_file):
                        # print(self.photograph, "人脸采集成功")
                        # 将视频源传到网上
                        try:
                            with open(v_file, 'rb') as file_obj:
                                chunk = 1024 * 1024 * 2
                                while True:
                                    r = file_obj.read(chunk)
                                    if not r:
                                        # 上传成功删除文件
                                        file_obj.close()
                                        os.remove(v_file)
                                        break
                                    b64 = base64.standard_b64encode(r)
                                    data = urllib.parse.urlencode({'suffix': 'jpg', 'name': 'face', 'base64': b64})
                                    data = data.encode('ascii')
                                    with urllib.request.urlopen("http://face.treelessly.top:5806/face_upimg", data) as f:
                                        try:
                                            info = str(f.read(), encoding="utf-8")
                                            d = json.loads(info)
                                            self.verification = d['verification']
                                            if d['verification'] == 'yes':
                                                # print(d['msg'])
                                                # time.sleep(2)
                                                self.color_logo = (41, 248, 55)
                                                self.chinese_logo = "人脸识别通过[√]{}".format(d['msg'])
                                                self.photograph = 0
                                            else:
                                                self.photograph = 0
                                                self.color_logo = (255, 235, 59)
                                                self.chinese_logo = "人脸识别失败[x]{}".format(d['msg'])
                                        except Exception as err:
                                            self.photograph = 0
                                            self.color_logo = (255, 235, 59)
                                            self.chinese_logo = "验证失败[x]请重试!"
                                            self.verification = ""
                                            # print("内层", err)
                        except Exception as err:
                            self.photograph = 0
                            self.color_logo = (255, 235, 59)
                            self.chinese_logo = "验证失败[x]请重试!"
                            self.verification = ""
                            # print("外层", err)

                # 识别脸
                offset = -1
                with_x = (x + w) + offset
                height_y = (y + h) + offset
                w_x = 200
                wh_xy = 50
                h_y = 160
                line_size = 3

                # 画多边形，指定各个点坐标,array必须是int32类型
                pts = np.array([[with_x, (height_y) - wh_xy], [with_x, height_y], [(with_x) - wh_xy, height_y]],
                               np.int32)
                # -1表示该纬度靠后面的纬度自动计算出来，实际上是4
                pts = pts.reshape((-1, 1, 2,))
                # print(pts)
                # 画多条线，False表不闭合，True表示闭合，闭合即多边形
                cv2.polylines(self.frame, [pts], False, (0, 255, 0), line_size)

                # 画多边形，指定各个点坐标,array必须是int32类型
                pts = np.array(
                    [[(with_x) - w_x, height_y], [((with_x) - w_x) + wh_xy, height_y], [(with_x) - w_x, height_y],
                     [(with_x) - w_x, (height_y) - wh_xy]], np.int32)
                # -1表示该纬度靠后面的纬度自动计算出来，实际上是4
                pts = pts.reshape((-1, 1, 2,))
                # print(pts)
                # 画多条线，False表不闭合，True表示闭合，闭合即多边形
                cv2.polylines(self.frame, [pts], False, (0, 255, 0), line_size)

                # 画多边形，指定各个点坐标,array必须是int32类型
                pts = np.array([[(with_x) - w_x, (height_y) - w_x], [(with_x) - w_x, (height_y) - h_y],
                                [(with_x) - w_x, (height_y) - w_x], [((with_x) - w_x) + wh_xy, (height_y) - 200]],
                               np.int32)
                # -1表示该纬度靠后面的纬度自动计算出来，实际上是4
                pts = pts.reshape((-1, 1, 2,))
                # print(pts)
                # 画多条线，False表不闭合，True表示闭合，闭合即多边形
                cv2.polylines(self.frame, [pts], False, (0, 255, 0), line_size)

                # 画多边形，指定各个点坐标,array必须是int32类型
                pts = np.array([[with_x, (height_y) - w_x], [with_x, (height_y) - h_y], [with_x, (height_y) - w_x],
                                [(with_x) - wh_xy, (height_y) - w_x]], np.int32)
                # -1表示该纬度靠后面的纬度自动计算出来，实际上是4
                pts = pts.reshape((-1, 1, 2,))
                # print(pts)
                # 画多条线，False表不闭合，True表示闭合，闭合即多边形
                cv2.polylines(self.frame, [pts], False, (0, 255, 0), line_size)

                if self.photograph > 50 and self.verification == "yes":
                    self.timer_camera.stop()
                    self.cap.release()
                    self.labal.clear()
                    self.close()

                # 每一针上添加文字
                self.frame = self.cv2ImgAddText(self.frame, self.chinese_logo, int(with_x / 2 + (w / 8)), int(height_y + 15), self.color_logo, 19)

                # 操作标识
                self.photograph = self.photograph + 1

        # 视频显示在labal标签中
        show = cv2.resize(self.frame, (800, 550))
        show = cv2.cvtColor(show, cv2.COLOR_BGR2RGB)
        showImage = QImage(show.data, show.shape[1], show.shape[0], QImage.Format_RGB888)
        self.labal.setPixmap(QPixmap.fromImage(showImage))

    # 关闭摄像头
    def closeCamera(self):
        self.timer_camera.stop()
        self.cap.release()
        self.labal.clear()

    # 关闭窗口时销毁
    def closeEvent(self, event):
        self.closeCamera()

    # 执行窗口
    def showFace(self):
        app = QApplication(sys.argv)
        win = Mywin()
        win.show()
        sys.exit(app.exec_())
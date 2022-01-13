import os
import numpy
import cv2
import urllib.request
import urllib.parse
import json
import base64
from PIL import Image, ImageDraw, ImageFont


class recordvideo:
    # 结束录制
    def record_end(self):
        self.end = True

    def cv2ImgAddText(self, img, text, left, top, textColor=(0, 255, 0), textSize=20):
        if ( isinstance(img, numpy.ndarray) ):  # 判断是否OpenCV图片类型
            img = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        # 创建一个可以在给定图像上绘图的对象
        draw = ImageDraw.Draw(img)
        # 字体的格式
        font_style = ImageFont.truetype("./font/simsun.ttc", textSize, encoding="utf-8")
        # 绘制文本
        draw.text((left, top), text, textColor, font=font_style)
        # 转换回OpenCV格式
        return cv2.cvtColor(numpy.asarray(img), cv2.COLOR_RGB2BGR)

    def read_usb_capture(self, write_text, video_path, img_path, filename, needle):
        try:
            # 选择摄像头的编号USB摄像头优先 cv2.CAP_DSHOW win7下必须,否则报错
            cap = cv2.VideoCapture(1, cv2.CAP_DSHOW)
            is_video = cap.isOpened()
            if not is_video:
                # 其次是内置摄像头
                cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
                is_video = cap.isOpened()
            if not is_video:
                return False
            # 保存视频
            width = int(cap.get(3))
            height = int(cap.get(4))
            fourcc = int(cv2.VideoWriter_fourcc(*'H264'))
            fps = 18.0
            v_file = video_path
            frame_size = (width, height)
            out = cv2.VideoWriter()
            out.open(v_file, fourcc, fps, frame_size)
            # 读取USB每一针视频
            self.i = 0
            while is_video:
                # 读取摄像头的画面
                ret, frame = cap.read()
                if not ret:
                    break
                # 写字,字体选择
                img = self.cv2ImgAddText(frame, write_text, 10, 380, (41, 248, 55), 19)
                # 保存一张图片
                if self.i == 5:
                    cv2.imwrite(img_path, img)
                # 保存视频
                out.write(img)
                if self.i == needle:
                    break
                self.i = self.i + 1
            # 释放画面
            cap.release()
            out.release()
            cv2.destroyAllWindows()
            # 将视频源传到网上
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
                    data = urllib.parse.urlencode({'suffix': 'mp4', 'name': filename, 'base64': b64})
                    data = data.encode('ascii')
                    with urllib.request.urlopen("http://py.e-labhome.cn/video.php", data) as f:
                        pass
                        # s = f.read().decode('utf-8')
        except Exception as err:
            print(err)

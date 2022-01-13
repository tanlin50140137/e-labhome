import io
from urllib.request import urlopen
import win32print
import win32ui
from PIL import Image, ImageWin
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

class Elabprinter:
    """
    打印机驱动
    """
    # 获取驱动名称
    def get_print_driver(self):
        try:
            with open('./template/data/defaultPrinter.txt', 'r', encoding="utf-8") as f:
                d = f.read()
                if d == '':
                    defaultPrinter = win32print.GetDefaultPrinter()
                else:
                    defaultPrinter = str(d)
        except Exception as err:
            defaultPrinter = win32print.GetDefaultPrinter()
        return defaultPrinter
    # 执行打印
    def ExecutePrinting(self, url):
        HORZRES = 8
        VERTRES = 10
        LOGPIXELSX = 88
        LOGPIXELSY = 90
        PHYSICALWIDTH = 110
        PHYSICALHEIGHT = 111
        PHYSICALOFFSETX = 112
        PHYSICALOFFSETY = 113
        printer_name = self.get_print_driver()
        # 传入图标连接
        # url = "https://www.e-labhome.com/ueditor/php/upload/qrcode/z-qrcode7093.png"
        image_bytes = urlopen(url).read()
        data_stream = io.BytesIO(image_bytes)
        file_name = data_stream
        # 设置系统打印机
        hDC = win32ui.CreateDC()
        hDC.CreatePrinterDC(printer_name)
        printable_area = hDC.GetDeviceCaps(HORZRES), hDC.GetDeviceCaps(VERTRES)
        printer_size = hDC.GetDeviceCaps(PHYSICALWIDTH), hDC.GetDeviceCaps(PHYSICALHEIGHT)
        printer_margins = hDC.GetDeviceCaps(PHYSICALOFFSETX), hDC.GetDeviceCaps(PHYSICALOFFSETY)
        bmp = Image.open(file_name)
        # 转换图片格式
        w = bmp.size[0]
        h = bmp.size[1]
        img = bmp.resize((int(w / 2), int(h / 2)), Image.ANTIALIAS)
        if len(img.split()) == 4:
            r, g, b, a = img.split()
            img = Image.merge("RGB", (r, g, b))
            bmp = img.convert('RGB')
        else:
            bmp = img.convert('RGB')
        # 设置转角
        if bmp.size[0] > bmp.size[1]:
            # bmp = bmp.rotate(90)
            bmp = bmp.rotate(0)
        ratios = [1.0 * printable_area[0] / bmp.size[0], 1.0 * printable_area[1] / bmp.size[1]]
        scale = min(ratios)
        # 设置打印标题
        title = '直接打印'
        hDC.StartDoc(title)
        hDC.StartPage()

        # x y 为坐标位置 x 是横向坐标 y 是纵向坐标
        dib = ImageWin.Dib(bmp)
        scaled_width, scaled_height = [int(scale * i) for i in bmp.size]
        # 可能临时修改
        # scaled_width = 350
        # scaled_height = 350

        x1 = int((printer_size[0] - scaled_width) / 2)
        y1 = int((printer_size[1] - scaled_height) / 2)
        x2 = x1 + scaled_width
        y2 = y1 + scaled_height
        dib.draw(hDC.GetHandleOutput(), (x1, y1, x2, y2))

        hDC.EndPage()
        hDC.EndDoc()
        hDC.DeleteDC()
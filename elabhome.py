"""
主程序模块-
"""
import sys
import threading

from PyQt5.QtWidgets import QApplication, QMainWindow
from PyQt5.QtGui import QIcon
from PyQt5.QtCore import Qt, QObject

# 所有模块
from ela import mainela, factorial, elabprinter, connectwifi, recordvideo, elabversionupdate, elabcommunicat

"""
打包命令必须是:记得要用这个来编译
pyinstaller --hidden-import=websockets.legacy.auth --hidden-import=websockets.client --hidden-import=websockets.server -F -w -i template/img/logo.ico ./elabhome.py
"""


class elaMain(QObject):
    """
    主程序模块
    """

    def __init__(self):
        super(elaMain, self).__init__()
        self.window = ''
        self.widget = ''
        self.icon = QIcon("./template/img/logo.ico")

    # 主面板
    def showMainela(self):
        # 创建窗口
        self.window = QMainWindow()
        # 设置窗口背景图片
        self.window.setObjectName("MainWindow")
        self.window.setStyleSheet("#MainWindow{background-image:url(./template/img/bag01.jpg);}")
        # 窗口设置logo和标题
        self.window.setWindowIcon(self.icon)
        self.window.setWindowTitle("易莱博系统")
        # 去除窗口标题栏
        self.window.setWindowFlags(Qt.SplashScreen | Qt.FramelessWindowHint)
        # 设置成全屏幕
        desktop = QApplication.desktop()
        # 获取桌面可用尺寸
        rect = desktop.availableGeometry()
        self.window.setGeometry(rect)
        # 显示内置浏览器
        self.widget = mainela.Elamain(self.window, self)
        self.window.show()


if __name__ == "__main__":
    app = QApplication(sys.argv)
    app.setObjectName("appName")
    app.setStyleSheet("#appName{background:#000000;}")
    win = elaMain()
    win.showMainela()
    sys.exit(app.exec_())

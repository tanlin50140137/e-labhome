import pywifi, time
# 保存包中写义的常量
from pywifi import const


class ConnetWifi:
    """连接计算机WIFI"""
    def connect_wifi(self, wifianme, password):
        wifi = pywifi.PyWiFi()  # 创建一个wifi对象
        ifaces = wifi.interfaces()[0]  # 取第一个无限网卡
        # print(ifaces.name())  # 输出无线网卡名称
        ifaces.disconnect()  # 断开网卡连接
        time.sleep(3)  # 缓冲3秒

        profile = pywifi.Profile()  # 配置文件
        profile.ssid = wifianme  # wifi名称
        profile.auth = const.AUTH_ALG_OPEN  # 需要密码
        profile.akm.append(const.AKM_TYPE_WPA2PSK)  # 加密类型
        profile.cipher = const.CIPHER_TYPE_CCMP  # 加密单元
        profile.key = password  # wifi密码

        ifaces.remove_all_network_profiles()  # 删除其他配置文件
        tmp_profile = ifaces.add_network_profile(profile)  # 加载配置文件

        ifaces.connect(tmp_profile)  # 连接
        time.sleep(10)  # 尝试10秒能否成功连接
        isok = True
        if ifaces.status() == const.IFACE_CONNECTED:
            # print("成功连接")
            isok = True
        else:
            # print("失败")
            isok = False
        # ifaces.disconnect()  # 断开连接
        time.sleep(1)
        return isok

    # 扫描wifi名称列表
    def scan_wifi(self):
        # 扫苗附件wifi
        wifi = pywifi.PyWiFi()
        iface = wifi.interfaces()[0]
        iface.scan()  # 扫苗附件wifi
        time.sleep(1)
        basewifi = iface.scan_results()
        wflist = []
        wflistgb18030 = []
        for i in basewifi:
            # 输出显示
            wfname = i.ssid.encode('raw_unicode_escape').decode('utf-8')
            wflist.append(wfname)
            # 连接使用
            wfnamegb18030 = i.ssid.encode('raw_unicode_escape').decode('gb18030')
            wflistgb18030.append(wfnamegb18030)

        # 记录下wifi账号密码
        with open('template/data/wifidata.json', 'w', encoding="utf-8") as f:
            f.write(s)

        return wflist



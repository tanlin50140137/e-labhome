import wmi
import json
import time
"""
修改网卡信息，主机需要管理员机限，否则修改失败
使用案例：
if __name__ == '__main__':
    network = setNetwork(ip="192.168.2.10", gateway="192.168.2.1", netmask="255.255.255.0", dns="114.114.114.114")
    修改为静态IP
    network.set_static()
    修改为动态IP
    network.set_dhcp()
    获取检查是否为以太网、是否连接网线
    print(network.check_network())
    保存以太网信息
    print(network.save_update_return())
"""


class setNetwork:

    def __init__(self, ip="192.168.0.10", gateway="192.168.2.1", netmask="255.255.255.0", dns="114.114.114.114", port="12388"):
        self.ip = ip  # IP地址
        self.gateway = gateway  # 网关
        self.netmask = netmask  # 子网掩码
        self.dns = dns  # DNS
        self.port = port
        self.setState = ""
        self.nic_configs = wmi.WMI().Win32_NetworkAdapterConfiguration(IPEnabled=True)
        self.connect_state = 0
        self.nic = None
        for i in range(len(self.nic_configs)):
            if self.nic_configs[i].Description.find("PCIe") >= 0:
                self.nic = self.nic_configs[i]
                self.connect_state = 1

    # 检查是否为以太网或是否已经接上网线 表示没有接线flag=0;　表示已经接线flag = 1
    def check_network(self):
        return self.connect_state

    # 修改成动态IP
    def set_dhcp(self):
        self.nic.EnableDHCP()

    # 修改成静态IP
    def set_static(self):
        if self.connect_state == 1:
            return_value = self.nic.EnableStatic(IPAddress=[self.ip], SubnetMask=[self.netmask])
            if return_value[0] == 0:
                self.setState = f"已设置，当前IP{self.ip}"       # 修改成功
            elif return_value[0] == 1:
                self.setState = "未设置"   # 修改失败，没有权限
                InternetDef.intReboot += 1
            else:
                self.setState = "未设置"   # 修改失败，没有权限
                return None
            self.nic.SetGateways(DefaultIPGateway=[self.gateway])
            self.nic.SetDNSServerSearchOrder(DNSServerSearchOrder=[self.dns])

    # 记录数据
    def set_network_info(self, path, nic):
        try:
            with open(path, 'r', encoding="utf-8") as f:
                d = f.read()
                if d == '':
                    s = json.dumps({"code": 0, "server_state": 0, "connect_state": 0, "update_state": "未设置", "ip": "192.168.0.10", "gateway": "192.168.0.1",
                                    "netmask": "255.255.255.0", "dns": "114.114.114.114", "time": time.strftime('%Y-%m-%d %H:%M:%S'), "description": "", "port": self.port})
                    with open(path, 'w', encoding="utf-8") as f:
                        f.write(s)
                else:
                    list = json.loads(d)
                    if self.connect_state == 1:
                        list['ip'] = nic.IPAddress[0]
                        list['gateway'] = nic.DefaultIPGateway[0]
                        list['netmask'] = nic.IPSubnet[0]
                        list['dns'] = nic.DNSServerSearchOrder[0]
                        list['description'] = nic.Description
                        list['connect_state'] = self.connect_state
                        list['update_state'] = self.setState
                        list['port'] = self.port
                    else:
                        list['connect_state'] = self.connect_state
                        list['description'] = "未连接以太网"
                        list['port'] = self.port

                    list['time'] = time.strftime('%Y-%m-%d %H:%M:%S')
                    s = json.dumps(list)
                    with open(path, 'w', encoding="utf-8") as f:
                        f.write(s)
        except BaseException as err:
            pass

    # 返回数据包
    def save_update_return(self):
        # 记录数据
        path = "template/data/x80xsocket.json"
        self.set_network_info(path=path, nic=self.nic)
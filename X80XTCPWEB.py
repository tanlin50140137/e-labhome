import asyncio
import websockets
import json
""""
当前模块是一个　websocket　协议模块，主要用来接收　X80XTCPWEB　模块　发送上来的数据。
当前模块提供　websocket　服务，方便了web开发时，连接本模块即可获取数据。
注意：本模块只为　X80XTCPWEB　模块服务，不做其它用途
打包命令必须是:
pyinstaller --hidden-import=websockets.legacy.auth --hidden-import=websockets.client --hidden-import=websockets.server -F -w -i template/img/logo.ico ./X80XTCPWEB.py
"""

userIndex = {}
async def echo(websocket, path):
    async for maessage in websocket:
        try:
            # 接收一个JSON数据
            data = json.loads(maessage)
            # 用户登录
            if data['type'] == 'login':
                userIndex[data['userid']] = websocket

            # 发给指定用户
            if data['type'] == 'send':
                user_name = userIndex[data['userid']]
                await user_name.send(data['msg'])

            # 发给所有客户端
            if data['type'] == 'all':
                for s in userIndex.values():
                    await s.send(json.dumps(data['msg']))

        except Exception as e:
            print("---异常---：", e)

if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(websockets.serve(echo, 'localhost', 9502))
    asyncio.get_event_loop().run_forever()
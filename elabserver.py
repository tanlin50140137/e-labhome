import asyncio
import websockets
import json

"""
打包命令必须是:
pyinstaller --hidden-import=websockets.legacy.auth --hidden-import=websockets.client --hidden-import=websockets.server -F -w -i template/img/logo.ico ./elabserver.py
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
        except Exception as e:
            print("---异常---：", e)

if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(websockets.serve(echo, 'localhost', 9501))
    asyncio.get_event_loop().run_forever()
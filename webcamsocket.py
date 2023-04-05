"""
这个模块用来给web发送实时视频流的
"""
import asyncio
import websockets

"""
打包命令必须是:
pyinstaller --hidden-import=websockets.legacy.auth --hidden-import=websockets.client --hidden-import=websockets.server -F -w -i template/img/logo.ico ./webcamsocket.py
"""

userIndex = {}


async def echo(websocket, path):
    async for maessage in websocket:
        try:
            # 解析数据
            list = maessage.split(",")

            # 记录监听者
            if list[0] == 'login':
                userIndex[list[1]] = websocket

            # 给监听者发数据
            if list[0] == 'send':
                try:
                    for user_name in userIndex.values():
                        await user_name.send(f"{list[1]},{list[2]}")
                except Exception as e:
                    await websocket.send(list[2])

        except Exception as e:
            await websocket.stop()

if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(websockets.serve(echo, 'localhost', 9855))
    asyncio.get_event_loop().run_forever()
# 火拼俄罗斯方块

> 双人火拼俄罗斯方块

## 内容

``` bash
基于websocket和socket.io实时通讯实现的双人火拼俄罗斯方块

# 两人同时上线才可开始游戏，每个人可以看见两个页面，一个自己的页面，一个对方的页面

#可以同时看见对方和自己的操作和得分情况；

# 操作
键盘的方向键进行操作：上->旋转，左->左移，右->右移，下->下移，空格->坠落；

# 其他功能
1.一次消除两行以上可以为对方增加干扰行
2.一方游戏结束另一方面游戏界面会显示游戏进程和提示
3.对方掉线游戏结束，会显示对方是否掉线
4.有七种方块模式
```

## Build Setup

``` bash
# install nodejs-websocket.js
npm install nodejs-websocket.js

# install socket.io.js
npm install socket.io.js

# build for production with minification
node wsServer.js

```
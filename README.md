# <center>使用说明</center>
## 更改背景:
1. \*将所需背景图片放在 ***[phigros/background-imgs]()*** 下
2. 在 ***[phigros/grounds/play-area.html]()*** **32行** 中将 ***引号中的路径*** 改为自己的图片路径
```javaScript
BACKGROUND.src = "";
```
## 自定义谱面:
1. 音符类型：
    1. ***Tap***:蓝键
    2. ***Drag***:黄键
    3. ***Flick***:粉键
    4. ***Hold***:长条
2. 格式
```javaScript
[time,kind,place,*hight]
```
3. 使用:在 ***[phigros/grounds/play-area.html]()*** 中使用
```javaScript
PUMIAN.push([time,kind,place,*hight],...)
```
的格式

4. 速度(speed)变量:数值越大，速度越快，在 ***[phigros/grounds/play-area.html]()*** 中声明
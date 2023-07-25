/*
音符宽度:100px
音符间隔:50px
可用宽度:900px
每行最多音符:6
*/
const NOUSEWIDTH = 200;
let [combo_cont, point, perfect, good, bad, miss] = Array(6).fill(0);

const POINT_AREA = document.getElementById('point')
POINT_AREA.innerHTML = '000000'

const COMBO_AREA = document.getElementById('combo')

// 初始化判定线
const PANDINGBLOCKS = document.getElementsByClassName('pandingBlock')
for (let i = 0; i < PANDINGBLOCKS.length; i++) {
    PANDINGBLOCKS[i].style.left = NOUSEWIDTH + i * 150 + 'px'
    // 添加判定事件
    PANDINGBLOCKS[i].onclick = function () {
        panding(i)
    }
}

// 监听键盘输入
document.addEventListener('keydown', function (e) {
    if ([1, 2, 3, 4, 5, 6].indexOf(e.keyCode - 48) > -1) {
        panding(e.keyCode - 49)
    }
})

// 时间流动
var time = 0;
let setTime = setInterval('time++', 400 / speed);

// 谱面
const TIMES = [];
const ELEMENTS = [];


// 生成谱面
for (v of PUMIAN) {
    TIMES.push(v[0]);
}

const ELEMENT_POINT = 90000 / (PUMIAN.length);
const COMBO_POINT = 10000 / (PUMIAN.length)

// 音符落下
function elementsDown(e) {
    let y = e.style.top
    y.substring(0, y.length - 2)
    y = parseInt(y) + speed * 5

    e.style.top = y + 'px'
    if (y <= 710 && e.isOnArea) {
        setTimeout(() => {
            elementsDown(e)
        }, 10);
    }

    if (y >= 722 * 0.9) {

        e.style.backgroundColor = 'red'
        e.style.opacity -= 0.04
    }

    if (y > 710) {
        deleteElement(e.place - 1)
        combo_cont = 0
        COMBO_AREA.style.display = 'none'
        e.isOnArea = false

        console.log('Miss')
        miss += 1
    }
}

// 创建音符
let playArea = document.querySelector('#playArea');
let element;
function createYinfu(i) {
    element = document.createElement('div');
    element.className = PUMIAN[i][1];
    element.isOnArea = true
    element.style.left = PUMIAN[i][2] * 150 + NOUSEWIDTH + 'px';
    element.place = PUMIAN[i][2] + 1
    element.style.top = '0px'
    element.style.zIndex = 1
    element.style.opacity = 1
    if (PUMIAN[i].length > 3) {
        element.style.height = PUMIAN[i][3] + 'px';
        element.style.top = - PUMIAN[i][3] + 10 + 'px';
    }

    elementsDown(element)
    playArea.appendChild(element);

    ELEMENTS.push(PUMIAN[i][2])
    PUMIAN.splice(i, 1);
    TIMES.splice(i, 1);

}

setInterval(function () {
    if (TIMES.indexOf(time) > -1) {
        createYinfu(TIMES.indexOf(time));
    }
}, 0);

// 判定事件
function panding(place) {
    playArea_ChildElements = [...playArea.childNodes]
    playArea_ChildElements = playArea_ChildElements.slice(19)
    e = playArea_ChildElements[ELEMENTS.indexOf(place)]
    e_top = e.style.top
    e_top = parseInt(e_top.substring(0, e_top.length - 2))
    // perfect
    if (e_top < 722 * .8 + speed * 5 * 8 && e_top > 722 * .8 - speed * 5 * 8) {
        console.log('Perfect')
        point += ELEMENT_POINT + COMBO_POINT
        combo_cont += 1
        perfect += 1
    }
    // good
    else if (e_top < 722 * .8 + speed * 5 * 16 && e_top > 722 * .8 - speed * 5 * 16) {
        console.log('Good')
        point += ELEMENT_POINT * .65 + COMBO_POINT
        combo_cont += 1
        good += 1
    }
    // bad
    else if (e_top < 722 * .8 + speed * 5 * 32 && e_top > 722 * .8 - speed * 5 * 32) {
        console.log('Bad')
        combo_cont = 0
        COMBO_AREA.style.display = 'none'
        bad += 1
    }
    // 更新连击数和分数
    strPoint = parseInt(point).toString()
    POINT_AREA.innerHTML = '0'.repeat(6 - strPoint.length) + strPoint

    if (combo_cont >= 3) {
        COMBO_AREA.style.display = 'block'
        COMBO_AREA.childNodes[1].innerHTML = combo_cont
    }
    e.isOnArea = false
    deleteElement(e.place - 1)
}

// 移除音符
function deleteElement(place) {
    playArea_ChildElements = [...playArea.childNodes]
    playArea_ChildElements = playArea_ChildElements.slice(19)
    playArea.removeChild(playArea_ChildElements[ELEMENTS.indexOf(place)])
    playArea_ChildElements.splice(ELEMENTS.indexOf(place), 1)
    ELEMENTS.splice(ELEMENTS.indexOf(place), 1)
}
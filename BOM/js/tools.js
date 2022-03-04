// var timer; 不能用全局变量，不然动画之间会互相干扰
function moveDiv(obj,speed,target,attr,callback){
    //防止重复点击
    clearInterval(obj.timer);
    //1.获取最开始的box1.left值，在这个的基础加值。

    var current = parseInt(getComputedStyle(obj, null)[attr]);
    /*
     * 当前Left和目标left对比
     * target为800，current 为0 speed则需要一个正数，递增往右
     * target为0，current 为100 speed 则需要一个负数，递减往左
     * */

    if (current>target){
        //这个表达式加不加=，都行。只判断速度的正负。到达target下面会再次判断
        //在这里判断speed是正数还是负数
        speed=-speed;
    }
    obj.timer= setInterval(function () {
        //每次执行此函数，speed都会加给newValue，直到设定好的target为止。

        var leftValue = getComputedStyle(obj, null)[attr]
        var oldValue = parseInt(leftValue);
        //给新值加speed
        var newValue=oldValue + speed;
        /*
        * 分情况讨论:
        * 1.speed 为正数，整体向右移动，newValue是否小于target,否则永远不能到达
        * 2.speed 为负数,整体向左移动，newValue是否大于target
        * */
        //负数、正数
        //target 如果为0，那么这个条件式最后才会成立。newValue是依次递减的
        if ((speed<0&&newValue<target) || (speed>0&&newValue>target)) {
            newValue=target;
        }

        obj.style[attr] = newValue + "px";

        //当元素移动到0px时，使其停止执行动画
        if(newValue === target){
            //达到目标，关闭定时器
            clearInterval(obj.timer);
            //有回调函数就用没有就拉倒
            callback && callback();
        }

    }, 30);

}

/*
       *
       * 定义一个增加、删除、更改className的函数
       * */
function addClass(obj,cn) {
    //这里采用class同时存在的方式（样式可以互相用，只更改需要改变的地方），可以同时存在但不能有重复的存在
    if(!hasClass(obj,cn)){
        obj.className+=" "+cn;
    }

}

function hasClass(obj,cn) {
    //用正则表达式找到重复的
    var regExp = new RegExp("\\b"+cn+"\\b");
    //返回过去
    return regExp.test(obj.className)
}

function removeClass(obj,cn) {
    //删除classname需配合hasClass()使用
    //用正则表达式找到重复的
    var regExp = new RegExp("\\b"+cn+"\\b");

    //把重复的替换为空串
    obj.className=obj.className.replace(regExp," ");
}

//在写一个升级版的，如果有则删除，没有就添加，更加智能。
//toggle 切换，转换
function toggleClass(obj,cn){
    if (hasClass(obj,cn)){
        //如果已经存在重复的类名了，先删除
        removeClass(obj,cn);
    }else{
        addClass(obj,cn);
    }
}
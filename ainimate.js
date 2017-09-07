
  function animate(tag, obj, fn) {
    clearInterval(tag.timer);//防止加速
    tag.timer = setInterval(function () {
      var flag = true;
      for (var k in obj) {
        //forin执行时，内部的某个k可能是zIndex或者opacity
        //需要检测，单独处理设置方式
        if (k == "opacity") {
          //对透明度进行处理
          //1 透明度的值是小数，小数加减运算具有精度问题，进行位数扩大即可
          var styleName = k;
          //当前透明度值和目标透明度值需要同时扩大指定倍数
          //倍数不要太小，否则运动会不精细(但是可以运动，对实际效果不会有太大影响)
          var target = obj[k] * 1000;
          //2 去除parseInt
          // opacity是c3的属性，在取值时修复了可能为auto的问题
          var current = getStyle(tag, styleName) * 1000;
          var step = (target - current) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          current = current + step;
          //3 设置时再除以相应倍数，并且去除单位
          tag.style[styleName] = current / 1000;
          if (current != target) {
            flag = false;
          }
        } else if (k == "zIndex") {
          //zIndex的值是整数，不需要进行运动操作，直接设置为指定值即可
          tag.style.zIndex = obj["zIndex"];
        } else {
          var styleName = k;
          var target = obj[k];
          var current = parseInt(getStyle(tag, styleName)) || 0;
          var step = (target - current) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          current = current + step;
          tag.style[styleName] = current + "px";
          if (current != target) {
            flag = false;
          }
        }
      }
      
      if (flag) {
        //清除定时器
        clearInterval(tag.timer);
        fn && fn();
        
      }
    }, 20);
  }
  
  
  function getStyle(tag, styleName) {
    if (tag.currentStyle) {
      return tag.currentStyle[styleName];
    } else {
      return getComputedStyle(tag, null)[styleName];
    }
  }
  
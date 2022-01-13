function Time(){
    var time = new Object();

    time.date = new Date();
    time.datedayslist = [];
    time.y  = time.date.getFullYear();
    time.m  = (time.date.getMonth()+1);
    time.d  = time.date.getDate();
    time.h  = time.date.getHours();
    time.i  = time.date.getMinutes();
    time.s  = time.date.getSeconds();
    time.w  = time.date.getDay();

    //判断闰年-方法
    time.leapyear = function(y){return (0==y%4&&((y%100!=0)||(y%400==0)));}
    //本月1号对应星期号
    time.firstweek = function(date){var weekArray = new Array(0,1,2,3,4,5,6);var week = weekArray[new Date(date).getDay()];return week;}
    time.run = function(y,m){
        var list = [];
        var tmp = [];
        time.r  = time.leapyear(y);
        //获取月份的天数
        time.monthday = function(y,m){
          if( m == 2 ){
            if( time.leapyear(y) ){
              return 29;
            }else{
              return 28;
            }
          }else{
            if( m == 4 || m == 6 || m == 9 || m == 11 ){
              return 30;
            }else{
              return 31;
            }
          }
        }
        time.dl  = time.monthday(y,m);
        time.dw  = time.firstweek(y+'-'+m+'-1');
        //前置天数
        if( time.dw > 0 ){
            if( m == 1 ){
                var y = y-1;
                var m = 12;
                var d = time.monthday(y,m);
            }else{
                var m = m-1;
                var d = time.monthday(y,m);
            }
            var a = [];
            //获取前置天数
            for (var i = d; i > (d-time.dw); i--) {a.push(i);}
            for (var i = (a.length-1); i >= 0; i--) {tmp.push({d:a[i],flag:0});}
        }
        //获取日期天数列表
        for(var i=1;i<=time.dl;i++){
            if( time.d == i ){
              tmp.push({d:i,flag:2});
            }else{
              tmp.push({d:i,flag:1});
            }
        }
        //后置天数
        var len = 42-tmp.length;
        for (var i = 1; i <= len; i++) {tmp.push({d:i,flag:0});}
        //月的交点位置
        time.startingpoint = time.dw;
        time.endpoint = tmp.length-len;
        //77天为一组
        list.push(tmp.slice(0,7));
        list.push(tmp.slice(7,14));
        list.push(tmp.slice(14,21));
        list.push(tmp.slice(21,28));
        list.push(tmp.slice(28,35));
        list.push(tmp.slice(35));
        return list;
    }
    time.datedayslist = time.run(time.y,time.m);

    return time;
}

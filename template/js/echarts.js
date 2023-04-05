//动画字体
function pageLoading(){
  var obj = new Object;
  obj._init = function(){
      // 基于准备好的dom，初始化echarts实例
      obj.myChart = echarts.init(document.getElementById('loadingPage'));
      // 指定图表的配置项和数据
      obj.option = {
        graphic: {
          elements: [
            {
              type: 'text',
              left: 'center',
              top: 'center',
              style: {
                text: '环境监控系统',
                fontSize: 80,
                fontWeight: 'bold',
                lineDash: [0, 200],
                lineDashOffset: 0,
                fill: 'transparent',
                stroke: '#89af56',
                lineWidth: 1
              },
              keyframeAnimation: {
                duration: 3000,
                // loop: true,
                keyframes: [
                  {
                    percent: 0.7,
                    style: {
                      fill: 'transparent',
                      lineDashOffset: 200,
                      lineDash: [200, 0]
                    }
                  },
                  {
                    // Stop for a while.
                    percent: 0.8,
                    style: {
                      fill: 'transparent'
                    }
                  },
                  {
                    percent: 1,
                    style: {
                      fill: 'black'
                    }
                  }
                ]
              }
            }
          ]
        }
      };
      // 使用刚指定的配置项和数据显示图表。
      obj.myChart.setOption(obj.option);
    }
    return obj;
}
/*
系统时间
*/
function getSystemTime(){
  var obj = new Object;
  obj.intval = "";
  obj.getInt = function(int){
      var str = int;
      if(str < 10) {
          str = '0'+str;
      }
      return str;
  }
  obj.time = function(){
      var t    = new Date();
      var yyyy = t.getFullYear();
      var mm   = obj.getInt(t.getMonth()+1);
      var dd   = obj.getInt(t.getDate());
      var hh   = obj.getInt(t.getHours());
      var ii   = obj.getInt(t.getMinutes());
      var ss   = obj.getInt(t.getSeconds());
      var ymd = yyyy+'-'+mm+'-'+dd;
      var his = hh+':'+ii+':'+ss;
      $(".systemTimeBoxs").html(ymd+" &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; "+his);
      // setTimeout(obj.time,1000);
  }
  obj._init = function(){
      obj.time();
      // setTimeout(obj.time,1000);
      obj.intval = setInterval(obj.time,1000);
  }
  return obj;
}
/*
element , 元素id
callback , 回调
*/
function button_switch(element,callback){
  var obj = new Object;
  obj.html = document.querySelector('html');
  obj.body = document.querySelector('body');
  obj.btn = document.querySelector(element);
  obj._init = function(callback){
    obj.btn.addEventListener('change', (e) => {
      const {value, checked,} = e.target;
      var color = void(0);
      var backgroundColor = void(0);
      if(checked) {
        color = getComputedStyle(obj.html, ':root').getPropertyValue('--dark-color');
        backgroundColor = getComputedStyle(obj.html, ':root').getPropertyValue('--dark-background-color');
      } else {
        color = getComputedStyle(obj.html, ':root').getPropertyValue('--white-color');
        backgroundColor = getComputedStyle(obj.html, ':root').getPropertyValue('--white-background-color');
      }
      obj.body.style.color = color;
      obj.body.style.backgroundColor = backgroundColor;
      obj.body.setAttribute('style', obj.body.getAttribute('style') + 'color: ${color}; background-color: ${backgroundColor};');
    });
    obj.btn.addEventListener('click', (e) => {
        callback(e.target.checked);
    });
  }
  obj._set = function(flags){
      if ( flags == 'on' ) {
        obj.btn.setAttribute("checked","checked");
      } else if( flags == 'off' ) {
        obj.btn.removeAttribute("checked");
      }
  }
  obj._init(callback);
  return obj;
}
/*
折线图 line , 温湿度心跳检查
element , 元素id
unit , 单位
title , 标题
x , x轴位置值
*/
function temperature_change(element,unit,title,x){
    var obj = new Object;
    obj.data = [];
    obj.xAxisDdate = [];
    for(var i=0;i<10; i++){
        obj.xAxisDdate.push(i);
        obj.data.push(0);
    }
    obj.myChart = echarts.init(document.getElementById(element));
    obj._init = function(){
       obj.option = {
          title: {
            text: '\n\t\t'+title+'\n',
            left: 'left',
            textStyle:{
              color:'#ffab91'
            }
          },
          grid:{
            x:x,
            y2:55
          },
          xAxis: {
            type: 'category',
            data: obj.xAxisDdate,
            axisLabel: {
              color:'#ffab91'
            },
            splitLine: {
              show:true,
              lineStyle: {
                color: '#6e7079'
              }
            }
          },
          yAxis: {
            type: 'value',
            show:true,
            splitLine: {
              lineStyle: {
                color: '#6e7079'
              }
            },
            axisLabel: {
              formatter: '{value} '+unit,
              color:'#ffab91'
            }
          },
          series: [{
              data: obj.data,
              color:['#ffab91'],
              type: 'line',
              showSymbol: false
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        obj.myChart.setOption(obj.option);
    }
    obj._set = function(value) {
        obj.time = new Date();

        var els = obj.data.shift();
        obj.data.push(value);

        var flags = true;
        for(var i = 0 ; i < 10; i++) {
            if ( obj.data[i] == 0 ) {
                flags = false;
                break;
            }
        }
        if ( flags ) {
            obj.data.shift();
            obj.data.push(0);
            var els = obj.data.shift();
            obj.data.push(value);
        }

        obj.xAxisDdate.shift();
        obj.xAxisDdate.push(obj.time.getSeconds());

        obj.myChart.setOption({
            series: [{data: obj.data}],
            xAxis:{data:obj.xAxisDdate}
        });
    }
    obj._init();
    obj.myChart.resize();

    return obj;
}
/*
温度仪表
element , 元素id
max , 仪表最大值
max_splitNumber , 大刻度  计算：max_splitNumber = max / min_splitNumber
min_splitNumber , 小刻度
unit , 值的单位
title , 仪表名称
*/
function temperature_instrument(element,max,max_splitNumber,min_splitNumber,unit,title,flags){
  var obj = new Object;
  obj._init = function(){
      // 基于准备好的dom，初始化echarts实例
      obj.myChart = echarts.init(document.getElementById(element));
      // 指定图表的配置项和数据
      obj.option = {
        series: [{
            type: 'gauge',
            radius: '50%',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: max,
            splitNumber: max_splitNumber,
            itemStyle: {
              color: '#FFAB91'
            },
            progress: {
              show: true,
              width: 30
            },
            pointer: {
              show: false
            },
            axisLine: {
              lineStyle: {
                width: 30
              }
            },
            axisTick: {
              distance: -45,
              splitNumber: min_splitNumber,
              lineStyle: {
                width: 2,
                color: '#999'
              }
            },
            splitLine: {
              distance: -52,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#999'
              }
            },
            axisLabel: {
              distance: -20,
              color: '#999',
              fontSize: 20
            },
            anchor: {
              show: false
            },
            title: {
              show: false
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 18,
              fontWeight: 'bolder',
              formatter: "\n\n\n"+flags+"\n"+title+' ：{value}'+unit,
              color: 'auto'
            },
            data: [{
                value: 0
              }]
          },
          {
            type: 'gauge',
            radius: '50%',
            center: ['50%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: max,
            itemStyle: {
              color: '#FD7347'
            },
            progress: {
              show: true,
              width: 8
            },
            pointer: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{
                value: 0
              }]
          }]
      };
      // 使用刚指定的配置项和数据显示图表。
      obj.myChart.setOption(obj.option);
  }
  obj._set = function(value) {
      obj.myChart.setOption({
        series: [{
            data: [{
                value: value
              }]
          },
          {
            data: [{
                value: value
              }]
          }]
      });
  }
  obj._init();
  return obj;
}
// 发送短信
function sendSMSPost(object) {
    var obj = new Object;
    obj.url = "http://py.e-labhome.cn/sendsms.php?act="+object.url;
    $.post(obj.url, object.data, function(ret){
          object.success(ret);
    });
    return obj;
}

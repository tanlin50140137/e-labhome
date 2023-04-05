// 默认显示首页
$(".rightListBoxs").hide();
$(".warningmessageBoxs").hide();
$(".rightListBoxs:eq(0)").show();

// 初始化echarts
var systemTime = new getSystemTime();
systemTime._init();

var temp_insl1 = new temperature_instrument('temp_inst1', 50, 5, 10, '°C', '温度1','T1');　// 温度1
var humidity1 = new temperature_instrument('humidity1', 100, 5, 20, '%RH', '湿度1','H1');　// 湿度1
var temp_change1 = new temperature_change('temp_inst_tb1','°C', '温度1-°C',60); // 温度1 , 变化
var humidity_change1 = new temperature_change('humidity_tb1','%RH', '湿度1-%RH',80); // 温度1 , 变化

var temp_insl2 = new temperature_instrument('temp_inst2', 50, 5, 10, '°C', '温度2','T2');　// 温度1
var humidity2 = new temperature_instrument('humidity2', 100, 5, 20, '%RH', '湿度2','H2');　// 湿度1
var temp_change2 = new temperature_change('temp_inst_tb2','°C', '温度2-°C',60); // 温度1 , 变化
var humidity_change2 = new temperature_change('humidity_tb2','%RH', '湿度2-%RH',80); // 温度1 , 变化

// 默认环境数据
app._data_List_init(0);

// 监听环境监控
function environmental_monitoring(){
  var flags = 0;
  var ws = new WebSocket("ws://localhost:9502");
  ws.onopen = function(){
     flags = 1;
     // console.log("connect server success.");
     var data = JSON.stringify({type:'login',userid:'alm',msg:''});
     ws.send(data);
  }
  ws.onmessage = function(e){
    var dt = JSON.parse(e.data);
    // console.log("T:"+dt.DataNorm[0], "H:"+dt.DataNorm[1]);
    // console.log(dt);
    // 温度湿度1
    temp_insl1._set(dt.DataNorm[0]);
    temp_change1._set(dt.DataNorm[0]);
    humidity1._set(dt.DataNorm[1]);
    humidity_change1._set(dt.DataNorm[1]);
    // 温度湿度2
    temp_insl2._set(dt.DataNorm[2]);
    temp_change2._set(dt.DataNorm[2]);
    humidity2._set(dt.DataNorm[3]);
    humidity_change2._set(dt.DataNorm[3]);
    // 报警状态
    app._ALM_STATE(dt);
    // 首页报警状态
    app._T1_STATE(dt);
    // 环境数据
    app._data_List_init(dt);
    // 警告信息
    app._warning_message_all(dt);
  }
  ws.onclose = function(e){
      flags = 0;
  }
  ws.onerror = function(e){
     // console.log(e);
     flags = 0;　
  }
  function heartbeat() {
    if (flags) {
        var myDate = new Date();
        var dayTime = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds();
        var data = JSON.stringify({type:'heartbeat',userid:'alm',msg:dayTime});
        ws.send(data);
        setTimeout(heartbeat,20000);
    }
  }
  if (flags) {
      // 发送心跳包
      setTimeout(heartbeat,20000);
  }
}

/*首页关闭按钮*/
var btn_switch = new button_switch('#btn_switch',function(e){
    /*首页开锁*/
    factorial_control_unlocking(1);
});
/* 设备控制 */
var device_btn = new button_switch('#device_btn_switch',function(e){
    console.log(e);
});
var device_btn = new button_switch('#device_btn1_switch',function(e){
    console.log(e);
});
var device_btn = new button_switch('#device_btn2_switch',function(e){
    /*开前门*/
    factorial_control_unlocking(2);
    if (e) {
      app.qianmenimg = './img/frontdoor1.png';
    }
});
var device_btn = new button_switch('#device_btn3_switch',function(e){
    /*后前门*/
    factorial_control_unlocking(3);
    if (e) {
      app.houmenimg = './img/backdoor1.png';
    }
});
var device_btn = new button_switch('#device_btn4_switch',function(e){
    console.log(e);
});
var device_btn = new button_switch('#device_btn5_switch',function(e){
    console.log(e);
});
var device_btn = new button_switch('#device_btn6_switch',function(e){
    console.log(e);
});
var device_btn = new button_switch('#device_btn7_switch',function(e){
    console.log(e);
});
var device_btn = new button_switch('#device_btn8_switch',function(e){
    console.log(e);
});
var device_btn = new button_switch('#device_btn9_switch',function(e){
    console.log(e);
});
var device_btn = new button_switch('#device_btn10_switch',function(e){
    console.log(e);
});
var device_btn = new button_switch('#device_btn11_switch',function(e){
    console.log(e);
});
//设置报警器 device_alm_switch
var device_btn = new button_switch('#device_alm_switch',function(e){
    var h = $(".inputdevBoxs2:eq(0)").val();
    var p = $(".inputdevBoxs2:eq(4)").val();
    host = h;
    port = p;
    var obj = {host:host,port:port};
    if (e) {
      obj.cmd = "cmd;NET:ALARM=ON";
      obj.flag = 1;
      obj.type = 0;
      factorial_cmd(JSON.stringify(obj));
    } else {
      obj.cmd = "cmd;NET:ALARM=OFF";
      obj.flag = 0;
      obj.type = 0;
      factorial_cmd(JSON.stringify(obj));
    }
});
//接收数据
var device_btn = new button_switch('#device_socket_switch',function(e){
    port = $(".inputdevBoxs2:eq(4)").val();
    var obj = {host:host,port:port};
    if (e) {
      if ( app.networkcall[0].connect_state == 1 ) {
          factorial_socket_open(JSON.stringify(obj));
      } else {
          $("#device_socket_switch").removeAttr("checked");
          app.message('error', '未插入网线');
      }
    }else{
        factorial_socket_close(JSON.stringify(obj));
    }
});
/*系统启用项*/
var device_btn = new button_switch('#device_sjhc_switch',function(e){
    var obj = {sysid:1,enable:e==true?1:0};
    if (e) {
        sysid_enable_state.con = 'y';
    } else {
        sysid_enable_state.con = 'n';
    }
    localStorage.setItem("has_mod_flag_enable", JSON.stringify(sysid_enable_state));
    factorial_enable_system(JSON.stringify(obj));
});
var device_btn = new button_switch('#device_bzp_switch',function(e){
    var obj = {sysid:2,enable:e==true?1:0};
    if (e) {
        sysid_enable_state.smr = 'y';
    } else {
        sysid_enable_state.smr = 'n';
    }
    localStorage.setItem("has_mod_flag_enable", JSON.stringify(sysid_enable_state));
    factorial_enable_system(JSON.stringify(obj));
});
var device_btn = new button_switch('#device_ypxt_switch',function(e){
    var obj = {sysid:3,enable:e==true?1:0};
    if (e) {
        sysid_enable_state.sam = 'y';
    } else {
        sysid_enable_state.sam = 'n';
    }
    localStorage.setItem("has_mod_flag_enable", JSON.stringify(sysid_enable_state));
    factorial_enable_system(JSON.stringify(obj));
});
var device_btn = new button_switch('#device_yiqi_switch',function(e){
    var obj = {sysid:4,enable:e==true?1:0};
    if (e) {
        sysid_enable_state.equ = 'y';
    } else {
        sysid_enable_state.equ = 'n';
    }
    localStorage.setItem("has_mod_flag_enable", JSON.stringify(sysid_enable_state));
    factorial_enable_system(JSON.stringify(obj));
});
var device_btn = new button_switch('#device_shuzi_switch',function(e){
    var obj = {sysid:5,enable:e==true?1:0};
    if (e) {
        sysid_enable_state.doc = 'y';
    } else {
        sysid_enable_state.doc = 'n';
    }
    localStorage.setItem("has_mod_flag_enable", JSON.stringify(sysid_enable_state));
    factorial_enable_system(JSON.stringify(obj));
});

// 短信通知
var alm_phone = [
    {enable:0, phone:{sensor1_tel:0, sensor2_tel:0, sensor3_tel:0}},  // 传感器通知
    {enable:0, phone:{ups1_tel:0, ups2_tel:0, ups3_tel:0}},　         // ＵＰＳ通知
    {enable:0, phone:{air1_tel:0, air2_tel:0, air3_tel:0}},　         // 空调通知
    {enable:0, phone:{mpd1_tel:0, mpd2_tel:0, mpd3_tel:0}}　          // 市配电通知
];
if ( localStorage.getItem("alm_phone") == null ) {
    localStorage.setItem("alm_phone", JSON.stringify(alm_phone));
} else {
    alm_phone = JSON.parse(localStorage.getItem("alm_phone"));
}
// 启用按钮
var device_btn = new button_switch('#device_cgq_switch',function(e) {
    alm_phone[0].enable = e == true ? 1 : 0;
});
var device_btn = new button_switch('#device_ups_switch',function(e) {
    alm_phone[1].enable = e == true ? 1 : 0;
});
var device_btn = new button_switch('#device_kongt_switch',function(e) {
    alm_phone[2].enable = e == true ? 1 : 0;
});
var device_btn = new button_switch('#device_spd_switch',function(e) {
    alm_phone[3].enable = e == true ? 1 : 0;
});
// 保持设置
function shortMsgSaveSettings() {
    // 传感器
    alm_phone[0].phone.sensor1_tel = $(".sensor_tel:eq(0)").val()==""?0:$(".sensor_tel:eq(0)").val();
    if ( isNaN(alm_phone[0].phone.sensor1_tel) ) { return app.message('error', '传感器手机号码1不正确'); }
    if ( alm_phone[0].phone.sensor1_tel != 0 && alm_phone[0].phone.sensor1_tel.length != 11 ) { return app.message('error', '传感器手机号码1不正确'); }

    alm_phone[0].phone.sensor2_tel = $(".sensor_tel:eq(1)").val()==""?0:$(".sensor_tel:eq(1)").val();
    if ( isNaN(alm_phone[0].phone.sensor2_tel) ) { return app.message('error', '传感器手机号码2不正确'); }
    if ( alm_phone[0].phone.sensor2_tel != 0 && alm_phone[0].phone.sensor2_tel.length != 11 ) { return app.message('error', '传感器手机号码2不正确'); }

    alm_phone[0].phone.sensor3_tel = $(".sensor_tel:eq(2)").val()==""?0:$(".sensor_tel:eq(2)").val();
    if ( isNaN(alm_phone[0].phone.sensor3_tel) ) { return app.message('error', '传感器手机号码3不正确'); }
    if ( alm_phone[0].phone.sensor3_tel != 0 && alm_phone[0].phone.sensor3_tel.length != 11 ) {return app.message('error', '传感器手机号码3不正确'); }

    // 传感器ups
    alm_phone[1].phone.ups1_tel = $(".ups_tel:eq(0)").val()==""?0:$(".ups_tel:eq(0)").val();
    if ( isNaN(alm_phone[1].phone.ups1_tel) ) { return app.message('error', 'UPS手机号码1不正确'); }
    if ( alm_phone[1].phone.ups1_tel != 0 && alm_phone[1].phone.ups1_tel.length != 11 ) { return app.message('error', 'UPS手机号码1不正确'); }

    alm_phone[1].phone.ups2_tel = $(".ups_tel:eq(1)").val()==""?0:$(".ups_tel:eq(1)").val();
    if ( isNaN(alm_phone[1].phone.ups2_tel) ) { return app.message('error', 'UPS手机号码2不正确'); }
    if ( alm_phone[1].phone.ups2_tel != 0 && alm_phone[1].phone.ups2_tel.length != 11 ) { return app.message('error', 'UPS手机号码2不正确'); }

    alm_phone[1].phone.ups3_tel = $(".ups_tel:eq(2)").val()==""?0:$(".ups_tel:eq(2)").val();
    if ( isNaN(alm_phone[1].phone.ups3_tel) ) { return app.message('error', 'UPS手机号码3不正确'); }
    if ( alm_phone[1].phone.ups3_tel != 0 && alm_phone[1].phone.ups3_tel.length != 11 ) { return app.message('error', 'UPS手机号码3不正确'); }

    // 空调
    alm_phone[2].phone.air1_tel = $(".air_tel:eq(0)").val()==""?0:$(".air_tel:eq(0)").val();
    if ( isNaN(alm_phone[2].phone.air1_tel) ) { return app.message('error', '空调手机号码1不正确'); }
    if ( alm_phone[2].phone.air1_tel != 0 && alm_phone[2].phone.air1_tel.length != 11 ) { return app.message('error', '空调手机号码1不正确'); }

    alm_phone[2].phone.air2_tel = $(".air_tel:eq(1)").val()==""?0:$(".air_tel:eq(1)").val();
    if ( isNaN(alm_phone[2].phone.air2_tel) ) { return app.message('error', '空调手机号码2不正确'); }
    if ( alm_phone[2].phone.air2_tel != 0 && alm_phone[2].phone.air2_tel.length != 11 ) { return app.message('error', '空调手机号码2不正确'); }

    alm_phone[2].phone.air3_tel = $(".air_tel:eq(2)").val()==""?0:$(".air_tel:eq(2)").val();
    if ( isNaN(alm_phone[2].phone.air3_tel) ) { return app.message('error', '空调手机号码3不正确'); }
    if ( alm_phone[2].phone.air3_tel != 0 && alm_phone[2].phone.air3_tel.length != 11 ) { return app.message('error', '空调手机号码3不正确'); }

    // 市配电
    alm_phone[3].phone.mpd1_tel = $(".mpd_tel:eq(0)").val()==""?0:$(".mpd_tel:eq(0)").val();
    if ( isNaN(alm_phone[3].phone.mpd1_tel) ) { return app.message('error', '市配电手机号码1不正确'); }
    if ( alm_phone[3].phone.mpd1_tel != 0 && alm_phone[3].phone.mpd1_tel.length != 11 ) { return app.message('error', '市配电手机号码1不正确'); }

    alm_phone[3].phone.mpd2_tel = $(".mpd_tel:eq(1)").val()==""?0:$(".mpd_tel:eq(1)").val();
    if ( isNaN(alm_phone[3].phone.mpd2_tel) ) { return app.message('error', '市配电手机号码2不正确'); }
    if ( alm_phone[3].phone.mpd2_tel != 0 && alm_phone[3].phone.mpd2_tel.length != 11 ) { return app.message('error', '市配电手机号码2不正确'); }

    alm_phone[3].phone.mpd3_tel = $(".mpd_tel:eq(2)").val()==""?0:$(".mpd_tel:eq(2)").val();
    if ( isNaN(alm_phone[3].phone.mpd3_tel) ) { return app.message('error', '市配电手机号码3不正确'); }
    if ( alm_phone[3].phone.mpd3_tel != 0 && alm_phone[3].phone.mpd3_tel.length != 11 ) { return app.message('error', '市配电手机号码3不正确'); }

    // 保持在本地存储
    localStorage.setItem("alm_phone", JSON.stringify(alm_phone));
    return app.message('success', '保持成功');
}

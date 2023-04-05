// 开启警报器
function open_alms(el, i){
    $(el).show();
    // return setInterval(function(){ $(".wingBoxs:eq("+i+")").toggleClass("red"+i); },1);
    return setInterval(function(){ $(el).toggleClass("red"+i); },1);
}
function enable_alm(i){

      var sys_id = $(".swiper-slide:eq("+i+")").attr("data-index");

      // 试剂耗材系统
      var alarm1 = localStorage.getItem("alarm1"); // 设置放在内页里代表报警数量
      if( alarm1 > 0 ){
          var inter1 = open_alms(".con0", 0); // 报警红点
          if ( sys_id != 2) {
              clearInterval(inter1);
          }
      }
      var alarm2 = localStorage.getItem("alarm2"); // 设置放在内页里代表报警数量
      if( alarm2 > 0 ){
          var inter1 = open_alms(".con1", 1); // 报警红点
          if ( sys_id != 2) {
              clearInterval(inter1);
          }
      }

      // 标准品系统
      var alarm3 = localStorage.getItem("alarm3"); // 设置放在内页里代表报警数量
      if( alarm3 > 0 ){
          var inter2 = open_alms(".smr0", 2); // 报警红点
          if ( sys_id != 3 ) {
              clearInterval(inter2);
          }
      }
      var alarm4 = localStorage.getItem("alarm4"); // 设置放在内页里代表报警数量
      if( alarm4 > 0 ){
          var inter2 = open_alms(".smr1", 3); // 报警红点
          if ( sys_id != 3 ) {
              clearInterval(inter2);
          }
      }

      // 样品系统
      var alarm5 = localStorage.getItem("alarm5"); // 设置放在内页里代表报警数量
      if( alarm5 > 0 ){
          var inter3 = open_alms(".sam0", 4); // 报警红点
          if ( sys_id != 4 ) {
              clearInterval(inter3);
          }
      }

      // 仪器设备系统
      var alarm6 = localStorage.getItem("alarm6"); // 设置放在内页里代表报警数量
      if( alarm6 > 0 ){
          var inter4 = open_alms(".equ0", 5); // 报警红点
          if ( sys_id != 5 ) {
              clearInterval(inter4);
          }
      }
      var alarm7 = localStorage.getItem("alarm7"); // 设置放在内页里代表报警数量
      if( alarm7 > 0 ){
          var inter4 = open_alms(".equ1", 6); // 报警红点
          if ( sys_id != 5 ) {
              clearInterval(inter4);
          }
      }

      // 资料库
      var alarm8 = localStorage.getItem("alarm8"); // 设置放在内页里代表报警数量
      if( alarm8 > 0 ){
          var inter5 = open_alms(".doc0", 7); // 报警红点
          if ( sys_id != 6 ) {
              clearInterval(inter5);
          }
      }
}

/*--------------------------------------------------------------------------------------------------------------------------------------*/

// 切换模块
var swiperIndex = localStorage.getItem("swiperIndex")==null?0:localStorage.getItem("swiperIndex");
var swiper = new Swiper('.swiper-container', {
  effect : 'flip',
  on:{
    slideChange: function(){
        swiperIndex = localStorage.getItem("swiperIndex")==null?0:localStorage.getItem("swiperIndex");
        var has_mod = localStorage.getItem("has_mod");
        var sysname = JSON.parse(has_mod)
        // console.log(sysname);
        // 语音提示
        $(".elabvoice").empty();
        if( swiperIndex != this.activeIndex ){
            var voice = voiceAnnouncements(sysname[this.activeIndex]);
            $(".elabvoice").append(voice);
        }
        // 定位到指定系统
        localStorage.setItem("swiperIndex", this.activeIndex);
        // 打开界面里才开启红点
        enable_alm(this.activeIndex);
    },
  }
});
//移除指定块
function removeSysidMouble() {
    var has_mod_flag = localStorage.getItem("has_mod_flag");  // 黎工后台
    var has_mod_flag_enable = localStorage.getItem("has_mod_flag_enable")　//　物管台设置，优先级比较高
    if ( has_mod_flag_enable == null ) {
        var has_mod = JSON.parse(has_mod_flag);
    } else {
       var has_mod = JSON.parse(has_mod_flag_enable);
    }
    var remove = [];
    if (has_mod.dht == 'n') {
        remove.push(1);
    }
    if (has_mod.con == 'n') {
        remove.push(2);
    }
    if (has_mod.smr == 'n') {
        remove.push(3);
    }
    if (has_mod.sam == 'n') {
        remove.push(4);
    }
    if (has_mod.equ == 'n') {
        remove.push(5);
    }
    if (has_mod.doc == 'n') {
        remove.push(6);
    }
    if (has_mod.vid == 'n') {
        remove.push(7);
    }
    if( remove.length > 0 ){
      swiper.removeSlide(remove); //移除第1个slide
    }
}

// 调用
removeSysidMouble();
swiper.slideTo(swiperIndex, 0, false);//切换到第一个slide，速度为1秒
// setTimeout(removeSysidMouble,1000);

function switching_system(){
    var swiperIndex = localStorage.getItem("swiperIndex")==null?0:localStorage.getItem("swiperIndex");
    swiper.slideTo(swiperIndex-1, 500, false);//切换到第一个slide，速度为1秒
}
function _postion(i){
    var d = i;
    var sysid_enable_state = localStorage.getItem("has_mod_flag_enable")==null?{dht:"y",con:"y",smr:"y",sam:"y",equ:"y",doc:"y",vid:"y"}:JSON.parse(localStorage.getItem("has_mod_flag_enable"));

    var dht = 1; // 环境系统
    var con = 2; // 耗材系统
    var smr = 3; // 标准品系统
    var sam = 4; // 样品系统
    var equ = 5; // 仪器设备
    var doc = 6; // 数字档案
    var vid = 7; // 摄像头监控

    // 模块智能移位法
    if ( sysid_enable_state.dht == 'n' ) {
        con = con - 1;
        smr = smr - 1;
        sam = sam - 1;
        equ = equ - 1;
        doc = doc - 1;
        vid = vid - 7;
    }
    if ( sysid_enable_state.con == 'n' ) {
        smr = smr - 1;
        sam = sam - 1;
        equ = equ - 1;
        doc = doc - 1;
        vid = vid - 7;
    }
    if ( sysid_enable_state.smr == 'n' ) {
        sam = sam - 1;
        equ = equ - 1;
        doc = doc - 1;
        vid = vid - 7;
    }
    if ( sysid_enable_state.sam == 'n' ) {
        equ = equ - 1;
        doc = doc - 1;
        vid = vid - 7;
    }
    if ( sysid_enable_state.equ == 'n' ) {
        doc = doc - 1;
        vid = vid - 7;
    }
    if ( sysid_enable_state.doc == 'n' ) {
        vid = vid - 7;
    }

    // 跳转到指定模块
    if ( d == 1 && sysid_enable_state.dht == 'y' ) {
        localStorage.setItem("swiperIndex", dht); // 定位到指定系统
        enable_alm(dht);// 打开界面里才开启红点
        swiper.slideTo(dht, 0, false);//切换到第一个slide，速度为1秒
    } else if ( d == 2 && sysid_enable_state.con == 'y' ) {
        localStorage.setItem("swiperIndex", con); // 定位到指定系统
        enable_alm(con);// 打开界面里才开启红点
        swiper.slideTo(con, 0, false);//切换到第一个slide，速度为1秒
    } else if ( d == 3 && sysid_enable_state.smr == 'y' ) {
        localStorage.setItem("swiperIndex", smr); // 定位到指定系统
        enable_alm(smr);// 打开界面里才开启红点
        swiper.slideTo(smr, 0, false);//切换到第一个slide，速度为1秒
    } else if ( d == 4 && sysid_enable_state.sam == 'y' ) {
        localStorage.setItem("swiperIndex", sam); // 定位到指定系统
        enable_alm(sam);// 打开界面里才开启红点
        swiper.slideTo(sam, 0, false);//切换到第一个slide，速度为1秒
    } else if ( d == 5 && sysid_enable_state.equ == 'y' ) {
        localStorage.setItem("swiperIndex", equ); // 定位到指定系统
        enable_alm(equ);// 打开界面里才开启红点
        swiper.slideTo(equ, 0, false);//切换到第一个slide，速度为1秒
    } else if ( d == 6 && sysid_enable_state.doc == 'y' ) {
        localStorage.setItem("swiperIndex", doc); // 定位到指定系统
        enable_alm(doc);// 打开界面里才开启红点
        swiper.slideTo(doc, 0, false);//切换到第一个slide，速度为1秒
    }else if ( d == 7 && sysid_enable_state.vid == 'y' ) {
        // localStorage.setItem("swiperIndex", vid); // 定位到指定系统
        //enable_alm(vid);// 打开界面里才开启红点
        // swiper.slideTo(vid, 0, false);//切换到第一个slide，速度为1秒
        factorial_open_external_software("正在打开摄像头监控系统");
    } else {
        app.message('error', '当前系统已经被禁用');
    }
}
function _callback(){
   swiper.slideTo(0, 0, false);//切换到第一个slide，速度为1秒
}
// window.onpopstate = () => { history.go(1); }
// document.documentElement.addEventListener('touchstart',function (event){if(event.touches.length > 1){event.preventDefault();}},{passive:false});
// var lastTouchEnd = 0;
// document.documentElement.addEventListener('touchend',function (event){var now = Date.now();if (now-lastTouchEnd <= 300){event.preventDefault();}lastTouchEnd=now;},{passive:false});

var swiperIndex = localStorage.getItem("swiperIndex")==null?0:localStorage.getItem("swiperIndex");
var swiper = new Swiper('.swiper-container',{
  effect : 'flip',
  on:{
    slideChange: function(){
        swiperIndex = localStorage.getItem("swiperIndex")==null?0:localStorage.getItem("swiperIndex");
        var has_mod = localStorage.getItem("has_mod");
        var sysname = JSON.parse(has_mod)
        // 语音提示
        $(".elabvoice").empty();
        if( swiperIndex != this.activeIndex ){
            var voice = voiceAnnouncements('正在使用'+sysname[this.activeIndex]);
            $(".elabvoice").append(voice);
        }

        // 定位到指定系统
        localStorage.setItem("swiperIndex", this.activeIndex);
    },
  }
});
swiper.slideTo(swiperIndex, 0, false);//切换到第一个slide，速度为1秒
//移除指定块
setTimeout(function(){
  var has_mod_flag = localStorage.getItem("has_mod_flag");
  var has_mod = JSON.parse(has_mod_flag)
  var remove = [];
  if (has_mod.con == 'n') {
      remove.push(0);
  }
  if (has_mod.smr == 'n') {
      remove.push(1);
  }
  if (has_mod.sam == 'n') {
      remove.push(2);
  }
  if (has_mod.equ == 'n') {
      remove.push(3);
  }
  if (has_mod.doc == 'n') {
      remove.push(4);
  }
  if( remove.length > 0 ){
    swiper.removeSlide(remove); //移除第1个slide
  }
},1000);

function switching_system(){
    var swiperIndex = localStorage.getItem("swiperIndex")==null?0:localStorage.getItem("swiperIndex");
    swiper.slideTo(swiperIndex-1, 500, false);//切换到第一个slide，速度为1秒
}

window.onpopstate = () => { history.go(1); }
document.documentElement.addEventListener('touchstart',function (event){if(event.touches.length > 1){event.preventDefault();}},{passive:false});
var lastTouchEnd = 0;
document.documentElement.addEventListener('touchend',function (event){var now = Date.now();if (now-lastTouchEnd <= 300){event.preventDefault();}lastTouchEnd=now;},{passive:false});

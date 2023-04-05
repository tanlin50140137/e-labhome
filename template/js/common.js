var host = "192.168.0.10";
var port = 12388;
var url = 'http://api.e-labhome.com/';
var userId = localStorage.getItem("userId")==null?'6':localStorage.getItem("userId");
var nickname = localStorage.getItem("nickname")==null?'正在登录中...':localStorage.getItem("nickname");
var user_logo = localStorage.getItem("user_logo")==null?'./img/loginimg.png':localStorage.getItem("user_logo");
var libraryOrderExt = 0;
var wifiname='';
var wifipassword = '';
$(function(){
  overload_style();
});
function randomNum(minNum,maxNum){
    var myDate = new Date();
    var time = myDate.getFullYear()+((myDate.getMonth()+1)<10?'0'+(myDate.getMonth()+1):(myDate.getMonth()+1))+(myDate.getDate()<10?'0'+myDate.getDate():myDate.getDate())+(myDate.getHours()<10?'0'+myDate.getHours():myDate.getHours())+(myDate.getMinutes()<10?'0'+myDate.getMinutes():myDate.getMinutes())+(myDate.getSeconds()<10?'0'+myDate.getSeconds():myDate.getSeconds());
    switch(arguments.length){
        case 1:
            return time+parseInt(Math.random()*minNum+1,10);
        break;
        case 2:
            return time+parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
        break;
            default:
                return 0;
            break;
    }
}
function overload_style(){
    var windows = $(window).height();
    var fuzuheight = $(".fuzuheight").height();
    var elaMenu = $(".elaMenu").height();
    var height = windows-(fuzuheight+elaMenu)-35;
    $(".elaOption").css({"height":height+"px"});
    $(".elaOptionList").css({"height":height+"px"});
    var tablesInnerH = height-125;
    $(".tablesInner").css({"height":tablesInnerH+"px"});
    var toolbarBoxs = $(".toolbarBoxs").height();
    var btnListBox = height-(tablesInnerH+toolbarBoxs)-43;
    $(".btnListBox").css({"height":btnListBox+"px"});

    var tablesInner = $(".tablesInner").height();
    var tablesSrech = $(".tablesSrech").height();
    var libraryOrder = tablesInner-tablesSrech-6;
    libraryOrderExt = libraryOrder-25;
    $(".libraryOrder").css({"height":libraryOrder+"px"});

    var elaCardheight = ((height/2)-5);
    $(".elaCard").css({"height":elaCardheight+"px"});
    $(".elaCard2").css({"height":elaCardheight+"px"});
    var elaCardTitle = $(".elaCardTitle").height();
    var elaCardname = elaCardheight-elaCardTitle;
    $(".elaCardname").css({"height":elaCardname+"px"});
    $(".elaCardnameList").css({"height":(elaCardname-13)+"px"});

    $(".elaCard4Img").css({"height":elaCardheight+"px"});

    var upImgBoxs = $(".upImgBoxs").height();
    var dateshowl = $(".dateshowl").height();
    var shownumZi = (upImgBoxs-dateshowl)/7
    $(".shownumZi").css({"height":shownumZi+"px","line-height":shownumZi+"px"});

    var headImg = $(".headImg").height();
    var ridingLantern = $(".ridingLantern").height();
    var elaBoxs = (windows-headImg-ridingLantern)-15;
    $(".elaBoxs").css({"height":elaBoxs+"px"});
    $(".boxNavigationBar").css({"height":(elaBoxs-15)+"px"});

    var elaBoxs = (windows);
    $(".elaBoxs2").css({"height":elaBoxs+"px"});
    var videoShowLiBoxs = (windows/3);
    $(".videoShowLiBoxs").css({"height":videoShowLiBoxs+"px"});
    $(".videoMJPGBoxs").css({"height":videoShowLiBoxs+"px"});
    $(".sadisLayoutBoxs").css({"line-height":videoShowLiBoxs+"px"});
    $(".videoAllBoxs").show();

    wifiname = localStorage.getItem("wifiname")==null?'':localStorage.getItem("wifiname");
    wifipassword = localStorage.getItem("wifipassword")==null?'':localStorage.getItem("wifipassword");
}
//语音播报
function voiceAnnouncements(msg){
    var html  = '<audio autoplay="autoplay">';
        html += '<source src="https://fanyi.baidu.com/gettts?lan=zh&text='+msg+'&spd=5&source=web" type="audio/mpeg">';
        html += "</audio>";
    return html;
}
//WebSocket , type=1表示握手；type=2表示聊天室
function linkSocket(report){
	var obj = new Object;
  obj.state = 0;
	obj.server = "ws://8.135.103.186:9511";
	obj.ws = new WebSocket(obj.server);
	obj.ws.onopen = function(evt) {
		var str = JSON.stringify({
      type:report.type,
			userid:report.userid,
			msg:report.msg
		});
		obj.ws.send(str);
	}
	obj.ws.onmessage = function(evt) {
      obj.state = 1;
		  report.success(evt.data);
	}
	obj.ws.onclose = function(evt) {
      obj.state = 0;
			obj.close();
	}
  obj.ws.onerror = function(){
      obj.state = 0;
  }
	obj.close = function(){
		obj.ws.close();
	}
	obj.send = function(data) {
		var str = JSON.stringify({
      type:data.type,
			userid:data.userid,
			msg:data.msg
		});
		obj.ws.send(str);
	}
	return obj;
}
var updateIndexVersion='',showupdateindex=2;
// 版本更新
function detectVersionUpdates(int){
    // 生成系统唯一的SN号码
    var SN = localStorage.getItem("SN")==null?'':localStorage.getItem("SN");
    if( SN == '' ){
        var snRound = randomNum(100000,999999);
        localStorage.setItem("SN", snRound);
        SN = snRound;
    }
    var msg = app.loading();
    // 通过系统的SN号检查版本号
    $.post('http://py.e-labhome.cn/version.php', {'act':'getUserVersion','sn':SN,'userid':userId} ,function(res){
          app.loading_close(msg);
          var obj = JSON.parse(res);
          //版本ID
          if( obj.code == 1 ){
              var versionId = obj.data[0].id;
              var title = '更新提示';
              if( obj.data[0].status == 1 ){
                  title = '更新提示';
              }else{
                  title = '修复提示';
              }
              var index = layer.confirm(obj.msg+'，请保持网络通畅，否则更新失败，界面无法打开，是否更新？', {
                  title: title,
                  btn: ['立即更新','暂不更新']
              }, function() {
                  layer.close(index);
                  if( obj.data[0].status == 1 ){
                      onFactorial15( userId+'-'+versionId+'-'+SN );
                      // layer.confirm('本次更新时间比较长，请点击进入后台更新，不影响操作。', {
                      //    title:'请选择更新形式',
                      //    btn: ['进入后台更新','暂不更新']
                      // }, function(index){
                      //     showupdateindex = 3;
                      //     layer.msg('进入后台更新，完成后自动重启系统', {icon:16,shade:0.5},function(){
                      //         //进入后台升级版本
                      //         onFactorial15( userId+'-'+versionId+'-'+SN );
                      //     });
                      // },function(index){
                          // showupdateindex = 3;
                          // updateIndexVersion = layer.msg('正在升级版本耗时较长，更新完成后自动重启，不要关闭，请耐心等待！', {
                          //    icon: 16
                          //   ,shade: 0.5
                          //   ,time:'-1'
                          // });
                          // setTimeout(function(){
                          //     //立即升级版本－同步升级
                          //     onFactorial14( userId+'-'+versionId+'-'+SN );
                          // },1000);
                      //     layer.close(index);
                      // });
                  }else{
                      showupdateindex = 3;
                      updateIndexVersion = layer.msg('正在修复，不要关闭，请耐心等待几分钟！', {
                         icon: 16
                        ,shade: 0.5
                        ,time:'-1'
                      });
                      setTimeout(function(){
                          //热更新
                          onFactorial14( userId+'-'+versionId+'-'+SN );
                      },1000);
                  }
              });
          }else{
              if( int == 1 ){
                  layer.msg(obj.msg)
              }
          }
    }).error(function() {
        app.loading_close(msg);
        app.notice_error('post failed', '未连接网络或网络已断开，请检查网络后再重试！');
    });
}
// 监测版本升级
// setTimeout(function(){
//     detectVersionUpdates(showupdateindex);
// },3000);

var kb2='';
var layuiIndex1 = '',kb='', setingIndex='',scanning='';
/*连接wifi*/
function connectwifi(){
    layer.close(layuiIndex1);
    scanning = layer.msg('正在扫描WIFI...',{shift:0.01,icon:16,time:2000},function(){
          onFactorial10('扫描WIFI名称');
    });
}
/*用户设置－停用了*/
function userseting(){
    layer.close(layuiIndex1);
    layer.prompt({
      title: '输入终端权限口令',
      formType: 1,
      offset:'150px',
      btn2:function(){
          kb2.kbhide();
      }
    }, function(pass, index){
        layer.close(index);
        onFactorial11(pass);
        kb2.kbhide();
    });
    $(".layui-layer-input").blur();
    kb2 = new keyboard({
        el:".layui-layer-input",
        x:1.6,
        keyHeight:"5rem",
        fontSize:'1.8rem',
        bottom:"6rem",
        end:function(res,value){
            // console.log(res, value)
            if( res == 'OK' ){
                // layer.msg('完成提交');
            }else{
                // layer.msg('什么都不做');
            }
        }
    });
    kb2.run();
}
function userseting2(){
    var vcodeurl = url;
    layer.close(layuiIndex1);
    layer.prompt({
      title: '账号登录或修改账号',
      formType: 0,
      offset:'150px',
      btn2:function(){
          kb2.kbhide();
      },
      cancel:function() {
          kb2.kbhide();
      }
    }, function(pass, index){
        kb2.kbhide();
        if( pass.length > 11 ){
            layer.msg('手机号码错误！',{offset:'210px'});
            return false;
        }
        if (isNaN(pass)) {
            layer.msg('请输入正确的手机号！',{offset:'210px'});
            return false;
        }
        var vcode = $("#zxr").val();
        if( vcode == '' ){
            layer.msg('请输入密码',{offset:'210px'});
            return false;
        }
        $.post(vcodeurl+'hwapi/basic/get_userid_by_phone_and_pwd',{phone:pass,password:vcode},function(res){
              layer.close(index);
              kb2.kbhide();
              if( res.code == 0 ){
                  layer.msg("登录成功", {shift:-1,time:1000,offset:'210px'}, function () {
                      // 重置用户ID号
                      localStorage.setItem("userId", res.userId);
                      //app.setpicnicname(res.userId);
                      // 刷新页面
                      location.reload();
                  });
              }else{
                  layer.msg(res.msg,{offset:'210px'});
              }
        });
    });
    $(".layui-layer-input").attr({"placeholder":"e-labhome平台账号"});
    // 添加备注框
    $(".layui-layer-content").append('<div style="margin-top:1rem;"><input id= "zxr" type="password" class="layui-layer-input" style="display:inline-block;" placeholder="登录密码"/></div>');
    $(".layui-layer-input").blur();
    $(".showvirifyBoxs:eq(1)").hide();
    kb2 = new keyboard({
        el:".layui-layer-input",
        x:1.6,
        keyHeight:"5rem",
        fontSize:'1.8rem',
        bottom:"6rem",
        end:function(res,value){
            // console.log(res, value)
            if( res == 'OK' ){
                // layer.msg('完成提交');
            }else{
                // layer.msg('什么都不做');
            }
        }
    });
    kb2.run();
}
var newIndexrsyinji = '';
/*获取管理员二维码*/
function Get2D(){
  var urlinfo = url;
  layer.prompt({
    title: '获取管理员身份二维码',
    formType: 0,
    offset:'150px',
    btn2:function(){
        kb2.kbhide();
    }
  }, function(pass, index){
        kb2.kbhide();
        if( pass.length > 11 ){
            layer.msg('手机号码错误！',{offset:'210px'});
            return false;
        }
        if (isNaN(pass)) {
            layer.msg('请输入正确的手机号！',{offset:'210px'});
            return false;
        }
        var vcode = $("#zxr").val();
        if( vcode == '' ){
            layer.msg('请输入验证码',{offset:'210px'});
            return false;
        }
        $.post(urlinfo+'hwapi/basic/get_auth_by_regphone',{userId:userId,phone:pass,vcode:vcode},function(res){
              // console.log(res);
              layer.close(index);
              if( res.code == 0 ){
                  var html = '<div style="margin:0.5rem;">';
                      html += '<div style="height:2.5rem;line-height:2.5rem;padding:0 1rem;font-size:1.2rem;font-weight:700;margin-bottom:1rem;">';
                      html += '管理员身份二维码';
                      html += '</div>';
                      html += '<div class="layui-container" style="width:100%;border-top:1px solid #999999;padding:1rem 0;">';
                      html += '<div class="layui-row" style="margin-bottom:1rem;padding:0 1rem;text-align:center;">';
                      html += '<div class="layuikuang" style="border:2px solid #6fb729;border-radius:0.5rem;overflow:hidden;position:relative;">';
                      html += '<img src="'+res.qrcode_url+'"/>';
                      html += '</div>';
                      html += '</div><input type="hidden" value="'+res.qrcode_url+'" id="qrcodeurl"/>';
                      html += '<div style="padding:0 1rem;"><div onclick="PrintDimensionCode()" style="border:1px solid #6fb729;float:right;padding:0.5rem 1rem;border-radius: 0.2rem;background:#6fb729;color:#FFFFFF;font-size: 1.2rem;">打印二维码</div></div>';
                      html += '</div>';
                      html += '</div>';
                  newIndexrsyinji = layer.open({
                      type: 1,
                      title:false,
                      skin: 'layui-layer-rim', //加上边框
                      area: ['400px', '380px'], //宽高
                      content: html,
                      end:function(){
                          kb2.kbhide();
                      }
                 });
              }else{
                  layer.msg(res.msg,{offset:'210px'});
              }
        });
    });
    $(".layui-layer-input").attr({"placeholder":"输入手机号码"});
    // 添加备注框
    $(".layui-layer-content").append('<div style="margin-top:1rem;"><input id= "zxr" class="layui-layer-input" style="display:inline-block;width:10rem;" placeholder="验证码"/><font onclick="getvirify();" class="showvirifyBoxs" style="display:inline-block;border:1px solid #dedede;padding:0.38rem;float:right;border-radius:0.3rem;">获取验证码</font><font class="showvirifyBoxs" style="display:inline-block;border:1px solid #dedede;padding:0.38rem;float:right;border-radius:0.3rem;width:5rem;text-align: center;"></font></div>');
    $(".layui-layer-input").blur();
    $(".showvirifyBoxs:eq(1)").hide();
    kb2 = new keyboard({
        el:".layui-layer-input",
        x:1.6,
        keyHeight:"5rem",
        fontSize:'1.8rem',
        bottom:"6rem",
        end:function(res,value){
            // console.log(res, value)
            if( res == 'OK' ){
                // layer.msg('完成提交');
            }else{
                // layer.msg('什么都不做');
            }
        }
    });
    kb2.run();
}
function PrintDimensionCode(){
    layer.msg('正在打印...', {icon: 16,shade: 0.01, time:3000}, function(){
          layer.close(newIndexrsyinji);
          onFactorial($("#qrcodeurl").val());
    });
}
var seepIndex = 120, setval = '';
function getTimeVirify(){
    seepIndex--;
    if( seepIndex < 0 ){
        seepIndex = 120;
        $(".showvirifyBoxs:eq(0)").show();
        $(".showvirifyBoxs:eq(1)").hide();
        clearInterval(setval);
    }
    $(".showvirifyBoxs:eq(1)").html(seepIndex);
}
function getvirify(){
    var vcodeurl = url;
    $(".showvirifyBoxs:eq(1)").html(seepIndex);
    $(".showvirifyBoxs:eq(0)").hide();
    $(".showvirifyBoxs:eq(1)").show();
    var phone = $(".layui-layer-input:eq(0)").val();
    if( phone.length > 11 ){
        layer.msg('手机号码错误！',{offset:'210px'});
        return false;
    }
    if (isNaN(phone)) {
        layer.msg('请输入正确的手机号！',{offset:'210px'});
        return false;
    }
    $.post(vcodeurl+'hwapi/basic/send_vcode_for_phone',{userId:userId,phone:phone},function(res){
          if( res.code == 0 ){
              setval = setInterval(function(){
                  getTimeVirify();
              },1000);
          }else{
              layer.msg(res.msg,{offset:'210px'});
          }
    });
}
/*用户管理*/
function userManagement(){
    layer.close(layuiIndex1);
    var html = '<div style="margin:0.5rem;">';

        html += '<div style="height:2.5rem;line-height:2.5rem;padding:0 1rem;font-size:1.2rem;font-weight:700;margin-bottom:1rem;">';
        html += '获取身份二维码，需要扫描管理员身份二维码';
        html += '</div>';
        html += '<div class="layui-container" style="width:100%;border-top:1px solid #999999;padding:1rem 0;">';

        html += '<div class="layui-row" style="margin-bottom:1rem;padding:0 1rem;">';
        html += '<div class="layuikuang" style="border:2px solid #6fb729;height:5rem;border-radius:0.5rem;overflow:hidden;position:relative;">';
        html += '<input type="text" id="listen" placeholder="允许扫描" style="height:5rem;width:100%;text-align:center;font-size:1.2rem;border:none;background:#F0F0F0;color:#666666;"/>';
        html += '</div>';
        html += '</div>';

        html += '<div style="font-size:1.1rem;color:#b5b0b0;padding:0 1rem;">温馨提示：显示绿色边框时允许扫描，显示红色边框时禁止扫描。</div>';

        html += '</div>';
        html += '<div id="userNameBoxs1" style="padding:1rem;color:#213fd0;font-size:1.2rem;display:none;">扫描成功－〉管理员：<span id="userName"></span></div>';
        html += '<div id="userNameBoxs2" style="padding:1rem;color:red;font-size:1.2rem;display:none;"></div>';
        html += '</div>';
    layer.open({
      type: 1,
      title:false,
      skin: 'layui-layer-rim', //加上边框
      area: ['620px', '300px'], //宽高
      content: html
   });
   $("#listen").focus(function(){
        $(".layuikuang").css({"border":"2px solid #6fb729"});
        $(this).attr({"placeholder":"允许扫描"});
   }).blur(function(){
        $(".layuikuang").css({"border":"2px solid red"});
        $(this).attr({"placeholder":"禁止扫描"});
   });
   var csg = new CodeScanningGrab({
     el:"#listen",
     addClick:".layernoneouto",
     addClass:".inputBoxs",
     time:2000,
     success:function(res){
       var id = res;
        //验证管理员身份
        $.ajax({
            url:url+"hwapi/basic/name_bind_qrcode",
            data:{userId:userId,id:id},
            success:function(info){
                var obj = JSON.parse(info);
                if(obj.code == 0 ){
                    $("#userNameBoxs2").hide();
                    $("#userNameBoxs1").show();
                    $("#userName").html(obj.data.name);
                    if( obj.data.status=="ok" ){//是管理员
                        if( obj.data.role == 1 ){
                            layer.msg('正在登录请中...', {icon: 16,shade: 0.01}, function(){
                                  window.location.href="userlist.html"
                            });
                        }else{
                            $("#userNameBoxs1").hide();
                            $("#userNameBoxs2").show();
                            $("#userNameBoxs2").html("你不是管理员，没有登录权限!");
                        }
                    }else{//普通人员
                        $("#userNameBoxs1").hide();
                        $("#userNameBoxs2").show();
                        $("#userNameBoxs2").html("该用户已经被禁用");
                    }
                }else{
                    $("#userNameBoxs1").hide();
                    $("#userNameBoxs2").show();
                    $("#userNameBoxs2").html('非管理员二维码，无法登录');
                }
            },
            error:function(err){
                $("#userNameBoxs2").show();
                $("#userNameBoxs2").html("非管理员二维码，无法登录");
            }
        });
     },
     endClick:function(res){
         console.log(res)
     }
   });
}
/*功能-重载*/
function heavyloadTerminal(){
    layer.confirm('是否重载终端？', {
      title:false,
      btn: ['确定','取消'] //按钮
    }, function(){
      layer.msg('正在重载终端...', {icon: 1},function(){
          location.reload();
      });
    }, function(){});
}
/*功能-重启*/
function restartTerminal(){
    layer.confirm('是否重启终端？', {
      title:false,
      btn: ['确定','取消'] //按钮
    }, function(){
      layer.msg('正在重启终端...', {icon: 1},function(){
          onFactorial2('1');
      });
    }, function(){});
}
/*功能-关闭*/
function closeTerminal(){
  layer.confirm('是否关闭终端？', {
    title:false,
    btn: ['确定','取消'] //按钮
  }, function(){
    layer.msg('正在关闭终端...', {icon: 1},function(){
        onFactorial2('2');
    });
  }, function(){});
}
/*关联系统*/
function associatedSystem(){
    layer.close(layuiIndex1);
    onFactorial16('获取标签打印机驱动列表')
}
/*更新版本*/
function updatedVersion(int){
    layer.close(layuiIndex1);
    detectVersionUpdates(int);
}
/*返回*/
function back(){
    // open("./resetlogin.html","_self");
    window.history.back();
}
/*返回首页*/
function backIndex(){
    window.location.href="resetlogin.html"
}
//获取url传参部分
function getQueryString() {
	var name = window.location.search;
	if( name != undefined )
	{
		var arr = name.split('=');
		var str = arr[1]==undefined?0:arr[1];
		return str;
	}
	else
	{
		return 0;
	}
}
// 关于我们
function aboutus(){
  var html = '<div style="width:900px;height:600px;margin:1.1rem auto 0 auto;"><video width="100%" height="100%" controls autoplay="autoplay">';
        //不支持MP4
        //html += '<source src="https://www.runoob.com/try/demo_source/movie.mp4" type="video/mp4">';
        //pyQt5默认支持ogg格式
        //html += '<source src="KZY-mini2.ogg" type="video/ogg">';
        html += '<source src="./KZY/KZY-mini2.webm" type="video/webm">';
        html += '您的浏览器不支持 video 标签。';
        html += '</video></div>';
    layer.open({
            type: 1,
            title: false,
            skin: 'layui-layer-rim', //加上边框
            area: ['950px', '650px'], //宽高
            content: html
    });
}

// 圆盘特效
var angleStart = -360;
// jquery rotate animation
function rotate(li,d) {
    $({d:angleStart}).animate({d:d}, {
        step: function(now) {
            $(li).css({transform:'rotate('+now+'deg)'}).find('label').css({transform:'rotate('+(-now)+'deg)'});
        },
        duration: 0
    });
}
// show / hide the options
function toggleOptions(s) {
    $(s).toggleClass('open');
    var li = $(s).find('li');
    var deg = $(s).hasClass('half') ? 180/(li.length-1) : 360/li.length;

    for(var i=0; i<li.length; i++) {
        var d = $(s).hasClass('half') ? (i*deg)-90 : i*deg;
        $(s).hasClass('open') ? rotate(li[i], d) : rotate(li[i], angleStart);
    }

    if( $(s).hasClass('open') == true ){
        $(s).find("button").eq(0).hide();
        $(s).find("button").eq(1).show();
    }else{
        $(s).find("button").eq(1).hide();
        $(s).find("button").eq(0).show();
    }
}
// 主页系统设置
function systemsetingcard() {
  layer.prompt({
    title: '输入系统管理口令，并确认',
    offset:'150px',
    formType: 1,
    btn2:function(){
        kb2.kbhide();
    },
    cancel:function() {
        kb2.kbhide();
    }
  },
  function(pass, index){
      layer.close(index);
      kb2.kbhide();

      // 验证密码
      var sysAdminPassowrd = localStorage.getItem("sysAdminPassowrd")==null?'123456':localStorage.getItem("sysAdminPassowrd");
      if ( pass != sysAdminPassowrd ) {
          return layer.alert('输入管理口令有误，请重试~!',{title:"错误提示",offset:'150px'});
      }

      // 设置系统使能
      var html  = '<div style="padding:1rem;">';
          html += '<div style="margin:1rem;">';
          html += '<div onclick="updateSysAdminPassowrd();" style="border:1px solid #00aeef;float:left;padding:0.5rem 1rem;text-align:center;color:#ffffff;font-size:1.4rem;">修改口令</div>';
          html += '<div id="showpassword" style="float:left;padding:0.5rem 1rem;text-align:center;color:#ffffff;font-size:1.2rem;margin-left:0.5rem;color:#ffeb3b;"></div>';
          html += '<div style="clear:both;"></div>';
          html += '</div>';
          html += '<div style="display:flex;flex-wrap:wrap;margin:0.5rem;">';

          html += '<div style="width:25%;background:#001a53;">';
          html += '<div style="border:1px solid #00aeef;margin:0.5rem;padding:0.5rem;border-radius:0.5rem;">';
          // html += '<img src="./img/hcxt_dh.png" style="width:100%;"/>';
          html += '<div style="height:11.7rem;background:url(./img/enve.png) no-repeat;background-position:center;"></div>';
          html += '<div style="height:3rem;margin-top:0.5rem;">';
          html += '<div class="switch" style="left:50%;margin-left:-45px;top:0.4rem;">';
          html += '<input class="switch-checkbox" id="index_btn1_switch" type="checkbox">';
          html += '<label class="switch-label" for="index_btn1_switch">';
          html += '<span class="switch-inner" data-on="ON" data-off="OFF"></span>';
          html += '<span class="switch-switch"></span>';
          html += '</label>';
          html += '</div>';
          html += '</div>';
          html += '<div style="font-size:1.4rem;color:#ffffff;text-align:center;margin-top:0.5rem;">环境监控系统</div>';
          html += '</div>';
          html += '</div>';

          html += '<div style="width:25%;background:#001a53;">';
          html += '<div style="border:1px solid #00aeef;margin:0.5rem;padding:0.5rem;border-radius:0.5rem;">';
          // html += '<img src="./img/hcxt.png" style="width:100%;"/>';
          html += '<div style="height:11.7rem;background:url(./img/enve2.png) no-repeat;background-position:center;"></div>';
          html += '<div style="height:3rem;margin-top:0.5rem;">';
          html += '<div class="switch" style="left:50%;margin-left:-45px;top:0.4rem;">';
          html += '<input class="switch-checkbox" id="index_btn2_switch" type="checkbox">';
          html += '<label class="switch-label" for="index_btn2_switch">';
          html += '<span class="switch-inner" data-on="ON" data-off="OFF"></span>';
          html += '<span class="switch-switch"></span>';
          html += '</label>';
          html += '</div>';
          html += '</div>';
          html += '<div style="font-size:1.4rem;color:#ffffff;text-align:center;margin-top:0.5rem;">试剂耗材管理系统</div>';
          html += '</div>';
          html += '</div>';

          html += '<div style="width:25%;background:#001a53;">';
          html += '<div style="border:1px solid #00aeef;margin:0.5rem;padding:0.5rem;border-radius:0.5rem;">';
          // html += '<img src="./img/hcxt_bzp.png" style="width:100%;"/>';
          html += '<div style="height:11.7rem;background:url(./img/enve3.png) no-repeat;background-position:center;"></div>';
          html += '<div style="height:3rem;margin-top:0.5rem;">';
          html += '<div class="switch" style="left:50%;margin-left:-45px;top:0.4rem;">';
          html += '<input class="switch-checkbox" id="index_btn3_switch" type="checkbox">';
          html += '<label class="switch-label" for="index_btn3_switch">';
          html += '<span class="switch-inner" data-on="ON" data-off="OFF"></span>';
          html += '<span class="switch-switch"></span>';
          html += '</label>';
          html += '</div>';
          html += '</div>';
          html += '<div style="font-size:1.4rem;color:#ffffff;text-align:center;margin-top:0.5rem;">标准品管理系统</div>';
          html += '</div>';
          html += '</div>';

          html += '<div style="width:25%;background:#001a53;">';
          html += '<div style="border:1px solid #00aeef;margin:0.5rem;padding:0.5rem;border-radius:0.5rem;">';
          // html += '<img src="./img/hcxt_yp.png" style="width:100%;"/>';
          html += '<div style="height:11.7rem;background:url(./img/enve4.png) no-repeat;background-position:center;"></div>';
          html += '<div style="height:3rem;margin-top:0.5rem;">';
          html += '<div class="switch" style="left:50%;margin-left:-45px;top:0.4rem;">';
          html += '<input class="switch-checkbox" id="index_btn4_switch" type="checkbox">';
          html += '<label class="switch-label" for="index_btn4_switch">';
          html += '<span class="switch-inner" data-on="ON" data-off="OFF"></span>';
          html += '<span class="switch-switch"></span>';
          html += '</label>';
          html += '</div>';
          html += '</div>';
          html += '<div style="font-size:1.4rem;color:#ffffff;text-align:center;margin-top:0.5rem;">标准品管理系统</div>';
          html += '</div>';
          html += '</div>';

          html += '<div style="width:25%;background:#001a53;">';
          html += '<div style="border:1px solid #00aeef;margin:0.5rem;padding:0.5rem;border-radius:0.5rem;">';
          // html += '<img src="./img/hcxt_yq.png" style="width:100%;"/>';
          html += '<div style="height:11.7rem;background:url(./img/enve5.png) no-repeat;background-position:center;"></div>';
          html += '<div style="height:3rem;margin-top:0.5rem;">';
          html += '<div class="switch" style="left:50%;margin-left:-45px;top:0.4rem;">';
          html += '<input class="switch-checkbox" id="index_btn5_switch" type="checkbox">';
          html += '<label class="switch-label" for="index_btn5_switch">';
          html += '<span class="switch-inner" data-on="ON" data-off="OFF"></span>';
          html += '<span class="switch-switch"></span>';
          html += '</label>';
          html += '</div>';
          html += '</div>';
          html += '<div style="font-size:1.4rem;color:#ffffff;text-align:center;margin-top:0.5rem;">标准品管理系统</div>';
          html += '</div>';
          html += '</div>';

          html += '<div style="width:25%;background:#001a53;">';
          html += '<div style="border:1px solid #00aeef;margin:0.5rem;padding:0.5rem;border-radius:0.5rem;">';
          // html += '<img src="./img/hcxt_shu.png" style="width:100%;"/>';
          html += '<div style="height:11.7rem;background:url(./img/enve6.png) no-repeat;background-position:center;"></div>';
          html += '<div style="height:3rem;margin-top:0.5rem;">';
          html += '<div class="switch" style="left:50%;margin-left:-45px;top:0.4rem;">';
          html += '<input class="switch-checkbox" id="index_btn6_switch" type="checkbox">';
          html += '<label class="switch-label" for="index_btn6_switch">';
          html += '<span class="switch-inner" data-on="ON" data-off="OFF"></span>';
          html += '<span class="switch-switch"></span>';
          html += '</label>';
          html += '</div>';
          html += '</div>';
          html += '<div style="font-size:1.4rem;color:#ffffff;text-align:center;margin-top:0.5rem;">标准品管理系统</div>';
          html += '</div>';
          html += '</div>';

          html += '<div style="width:25%;background:#001a53;position:relative;">';
          html += '<div style="border:1px solid #1e41ea;background:#1e41ea;position:absolute;top:1rem;right:1rem;color:#ffffff;font-size:1.2rem;padding:0.5rem;border-radius:0.2rem;" onclick="appletSettings()">小程序设置</div>'
          html += '<div style="border:1px solid #00aeef;margin:0.5rem;padding:0.5rem;border-radius:0.5rem;">';
          html += '<div style="height:11.7rem;background:url(./img/enve7.png) no-repeat;background-position:center;"></div>';
          html += '<div style="height:3rem;margin-top:0.5rem;">';
          html += '<div class="switch" style="left:50%;margin-left:-45px;top:0.4rem;">';
          html += '<input class="switch-checkbox" id="index_btn7_switch" type="checkbox">';
          html += '<label class="switch-label" for="index_btn7_switch">';
          html += '<span class="switch-inner" data-on="ON" data-off="OFF"></span>';
          html += '<span class="switch-switch"></span>';
          html += '</label>';
          html += '</div>';
          html += '</div>';
          html += '<div style="font-size:1.4rem;color:#ffffff;text-align:center;margin-top:0.5rem;">摄像头监控系统</div>';
          html += '</div>';
          html += '</div>';

          html += '</div>';
          html += '<div style="text-align:center;font-size:1.4rem;color:#ffeb3b;">提示：ON表示启用系统；OFF表示禁用系统</div>';
          html += '</div>';
      layer.open({
              type: 1,
              title: false,
              skin: 'layui-layer-rim', //加上边框
              // area: ['1200px', '650px'], //宽高
              area:['85%','auto'],
              content: html,
              cancel:function() {
                  app.refreshinterface();
              }
      });
      $(".layui-layer-content").css({"background":"#001a53"});
      // 获取默认数据
      factorial_get_enable_system(1);
      // 滑动按钮逻辑
      SysAdminPassowrdJS();
  });
  $(".layui-layer-input").blur();
  kb2 = new keyboard({
      el:".layui-layer-input",
      x:1.6,
      keyHeight:"5rem",
      fontSize:'1.8rem',
      bottom:"6rem",
      end:function(res,value){
          // console.log(res, value)
          if( res == 'OK' ){
              // layer.msg('完成提交');
          }else{
              // layer.msg('什么都不做');
          }
      }
  });
  kb2.run();
}
var videoIndex = '';
// 设置微信视频
function appletSettings(){
  html  = '<div style="padding:1rem;">';
  html += '<div style="border-bottom:1px solid #00aeef;color:#FFFFFF;font-size:1.2rem;margin:0 0.5rem 0.5rem 0.5rem;padding:0 0.5rem 0.5rem 0.5rem;"><b>视频监控－小程序远程访问设置</b></div>';
  //分组
  html += '<div style="display:flex;align-items:center;flex-wrap:nowrap;margin-top:0.5rem;">';
  html += '<div style="width:50%;color:#FFFFFF;font-size:1.4rem;padding:0 1.5rem;"><b>添加网络摄像机协议</b></div>';
  html += '<div style="width:50%;color:#FFFFFF;font-size:1.4rem;padding:0 1.5rem;"><b>内网穿透设置</b></div>';
  html += '</div>';
  html += '<div style="display:flex;flex-wrap:nowrap;margin-top:0.5rem;">';
  html += '<div style="width:50%;">';

  // 1路
  html += '<div style="display:flex;align-items:center;flex-wrap:nowrap;margin-top:0.5rem;">';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:20%;text-align:center;padding:0.5rem;">1路（RTSP）：</div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:60%;"><input type="text" style="width:100%;padding:0.2rem;" class="layui-layer-input stsp_value"/></div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:10%;text-align:center;padding:0.5rem;">';
  html += '<input type="button" value="打开" class="openVdeioButton1" onclick="setRtspVideo(0,1)"/>';
  html += '<input type="button" value="关闭" class="openVdeioButton1"  onclick="setRtspVideo(0,0)" style="display:none;"/>';
  html += '</div>';
  html += '</div>';
  // 2路
  html += '<div style="display:flex;align-items:center;flex-wrap:nowrap;margin-top:0.5rem;">';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:20%;text-align:center;padding:0.5rem;">2路（RTSP）：</div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:60%;"><input type="text" style="width:100%;padding:0.2rem;" class="layui-layer-input stsp_value"/></div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:10%;text-align:center;padding:0.5rem;">';
  html += '<input type="button" value="打开" class="openVdeioButton2" onclick="setRtspVideo(1,1)"/>';
  html += '<input type="button" value="关闭" class="openVdeioButton2"  onclick="setRtspVideo(1,0)" style="display:none;"/>';
  html += '</div>';
  html += '</div>';
  // 3路
  html += '<div style="display:flex;align-items:center;flex-wrap:nowrap;margin-top:0.5rem;">';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:20%;text-align:center;padding:0.5rem;">3路（RTSP）：</div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:60%;"><input type="text" style="width:100%;padding:0.2rem;" class="layui-layer-input stsp_value"/></div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:10%;text-align:center;padding:0.5rem;">';
  html += '<input type="button" value="打开" class="openVdeioButton3" onclick="setRtspVideo(2,1)"/>';
  html += '<input type="button" value="关闭" class="openVdeioButton3"  onclick="setRtspVideo(2,0)" style="display:none;"/>';
  html += '</div>';
  html += '</div>';
  // 4路
  html += '<div style="display:flex;align-items:center;flex-wrap:nowrap;margin-top:0.5rem;">';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:20%;text-align:center;padding:0.5rem;">4路（RTSP）：</div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:60%;"><input type="text" style="width:100%;padding:0.2rem;" class="layui-layer-input stsp_value"/></div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:10%;text-align:center;padding:0.5rem;">';
  html += '<input type="button" value="打开" class="openVdeioButton4" onclick="setRtspVideo(3,1)"/>';
  html += '<input type="button" value="关闭" class="openVdeioButton4"  onclick="setRtspVideo(3,0)" style="display:none;"/>';
  html += '</div>';
  html += '</div>';
  // 5路
  html += '<div style="display:flex;align-items:center;flex-wrap:nowrap;margin-top:0.5rem;">';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:20%;text-align:center;padding:0.5rem;">5路（RTSP）：</div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:60%;"><input type="text" style="width:100%;padding:0.2rem;" class="layui-layer-input stsp_value"/></div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:10%;text-align:center;padding:0.5rem;">';
  html += '<input type="button" value="打开" class="openVdeioButton5" onclick="setRtspVideo(4,1)"/>';
  html += '<input type="button" value="关闭" class="openVdeioButton5"  onclick="setRtspVideo(4,0)" style="display:none;"/>';
  html += '</div>';
  html += '</div>';
  // 6路
  html += '<div style="display:flex;align-items:center;flex-wrap:nowrap;margin-top:0.5rem;">';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:20%;text-align:center;padding:0.5rem;">6路（RTSP）：</div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:60%;"><input type="text" style="width:100%;padding:0.2rem;" class="layui-layer-input2 stsp_value"/></div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:10%;text-align:center;padding:0.5rem;">';
  html += '<input type="button" value="打开" class="openVdeioButton6" onclick="setRtspVideo(5,1)"/>';
  html += '<input type="button" value="关闭" class="openVdeioButton6"  onclick="setRtspVideo(5,0)" style="display:none;"/>';
  html += '</div>';
  html += '</div>';
  // 7路
  html += '<div style="display:flex;align-items:center;flex-wrap:nowrap;margin-top:0.5rem;">';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:20%;text-align:center;padding:0.5rem;">7路（RTSP）：</div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:60%;"><input type="text" style="width:100%;padding:0.2rem;" class="layui-layer-input2 stsp_value"/></div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:10%;text-align:center;padding:0.5rem;">';
  html += '<input type="button" value="打开" class="openVdeioButton7" onclick="setRtspVideo(6,1)"/>';
  html += '<input type="button" value="关闭" class="openVdeioButton7"  onclick="setRtspVideo(6,0)" style="display:none;"/>';
  html += '</div>';
  html += '</div>';
  // 8路
  html += '<div style="display:flex;align-items:center;flex-wrap:nowrap;margin-top:0.5rem;">';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:20%;text-align:center;padding:0.5rem;">8路（RTSP）：</div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:60%;"><input type="text" style="width:100%;padding:0.2rem;" class="layui-layer-input2 stsp_value"/></div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:10%;text-align:center;padding:0.5rem;">';
  html += '<input type="button" value="打开" class="openVdeioButton8" onclick="setRtspVideo(7,1)"/>';
  html += '<input type="button" value="关闭" class="openVdeioButton8"  onclick="setRtspVideo(7,0)" style="display:none;"/>';
  html += '</div>';
  html += '</div>';
  // 9路
  html += '<div style="display:flex;align-items:center;flex-wrap:nowrap;margin-top:0.5rem;">';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:20%;text-align:center;padding:0.5rem;">9路（RTSP）：</div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:60%;"><input type="text" style="width:100%;padding:0.2rem;" class="layui-layer-input2 stsp_value"/></div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:10%;text-align:center;padding:0.5rem;">';
  html += '<input type="button" value="打开" class="openVdeioButton9" onclick="setRtspVideo(8,1)"/>';
  html += '<input type="button" value="关闭" class="openVdeioButton9"  onclick="setRtspVideo(8,0)" style="display:none;"/>';
  html += '</div>';
  html += '</div>';

  html += '</div>';
  html += '<div style="width:50%;">';

  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:25%;text-align:center;padding:0.5rem;"><b>本地服务器</b></div>';
  html += '<div style="display:flex;align-items:center;flex-wrap:nowrap;margin-top:0.5rem;">';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:25%;text-align:center;padding:0.5rem;">内网IP：</div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:55%;"><input type="text" style="width:100%;padding:0.2rem;" class="layui-layer-input frp_value"/></div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:10%;text-align:center;padding:0.5rem;">本地</div>';
  html += '</div>';
  html += '<div style="display:flex;align-items:center;flex-wrap:nowrap;margin-top:0.5rem;">';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:25%;text-align:center;padding:0.5rem;">端口号：</div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:55%;"><input type="text" style="width:100%;padding:0.2rem;" class="layui-layer-input frp_value"/></div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:10%;text-align:center;padding:0.5rem;">本地</div>';
  html += '</div>';

  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:25%;text-align:center;padding:0.5rem;"><b>远程服务器</b></div>';
  html += '<div style="display:flex;align-items:center;flex-wrap:nowrap;margin-top:0.5rem;">';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:25%;text-align:center;padding:0.5rem;">服务器IP：</div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:55%;"><input type="text" style="width:100%;padding:0.2rem;" class="layui-layer-input frp_value"/></div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:10%;text-align:center;padding:0.5rem;">远程</div>';
  html += '</div>';
  html += '<div style="display:flex;align-items:center;flex-wrap:nowrap;margin-top:0.5rem;">';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:25%;text-align:center;padding:0.5rem;">端口号：</div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:55%;"><input type="text" style="width:100%;padding:0.2rem;" class="layui-layer-input frp_value"/></div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:10%;text-align:center;padding:0.5rem;">远程</div>';
  html += '</div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:25%;text-align:center;padding:0.5rem;"><b>映射</b></div>';
  html += '<div style="display:flex;align-items:center;flex-wrap:nowrap;margin-top:0.5rem;">';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:25%;text-align:center;padding:0.5rem;">映射端口：</div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:55%;"><input type="text" style="width:100%;padding:0.2rem;" class="layui-layer-input2 frp_value"/></div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:10%;text-align:center;padding:0.5rem;">远程</div>';
  html += '</div>';
  html += '<div style="display:flex;align-items:center;flex-wrap:nowrap;margin-top:0.5rem;">';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:25%;text-align:center;padding:0.5rem;">绑定域名：</div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:55%;"><input type="text" style="width:100%;padding:0.2rem;" class="layui-layer-input2 frp_value"/></div>';
  html += '<div style="color:#FFFFFF;font-size:1.2rem;width:10%;text-align:center;padding:0.5rem;">远程</div>';
  html += '</div>';
  html += '</div>';
  html += '</div>';

  // 提交按钮
  html += '<div style="border-radius:0.5rem;display:flex;align-items:center;flex-wrap:nowrap;margin-top:0.5rem;float:right;width:35%;height:5rem;margin-botton:0.5rem;">';
  if (app.mapping == 2) {
    html += '<div style="border:1px solid #00aeef;color:#FFFFFF;font-size:1.2rem;width:50%;text-align:center;padding:0.5rem;margin-left:1rem;" onclick="mappingButtonInt(2)">停止映射</div>';
  } else {
    html += '<div style="border:1px solid #666666;color:#666666;font-size:1.2rem;width:50%;text-align:center;padding:0.5rem;margin-left:1rem;">停止映射</div>';
  }
  if (app.mapping == 1) {
    html += '<div style="border:1px solid #00aeef;color:#FFFFFF;font-size:1.2rem;width:50%;text-align:center;padding:0.5rem;margin-left:1rem;" onclick="mappingButtonInt(1);">开始映射</div>';
  } else {
    html += '<div style="border:1px solid #666666;color:#666666;font-size:1.2rem;width:50%;text-align:center;padding:0.5rem;margin-left:1rem;">开始映射</div>';
  }
  html += '<div style="border:1px solid #00aeef;color:#FFFFFF;font-size:1.2rem;width:50%;text-align:center;padding:0.5rem;margin-left:1rem;" onclick="videoSealIn()">保存设置</div>';
  html += '<div style="border:1px solid #00aeef;color:#FFFFFF;font-size:1.2rem;width:50%;text-align:center;padding:0.5rem;margin-left:1rem;" onclick="videoCloseCancel();">取消</div>';
  html += '</div>';

  html += '</div>';
  videoIndex = layer.open({
          type: 1,
          title: false,
          skin: 'layui-layer-rim', //加上边框
          area:['85%','auto'],
          content: html,
          cancel:function() {
              console.log("123456")
          }
  });
  $(".layui-layer-content").css({"background":"#001a53"});
  $(".layui-layer-input").blur();
  $(".layui-layer-input2").blur();
  kb1 = new keyboard({
      el:".layui-layer-input",
      x:1.6,
      keyHeight:"5rem",
      fontSize:'1.8rem',
      bottom:"1rem",
      end:function(res,value){
          // console.log(res, value)
          if( res == 'OK' ){
              // layer.msg('完成提交');
          }else{
              // layer.msg('什么都不做');
          }
      }
  });
  kb1.run();
  kb2 = new keyboard({
      el:".layui-layer-input2",
      x:1.6,
      keyHeight:"5rem",
      fontSize:'1.8rem',
      bottom:"55%",
      end:function(res,value){
          // console.log(res, value)
          if( res == 'OK' ){
              // layer.msg('完成提交');
          }else{
              // layer.msg('什么都不做');
          }
      }
  });
  kb2.run();
  //　获取默认数据
  factorial_get_applet_settings()
}
// 打开摄像机
function setRtspVideo(index, flag) {
    var openstate = JSON.stringify({"index": index, "flag": flag});
    factorial_set_rtsp_video(openstate);
}
// 映射
function mappingButtonInt(int){
  app.mappingfumc(int)
  layer.close(videoIndex);
}
// 保存
function videoSealIn(){
  // 设置摄像机协议
  var stsp_obj = $(".stsp_value");
  var stsp = [];
  for(var i=0; i<stsp_obj.length; i++){
    stsp[i] = stsp_obj.eq(i).val();
  }
  // 内鸩穿透
  var frp_obj = $(".frp_value");
  var frp = [];
  for(var i=0; i<frp_obj.length; i++){
    frp[i] = frp_obj.eq(i).val();
  }
  // 编辑数据包
  var data = {
    "stsp":stsp,
    "frp":frp
  }
  var sendDate = JSON.stringify(data)
  // 提交保存
  factorial_save_applet_settings(sendDate);
}
// 取消
function videoCloseCancel(){
  layer.close(videoIndex);
}

function SysAdminPassowrdJS(){
  var sysid_enable_state = localStorage.getItem("has_mod_flag_enable")==null?{dht:"y",con:"y",smr:"y",sam:"y",equ:"y",doc:"y"}:JSON.parse(localStorage.getItem("has_mod_flag_enable"));
  var device_btn = new button_switch('#index_btn1_switch',function(e){
      var obj = {sysid:1,enable:e==true?1:0};
      if (e) {
          sysid_enable_state.dht = 'y';
      } else {
          sysid_enable_state.dht = 'n';
      }

      // console.log(sysid_enable_state);

      localStorage.setItem("has_mod_flag_enable", JSON.stringify(sysid_enable_state));
      factorial_enable_system(JSON.stringify(obj));
  });
  var device_btn = new button_switch('#index_btn2_switch',function(e){
      var obj = {sysid:2,enable:e==true?1:0};
      if (e) {
          sysid_enable_state.con = 'y';
      } else {
          sysid_enable_state.con = 'n';
      }
      localStorage.setItem("has_mod_flag_enable", JSON.stringify(sysid_enable_state));
      factorial_enable_system(JSON.stringify(obj));
  });
  var device_btn = new button_switch('#index_btn3_switch',function(e){
      var obj = {sysid:3,enable:e==true?1:0};
      if (e) {
          sysid_enable_state.smr = 'y';
      } else {
          sysid_enable_state.smr = 'n';
      }
      localStorage.setItem("has_mod_flag_enable", JSON.stringify(sysid_enable_state));
      factorial_enable_system(JSON.stringify(obj));
  });
  var device_btn = new button_switch('#index_btn4_switch',function(e){
      var obj = {sysid:4,enable:e==true?1:0};
      if (e) {
          sysid_enable_state.sam = 'y';
      } else {
          sysid_enable_state.sam = 'n';
      }
      localStorage.setItem("has_mod_flag_enable", JSON.stringify(sysid_enable_state));
      factorial_enable_system(JSON.stringify(obj));
  });
  var device_btn = new button_switch('#index_btn5_switch',function(e){
      var obj = {sysid:5,enable:e==true?1:0};
      if (e) {
          sysid_enable_state.equ = 'y';
      } else {
          sysid_enable_state.equ = 'n';
      }
      localStorage.setItem("has_mod_flag_enable", JSON.stringify(sysid_enable_state));
      factorial_enable_system(JSON.stringify(obj));
  });
  var device_btn = new button_switch('#index_btn6_switch',function(e){
      var obj = {sysid:6,enable:e==true?1:0};
      if (e) {
          sysid_enable_state.doc = 'y';
      } else {
          sysid_enable_state.doc = 'n';
      }
      localStorage.setItem("has_mod_flag_enable", JSON.stringify(sysid_enable_state));
      factorial_enable_system(JSON.stringify(obj));
  });
  var device_btn = new button_switch('#index_btn7_switch',function(e){
      var obj = {sysid:7,enable:e==true?1:0};
      if (e) {
          sysid_enable_state.vid = 'y';
      } else {
          sysid_enable_state.vid = 'n';
      }
      localStorage.setItem("has_mod_flag_enable", JSON.stringify(sysid_enable_state));
      factorial_enable_system(JSON.stringify(obj));
  });
}
//修改口令
function updateSysAdminPassowrd() {
  layer.prompt({
    title: '输入新口令，并确认',
    formType: 1,
    offset:'150px',
    btn2:function(){
        kb2.kbhide();
    }
  }, function(pass, index){
      layer.close(index);
      kb2.kbhide();
      localStorage.setItem("sysAdminPassowrd",pass);
      layer.msg('修改成功',{offset:'100px'});
      $("#showpassword").html("请记住新口令 : "+pass);
  });
  $(".layui-layer-input").blur();
  kb2 = new keyboard({
      el:".layui-layer-input",
      x:1.6,
      keyHeight:"5rem",
      fontSize:'1.8rem',
      bottom:"6rem",
      end:function(res,value){
          // console.log(res, value)
          if( res == 'OK' ){
              // layer.msg('完成提交');
          }else{
              // layer.msg('什么都不做');
          }
      }
  });
  kb2.run();
}

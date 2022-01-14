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
    $.post('http://py.e-labhome.cn/version.php', {'act':'getUserVersion','userid':userId} ,function(res){
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
              var index = layer.confirm(obj.msg+'，是否更新？', {
                  title: title,
                  btn: ['立即更新']
              }, function() {
                  layer.close(index);
                  if( obj.data[0].status == 1 ){
                      layer.confirm('后台更新：不影响操作，更新完成，自动重启。（推荐）<br/>立即更新：同步更新，不能操作，等待时间长。（不推荐）', {
                         title:'请选择更新形式',
                         btn: ['后台更新','立即更新']
                      }, function(index){
                          showupdateindex = 3;
                          layer.msg('进入后台更新，完成后自动重启系统', {icon:16,shade:0.5},function(){
                              //进入后台升级版本
                              onFactorial15( userId+'-'+versionId );
                          });
                      },function(index){
                          showupdateindex = 3;
                          updateIndexVersion = layer.msg('正在升级版本耗时较长，更新完成后自动重启，不要关闭，请耐心等待！', {
                             icon: 16
                            ,shade: 0.5
                            ,time:'-1'
                          });
                          setTimeout(function(){
                              //立即升级版本－同步升级
                              onFactorial14( userId+'-'+versionId );
                          },1000);
                      });
                  }else{
                      showupdateindex = 3;
                      updateIndexVersion = layer.msg('正在修复，不要关闭，请耐心等待几分钟！', {
                         icon: 16
                        ,shade: 0.5
                        ,time:'-1'
                      });
                      setTimeout(function(){
                          //热更新
                          onFactorial14( userId+'-'+versionId );
                      },1000);
                  }
              });
          }else{
              if( int == 1 ){
                  layer.msg(obj.msg)
              }
          }
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
/*用户设置*/
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

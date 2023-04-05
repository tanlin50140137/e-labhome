// 账号登录
function userLogin(){
   layer.open({
      type:2,
      title:false,
      content:'./layer/html/login.html',
      area:['650px','380px']
   });
}
function localtionUrl(url){
  location.href = url;
}
var kb = '';
var kbcmd = '';
var kbcmd2 = '';
var app = new Vue({
  el: '#Vueapp',
  data: {
    timel:{},
    timeList:[],
    yy:'',
    mm:'',
    vHtml:'',
    picurl:'',
    nicname:'',
    iframe_url:'',
    sysid_enable_state:{},
    titleNames:'环境监控系统',
    tabIndex:0,
    tableList:[],
    networkcall:[],
    connect_state:0,
    unlocking:1,
    mapping:1,
    almurl: 'url(./img/alarmed1.png)',
    t1url: 'url(./img/switchalarm1.png)',
    h1url: 'url(./img/switchalarm1.png)',
    t2url: 'url(./img/switchalarm1.png)',
    h2url: 'url(./img/switchalarm1.png)',
    hwxurl:'url(./img/hongwx1.png)',
    leakurl:'url(./img/waterleakage1.png)',
    smakeurl:'url(./img/smokesensation1.png)',
    frontdoor:'url(./img/frontdoor2.png)',
    backdoor:'url(./img/frontdoor2.png)',
    powerfailure:'url(./img/powerfailure1.png)',
    qianmenimg:'./img/frontdoor2.png',
    houmenimg:'./img/backdoor2.png',
    Alm:'0',
    Tmax:'000.00',
    Tmin:'000.00',
    Hmax:'000.00',
    Hmin:'000.00',
    wmT1:'./img/switchalarm1.png',
    wmH1:'./img/switchalarm1.png',
    wmT2:'./img/switchalarm1.png',
    wmH2:'./img/switchalarm1.png',
    wmT3:'./img/switchalarm1.png',
    wmH3:'./img/switchalarm1.png',
    wmT4:'./img/switchalarm1.png',
    wmH4:'./img/switchalarm1.png',
    wmT5:'./img/switchalarm1.png',
    wmH5:'./img/switchalarm1.png',
    wmT6:'./img/switchalarm1.png',
    wmH6:'./img/switchalarm1.png',
    wmT7:'./img/switchalarm1.png',
    wmH7:'./img/switchalarm1.png',
    wmT8:'./img/switchalarm1.png',
    wmH8:'./img/switchalarm1.png',
    wmT9:'./img/switchalarm1.png',
    wmH9:'./img/switchalarm1.png',
    wmS1:'./img/switchalarm1.png',
    wmS2:'./img/switchalarm1.png',
    wmS3:'./img/switchalarm1.png',
    wmS4:'./img/switchalarm1.png',
    wmS5:'./img/switchalarm1.png',
    wmS6:'./img/switchalarm1.png',
    wmS7:'./img/switchalarm1.png',
    wmS8:'./img/switchalarm1.png',
    wmS9:'./img/switchalarm1.png',
    RS1:'./img/switchalarm1.png',
    RS2:'./img/switchalarm1.png',
    RS3:'./img/switchalarm1.png',
    RS4:'./img/switchalarm1.png',
    wmP1:'./img/switchalarm1.png',
    wmP2:'./img/switchalarm1.png',
    wmP3:'./img/switchalarm1.png',
    wmP4:'./img/switchalarm1.png',
    wmP5:'./img/switchalarm1.png',
    wmP6:'./img/switchalarm1.png',
    wmP7:'./img/switchalarm1.png',
    wmP8:'./img/switchalarm1.png',
    wmP9:'./img/switchalarm1.png',
    wmL1:'./img/switchalarm1.png',
    wmL2:'./img/switchalarm1.png',
    wmL3:'./img/switchalarm1.png',
    wmL4:'./img/switchalarm1.png',
    wmD1:'./img/switchalarm1.png',
    wmD2:'./img/switchalarm1.png',
    wmD3:'./img/switchalarm1.png',
    wmD4:'./img/switchalarm1.png',
    wmF1:'./img/switchalarm1.png',
    UPS1:'./img/switchalarm1.png',
    UPS2:'./img/switchalarm1.png',
    UPS3:'./img/switchalarm1.png',
    UPS4:'./img/switchalarm1.png',
    wmA1:'./img/switchalarm1.png',
    wmA2:'./img/switchalarm1.png',
    wmA3:'./img/switchalarm1.png',
    wmA4:'./img/switchalarm1.png',
    wmM1:'./img/switchalarm1.png',
    wmM2:'./img/switchalarm1.png',
    wmM3:'./img/switchalarm1.png',
    wmM4:'./img/switchalarm1.png',
    wmB1:'./img/switchalarm1.png',
    wmLP1:'./img/switchalarm1.png',
    sms:[
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0},
      {sensor:0, ups:0, air:0, mpd:0}
    ],
    video_page_index:1
  },
  methods:{
    /*设置头像和昵称*/
    setpicnicname:function(userid){
        var p = this;
        // 系统使能状态
        p.sysid_enable_state = localStorage.getItem("has_mod_flag_enable")==null?{dht:"y",con:"y",smr:"y",sam:"y",equ:"y",doc:"y",vid:"y"}:JSON.parse(localStorage.getItem("has_mod_flag_enable"));

        $.ajax({
          url:url+'hwapi/basic/usermeta',
          data:{"userId":userid},
          success:function(res){
              p.getResource(res.phone,res.user_logo);
              p.picurl = '<img class="loginimg" src="'+res.user_logo+'" alt="头像">';
              p.nicname = res.nickname;
              var has_mod = [];
              // 这个独立不需要移除
              has_mod.push('欢迎使用易莱博系统');
              // 这些是黎工的系统
              if (p.sysid_enable_state.dht == 'y') {
                  has_mod.push('正在使用环境监控系统');
              }
              if (res.has_mod.con == 'y') {
                  has_mod.push('正在使用试剂耗材管理系统');
              }
              if (res.has_mod.smr == 'y') {
                  has_mod.push('正在使用标准品管理系统');
              }
              if (res.has_mod.sam == 'y') {
                  has_mod.push('正在使用样品管理系统');
              }
              if (res.has_mod.equ == 'y') {
                  has_mod.push('正在使用仪器设备管理系统');
              }
              if (res.has_mod.doc == 'y') {
                  has_mod.push('正在使用数字化档案管理系统');
              }
              if (res.has_mod.vid == 'y') {
                  has_mod.push('正在使用摄像头监控系统');
              }
              localStorage.setItem("has_mod", JSON.stringify(has_mod));
              localStorage.setItem("has_mod_flag", JSON.stringify(res.has_mod));
          },
          error:function(xhr,status,error){
              p.picurl = '<img class="loginimg" src="./img/loginimg.png" alt="头像">';
              p.nicname = '欢迎登录易莱博系统';
          }
        });
    },
    /*获取资源库的连接*/
    getResource:function(tel, user_logo){
        //console.log(tel);
        //console.log(user_logo);
        var p = this;
        $.ajax({
          url:'http://res.e-labhome.cn/resource/login/login2',
          type:"POST",
          contentType:"application/x-www-form-urlencoded",
          data:{"userid":tel,"portrait":user_logo},
          success:function(res){
              if( res.error == 0 ){
                  p.iframe_url = res.url
              }else{
                  console.log(res.msg);
              }
          },
          error:function(xhr,status,error){
              // p.picurl = '<img class="loginimg" src="./img/loginimg.png" alt="头像">';
              // p.nicname = '欢迎登录易莱博系统';
              console.log(res.msg);
          }
        });
    },
    /*其他功能*/
    utilitiePanel:function(){
        var html = '<div style="margin:0.5rem;">';

            html += '<div style="height:2.5rem;line-height:2.5rem;padding:0 1rem;font-size:1.2rem;font-weight:700;margin-bottom:1rem;">';
            html += '开始';
            html += '</div>';

            html += '<div class="layui-container" style="width:100%;">';

            html += '<div class="layui-row" style="margin-bottom:1rem;">';
            html += '<p onclick="connectwifi();" style="border:1px solid #3789f5;height:4rem;line-height:4rem;text-align:center;font-size:1.4rem;background:#3789f5;color:#ffecec;">连接wifi</p>';
            html += '</div>';

            html += '<div class="layui-row" style="margin-bottom:1rem;">';
            html += '<p onclick="associatedSystem();" style="border:1px solid #3789f5;height:4rem;line-height:4rem;text-align:center;font-size:1.4rem;background:#3789f5;color:#ffecec;">打印设置</p>';
            html += '</div>';

            html += '<div class="layui-row" style="margin-bottom:1rem;">';
            html += '<p onclick="userseting();" style="border:1px solid #3789f5;height:4rem;line-height:4rem;text-align:center;font-size:1.4rem;background:#3789f5;color:#ffecec;">修改账号</p>';
            html += '</div>';

            html += '<div class="layui-row" style="margin-bottom:1rem;">';
            html += '<p onclick="userManagement();" style="border:1px solid #3789f5;height:4rem;line-height:4rem;text-align:center;font-size:1.4rem;background:#3789f5;color:#ffecec;">用户管理</p>';
            html += '</div>';

            html += '<div class="layui-row" style="margin-bottom:1rem;">';
            html += '<p onclick="heavyloadTerminal();" style="border:1px solid #3789f5;height:4rem;line-height:4rem;text-align:center;font-size:1.4rem;background:#3789f5;color:#ffecec;">重启柜台</p>';
            html += '</div>';

            html += '<div class="layui-row" style="margin-bottom:1rem;">';
            html += '<p onclick="restartTerminal();" style="border:1px solid #3789f5;height:4rem;line-height:4rem;text-align:center;font-size:1.4rem;background:#3789f5;color:#ffecec;">重启系统</p>';
            html += '</div>';

            html += '<div class="layui-row" style="margin-bottom:1rem;">';
            html += '<p onclick="closeTerminal();" style="border:1px solid #3789f5;height:4rem;line-height:4rem;text-align:center;font-size:1.4rem;background:#3789f5;color:#ffecec;">关闭系统</p>';
            html += '</div>';

            html += '<div class="layui-row" style="margin-bottom:1rem;">';
            html += '<p onclick="updatedVersion(1);" style="border:1px solid #3789f5;height:4rem;line-height:4rem;text-align:center;font-size:1.4rem;background:#3789f5;color:#ffecec;">更新版本</p>';
            html += '</div>';

            html += '</div>';

            html += '</div>';
        layuiIndex1 = layer.open({
          type: 1,
          // title:'其他功能',
          title:false,
          skin: 'layui-layer-rim', //加上边框
          area: ['620px', '720px'], //宽高
          content: html
        });
        $(".layui-layer-content").css({"background":"#99ccff"});
    },
    login:function(){
        this.handleRender();
        kb = new keyboard({
            el:".ivu-input-default",
            x:1.6,
            keyHeight:"5rem",
            fontSize:'1.8rem',
            bottom:"5rem",
            end:function(res,value){
                // console.log(res, value)
                if( res == 'OK' ){
                    // layer.msg('完成提交');
                }else{
                    // layer.msg('什么都不做');
                }
            }
        });
        kb.run();
    },
    handleRender () {
          this.$Modal.confirm({
                    render: (h) => {
                        return h('div',[
                            h('div',{
                                class: {'loginkuang':true}
                            },[
                              h('div',{
                                  class: {'loginkuangIner':true},
                              }),
                              h('div',{
                                  class: {'loginkuangIner':true},
                              },[
                                h('Input',{
                                    props: {
                                        value: this.value,
                                        autofocus: true,
                                        placeholder: '账号',
                                        class:{'kbkeyClass':true}
                                    }
                                })
                              ])
                            ]),
                            h('div',{
                                class: {'loginkuang':true}
                            },[
                              h('div',{
                                  class: {'loginkuangIner2':true},
                              }),
                              h('div',{
                                  class: {'loginkuangIner2':true},
                              },[
                                h('Input',{
                                    props: {
                                        type:'password',
                                        value: this.value,
                                        autofocus: true,
                                        placeholder: '密码',
                                        class:{'kbkeyClass':true}
                                    }
                                })
                              ])
                            ])
                        ])
                    },
                    onOk:()=>{
                        kb.kbhide();
                    },
                    onCancel:()=>{
                        kb.kbhide();
                    }
        })
    },
    _data_List_init:function(edat){
      if ( edat == 0 ) {
        var d = [];
        var list = ["温度1",0,"°C","温度7",0,"°C","温度13",0,"°C","风速",0,"m/s","直流电压1",0,"V"];
        d.push(list);
        var list = ["湿度1",0,"%RH","湿度7",0,"%RH","湿度13",0,"%RH","风向",0,"m/s","直流电流1",0,"A"];
        d.push(list);

        var list = ["温度2",0,"°C","温度8",0,"°C","温度14",0,"°C","氧气1",0,"PPM","直流电压2",0,"V"];
        d.push(list);
        var list = ["湿度2",0,"%RH","湿度8",0,"%RH","湿度14",0,"%RH","氧气2",0,"PPM","直流电流2",0,"A"];
        d.push(list);

        var list = ["温度3",0,"°C","温度9",0,"°C","温度15",0,"°C","氧气3",0,"PPM","直流电压3",0,"V"];
        d.push(list);
        var list = ["湿度3",0,"%RH","湿度9",0,"%RH","湿度15",0,"%RH","氧气4",0,"PPM","直流电流3",0,"A"];
        d.push(list);

        var list = ["温度4",0,"°C","温度10",0,"°C","温度16",0,"°C","MP2.5",0,"PPM","直流电压4",0,"V"];
        d.push(list);
        var list = ["湿度4",0,"%RH","湿度10",0,"%RH","湿度16",0,"%RH","MP10",0,"PPM","直流电流4",0,"A"];
        d.push(list);

        var list = ["温度5",0,"°C","温度11",0,"°C","温度17",0,"°C","臭氧1",0,"PPM","噪声1",0,"dB"];
        d.push(list);
        var list = ["湿度5",0,"%RH","湿度11",0,"%RH","湿度17",0,"%RH","臭氧2",0,"PPM","噪声2",0,"dB"];
        d.push(list);

        var list = ["温度6",0,"°C","温度12",0,"°C","温度18",0,"°C","水位1",0,"PPM","噪声3",0,"dB"];
        d.push(list);
        var list = ["湿度6",0,"%RH","湿度12",0,"%RH","湿度18",0,"%RH","水位2",0,"PPM","噪声4",0,"dB"];
        d.push(list);

        var list = ["SF6_1",0,"PPM","SF6_2",0,"PPM","SF6_3",0,"PPM","SF6_4",0,"PPM","风压",0,"Pa"];
        d.push(list);
      } else {
          var d = [];
          var list = ["温度1",edat.DataNorm[0],"°C","温度7",0,"°C","温度13",0,"°C","风速",0,"m/s","直流电压1",0,"V"];
          d.push(list);
          var list = ["湿度1",edat.DataNorm[1],"%RH","湿度7",0,"%RH","湿度13",0,"%RH","风向",0,"m/s","直流电流1",0,"A"];
          d.push(list);

          var list = ["温度2",0,"°C","温度8",0,"°C","温度14",0,"°C","氧气1",edat.DataNorm[36],"PPM","直流电压2",0,"V"];
          d.push(list);
          var list = ["湿度2",0,"%RH","湿度8",0,"%RH","湿度14",0,"%RH","氧气2",0,"PPM","直流电流2",0,"A"];
          d.push(list);

          var list = ["温度3",0,"°C","温度9",0,"°C","温度15",0,"°C","氧气3",0,"PPM","直流电压3",0,"V"];
          d.push(list);
          var list = ["湿度3",0,"%RH","湿度9",0,"%RH","湿度15",0,"%RH","氧气4",0,"PPM","直流电流3",0,"A"];
          d.push(list);

          var list = ["温度4",0,"°C","温度10",0,"°C","温度16",0,"°C","MP2.5",edat.DataNorm[52],"PPM","直流电压4",0,"V"];
          d.push(list);
          var list = ["湿度4",0,"%RH","湿度10",0,"%RH","湿度16",0,"%RH","MP10",0,"PPM","直流电流4",0,"A"];
          d.push(list);

          var list = ["温度5",0,"°C","温度11",0,"°C","温度17",0,"°C","臭氧1",0,"PPM","噪声1",0,"dB"];
          d.push(list);
          var list = ["湿度5",0,"%RH","湿度11",0,"%RH","湿度17",0,"%RH","臭氧2",0,"PPM","噪声2",0,"dB"];
          d.push(list);

          var list = ["温度6",0,"°C","温度12",0,"°C","温度18",0,"°C","水位1",0,"PPM","噪声3",0,"dB"];
          d.push(list);
          var list = ["湿度6",0,"%RH","湿度12",0,"%RH","湿度18",0,"%RH","水位2",0,"PPM","噪声4",0,"dB"];
          d.push(list);

          var list = ["SF6_1",0,"PPM","SF6_2",0,"PPM","SF6_3",0,"PPM","SF6_4",0,"PPM","风压",0,"Pa"];
          d.push(list);
      }

      this.tableList = d;
    },
    _tab:function(index,name){
        this.tabIndex = index;
        this.titleNames = name;
        $(".rightListBoxs").hide(),$(".warningmessageBoxs").hide();
        $(".rightListBoxs:eq("+this.tabIndex+")").show();
        /*获取参数设置*/
        if ( index == 6 ) {
            factorial_cmd_read(1);
            kbcmd = new keyboard({
                el:".cmd-x80x-default",
                x:1.6,
                keyHeight:"5rem",
                fontSize:'1.8rem',
                bottom:"27rem",
                end:function(res,value,index){
                    // console.log(res,value,index);
                    if( res == 'OK' ){
                        var flag = $(".inputdevBoxs").eq(index).attr("data-flag");
                        if ( flag == 0 ) {
                            app.broadcastSettings();
                        } else if( flag == 1 ) {
                            // layer.msg('保存设置');
                            app.saveSetingMJ();
                        }
                    }else{
                        // layer.msg('什么都不做');
                    }
                }
            });
            kbcmd.run();
            kbcmd2 = new keyboard({
                el:".cmd-x80x-default2",
                x:1.6,
                keyHeight:"5rem",
                fontSize:'1.8rem',
                bottom:"5.5rem",
                end:function(res,value){
                    // console.log(res, value)
                    if( res == 'OK' ){
                        app.networkSettings();
                    }else{
                        // layer.msg('什么都不做');
                    }
                }
            });
            kbcmd2.run();
        } else if ( index == 7 ) {
            /*打开界面获取默认数据*/
            factorial_get_settings(1);
            /*获取本地存储并设置*/
            this.sms_settings();

            var ip = $(".inputdevBoxs3:eq(4)").val();
            var port = $(".inputdevBoxs3:eq(2)").val();
            $("#showipandport4").html($(".inputdevBoxs3:eq(3)").val()+":"+port);
            $("#showipandport3").html(ip+":"+port);
            $("#showipandport2").html(ip+":"+$(".inputdevBoxs3:eq(5)").val());
            $("#showipandport1").html($(".inputdevBoxs3:eq(0)").val()+":"+$(".inputdevBoxs3:eq(1)").val());
            app.mapping = localStorage.getItem("mapping")==null?'1':localStorage.getItem("mapping");
            kbcmd = new keyboard({
                el:".cmd-x80x-default3",
                x:1.6,
                keyHeight:"5rem",
                fontSize:'1.8rem',
                bottom:"5.5rem",
                end:function(res,value,index){
                    // console.log(res,value,index);
                    if( res == 'OK' ){
                        app.tcpipsavesettings();
                    }else{
                        // layer.msg('什么都不做');
                    }
                }
            });
            kbcmd.run();
        }
        kbcmd2 = new keyboard({
            el:".cmd-x80x-default4",
            x:1.6,
            keyHeight:"5rem",
            fontSize:'1.8rem',
            bottom:"27rem",
            end:function(res,value){
                // console.log(res, value)
                if( res == 'OK' ){

                }else{
                    // layer.msg('什么都不做');
                }
            }
        });
        kbcmd2.run();
        // else if ( index == 8 ) {
        //     factorial_get_enable_system(1);
        // }
    },
    // 默认设置数据
    sms_settings:function(){
        var alm_phone = JSON.parse(localStorage.getItem("alm_phone"));
        // 按钮
        if ( alm_phone[0].enable == 1 ) {
            $("#device_cgq_switch").attr("checked","checked");
        }
        if ( alm_phone[1].enable == 1 ) {
            $("#device_ups_switch").attr("checked","checked");
        }
        if ( alm_phone[2].enable == 1 ) {
            $("#device_kongt_switch").attr("checked","checked");
        }
        if ( alm_phone[3].enable == 1 ) {
            $("#device_spd_switch").attr("checked","checked");
        }
        // 传感觉器
        $(".sensor_tel:eq(0)").val(alm_phone[0].phone.sensor1_tel);
        $(".sensor_tel:eq(1)").val(alm_phone[0].phone.sensor2_tel);
        $(".sensor_tel:eq(2)").val(alm_phone[0].phone.sensor3_tel);
        // ups
        $(".ups_tel:eq(0)").val(alm_phone[1].phone.ups1_tel);
        $(".ups_tel:eq(1)").val(alm_phone[1].phone.ups2_tel);
        $(".ups_tel:eq(2)").val(alm_phone[1].phone.ups3_tel);
        // 空调
        $(".air_tel:eq(0)").val(alm_phone[2].phone.air1_tel);
        $(".air_tel:eq(1)").val(alm_phone[2].phone.air2_tel);
        $(".air_tel:eq(2)").val(alm_phone[2].phone.air3_tel);
        // 市配电
        $(".mpd_tel:eq(0)").val(alm_phone[3].phone.mpd1_tel);
        $(".mpd_tel:eq(1)").val(alm_phone[3].phone.mpd2_tel);
        $(".mpd_tel:eq(2)").val(alm_phone[3].phone.mpd3_tel);
    },
    /*
      短信通知
      flag: , 1=温湿度;2=ups,3=空调;4=市配电
      int , 第几个传感器
      dtype , 传感器名称
      note , 异常状态
      brief , 异常原因
      remarks , 备注位置
    */
    send_sms_msg:function(flag, int, dtype, note, brief, remarks){
        // 当前时间
        var now = Math.ceil( (new Date().getTime()) / 1000 );

        // 获取保持的设置信息
        var alm_phone = JSON.parse(localStorage.getItem("alm_phone"));

        // console.log(this.sms);

        // 传感觉器 1 表示　发送短信 , 每隔一小时发一条短信
        if ( flag == 1 ) {
            // console.log(now - this.sms[int].sensor);
            if ( alm_phone[0].enable == 1 && (now - this.sms[int].sensor) >= 3600 ){
                this.sms[int].sensor = now;
                // console.log("传感觉器发出短信");
                // 传感觉器发出短信
                var tel = [alm_phone[0].phone.sensor1_tel, alm_phone[0].phone.sensor2_tel, alm_phone[0].phone.sensor3_tel];
                for (var i = 0; i < tel.length; i++ ) {
                      if ( tel[i] > 0 ) {
                          new sendSMSPost({
                              url:'send_sms',
                              data:{
                                  phone: tel[i],
                                  dtype: dtype,
                                  note: note,
                                  brief: brief,
                                  remarks: remarks
                              },
                              success:function(ret){}
                          });
                      }
                }
            }
        }
        // ups  1 表示　发送短信 , 每隔一小时发一条短信
        else if( flag == 2 ) {
            if ( alm_phone[1].enable == 1 && (now - this.sms[int].ups) >= 3600 ){
                // ups发出短信
                // console.log("ups发出短信");
                this.sms[int].ups = now;
                var tel = [alm_phone[1].phone.ups1_tel, alm_phone[1].phone.ups2_tel, alm_phone[1].phone.ups3_tel];
                for (var i = 0; i < tel.length; i++ ) {
                    if ( tel[i] > 0 ) {
                        new sendSMSPost({
                            url:'send_sms',
                            data:{
                                phone: tel[i],
                                dtype: dtype,
                                note: note,
                                brief: brief,
                                remarks: remarks
                            },
                            success:function(ret){}
                        });
                    }
                }
            }
        }
        // 空调  1 表示　发送短信 , 每隔一小时发一条短信
        else if( flag == 3 ) {
            if ( alm_phone[2].enable == 1 && (now - this.sms[int].air) >= 3600 ){
                // 空调发出短信
                // console.log("空调发出短信");
                this.sms[int].air = now;
                var tel = [alm_phone[2].phone.air1_tel, alm_phone[2].phone.air2_tel, alm_phone[2].phone.air3_tel];
                for (var i = 0; i < tel.length; i++ ) {
                    if ( tel[i] > 0 ) {
                        new sendSMSPost({
                            url:'send_sms',
                            data:{
                                phone: tel[i],
                                dtype: dtype,
                                note: note,
                                brief: brief,
                                remarks: remarks
                            },
                            success:function(ret){}
                        });
                    }
                }
            }
        }
        // 市配电  1 表示　发送短信 , 每隔一小时发一条短信
        else if( flag == 4 ) {
            if ( alm_phone[3].enable == 1 && (now - this.sms[int].mpd) >= 3600 ){
                // 市配电发出短信
                // console.log("市配电发出短信");
                this.sms[int].mpd = now;
                var tel = [alm_phone[3].phone.mpd1_tel, alm_phone[3].phone.mpd2_tel, alm_phone[3].phone.mpd3_tel];
                for (var i = 0; i < tel.length; i++ ) {
                    if ( tel[i] > 0 ) {
                        new sendSMSPost({
                            url:'send_sms',
                            data:{
                                phone: tel[i],
                                dtype: dtype,
                                note: note,
                                brief: brief,
                                remarks: remarks
                            },
                            success:function(ret){}
                        });
                    }
                }
            }
        }
    },
    loading:function(){
        var msg = this.$Message.loading({
              content: 'Loading...',
              duration: 0
        });
        return msg;
    },
    loading_close:function(msg){
        setTimeout(msg, 1);
    },
    notice_error:function(title,desc) {
        this.$Notice.error({
              title: title,
              desc: desc
        });
    },
    /*保存内网穿透*/
    tcpipsavesettings:function(){
        var innerIP = $(".inputdevBoxs3:eq(0)").val();
        if ( innerIP == '' ) {
            this.message('error', '内网IP地址不能留空');
            return false;
        }
        var innerport = $(".inputdevBoxs3:eq(1)").val();
        if ( innerport == '' ) {
            this.message('error', '内网端口号不能留空');
            return false;
        }
        var remoteport = $(".inputdevBoxs3:eq(2)").val();
        if ( remoteport == '' ) {
            this.message('error', '映射端口号不能留空');
            return false;
        }
        var url = $(".inputdevBoxs3:eq(3)").val();
        var serverIP = $(".inputdevBoxs3:eq(4)").val();
        if ( serverIP == '' ) {
            this.message('error', '服务器IP不能留空');
            return false;
        }
        var serverport = $(".inputdevBoxs3:eq(5)").val();
        if ( serverport == '' ) {
            this.message('error', '服务器端口号不能留空');
            return false;
        }
        var strobj = JSON.stringify({
            innerIP:innerIP,
            innerport:innerport,
            remoteport:remoteport,
            url:url,
            serverIP:serverIP,
            serverport:serverport
        });
        factorial_save_settings(strobj);
    },
    /*映射地址*/
    mappingfumc:function(int){
        if (int == 1) {
            this.mapping = 2
        } else {
            this.mapping = 1
        }
        /*后台功能*/
        factorial_mapping_start(int);
    },
    saveSetingMJ:function(){
        var server_url = $(".menjinInputboxs:eq(0)").val();
        if ( server_url == '' ) {
            this.message('error', '服务器地址不能留空');
            return false;
        }
        var device_num1 = $(".menjinInputboxs:eq(1)").val();
        if ( device_num1 == '' ) {
            this.message('error', '前门设备号不能留空');
            return false;
        }
        var device_num2 = $(".menjinInputboxs:eq(2)").val();
        if ( device_num2 == '' ) {
            this.message('error', '后门设备号不能留空');
            return false;
        }
        var obj = {server_url:server_url,device_num1:device_num1,device_num2:device_num2};
        factorial_save_menjin(JSON.stringify(obj));
    },
    set_factorial_cmd_value:function(obj){
        /*物品管台*/
        if(obj.server_state == 1){
            $("#device_socket_switch").attr("checked","checked");
        } else {
            $("#device_socket_switch").removeAttr("checked");
        }
        $(".inputdevBoxs2:eq(0)").val(obj.ip);
        $(".inputdevBoxs2:eq(1)").val(obj.gateway);
        $(".inputdevBoxs2:eq(2)").val(obj.netmask);
        $(".inputdevBoxs2:eq(3)").val(obj.dns);
        $(".inputdevBoxs2:eq(4)").val(obj.port);
        /*操作消息*/
        var list = {
            time:obj.time,
            connect_state:obj.connect_state,
            update_state:obj.update_state,
            server_state:obj.server_state
        }
        this.networkCallback(list);
        /*主机数据*/
        this.Alm = obj.Alm;
        this.Tmax = obj.Tmax;
        this.Tmin = obj.Tmin;
        this.Hmax = obj.Hmax;
        this.Hmin = obj.Hmin;
        $(".inputdevBoxs:eq(0)").val(this.Tmax);
        $(".inputdevBoxs:eq(1)").val(this.Tmin);
        $(".inputdevBoxs:eq(2)").val(this.Hmax);
        $(".inputdevBoxs:eq(3)").val(this.Hmin);
        /*添加或删除属性*/
        if ( this.Alm == 1 ) {
           $("#device_alm_switch").attr("checked","checked");
        } else {
           $("#device_alm_switch").removeAttr("checked");
        }
        /*门禁数据*/
        $(".menjinInputboxs:eq(0)").val(obj.server_url);
        $(".menjinInputboxs:eq(1)").val(obj.device_num1);
        $(".menjinInputboxs:eq(2)").val(obj.device_num2);
    },
    /*设置网卡为动态IP*/
    dynamic_get_ip:function() {
        /*先关闭接收数据*/
        port = $(".inputdevBoxs2:eq(4)").val();
        var obj = {host:host,port:port};
        factorial_socket_close(JSON.stringify(obj));
        /*再设置为动态ip*/
        setTimeout(function(){
            factorial_dynamic_setip(1);
        },3000);
    },
    /*刷新界面*/
    refreshinterface:function(){
        window.location.reload();
    },
    /*纠错*/
    stringError:function(str,arg){
        var l = str.split('.');
        var s = '';
        var e = '';
        var f = '';

        /*符号*/
        if ( l[0].indexOf('-') > -1 ) {
            f = '-';
            /*去除符号*/
            s = l[0].replace(/-/g,'');
        } else if ( l[0].indexOf('+') > -1 ) {
            f = '+';
            /*去除符号*/
            s = l[0].replace(/+/g,'');
        } else {
            f = '+';
            s = l[0];
        }

        /*区分*/
        f = arg=='T'?f:'';

        /*纠错*/
        if ( s.length == 1 ) {
            s = f+'00'+s;
        } else if( s.length == 2 ) {
            s = f+'0'+s;
        }else if( s.length == 3 ) {
            s = f+s;
        } else {
            s = f+s.substring(0,3);
        }

        /*小数部分*/
        if (l[1] == undefined || l[1] == "") {
            e = '00';
        } else {
            e = l[1];
            if ( l[1].length < 2 ) {
                e = l[1]+'0';
            } else if( l[1].length > 2 ) {
                e = l[1].substring(0,2);
            }
        }

        return s+'.'+e;
    },
    networkSettings:function(){
      var ip = $(".inputdevBoxs2:eq(0)").val();
      if ( ip == '' ) {
          this.message('error', 'IP地址不能留空');
          return false;
      }
      var ipl = ip.split('.');
      if ( ipl.length != 4 ) {
          this.message('error', 'IP地址输入格式错误');
          return false;
      }
      var gateway = $(".inputdevBoxs2:eq(1)").val();
      if ( gateway == '' ) {
          this.message('error', '网关不能留空');
          return false;
      }
      var gatewayl = gateway.split('.');
      if ( gatewayl.length != 4 ) {
          this.message('error', '网关输入格式错误');
          return false;
      }
      var mask = $(".inputdevBoxs2:eq(2)").val();
      if ( mask == '' ) {
          this.message('error', '子网掩码不能留空');
          return false;
      }
      var maskl = mask.split('.');
      if ( maskl.length != 4 ) {
          this.message('error', '子网掩码输入格式错误');
          return false;
      }
      var dns = $(".inputdevBoxs2:eq(3)").val();
      if ( dns == '' ) {
          this.message('error', 'DNS不能留空');
          return false;
      }
      var dnsl = dns.split('.');
      if ( dnsl.length != 4 ) {
          this.message('error', 'DNS输入格式错误');
          return false;
      }
      var port = $(".inputdevBoxs2:eq(4)").val();
      if ( port == '' ) {
          this.message('error', '端口号不能留空');
          return false;
      }
      /*发送到后台处理*/
      var obj = {ip:ip,gateway:gateway,netmask:mask,dns:dns,port:port};
      factorial_set_network(JSON.stringify(obj));
    },
    networkCallback:function(obj){
        if(obj.server_state == 1){
            $("#device_socket_switch").attr("checked","checked");
        }else{
            $("#device_socket_switch").removeAttr("checked");
        }
        var a = [obj];
        var b = this.networkcall;
        b.forEach((item, i) => {
            a.push(item);
        });
        this.connect_state = obj.connect_state;
        this.networkcall = a;
    },
    devtabclen:function(){
      this.networkcall = [];
    },
    select_connect:function(){
      $(".devlayerBoxs").show();
      setTimeout(function(){
          var obj = {ip:"192.168.0.10",gateway:"192.168.0.1",netmask:"255.255.255.0",dns:"114.114.114.114"};
          factorial_refresh_network(JSON.stringify(obj));
          $(".devlayerBoxs").hide();
      },3000);
    },
    /*广播设置网络设置温湿度范围*/
    broadcastSettings:function(){
        var obj = {host:host,port:port};

        /*输入*/
        this.Tmax = $(".inputdevBoxs:eq(0)").val();
        if ( this.Tmax == '' ) {
          this.message('error', '温度上限值不能留空');
          return false;
        }
        if ( isNaN(this.Tmax) ) {
            this.message('error', '温度上限应为正数值或负数值大小不能大于999');
            return false;
        }
        this.Tmin = $(".inputdevBoxs:eq(1)").val();
        if ( this.Tmin == '' ) {
          this.message('error', '温度下限值不能留空');
          return false;
        }
        if ( isNaN(this.Tmin) ) {
            this.message('error', '温度下限应为正数值或负数值大小不能大于999');
            return false;
        }
        this.Hmax = $(".inputdevBoxs:eq(2)").val();
        if ( this.Hmax == '' ) {
          this.message('error', '湿度上限值不能留空');
          return false;
        }
        if ( isNaN(this.Hmax) ) {
            this.message('error', '湿度上限应为正数值大小不能大于999');
            return false;
        }
        this.Hmin = $(".inputdevBoxs:eq(3)").val();
        if ( this.Hmin == '' ) {
          this.message('error', '湿度下限值不能留空');
          return false;
        }
        if ( isNaN(this.Hmin) ) {
            this.message('error', '湿度下限应为正数值大小不能大于999');
            return false;
        }

        /*纠错*/
        var Tmax = this.stringError(this.Tmax,'T');
        var Tmin = this.stringError(this.Tmin,'T');
        var Hmax = this.stringError(this.Hmax,'H');
        var Hmin = this.stringError(this.Hmin,'H');

        /*下发命令*/
        obj.cmd = "cmd;NET:T="+Tmin+"---"+Tmax+",H="+Hmin+"---"+Hmax;
        obj.Tmax = this.Tmax;
        obj.Tmin = this.Tmin;
        obj.Hmax = this.Hmax;
        obj.Hmin = this.Hmin;
        obj.type = 1;
        factorial_cmd(JSON.stringify(obj));
    },
    /*远程测试*/
    cmdremotetest:function(){
        layer.open({
            type: 2,
            title: '扫一扫，手机远程测试',
            shade:0,
            area: ['350px', '38%'],
            content: 'cmdremotetest.html'
        });
    },
    /*设置启用系统按钮状态*/
    set_enable_system:function(obj){
      if (parseInt(obj[0].sysid) == 1) {
          if ( parseInt(obj[0].enable) == 1 ) {
              $("#index_btn1_switch").attr({"checked":"checked"});
          } else {
              $("#index_btn1_switch").removeAttr("checked");
          }
      }
      if (parseInt(obj[1].sysid) == 2) {
          if ( parseInt(obj[1].enable) == 1 ) {
              $("#index_btn2_switch").attr({"checked":"checked"});
          } else {
              $("#index_btn2_switch").removeAttr("checked");
          }
      }
      if (parseInt(obj[2].sysid) == 3) {
          if ( parseInt(obj[2].enable) == 1 ) {
              $("#index_btn3_switch").attr({"checked":"checked"});
          } else {
              $("#index_btn3_switch").removeAttr("checked");
          }
      }
      if (parseInt(obj[3].sysid) == 4) {
          if ( parseInt(obj[3].enable) == 1 ) {
              $("#index_btn4_switch").attr({"checked":"checked"});
          } else {
              $("#index_btn4_switch").removeAttr("checked");
          }
      }
      if (parseInt(obj[4].sysid) == 5) {
          if ( parseInt(obj[4].enable) == 1 ) {
              $("#index_btn5_switch").attr({"checked":"checked"});
          } else {
              $("#index_btn5_switch").removeAttr("checked");
          }
      }
      if (parseInt(obj[5].sysid) == 6) {
          if ( parseInt(obj[5].enable) == 1 ) {
              $("#index_btn6_switch").attr({"checked":"checked"});
          } else {
              $("#index_btn6_switch").removeAttr("checked");
          }
      }
    },
    /*重启系统*/
    reboot_cmd:function(){
        var obj = {host:host,port:port};
        obj.cmd = "cmd;NET:Restart";
        obj.type = 10;
        factorial_cmd(JSON.stringify(obj));
    },
    warning_tab:function(index,name){
        this.titleNames = name;
        $(".rightListBoxs").hide();
        $(".warningmessageBoxs:eq("+index+")").show();
    },
    voiceAnnouncements:function(msg,url){
        if( url == '' ){
            return false;
        }
        // var voice = voiceAnnouncements(msg);
        // $(".elabvoice").append(voice);
        // layer.msg(msg, {icon:16,shade:0.5,time:2000}, function(){
        //     location.href = url;
        // });
        location.href = url;
    },
    /*首页报警状态*/
    _T1_STATE:function(edat){
      var t1 = 'url(./img/switchalarm1.png)';
      var h1 = 'url(./img/switchalarm1.png)';
      var t2 = 'url(./img/switchalarm1.png)';
      var h2 = 'url(./img/switchalarm1.png)';
      /*温湿度状态*/
      if ( edat.ALM[0] > 0 ) {
          t1 = 'url(./img/switchalarm2.png)';
      }
      if ( edat.ALM[1] > 0 ) {
          h1 = 'url(./img/switchalarm2.png)';
      }
      if ( edat.ALM[2] > 0 ) {
          t2 = 'url(./img/switchalarm2.png)';
      }
      if ( edat.ALM[4] > 0 ) {
          h2 = 'url(./img/switchalarm2.png)';
      }
      this.t1url = t1;
      this.h1url = h1;
      this.t2url = t2;
      this.h2url = h2;
      /*烟感*/
      var smake = 'url(./img/smokesensation1.png)';
      var sum = 0;
          sum += parseInt(edat.ALM[18]);
          sum += parseInt(edat.ALM[19]);
          sum += parseInt(edat.ALM[20]);
          sum += parseInt(edat.ALM[21]);
          sum += parseInt(edat.ALM[22]);
          sum += parseInt(edat.ALM[23]);
          sum += parseInt(edat.ALM[24]);
          sum += parseInt(edat.ALM[25]);
          sum += parseInt(edat.ALM[26]);
      if ( sum > 0 ) {
          smake = 'url(./img/smokesensation2.png)';
      }
      this.smakeurl = smake;
      /*漏水*/
      var leak = 'url(./img/waterleakage1.png)';
      var sum = 0;
          sum += parseInt(edat.ALM[39]);
          sum += parseInt(edat.ALM[40]);
          sum += parseInt(edat.ALM[41]);
          sum += parseInt(edat.ALM[42]);
      if ( sum > 0 ) {
          leak = 'url(./img/waterleakage2.png)';
      }
      this.leakurl = leak;
      /*红外感应/门磁*/
      var hwx = 'url(./img/hongwx1.png)';
      var sum = 0;
          sum += parseInt(edat.ALM[43]);
          sum += parseInt(edat.ALM[44]);
          sum += parseInt(edat.ALM[45]);
          sum += parseInt(edat.ALM[46]);
      if ( sum > 0 ) {
          hwx = 'url(./img/hongwx2.png)';
      }
      this.hwxurl = hwx;
      /*停电*/
      pf = 'url(./img/powerfailure1.png)';
      var sum = 0;
      sum += parseInt(edat.ALM[30]);
      sum += parseInt(edat.ALM[31]);
      sum += parseInt(edat.ALM[32]);
      sum += parseInt(edat.ALM[33]);
      sum += parseInt(edat.ALM[34]);
      sum += parseInt(edat.ALM[35]);
      sum += parseInt(edat.ALM[36]);
      sum += parseInt(edat.ALM[37]);
      sum += parseInt(edat.ALM[38]);
      if ( sum > 0 ) {
          pf = 'url(./img/powerfailure2.png)';
      }
      this.powerfailure = pf;
    },
    // 声光报警器状态
    _ALM_STATE:function(edat){
      var sum = 0;
      for (var i = 0; i < edat.ALM.length; i++) {
          sum += parseInt(edat.ALM[i]);
      }
      var alm = 'url(./img/alarmed1.png)';
      if ( sum > 0 ) {
          alm = 'url(./img/alarmed2.png)';
      }
      this.almurl = alm;
    },
    _warning_message_all:function(edat){
        /*温湿度1~9报警状态*/
        this.wmT1 = edat.ALM[0] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[0] > 0 ) {  app.send_sms_msg(1, 0, "温湿度", "报警", "温度值"+edat.DataNorm[0], "温湿1"); }
        this.wmH1 = edat.ALM[1] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[1] > 0 ) {  app.send_sms_msg(1, 1, "温湿度", "报警", "湿度值"+edat.DataNorm[1], "温湿1"); }

        this.wmT2 = edat.ALM[2] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[2] > 0 ) {  app.send_sms_msg(1, 2, "温湿度", "报警", "温度值"+edat.DataNorm[2], "温湿2"); }
        this.wmH2 = edat.ALM[3] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[3] > 0 ) {  app.send_sms_msg(1, 3, "温湿度", "报警", "温度值"+edat.DataNorm[3], "温湿2"); }

        this.wmT3 = edat.ALM[4] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[4] > 0 ) {  app.send_sms_msg(1, 4, "温湿度", "报警", "温度值"+edat.DataNorm[4], "温湿3"); }
        this.wmH3 = edat.ALM[5] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[5] > 0 ) {  app.send_sms_msg(1, 5, "温湿度", "报警", "温度值"+edat.DataNorm[5], "温湿3"); }

        this.wmT4 = edat.ALM[6] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[6] > 0 ) {  app.send_sms_msg(1, 6, "温湿度", "报警", "温度值"+edat.DataNorm[6], "温湿4"); }
        this.wmH4 = edat.ALM[7] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[7] > 0 ) {  app.send_sms_msg(1, 7, "温湿度", "报警", "温度值"+edat.DataNorm[7], "温湿4"); }

        this.wmT5 = edat.ALM[8] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[8] > 0 ) {  app.send_sms_msg(1, 8, "温湿度", "报警", "温度值"+edat.DataNorm[8], "温湿5"); }
        this.wmH5 = edat.ALM[9] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[9] > 0 ) {  app.send_sms_msg(1, 9, "温湿度", "报警", "温度值"+edat.DataNorm[9], "温湿5"); }

        this.wmT6 = edat.ALM[10] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[10] > 0 ) {  app.send_sms_msg(1, 10, "温湿度", "报警", "温度值"+edat.DataNorm[10], "温湿6"); }
        this.wmH6 = edat.ALM[11] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[11] > 0 ) {  app.send_sms_msg(1, 11, "温湿度", "报警", "温度值"+edat.DataNorm[11], "温湿6"); }

        this.wmT7 = edat.ALM[12] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[12] > 0 ) {  app.send_sms_msg(1, 12, "温湿度", "报警", "温度值"+edat.DataNorm[12], "温湿7"); }
        this.wmH7 = edat.ALM[13] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[13] > 0 ) {  app.send_sms_msg(1, 13, "温湿度", "报警", "温度值"+edat.DataNorm[13], "温湿7"); }

        this.wmT8 = edat.ALM[14] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[14] > 0 ) {  app.send_sms_msg(1, 14, "温湿度", "报警", "温度值"+edat.DataNorm[14], "温湿8"); }
        this.wmH8 = edat.ALM[15] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[15] > 0 ) {  app.send_sms_msg(1, 15, "温湿度", "报警", "温度值"+edat.DataNorm[15], "温湿8"); }

        this.wmT9 = edat.ALM[16] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[16] > 0 ) {  app.send_sms_msg(1, 16, "温湿度", "报警", "温度值"+edat.DataNorm[16], "温湿9"); }
        this.wmH9 = edat.ALM[17] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[17] > 0 ) {  app.send_sms_msg(1, 17, "温湿度", "报警", "温度值"+edat.DataNorm[17], "温湿9"); }

        /*烟雾1~9报警状态*/
        this.wmS1 = edat.ALM[18] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[18] > 0 ) {  app.send_sms_msg(1, 18, "烟雾", "报警", "周围产生烟雾", "烟雾1"); }
        this.wmS2 = edat.ALM[19] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[19] > 0 ) {  app.send_sms_msg(1, 19, "烟雾", "报警", "周围产生烟雾", "烟雾2"); }
        this.wmS3 = edat.ALM[20] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[20] > 0 ) {  app.send_sms_msg(1, 20, "烟雾", "报警", "周围产生烟雾", "烟雾3"); }
        this.wmS4 = edat.ALM[21] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[21] > 0 ) {  app.send_sms_msg(1, 21, "烟雾", "报警", "周围产生烟雾", "烟雾4"); }
        this.wmS5 = edat.ALM[22] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[22] > 0 ) {  app.send_sms_msg(1, 22, "烟雾", "报警", "周围产生烟雾", "烟雾5"); }
        this.wmS6 = edat.ALM[23] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[23] > 0 ) {  app.send_sms_msg(1, 23, "烟雾", "报警", "周围产生烟雾", "烟雾6"); }
        this.wmS7 = edat.ALM[24] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[24] > 0 ) {  app.send_sms_msg(1, 24, "烟雾", "报警", "周围产生烟雾", "烟雾7"); }
        this.wmS8 = edat.ALM[25] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[25] > 0 ) {  app.send_sms_msg(1, 25, "烟雾", "报警", "周围产生烟雾", "烟雾8"); }
        this.wmS9 = edat.ALM[26] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[26] > 0 ) {  app.send_sms_msg(1, 26, "烟雾", "报警", "周围产生烟雾", "烟雾9"); }
        /*RS1*/
        this.RS1 = edat.ALM[27] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        this.RS2 = edat.ALM[28] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        this.RS3 = edat.ALM[29] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        this.RS4 = edat.ALM[62] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        /*停电*/
        this.wmP1 = edat.ALM[30] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        this.wmP2 = edat.ALM[31] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        this.wmP3 = edat.ALM[32] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        this.wmP4 = edat.ALM[33] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        this.wmP5 = edat.ALM[34] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        this.wmP6 = edat.ALM[35] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        this.wmP7 = edat.ALM[36] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        this.wmP8 = edat.ALM[37] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        this.wmP9 = edat.ALM[38] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        /*漏水*/
        this.wmL1 = edat.ALM[39] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[39] > 0 ) {  app.send_sms_msg(1, 39, "漏水", "报警", "监测区域漏水", "漏水1"); }
        this.wmL2 = edat.ALM[40] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[40] > 0 ) {  app.send_sms_msg(1, 40, "漏水", "报警", "监测区域漏水", "漏水2"); }
        this.wmL3 = edat.ALM[41] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[41] > 0 ) {  app.send_sms_msg(1, 41, "漏水", "报警", "监测区域漏水", "漏水3"); }
        this.wmL4 = edat.ALM[42] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[42] > 0 ) {  app.send_sms_msg(1, 42, "漏水", "报警", "监测区域漏水", "漏水4"); }
        /*红外感应/门磁*/
        this.wmD1 = edat.ALM[43] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        this.wmD2 = edat.ALM[44] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        this.wmD3 = edat.ALM[45] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        this.wmD4 = edat.ALM[46] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        /*消防*/
        this.wmF1 = edat.ALM[47] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        /*UPS1*/
        this.UPS1 = edat.ALM[48] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[48] > 0 ) {  app.send_sms_msg(2, 48, "UPS", "报警", "未知", "UPS1"); }
        this.UPS2 = edat.ALM[49] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[49] > 0 ) {  app.send_sms_msg(2, 49, "UPS", "报警", "未知", "UPS2"); }
        this.UPS3 = edat.ALM[50] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[50] > 0 ) {  app.send_sms_msg(2, 50, "UPS", "报警", "未知", "UPS3"); }
        this.UPS4 = edat.ALM[51] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[51] > 0 ) {  app.send_sms_msg(2, 51, "UPS", "报警", "未知", "UPS4"); }
        /*空调*/
        this.wmA1 = edat.ALM[52] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[52] > 0 ) {  app.send_sms_msg(3, 52, "空调", "报警", "未知", "空调1"); }
        this.wmA2 = edat.ALM[53] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[53] > 0 ) {  app.send_sms_msg(3, 53, "空调", "报警", "未知", "空调2"); }
        this.wmA3 = edat.ALM[54] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[54] > 0 ) {  app.send_sms_msg(3, 54, "空调", "报警", "未知", "空调3"); }
        this.wmA4 = edat.ALM[55] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[55] > 0 ) {  app.send_sms_msg(3, 55, "空调", "报警", "未知", "空调4"); }
        /*市配电*/
        this.wmM1 = edat.ALM[56] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[56] > 0 ) {  app.send_sms_msg(4, 56, "市配电", "报警", "未知", "市配电1"); }
        this.wmM2 = edat.ALM[57] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[57] > 0 ) {  app.send_sms_msg(4, 57, "市配电", "报警", "未知", "市配电2"); }
        this.wmM3 = edat.ALM[58] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[58] > 0 ) {  app.send_sms_msg(4, 58, "市配电", "报警", "未知", "市配电3"); }
        this.wmM4 = edat.ALM[59] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        if ( edat.ALM[59] > 0 ) {  app.send_sms_msg(4, 59, "市配电", "报警", "未知", "市配电4"); }

        /*电池组*/
        this.wmB1 = edat.ALM[60] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';
        /*防雷*/
        this.wmLP1 = edat.ALM[61] > 0 ? './img/switchalarm2.png' : './img/switchalarm1.png';

    },
    message:function(type,msg){
      /*
      type = success , 成功提示
      type = warning , 警告提示
      type = error , 错误提示
      */
      this.$Message[type]({
              background: true,
              content: msg
      });
    },
    /*视频换页码*/
    _video_page:function(i){
        $(".videoShowUlBoxs").hide();
        $(".vibtnListBoxs").removeClass("videopagebgus");
        var windows = $(window).height();
        var videoShowLiBoxs = (windows/3);
        $(".videoShowLiBoxs").css({"height":videoShowLiBoxs+"px"});
        $(".videoMJPGBoxs").css({"height":videoShowLiBoxs+"px"});
        $(".sadisLayoutBoxs").css({"line-height":videoShowLiBoxs+"px"});
        $(".vibtnListBoxs:eq("+i+")").addClass("videopagebgus");
        $(".videoShowUlBoxs:eq("+i+")").show();
        this.video_page_index = i+1;
    },
    warning (nodesc) {
        this.$Message.warning('当前用户不存在，请确认后重试！');
    },
    addTimer:function(){
        this.timel = new Time();
        this.timeList = this.timel.datedayslist;
        this.yy = this.timel.y;
        this.mm = this.timel.m;
    },
    //减一年
    leftYear:function(){
        this.yy = this.yy-1;
        this.timeList = this.timel.run(this.yy,this.mm);
    },
    //加一年
    rightYear:function(){
        this.yy = this.yy+1;
        this.timeList = this.timel.run(this.yy,this.mm);
    },
    //减一月
    leftMonth:function(){
        this.mm = this.mm-1;
        if( this.mm < 1 ){
            this.mm = 12;
            this.yy = this.yy-1;
        }
        this.timeList = this.timel.run(this.yy,this.mm);
    },
    //加一月
    rightMonth:function(){
        this.mm = this.mm+1;
        if( this.mm > 12 ){
            this.mm = 1;
            this.yy = this.yy+1;
        }
        this.timeList = this.timel.run(this.yy,this.mm);
    }
  }
});
app.addTimer();

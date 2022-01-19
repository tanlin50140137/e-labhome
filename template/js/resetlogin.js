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
    iframe_url:''
  },
  methods:{
    /*设置头像和昵称*/
    setpicnicname:function(userid){
        var p = this;
        $.ajax({
          url:url+'hwapi/basic/usermeta',
          data:{"userId":userid},
          success:function(res){
              p.getResource(res.phone,res.user_logo);
              p.picurl = '<img class="loginimg" src="'+res.user_logo+'" alt="头像">';
              p.nicname = res.nickname;
              var has_mod = [];
              if (res.has_mod.con == 'y') {
                  has_mod.push('试剂耗材管理系统');
              }
              if (res.has_mod.smr == 'y') {
                  has_mod.push('标准品管理系统');
              }
              if (res.has_mod.sam == 'y') {
                  has_mod.push('样品管理系统');
              }
              if (res.has_mod.equ == 'y') {
                  has_mod.push('仪器设备管理系统');
              }
              if (res.has_mod.doc == 'y') {
                  has_mod.push('资料档案管理系统');
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
        console.log(tel);
        console.log(user_logo);
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

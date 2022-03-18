function keyboard(obj){
    var kb = Object();
    kb.switchValue = 'EN';
    kb.flagkey = '大写';
    kb.outputletter = [];
    kb.cursurPosition = 0;
    kb.flagInput = false;
    kb.inputIndex = '-1';
    kb.HistoryBack = 1;
    kb.simplified = {};
    kb.kbPinyin = [];
    kb.deleteInfoUser = false;
    kb.HistoricalRecords = [];
    kb.areChinese = false;
    kb.isMove = false;
    kb.style1 = function(int){
        var w = obj.x == undefined?$(window).width()/2:$(window).width()/obj.x;
        if( int == 0 ){
            $(".kb_keyboard").css({"display":"none","width":w+"px","position":"absolute","bottom":(obj.bottom==undefined?"2.5rem":obj.bottom),"left":"50%","margin-left":-(w/2)+"px","z-index":"99999999"});
        }else{
            $(".kb_keyboard").css({"width":w+"px","position":"absolute","bottom":(obj.bottom==undefined?"2.5rem":obj.bottom),"left":"50%","margin-left":-(w/2)+"px","z-index":"99999999"});
        }
        $(".UpDownLeftRight").css({"border":"1px solid #d6cece","display":"flex","align-items":"center","flex-wrap":"nowrap","justify-content":"center","background":"#d6cece","border-radius":"0.5rem"});
        $(".kb_keyboard_left").css({"margin":"0.5rem 0"});
        $(".kb_keyboard_left:nth-child(1)").css({"width":"8%","text-align":"center","height":obj.keyHeight,"margin-left":"0.5rem","margin-right":"0.5rem","line-height":obj.keyHeight,"font-size":obj.fontSize,"font-weight":"700","border":"1px solid #f6f6f6","border-radius":"0.5rem"});
        $(".kb_keyboard_left:nth-child(2)").css({"width":"84%"});
        $(".kb_keyboard_left:nth-child(3)").css({"width":"8%","text-align":"center","height":obj.keyHeight,"margin-left":"0.5rem","margin-right":"0.5rem","line-height":obj.keyHeight,"font-size":obj.fontSize,"font-weight":"700","border":"1px solid #f6f6f6","border-radius":"0.5rem"});

        $(".kbBoxCss").css({"border":"1px solid #d6cece","margin":0,"padding":0,"width":"100%","border-radius":"0.4rem","background":"#F6F6F6","overflow":"hidden"});
        $(".kbBoxChineseBox").css({
          "display":"none",
          "margin-top":"0.5rem","position":"relative"});
        $(".kbkeyBox").css({"margin":"0.5rem","display":"flex","align-items":"center","flex-wrap":"nowrap","justify-content":"center"});
        $(".kbkeyInner").css({"border":"1px solid #e8e2e2","width":"10%","height":obj.keyHeight,"border-radius":"0.5rem","text-align":"center","line-height":obj.keyHeight,"font-size":obj.fontSize,"font-weight":"700","color":"#333333","background":"#b9b9b9","cursor":"pointer","overflow":"hidden","text-overflow":"ellipsis","white-space":"nowrap"});
        $(".kb-en").css({"margin-left":"0.5rem"});
        $(".kbkeyInner2").css({"border":"1px solid #e8e2e2","width":"10%","height":obj.keyHeight,"border-radius":"0.5rem","text-align":"center","line-height":obj.keyHeight,"font-size":obj.fontSize,"font-weight":"700","color":"#333333","background":"#b9b9b9","cursor":"pointer","overflow":"hidden","text-overflow":"ellipsis","white-space":"nowrap"});
        $(".kbkeyInner3").css({"border":"1px solid #e8e2e2","width":"10%","height":obj.keyHeight,"border-radius":"0.5rem","text-align":"center","line-height":obj.keyHeight,"font-size":obj.fontSize,"font-weight":"700","color":"#333333","background":"#b9b9b9","cursor":"pointer","overflow":"hidden","text-overflow":"ellipsis","white-space":"nowrap"});
        $(".kbkeyInner3:nth-child(9)").css({
          "background":"#b9b9b9  url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAGaElEQVR4Xu1afYhVRRQ/M1fyj3bBIsnKj4qiD8R9d2bWddk+xKCMzJLc0Awx0JSiIqysrNDEygohCsKwLwrKIi0qJQ3a7IO2O2d213p/JLJ/GFZUUBvBPpd978TI23jenbfv3vve272yO3/ee+ac3+935+PMucNgnDc2zvnDhAATI2CcKzAxBcb5AJhYBGs6BYQQ2znn84ioNSUjqw8AviGiAAB6jDF7wrhqJoAQYi9j7PqUEC8H48CkSZOWdnZ2/jNkUBMBpJSUcuJheBIRjX1YtQBSyh4AmHOKCXC8sbGxoaOjY7AqAaSUbwPAijLk9wPAITsHGWN/j7ZARDQVAC4EgI0A0BiOT0Q7jDHrEguglHqIiLa5iDHG1mmtd4w2aVe8lpaWswcHB+3HGDZKGWM3JRJACLGQMbavDPlrtdYH0kC+FIOU8igAzCh9xhjbEFsA3/fP5ZwfK0NwPSJuTxt5i0cptZiIPgph2xlbACnlLwBwjoPkG4h4RxrJW0yZTGaK53l/hfB1xBJASvkVAFzhWFACY8zctJIfwiWl7LJalOCMLoCU8k0AWOkgeRQRZ6WdvMUnpfwCAObHFkBK+QgAPOUgeTyfz0/r7u4e9W0uieCJBBBCLGKMfVwm4JWI+HUSMGPRJ7YAUsqZ9hABAFMcgO9CxJfjElFKzddad8TtF7Zvamo6r6enp9xu5HSfRABtp47D2/OI+GAcEsVV2J7G7Bw8TERbjDE2k4zV2traGnO53GsAsNR2JKLNxphNUZzEEkBK+R4AtDtW/LeMMa7FcEQMUsqbAeCk4yhj7B6t9UtRwFsb3/dncc4t+QUlfbKIODuKj8gCSCmfAYANDqf7EfG6KMHCNkIIyRizIyrcnkDELZV8Njc3ZwqFgiXvh2wREVWl/vZ9JAGEEGsYY684HPb09fW1HDly5HiUYC4bKeXjAPCk4912RFxfzq8QYgFjbCcAXBCy6Sei240xu6NgqiiA7/vXcM4/BYDJIYe/EdEiYwxGCTSSjVLqfiIali4zxl5vaGi40x5RS/srpZYSkf0gZ4T8HuOcrwiC4MuomEYUIJPJnO953l4AuCzkkIhosTHmk6iBKtmNMMr2FAqFtV1dXX8Uh+xqALDkwxnrIcbYCq31j5Vilb4fUQAppd3rF4UdMsZWa61fjRMoiq1SahkRveOw7fA8b20+n18MAM+53gPAbYj4a5Q4kQSQUr4AAPeGHRLRRmOMKwOMG9tpL6W8AQDeBYCGkIHNPZocH2N3f3//8mw2O5AEgHMEFOf95w6HHyLikiSB4vTxff8qzvkuAJhWod9ORFwTx3fY1imA4+GJfpzztiAIvq0mYNS+SimfiGzecZGrDxE9a4xxbctRQ5ywiyVALpdrzGaz/8aKkNB4rAVwZnyc85lBEPyckFPkbmmYAk8DwMOOBWe51touUHVrqVgElVKXEJE90p7l2AUWGmM+q4cCqdoGlVIrichWfIY1zvnsIAiytRQhrYnQA2USD8t9KiL+WQsRUpsKF7cJm3lZIYY1RIxVQHX5SP1hqChCueJnHyK6KkORBkYmk7nY87zDDuN0HYctQKXUPiJa6AD7EyJeGolxyEgIscqe+Eofp7Yg0t7e7vX29n4PAMKxPR7UWl8dV4TW1tYzBwYGPqhDSWyTMWZzFDwV6wGlTpqbm2cUCgWbCk93OH8fEW+NEjRsc6oVRVsA4CAAnOYg+yIiDjtBJhFltPrEGgFDoIQQSxhjzpITY+wxrfXW0SJQbZxEAtigQoi7GWPO6m29CibVki2zDSf7NVbcGbYS0aMux0R0Yy1LZvUgX9zik/8cLTqw29gqF0DO+dwgCOx1tFS2mvwer5Aj2CLKqByhkyjsuiBhCy2J0lsppS2PD8sRLLBcLjc5ac0uCbGofVxXZIjolkQCFKeDLZa4cgT7eh4idkYFV0+7kS5JDQ4OTk8sQFEE+5fIlSOc+GnJGOvO5/MdY3F/wP5Ky+fz8xlj9k/UsGtytgiEiNuqEsD3/amc89/r+QXr5Pv/Wy1VCWDB+b7fxDnvrhPQermdg4g/WOdVC1AU4XLOuT08nV4vxLXwyxjbpbVeVuqrJgIMieB53n1EZC9UuC5V1IJDXB/27pK9jfIdAHQhor0xelKrmQBxkaXFfkKAtHyJscIxMQLGSvm0xJ0YAWn5EmOFY9yPgP8A5xjaPgQOEeQAAAAASUVORK5CYII=') no-repeat",
          "background-position":"center",
        });
        $(".kbkeyInner4").css({"border":"1px solid #e8e2e2","width":"10%","height":obj.keyHeight,"border-radius":"0.5rem","text-align":"center","line-height":obj.keyHeight,"font-size":obj.fontSize,"font-weight":"700","color":"#333333","background":"#b9b9b9","cursor":"pointer","overflow":"hidden","text-overflow":"ellipsis","white-space":"nowrap"});
        $(".kbkeyInner4:nth-child(4)").css({"width":"40%"});
        $(".kbkeyInner4:nth-child(7)").css({
            "background":"#b9b9b9 url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABu0lEQVR4Xu2Yu0pDQRCGvxSiL6CFNoKWgpWFhaKFvYJgJQqWgiJesBDEp/B1fBmfQ1nYhUMwyW4S50x2/8BpcuYw839z2cuAxn+DxvUjAKqAxgmoBRovAA1BtYBaoHECaoHGC0CrgFpALdA4gRpb4GhMTr+G39UI4GcEgGNAAFQBQwTUAhUuAi5nwDbwCZwYAHcFYCkKv4nCLVrODYA3IDzLnaw3AeASeAF2/ij3qgHsA8/A2Zg+rxLAKvAUxU8SOOn9PGak6Qy4BR6ArczIqwFwGoUfZgpPZgsPYA94BC4KhSfzjym/K/ns/T8OQ+txst+XROLMdurT4CsQqK44E1QaTjGA6yh8s9STU/tiAElHsxXQTWTTM6ALYhFWgVEdGK7D5nYl5nkfUDSCZt2YeNwJmgIIzrydBcwBJIdeToO9AUiOr+LpsK/7gN4BhADWgLBtDucG6xshFwBSEAfAHXAe/5h16BaJyzG2CihcigYQuzlBWdpYAQiaNoBvS3E5viwB5MRjbiMA5sidOVQFOEuIeTiqAHPkzhyqApwlxDwcVYA5cmcOVQHOEmIejirAHLkzh6oAZwkxD+cXZSE8QWgVEGUAAAAASUVORK5CYII=') no-repeat",
            "background-position":"center"
        });
        $(".bkqiehuanline").css({"color":"#999999"});
        $(".bkEnqiehuan").css({"color":"#333333"});
        $(".bkCNqiehuan").css({"color":"#999999"});
        kb.HuanziStyle();
    }
    kb.HuanziStyle = function(){
        $(".kbBoxChinese").css({"border":"1px solid #e8e2e2","margin":"0 0.5rem","display":"flex","align-items":"center","flex-wrap":"nowrap"});
        $(".kbBoxChineseInner:nth-child(1)").css({"width":"95%","position":"relative"});
        $(".kbBoxChineseInner:nth-child(2)").css({
          "border-left":"1px solid #e8e2e2","width":"5%","height":"5rem",
          "background":"url('data:image/png;base64,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') no-repeat",
          "background-position":"center",
          "background-size":"50%"
        });
        $(".kbBoxChinesePinYin").css({"position":"absolute","top":"-1rem","left":"0","padding":"0.2rem 0.3rem","background":"#b9b9b9","font-size":(parseFloat(obj.fontSize)-6)+"rem","font-weight":"700"});
        $(".showChineseHanZi").css({"display":"flex","align-items":"center","flex-wrap":"wrap","background":"#FFFFFF","height":"5rem","overflow":"hidden"});
        $(".showChineseHanZiList").css({"padding":"0 0.5rem","height":obj.keyHeight,"text-align":"center","line-height":obj.keyHeight,"font-size":obj.fontSize,"font-weight":"700","color":"#333333","background":"#FFFFFF","margin-right":"0.5rem"});
        $(".kbBoxChinese_list").css({"border":"1px solid #e8e2e2","position":"absolute","top":"-10px","left":"0","width":"100%","background":"#F6F6F6","z-index":"1000"});
        $(".kbInnerChinese_list").css({"display":"flex","align-items":"center","flex-wrap":"nowrap"});
        $(".kbInnerBtem_list:nth-child(1)").css({"border":"1px solid #e8e2e2","width":"10%","height":($(".kbBoxCss").height())+"px","overflow":"hidden"});
        $(".kbInnerBtem_list:nth-child(2)").css({"border":"1px solid #e8e2e2","width":"90%","margin-left":"0.2rem","height":($(".kbBoxCss").height())+"px","overflow":"hidden","background":"#FFFFFF"});
        $(".kbInnerBtem_btnList").css({"border-bottom":"1px solid #dacbcb","height":(($(".kbBoxCss").height())/5)+"px","text-align":"center","line-height":(($(".kbBoxCss").height())/5)+"px","font-size":obj.fontSize,"font-weight":"400","color":"#333333","background":"#b9b9b9","cursor":"pointer","overflow":"hidden","text-overflow":"ellipsis","white-space":"nowrap"});
        $(".kbShengyuHanZi").css({"height":($(".kbBoxCss").height()-17)+"px","position":"relative","overflow":"hidden"});
        $(".kbShengyuHanZiInner").css({"position":"absolute","top":"0","left":"0","right":"0","bottom":"0"});
        $(".kbShengyuHanZiBoxs").css({"height":($(".kbBoxCss").height()-17)+"px","overflow-x":"hidden","overflow-y":"scroll"});
        $(".kbShengyuHanZiFixe").css({"display":"flex","align-items":"center","flex-wrap":"wrap"});
        $(".kbShengyuHanZiFixel").css({"border-bottom":"1px solid #dacbcb","padding":"0 0.5rem","height":(($(".kbBoxCss").height())/5)+"px","text-align":"center","line-height":(($(".kbBoxCss").height())/5)+"px","font-size":obj.fontSize,"font-weight":"700","color":"#333333","background":"#FFFFFF"});

    }
    kb.layui1 = function(){
        $(".kb_keyboard").remove();
        $("body").append($("<div class='kb_keyboard'></div>"));

        kb.UpDownLeftRight = $("<div class='UpDownLeftRight'></div>");
        $(".kb_keyboard").append(kb.UpDownLeftRight);
        kb.kb_keyboard_left1 = $("<div class='kb_keyboard_left'>取消</div>");
        kb.UpDownLeftRight.append(kb.kb_keyboard_left1);
        kb.kb_keyboard_left2 = $("<div class='kb_keyboard_left'></div>");
        kb.UpDownLeftRight.append(kb.kb_keyboard_left2);
        kb.kb_keyboard_left3 = $("<div class='kb_keyboard_left'>完成</div>");
        kb.UpDownLeftRight.append(kb.kb_keyboard_left3);

        kb.kbBox  = $("<div class='kbBoxCss'></div>");
        kb.kb_keyboard_left2.append(kb.kbBox);

        kb.kbBoxChineseBox  = $("<div class='kbBoxChineseBox'></div>");
        kb.kbBox.append(kb.kbBoxChineseBox);
        kb.kbBoxChinese_list = $("<div class='kbBoxChinese_list'></div>");
        kb.kbBoxChineseBox.append(kb.kbBoxChinese_list);
        kb.kbInnerChinese_list = $("<div class='kbInnerChinese_list'></div>");
        kb.kbBoxChinese_list.append(kb.kbInnerChinese_list);
        kb.kbInnerBtem_list1 = $("<div class='kbInnerBtem_list'></div>");
        kb.kbInnerChinese_list.append(kb.kbInnerBtem_list1);
        kb.kbInnerBtem_list2 = $("<div class='kbInnerBtem_list'></div>");
        kb.kbInnerChinese_list.append(kb.kbInnerBtem_list2);
        kb.kbInnerBtem_btnList = $("<div class='kbInnerBtem_btnList showPinYinHuanZi'></div>");
        kb.kbInnerBtem_list1.append(kb.kbInnerBtem_btnList);

        kb.kbInnerBtem_btnList = $("<div class='kbInnerBtem_btnList'></div>");
        kb.kbInnerBtem_list1.append(kb.kbInnerBtem_btnList);
        kb.kbInnerBtem_btnList = $("<div class='kbInnerBtem_btnList'></div>");
        kb.kbInnerBtem_list1.append(kb.kbInnerBtem_btnList);
        kb.kbInnerBtem_btnList = $("<div class='kbInnerBtem_btnList'></div>");
        kb.kbInnerBtem_list1.append(kb.kbInnerBtem_btnList);
        kb.kbInnerBtem_btnList = $("<div class='kbInnerBtem_btnList closeHanZiList'>返回</div>");
        kb.kbInnerBtem_list1.append(kb.kbInnerBtem_btnList);

        kb.kbShengyuHanZi = $("<div class='kbShengyuHanZi'></div>");
        kb.kbInnerBtem_list2.append(kb.kbShengyuHanZi);
        kb.kbShengyuHanZiInner = $("<div class='kbShengyuHanZiInner'></div>");
        kb.kbShengyuHanZi.append(kb.kbShengyuHanZiInner);
        kb.kbShengyuHanZiBoxs = $("<div class='kbShengyuHanZiBoxs'></div>");
        kb.kbShengyuHanZiInner.append(kb.kbShengyuHanZiBoxs);
        kb.kbShengyuHanZiFixe = $("<div class='kbShengyuHanZiFixe'></div>");
        kb.kbShengyuHanZiBoxs.append(kb.kbShengyuHanZiFixe);


        kb.kbBoxChinese  = $("<div class='kbBoxChinese'></div>");
        kb.kbBoxChineseBox.append(kb.kbBoxChinese);
        kb.kbBoxChineseInner1  = $("<div class='kbBoxChineseInner'></div>");
        kb.kbBoxChinese.append(kb.kbBoxChineseInner1);
        kb.kbBoxChinesePinYin  = $("<div class='kbBoxChinesePinYin'></div>");
        kb.kbBoxChineseInner1.append(kb.kbBoxChinesePinYin);
        kb.showChineseHanZi = $("<div class='showChineseHanZi'></div>");
        kb.kbBoxChineseInner1.append(kb.showChineseHanZi);
        for( var i=0;i<10;i++){
            kb.showChineseHanZi.append($("<div class='showChineseHanZiList'></div>"));
        }
        kb.kbBoxChineseInner2  = $("<div class='kbBoxChineseInner kbonclick_close'></div>");
        kb.kbBoxChinese.append(kb.kbBoxChineseInner2);
        kb.keyBox1 = $("<div class='kbkeyBox'></div>");
        kb.kbBox.append(kb.keyBox1);
        kb.group0 = ['q','w','e','r','t','y','u','i','o','p'];
        for(var i=0;i<10;i++){
          if( i == 0 ){
              kb.keyBox1.append($("<div class='kbkeyInner'>"+kb.group0[i]+"</div>"));
          }else{
              kb.keyBox1.append($("<div class='kbkeyInner kb-en'>"+kb.group0[i]+"</div>"));
          }
        }
        kb.keyBox2 = $("<div class='kbkeyBox'></div>");
        kb.kbBox.append(kb.keyBox2);
        kb.group1 = ['a','s','d','f','g','h','j','k','l'];
        for(var i=0;i<9;i++){
            if( i == 0 ){
                kb.keyBox2.append($("<div class='kbkeyInner2'>"+kb.group1[i]+"</div>"));
            }else{
                kb.keyBox2.append($("<div class='kbkeyInner2 kb-en'>"+kb.group1[i]+"</div>"));
            }
        }
        kb.keyBox3 = $("<div class='kbkeyBox'></div>");
        kb.kbBox.append(kb.keyBox3);
        kb.group2 = [kb.flagkey,'z','x','c','v','b','n','m',''];
        for(var i=0;i<9;i++){
            if( i == 0 ){
                kb.keyBox3.append($("<div class='kbkeyInner3'>"+kb.group2[i]+"</div>"));
            }else{
                kb.keyBox3.append($("<div class='kbkeyInner3 kb-en'>"+kb.group2[i]+"</div>"));
            }
        }
        kb.keyBox4 = $("<div class='kbkeyBox'></div>");
        kb.kbBox.append(kb.keyBox4);
        kb.group3 = ['符','123',',','space','.','<span class="bkEnqiehuan">英</span><span class="bkqiehuanline">/</span><span class="bkCNqiehuan">中</span>',''];
        for(var i=0;i<7;i++){
            if( i == 0 ){
                kb.keyBox4.append($("<div class='kbkeyInner4'>"+kb.group3[i]+"</div>"));
            }else{
                kb.keyBox4.append($("<div class='kbkeyInner4 kb-en'>"+kb.group3[i]+"</div>"));
            }
        }
    }
    kb.style2 = function(){
        var w = obj.x == undefined?$(window).width()/2:$(window).width()/obj.x;
        $(".kb_keyboard").css({"width":w+"px","position":"absolute","bottom":(obj.bottom==undefined?"2.5rem":obj.bottom),"left":"50%","margin-left":-(w/2)+"px","z-index":"99999999"});
        $(".UpDownLeftRight").css({"border":"1px solid #d6cece","display":"flex","align-items":"center","flex-wrap":"nowrap","justify-content":"center","background":"#d6cece","border-radius":"0.5rem"});
        $(".kb_keyboard_left").css({"margin":"0.5rem 0"});
        $(".kb_keyboard_left:nth-child(1)").css({"width":"8%","text-align":"center","height":obj.keyHeight,"margin-left":"0.5rem","margin-right":"0.5rem","line-height":obj.keyHeight,"font-size":obj.fontSize,"font-weight":"700","border":"1px solid #f6f6f6","border-radius":"0.5rem"});
        $(".kb_keyboard_left:nth-child(2)").css({"width":"84%"});
        $(".kb_keyboard_left:nth-child(3)").css({"width":"8%","text-align":"center","height":obj.keyHeight,"margin-left":"0.5rem","margin-right":"0.5rem","line-height":obj.keyHeight,"font-size":obj.fontSize,"font-weight":"700","border":"1px solid #f6f6f6","border-radius":"0.5rem"});

        $(".kbBoxCss2").css({"border":"1px solid #d6cece","margin":0,"padding":0,"width":"100%","border-radius":"0.4rem","background":"#F6F6F6"});
        $(".kbkeyBox2").css({"margin":"0.5rem 0.5rem 0 0.5rem","display":"flex","align-items":"center","flex-wrap":"nowrap","justify-content":"center"});
        $(".kbkeyInner21").css({"border":"1px solid #e8e2e2","width":"10%","border-radius":"0.5rem"});
        $(".kbkeyInner22").css({"width":"80%"});
        $(".kbkeyInner23").css({"width":"10%"});
        $(".keyBoxNum2").css({"margin":"0.5rem","display":"flex","align-items":"center","flex-wrap":"nowrap","justify-content":"center"});
        $(".keyBoxNumInner2").css({"border":"1px solid #e8e2e2","width":"33.3%"});
        $(".keyBoxNumInner2").css({"height":obj.keyHeight,"border-radius":"0.5rem","text-align":"center","line-height":obj.keyHeight,"font-size":obj.fontSize,"font-weight":"700","color":"#333333","background":"#FFFFFF","cursor":"pointer","overflow":"hidden","text-overflow":"ellipsis","white-space":"nowrap"});
        $(".keyBoxNumInner2:nth-child(2)").css({"margin":"0 0.5rem"});
        $(".keyNumRight").css({"border":"1px solid #e8e2e2","height":obj.keyHeight,"border-radius":"0.5rem","text-align":"center","line-height":obj.keyHeight,"font-size":obj.fontSize,"font-weight":"700","color":"#333333","background":"#b9b9b9","cursor":"pointer","overflow":"hidden","text-overflow":"ellipsis","white-space":"nowrap"});
        $(".keyNumRight:nth-child(1)").css({
          "background":"#b9b9b9 url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAGaElEQVR4Xu1afYhVRRQ/M1fyj3bBIsnKj4qiD8R9d2bWddk+xKCMzJLc0Awx0JSiIqysrNDEygohCsKwLwrKIi0qJQ3a7IO2O2d213p/JLJ/GFZUUBvBPpd978TI23jenbfv3vve272yO3/ee+ac3+935+PMucNgnDc2zvnDhAATI2CcKzAxBcb5AJhYBGs6BYQQ2znn84ioNSUjqw8AviGiAAB6jDF7wrhqJoAQYi9j7PqUEC8H48CkSZOWdnZ2/jNkUBMBpJSUcuJheBIRjX1YtQBSyh4AmHOKCXC8sbGxoaOjY7AqAaSUbwPAijLk9wPAITsHGWN/j7ZARDQVAC4EgI0A0BiOT0Q7jDHrEguglHqIiLa5iDHG1mmtd4w2aVe8lpaWswcHB+3HGDZKGWM3JRJACLGQMbavDPlrtdYH0kC+FIOU8igAzCh9xhjbEFsA3/fP5ZwfK0NwPSJuTxt5i0cptZiIPgph2xlbACnlLwBwjoPkG4h4RxrJW0yZTGaK53l/hfB1xBJASvkVAFzhWFACY8zctJIfwiWl7LJalOCMLoCU8k0AWOkgeRQRZ6WdvMUnpfwCAObHFkBK+QgAPOUgeTyfz0/r7u4e9W0uieCJBBBCLGKMfVwm4JWI+HUSMGPRJ7YAUsqZ9hABAFMcgO9CxJfjElFKzddad8TtF7Zvamo6r6enp9xu5HSfRABtp47D2/OI+GAcEsVV2J7G7Bw8TERbjDE2k4zV2traGnO53GsAsNR2JKLNxphNUZzEEkBK+R4AtDtW/LeMMa7FcEQMUsqbAeCk4yhj7B6t9UtRwFsb3/dncc4t+QUlfbKIODuKj8gCSCmfAYANDqf7EfG6KMHCNkIIyRizIyrcnkDELZV8Njc3ZwqFgiXvh2wREVWl/vZ9JAGEEGsYY684HPb09fW1HDly5HiUYC4bKeXjAPCk4912RFxfzq8QYgFjbCcAXBCy6Sei240xu6NgqiiA7/vXcM4/BYDJIYe/EdEiYwxGCTSSjVLqfiIali4zxl5vaGi40x5RS/srpZYSkf0gZ4T8HuOcrwiC4MuomEYUIJPJnO953l4AuCzkkIhosTHmk6iBKtmNMMr2FAqFtV1dXX8Uh+xqALDkwxnrIcbYCq31j5Vilb4fUQAppd3rF4UdMsZWa61fjRMoiq1SahkRveOw7fA8b20+n18MAM+53gPAbYj4a5Q4kQSQUr4AAPeGHRLRRmOMKwOMG9tpL6W8AQDeBYCGkIHNPZocH2N3f3//8mw2O5AEgHMEFOf95w6HHyLikiSB4vTxff8qzvkuAJhWod9ORFwTx3fY1imA4+GJfpzztiAIvq0mYNS+SimfiGzecZGrDxE9a4xxbctRQ5ywiyVALpdrzGaz/8aKkNB4rAVwZnyc85lBEPyckFPkbmmYAk8DwMOOBWe51touUHVrqVgElVKXEJE90p7l2AUWGmM+q4cCqdoGlVIrichWfIY1zvnsIAiytRQhrYnQA2USD8t9KiL+WQsRUpsKF7cJm3lZIYY1RIxVQHX5SP1hqChCueJnHyK6KkORBkYmk7nY87zDDuN0HYctQKXUPiJa6AD7EyJeGolxyEgIscqe+Eofp7Yg0t7e7vX29n4PAMKxPR7UWl8dV4TW1tYzBwYGPqhDSWyTMWZzFDwV6wGlTpqbm2cUCgWbCk93OH8fEW+NEjRsc6oVRVsA4CAAnOYg+yIiDjtBJhFltPrEGgFDoIQQSxhjzpITY+wxrfXW0SJQbZxEAtigQoi7GWPO6m29CibVki2zDSf7NVbcGbYS0aMux0R0Yy1LZvUgX9zik/8cLTqw29gqF0DO+dwgCOx1tFS2mvwer5Aj2CLKqByhkyjsuiBhCy2J0lsppS2PD8sRLLBcLjc5ac0uCbGofVxXZIjolkQCFKeDLZa4cgT7eh4idkYFV0+7kS5JDQ4OTk8sQFEE+5fIlSOc+GnJGOvO5/MdY3F/wP5Ky+fz8xlj9k/UsGtytgiEiNuqEsD3/amc89/r+QXr5Pv/Wy1VCWDB+b7fxDnvrhPQermdg4g/WOdVC1AU4XLOuT08nV4vxLXwyxjbpbVeVuqrJgIMieB53n1EZC9UuC5V1IJDXB/27pK9jfIdAHQhor0xelKrmQBxkaXFfkKAtHyJscIxMQLGSvm0xJ0YAWn5EmOFY9yPgP8A5xjaPgQOEeQAAAAASUVORK5CYII=') no-repeat",
          "background-position":"center"
        });
        $(".keyNumRight:nth-child(2)").css({"margin":"0.5rem 0"});
        $(".keyBoxFuHao").css({"border":"1px solid #e8e2e2","height":(parseFloat(obj.keyHeight)-1.5)+"rem","text-align":"center","line-height":obj.keyHeight,"font-size":obj.fontSize,"font-weight":"700","color":"#333333","background":"#b9b9b9","cursor":"pointer","overflow":"hidden","text-overflow":"ellipsis","white-space":"nowrap"});
        $(".keyBoxFuHao:nth-child(2)").css({"border-top":"1px solid #bbbbbb","border-bottom":"1px solid #bbbbbb"});
        $(".keyBoxFuHao:nth-child(3)").css({"border-bottom":"1px solid #bbbbbb"});
        $(".keyBoxFuHaoPos").css({"position":"relative","top":"-0.9rem"});
        $(".keyBoxFuHaoPos2").css({"position":"relative","top":"-0.6rem"});
        $(".keyBoxFuHaoPos3").css({"position":"relative","top":"-0.6rem"});
        $(".keyBoxFuHaoPos4").css({"position":"relative","top":"-0.6rem"});
        $(".keyBoxFuHaoPos5").css({"position":"relative","top":"0.33rem"});
        $(".lastKyeBoxs").css({"margin":"0.1rem 0.5rem 0.5rem 0.5rem","display":"flex","align-items":"center","flex-wrap":"nowrap","justify-content":"center"});
        $(".lastKyeList").css({"border":"1px solid #e8e2e2","border-radius":"0.5rem","width":"26.6%","height":obj.keyHeight,"text-align":"center","line-height":obj.keyHeight,"font-size":obj.fontSize,"font-weight":"700","color":"#333333","background":"#b9b9b9","cursor":"pointer","overflow":"hidden","text-overflow":"ellipsis","white-space":"nowrap"});
        $(".lastKyeList:nth-child(1)").css({"width":"10%"});
        $(".lastKyeList:nth-child(2)").css({"margin-left":"0.5rem"});
        $(".lastKyeList:nth-child(3)").css({"margin":"0 0.5rem","background":"#FFFFFF"});
        $(".lastKyeList:nth-child(4)").css({"margin-right":"0.5rem"});
        $(".lastKyeList:nth-child(5)").css({
          "width":"10%",
          "background":"#b9b9b9 url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABu0lEQVR4Xu2Yu0pDQRCGvxSiL6CFNoKWgpWFhaKFvYJgJQqWgiJesBDEp/B1fBmfQ1nYhUMwyW4S50x2/8BpcuYw839z2cuAxn+DxvUjAKqAxgmoBRovAA1BtYBaoHECaoHGC0CrgFpALdA4gRpb4GhMTr+G39UI4GcEgGNAAFQBQwTUAhUuAi5nwDbwCZwYAHcFYCkKv4nCLVrODYA3IDzLnaw3AeASeAF2/ij3qgHsA8/A2Zg+rxLAKvAUxU8SOOn9PGak6Qy4BR6ArczIqwFwGoUfZgpPZgsPYA94BC4KhSfzjym/K/ns/T8OQ+txst+XROLMdurT4CsQqK44E1QaTjGA6yh8s9STU/tiAElHsxXQTWTTM6ALYhFWgVEdGK7D5nYl5nkfUDSCZt2YeNwJmgIIzrydBcwBJIdeToO9AUiOr+LpsK/7gN4BhADWgLBtDucG6xshFwBSEAfAHXAe/5h16BaJyzG2CihcigYQuzlBWdpYAQiaNoBvS3E5viwB5MRjbiMA5sidOVQFOEuIeTiqAHPkzhyqApwlxDwcVYA5cmcOVQHOEmIejirAHLkzh6oAZwkxD+cXZSE8QWgVEGUAAAAASUVORK5CYII=') no-repeat",
          "background-position":"center"
        });

    }
    kb.layui2 = function(){
        kb.UpDownLeftRight = $("<div class='UpDownLeftRight'></div>");
        $(".kb_keyboard").append(kb.UpDownLeftRight);
        kb.kb_keyboard_left1 = $("<div class='kb_keyboard_left'>取消</div>");
        kb.UpDownLeftRight.append(kb.kb_keyboard_left1);
        kb.kb_keyboard_left2 = $("<div class='kb_keyboard_left'></div>");
        kb.UpDownLeftRight.append(kb.kb_keyboard_left2);
        kb.kb_keyboard_left3 = $("<div class='kb_keyboard_left'>完成</div>");
        kb.UpDownLeftRight.append(kb.kb_keyboard_left3);

        kb.kbBox2  = $("<div class='kbBoxCss2'></div>");
        kb.kb_keyboard_left2.append(kb.kbBox2);

        kb.keyBox2 = $("<div class='kbkeyBox2'></div>");
        kb.kbBox2.append(kb.keyBox2);
        kb.kbkeyInner21 = $("<div class='kbkeyInner21'></div>");
        kb.keyBox2.append(kb.kbkeyInner21);
        kb.kbkeyInner22 = $("<div class='kbkeyInner22'></div>");
        kb.keyBox2.append(kb.kbkeyInner22);
        kb.kbkeyInner23 = $("<div class='kbkeyInner23'></div>");
        kb.keyBox2.append(kb.kbkeyInner23);
        /*左边键*/
        kb.groupNum0 = ['.','/','+','-'];
        kb.keyBoxFuHao = $("<div class='keyBoxFuHao'><font class='keyBoxFuHaoPos'>"+kb.groupNum0[0]+"</font></div>");
        kb.kbkeyInner21.append(kb.keyBoxFuHao);
        kb.keyBoxFuHao = $("<div class='keyBoxFuHao'><font class='keyBoxFuHaoPos2'>"+kb.groupNum0[1]+"</font></div>");
        kb.kbkeyInner21.append(kb.keyBoxFuHao);
        kb.keyBoxFuHao = $("<div class='keyBoxFuHao'><font class='keyBoxFuHaoPos3'>"+kb.groupNum0[2]+"</font></div>");
        kb.kbkeyInner21.append(kb.keyBoxFuHao);
        kb.keyBoxFuHao = $("<div class='keyBoxFuHao'><font class='keyBoxFuHaoPos4'>"+kb.groupNum0[3]+"</font></div>");
        kb.kbkeyInner21.append(kb.keyBoxFuHao);
        /*中间*/
        kb.keyBoxNum2 = $("<div class='keyBoxNum2'></div>");
        kb.kbkeyInner22.append(kb.keyBoxNum2);
        kb.groupNum1 = ["1","2","3"];
        for( var i=0; i<3; i++ ){
            kb.keyBoxNum2.append($("<div class='keyBoxNumInner2 kbnumber_01'>"+kb.groupNum1[i]+"</div>"));
        }
        kb.keyBoxNum2 = $("<div class='keyBoxNum2'></div>");
        kb.kbkeyInner22.append(kb.keyBoxNum2);
        kb.groupNum1_2 = ["4","5","6"];
        for( var i=0; i<3; i++ ){
            kb.keyBoxNum2.append($("<div class='keyBoxNumInner2 kbnumber_02'>"+kb.groupNum1_2[i]+"</div>"));
        }
        kb.keyBoxNum2 = $("<div class='keyBoxNum2'></div>");
        kb.kbkeyInner22.append(kb.keyBoxNum2);
        kb.groupNum1_3 = ["7","8","9"];
        for( var i=0; i<3; i++ ){
            kb.keyBoxNum2.append($("<div class='keyBoxNumInner2 kbnumber_03'>"+kb.groupNum1_3[i]+"</div>"));
        }
        /*右边键*/
        kb.groupNum3 = ['','*','#'];
        kb.keyNumRight = $("<div class='keyNumRight'>"+kb.groupNum3[0]+"</div>");
        kb.kbkeyInner23.append(kb.keyNumRight);
        kb.keyNumRight = $("<div class='keyNumRight'><font class='keyBoxFuHaoPos5'>"+kb.groupNum3[1]+"</font></div>");
        kb.kbkeyInner23.append(kb.keyNumRight);
        kb.keyNumRight = $("<div class='keyNumRight'>"+kb.groupNum3[2]+"</div>");
        kb.kbkeyInner23.append(kb.keyNumRight);
        /*最后一组*/
        kb.lastKyeBoxs = $("<div class='lastKyeBoxs'></div>");
        kb.kbBox2.append(kb.lastKyeBoxs);
        kb.groupNum4 = ['符','返回',"0",'空格',''];
        for( var i=0; i<5; i++ ){
          kb.lastKyeBoxs.append($("<div class='lastKyeList'>"+kb.groupNum4[i]+"</div>"));
        }

    }
    kb.style3 = function(index){
        var w = obj.x == undefined?$(window).width()/2:$(window).width()/obj.x;
        $(".kb_keyboard").css({"width":w+"px","position":"absolute","bottom":(obj.bottom==undefined?"2.5rem":obj.bottom),"left":"50%","margin-left":-(w/2)+"px","z-index":"99999999"});
        $(".UpDownLeftRight").css({"border":"1px solid #d6cece","display":"flex","align-items":"center","flex-wrap":"nowrap","justify-content":"center","background":"#d6cece","border-radius":"0.5rem"});
        $(".kb_keyboard_left").css({"margin":"0.5rem 0"});
        $(".kb_keyboard_left:nth-child(1)").css({"width":"8%","text-align":"center","height":obj.keyHeight,"margin-left":"0.5rem","margin-right":"0.5rem","line-height":obj.keyHeight,"font-size":obj.fontSize,"font-weight":"700","border":"1px solid #f6f6f6","border-radius":"0.5rem"});
        $(".kb_keyboard_left:nth-child(2)").css({"width":"84%"});
        $(".kb_keyboard_left:nth-child(3)").css({"width":"8%","text-align":"center","height":obj.keyHeight,"margin-left":"0.5rem","margin-right":"0.5rem","line-height":obj.keyHeight,"font-size":obj.fontSize,"font-weight":"700","border":"1px solid #f6f6f6","border-radius":"0.5rem"});
        $(".kbBoxCss3").css({"border":"1px solid #d6cece","margin":0,"padding":0,"width":"100%","border-radius":"0.4rem","background":"#F6F6F6"});
        $(".kbkeyBox3").css({"margin":"0.5rem","display":"flex","align-items":"center","flex-wrap":"nowrap","justify-content":"center"});
        $(".kbkeyInner3:nth-child(1)").css({"border":"1px solid #e8e2e2","width":"10%","border-radius":"0.4rem"});
        $(".kbkeyInner3:nth-child(2)").css({"width":"90%","margin-left":"0.3rem","border-radius":"0.5rem"});
        $(".kbscrollInner").css({"position":"absolute","left":"0","top":"0","right":"0","bottom":"0","overflow-x":"hidden","overflow-y":"scroll"});
        $(".kbkeyfuhao").css({"display":"flex","align-items":"center","flex-wrap":"wrap"});
        $(".kbkeyfuhaoList").css({"border-bottom":"1px solid #e8e2e2","width":"25%","height":obj.keyHeight,"background":"#FFFFFF","text-align":"center","line-height":obj.keyHeight,"font-size":obj.fontSize,"font-weight":"700","color":"#333333","cursor":"pointer","overflow":"hidden","text-overflow":"ellipsis","white-space":"nowrap","position":"relative"});
        if( index == 1 ){
            $(".leftbutton").css({"height":obj.keyHeight,"background":"#b9b9b9","text-align":"center","line-height":obj.keyHeight,"font-size":(parseFloat(obj.fontSize)-4)+"rem","font-weight":"700","color":"#333333","cursor":"pointer","overflow":"hidden","text-overflow":"ellipsis","white-space":"nowrap"});
            $(".leftbutton:nth-child(1)").css({"background":"#59afec","color":"#FFFFFF"});
            $(".leftbutton:nth-child(2)").css({"border-top":"1px solid #dcc5c5","border-bottom":"1px solid #dcc5c5"});
            $(".leftbutton:nth-child(3)").css({"border-bottom":"1px solid #dcc5c5"});
        }
        $(".kbscrollBox").css({"border":"1px solid #e8e2e2","background":"#FFFFFF","border-radius":"0.4rem","height":($(".leftbutton").height()*4)+"px","position":"relative","overflow":"hidden"});
        $(".XiaoJiaoFlag").css({"position":"absolute","top":"0.5rem","right":"25%","font-size":(parseFloat(obj.fontSize)-6)+"rem","font-weight":"100","line-height":"1.2rem","color":"#c3bdbd"});
    }
    kb.layui3 = function(){
        kb.UpDownLeftRight = $("<div class='UpDownLeftRight'></div>");
        $(".kb_keyboard").append(kb.UpDownLeftRight);
        kb.kb_keyboard_left1 = $("<div class='kb_keyboard_left'>取消</div>");
        kb.UpDownLeftRight.append(kb.kb_keyboard_left1);
        kb.kb_keyboard_left2 = $("<div class='kb_keyboard_left'></div>");
        kb.UpDownLeftRight.append(kb.kb_keyboard_left2);
        kb.kb_keyboard_left3 = $("<div class='kb_keyboard_left'>完成</div>");
        kb.UpDownLeftRight.append(kb.kb_keyboard_left3);

        kb.kbBox3  = $("<div class='kbBoxCss3'></div>");
        kb.kb_keyboard_left2.append(kb.kbBox3);

        kb.kbkeyBox3 = $("<div class='kbkeyBox3'></div>");
        kb.kbBox3.append(kb.kbkeyBox3);
        kb.kbkeyInner3 = $("<div class='kbkeyInner3'></div>");
        kb.kbkeyBox3.append(kb.kbkeyInner3);
        kb.kbkeyInner4 = $("<div class='kbkeyInner3'></div>");
        kb.kbkeyBox3.append(kb.kbkeyInner4);
        /*左边氨按钮*/
        kb.leftbutton =  $("<div class='leftbutton'>最近</div>");
        kb.kbkeyInner3.append(kb.leftbutton);
        kb.leftbutton =  $("<div class='leftbutton'>中文符</div>");
        kb.kbkeyInner3.append(kb.leftbutton);
        kb.leftbutton =  $("<div class='leftbutton'>英文符</div>");
        kb.kbkeyInner3.append(kb.leftbutton);
        kb.leftbutton =  $("<div class='leftbutton'>返回</div>");
        kb.kbkeyInner3.append(kb.leftbutton);
        /*滚动层*/
        kb.kbscrollBox =  $("<div class='kbscrollBox'></div>");
        kb.kbkeyInner4.append(kb.kbscrollBox);
        kb.kbscrollInner =  $("<div class='kbscrollInner'></div>");
        kb.kbscrollBox.append(kb.kbscrollInner);
        /*右边符号*/
        kb.kbkeyfuhao = $("<div class='kbkeyfuhao'></div>");
        kb.kbscrollInner.append(kb.kbkeyfuhao);
        var list = localStorage.getItem("kblist");
        if( list == null ){
            list = [];
        }else{
            list = JSON.parse(list);
        }
        var a = [];
        for(var i=0;i<list.length;i++){
            kb.kbkeyfuhao.append($("<div class='kbkeyfuhaoList'>"+list[i].a+"<div class='XiaoJiaoFlag'>"+list[i].b+"</div></div>"));
            a.push(list[i].a);
        }
        kb.kbfuhaoInfo = a;
    }
    /*英文键盘*/
    kb.EnglishKeyboard = function(text){
        if( !kb.flagInput ){
            kb.outputletter.push(text);
            if( kb.inputIndex > -1 ){
                $(obj.el).eq(kb.inputIndex).val(kb.outputletter.join(""));
            }
            setTimeout(function(){
              $(obj.el).eq(kb.inputIndex).focus();
              var oTxt1 = $(obj.el)[kb.inputIndex];
              setTimeout(function(){
                  var cursurPosition=-1;
                  if(oTxt1.selectionStart){//非IE浏览器
                    kb.cursurPosition = oTxt1.selectionStart;
                  }else{//IE
                    var range = document.selection.createRange();
                    range.moveStart("character",-oTxt1.value.length);
                    kb.cursurPosition = range.text.length;
                  }
              },100);
            },100);
        }else{
            setTimeout(function(){
              kb.outputletter.splice(kb.cursurPosition,0,text);
              if( kb.inputIndex > -1 ){
                  $(obj.el).eq(kb.inputIndex).val(kb.outputletter.join(""));
              }
              kb.cursurPosition = parseInt(kb.cursurPosition)+1;
              if( kb.cursurPosition > 0 ){
                kb.setcursurPosition(kb.cursurPosition);
              }
            },100);
        }
    }
    /*获取输入*/
    kb.getinput = function(text){
        if( !kb.flagInput ){
            if( kb.switchValue == 'EN' ){
                // $(".kbBoxChineseBox").hide();
                kb.outputletter.push(text);
                if( kb.inputIndex > -1 ){
                    $(obj.el).eq(kb.inputIndex).val(kb.outputletter.join(""));
                }
                setTimeout(function(){
                  $(obj.el).eq(kb.inputIndex).focus();
                  var oTxt1 = $(obj.el)[kb.inputIndex];
                  setTimeout(function(){
                      var cursurPosition=-1;
                      if(oTxt1.selectionStart){//非IE浏览器
                        kb.cursurPosition = oTxt1.selectionStart;
                      }else{//IE
                        var range = document.selection.createRange();
                        range.moveStart("character",-oTxt1.value.length);
                        kb.cursurPosition = range.text.length;
                      }
                  },100);
                },100);
            }else if(  kb.switchValue == 'CN' ){
                if( kb.cursurPosition > 0 ){
                  kb.setcursurPosition(kb.cursurPosition);
                }
                $(".kbBoxChineseBox").show();
                kb.kbPinyin.push(text);
                if( kb.kbPinyin.length > 0 ){
                    $(".kbBoxChinesePinYin").show();
                }else{
                    $(".kbBoxChinesePinYin").hide();
                }
                var index = kb.kbPinyin.join("");
                $(".kbBoxChinesePinYin").html(index);
                var pinyinList = kb.simplified[index];
                if( pinyinList != undefined ){
                    kb.areChinese = true;
                    kb.selectIndex = index;
                    $(".showPinYinHuanZi").html(index);
                    kb.allPinYinHanZi = pinyinList.split('|')
                    /*全部显示*/
                    kb.kbShengyuHanZiFixe.empty();
                    for(var i=0;i<kb.allPinYinHanZi.length;i++){
                        kb.kbShengyuHanZiFixel = $("<div class='kbShengyuHanZiFixel'>"+kb.allPinYinHanZi[i]+"</div>");
                        kb.kbShengyuHanZiFixe.append(kb.kbShengyuHanZiFixel);
                    }
                    if( kb.allPinYinHanZi.length > 20 ){
                        $(".kbonclick_close").show();
                    }else{
                        $(".kbonclick_close").hide();
                    }
                    /*默认显示10个*/
                    var b = kb.allPinYinHanZi.slice(0,20);
                    kb.showChineseHanZi.empty();
                    for( var i=0;i<b.length;i++){
                        kb.showChineseHanZi.append($("<div class='showChineseHanZiList'>"+b[i]+"</div>"));
                    }
                    kb.HuanziStyle(),kb.action();
                }else{
                    kb.areChinese = false;
                    if( kb.kbPinyin.length > 5 ){
                        kb.kbPinyin = [];
                    }
                    kb.showChineseHanZi.empty();
                    $(".showPinYinHuanZi").html(index);
                    kb.kbShengyuHanZiFixe.empty();
                    for(var i=0;i<kb.HistoricalRecords.length;i++){
                        kb.kbShengyuHanZiFixel = $("<div class='kbShengyuHanZiFixel'>"+kb.HistoricalRecords[i]+"</div>");
                        kb.kbShengyuHanZiFixe.append(kb.kbShengyuHanZiFixel);
                    }
                    if( kb.HistoricalRecords.length > 20 ){
                        $(".kbonclick_close").show();
                    }else{
                        $(".kbonclick_close").hide();
                    }
                    var b = kb.HistoricalRecords.slice(0,20);
                    kb.showChineseHanZi.empty();
                    for( var i=0;i<b.length;i++){
                        kb.showChineseHanZi.append($("<div class='showChineseHanZiList'>"+b[i]+"</div>"));
                    }
                    kb.HuanziStyle(),kb.action();
                }
                $(".kbBoxChinese_list").hide();
            }
        }else{
          if( kb.switchValue == 'EN' ){
              // $(".kbBoxChineseBox").hide();
              setTimeout(function(){
                kb.outputletter.splice(kb.cursurPosition,0,text);
                if( kb.inputIndex > -1 ){
                    $(obj.el).eq(kb.inputIndex).val(kb.outputletter.join(""));
                }
                kb.cursurPosition = parseInt(kb.cursurPosition)+1;
                if( kb.cursurPosition > 0 ){
                  kb.setcursurPosition(kb.cursurPosition);
                }
              },100);
          }else if(  kb.switchValue == 'CN' ){
              if( kb.cursurPosition > 0 ){
                kb.setcursurPosition(kb.cursurPosition);
              }
              $(".kbBoxChineseBox").show();
              kb.kbPinyin.push(text);
              if( kb.kbPinyin.length > 0 ){
                  $(".kbBoxChinesePinYin").show();
              }else{
                  $(".kbBoxChinesePinYin").hide();
              }
              var index = kb.kbPinyin.join("");
              $(".kbBoxChinesePinYin").html(index);
              var pinyinList = kb.simplified[index];
              if( pinyinList != undefined ){
                  kb.areChinese = true;
                  kb.selectIndex = index;
                  $(".showPinYinHuanZi").html(index);
                  kb.allPinYinHanZi = pinyinList.split('|')
                  /*全部显示*/
                  kb.kbShengyuHanZiFixe.empty();
                  for(var i=0;i<kb.allPinYinHanZi.length;i++){
                      kb.kbShengyuHanZiFixel = $("<div class='kbShengyuHanZiFixel'>"+kb.allPinYinHanZi[i]+"</div>");
                      kb.kbShengyuHanZiFixe.append(kb.kbShengyuHanZiFixel);
                  }
                  if( kb.allPinYinHanZi.length > 20 ){
                      $(".kbonclick_close").show();
                  }else{
                      $(".kbonclick_close").hide();
                  }
                  var b = kb.allPinYinHanZi.slice(0,20);
                  kb.showChineseHanZi.empty();
                  for( var i=0;i<b.length;i++){
                      kb.showChineseHanZi.append($("<div class='showChineseHanZiList'>"+b[i]+"</div>"));
                  }
                  kb.HuanziStyle(),kb.action();
              }else{
                  kb.areChinese = false;
                  if( kb.kbPinyin.length > 5 ){
                      kb.kbPinyin = [];
                  }
                  kb.showChineseHanZi.empty();
                  $(".showPinYinHuanZi").html(index);
                  kb.kbShengyuHanZiFixe.empty();
                  for(var i=0;i<kb.HistoricalRecords.length;i++){
                      kb.kbShengyuHanZiFixel = $("<div class='kbShengyuHanZiFixel'>"+kb.HistoricalRecords[i]+"</div>");
                      kb.kbShengyuHanZiFixe.append(kb.kbShengyuHanZiFixel);
                  }
                  if( kb.HistoricalRecords.length > 20 ){
                      $(".kbonclick_close").show();
                  }else{
                      $(".kbonclick_close").hide();
                  }
                  var b = kb.HistoricalRecords.slice(0,20);
                  kb.showChineseHanZi.empty();
                  for( var i=0;i<b.length;i++){
                      kb.showChineseHanZi.append($("<div class='showChineseHanZiList'>"+b[i]+"</div>"));
                  }
                  kb.HuanziStyle(),kb.action();
              }
              $(".kbBoxChinese_list").hide();
          }
      }
    }
    /*添加中文汉字*/
    kb.addChCN = function(text){
        // $(".kbBoxChineseBox").hide();
        // kb.allPinYinHanZi = [];
        kb.kbPinyin = [];
        if( kb.areChinese ){
            /*使用过的字排在最前面*/
            if( kb.allPinYinHanZi[0] != text ){
                var a = [];
                kb.allPinYinHanZi.forEach(function(item){
                      if( text != item ){
                          a.push(item)
                      }
                });
                kb.allPinYinHanZi = a;
                kb.allPinYinHanZi.splice(0,0,text);
                var strlist = kb.allPinYinHanZi.join('|');
                kb.simplified[kb.selectIndex] = strlist;
                //重置选字面板
                kb.kbShengyuHanZiFixe.empty();
                for(var i=0;i<kb.allPinYinHanZi.length;i++){
                    kb.kbShengyuHanZiFixel = $("<div class='kbShengyuHanZiFixel'>"+kb.allPinYinHanZi[i]+"</div>");
                    kb.kbShengyuHanZiFixe.append(kb.kbShengyuHanZiFixel);
                }
                /*默认显示10个*/
                var b = kb.allPinYinHanZi.slice(0,20);
                kb.showChineseHanZi.empty();
                for( var i=0;i<b.length;i++){
                    kb.showChineseHanZi.append($("<div class='showChineseHanZiList'>"+b[i]+"</div>"));
                }
                kb.HuanziStyle(),kb.action();
            }
            /*记录使用过的字*/
            if( kb.HistoricalRecords[0] != text ){
                kb.HistoricalRecords.splice(0,0,text);
            }
        }

        if( !kb.flagInput ){
            setTimeout(function(){
              var textList = text.split('');
              for(var i=(textList.length-1);i>=0;i--){
                  kb.outputletter.splice(kb.cursurPosition,0,textList[i]);
              }
              if( kb.inputIndex > -1 ){
                  $(obj.el).eq(kb.inputIndex).val(kb.outputletter.join(""));
              }
              kb.cursurPosition = parseInt(kb.cursurPosition)+textList.length;
              if( kb.cursurPosition > 0 ){
                kb.setcursurPosition(kb.cursurPosition);
              }
            },100);
        }else{
            setTimeout(function(){
              var textList = text.split('');
              for(var i=(textList.length-1);i>=0;i--){
                  kb.outputletter.splice(kb.cursurPosition,0,textList[i]);
              }
              if( kb.inputIndex > -1 ){
                  $(obj.el).eq(kb.inputIndex).val(kb.outputletter.join(""));
              }
              kb.cursurPosition = parseInt(kb.cursurPosition)+textList.length;
              if( kb.cursurPosition > 0 ){
                kb.setcursurPosition(kb.cursurPosition);
              }
            },100);
        }
        $(".kbBoxChinesePinYin").hide();
    }
    kb.btn_touch = function(index,func){
          func(index);
    }
    /*添加事件*/
    kb.action = function(){
        $(".kbkeyInner").unbind();
        $(".kbkeyInner").mousedown(function(e){
            e.stopPropagation();
            $(".kbkeyInner").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner2").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner3:eq(0)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner3:eq(1)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner3:eq(2)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner3:eq(3)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner3:eq(4)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner3:eq(5)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner3:eq(6)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner3:eq(7)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner4:eq(2)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner4:eq(3)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner4:eq(4)").css({"background":"#b9b9b9","color":"#333333"});
            kb.isMove = false;
            var index = $(this).index();
            $(".kbkeyInner:eq("+index+")").css({"background":"#3299ca","color":"#FFFFFF"});
            kb.getinput(kb.group0[index]);
        });
        //长按
        // $(".kbkeyInner").on({
        //       move:'',
        //       touchstart:function(e){
        //           var p = this;
        //           kb.isMove = false;
        //           var index = $(this).index();
        //           p.move = setInterval(function(){
        //               kb.btn_touch(index,function(res){
        //                     kb.getinput(kb.group0[res]);
        //               });
        //           },200);
        //       },
        //       touchend: function(e){
        //           var p = this;
        //           clearInterval(p.move);
        //       }
        // });

        $(".kbkeyInner2").unbind();
        $(".kbkeyInner2").mousedown(function(e){
            e.stopPropagation();
            $(".kbkeyInner").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner2").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner3:eq(0)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner3:eq(1)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner3:eq(2)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner3:eq(3)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner3:eq(4)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner3:eq(5)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner3:eq(6)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner3:eq(7)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner4:eq(2)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner4:eq(3)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner4:eq(4)").css({"background":"#b9b9b9","color":"#333333"});
            kb.isMove = false;
            var index = $(this).index();
            $(".kbkeyInner2:eq("+index+")").css({"background":"#3299ca","color":"#FFFFFF"});
            kb.getinput(kb.group1[index]);
        });
        //长按
        // $(".kbkeyInner2").on({
        //       move:'',
        //       touchstart:function(e){
        //           var p = this;
        //           kb.isMove = false;
        //           var index = $(this).index();
        //           p.move = setInterval(function(){
        //               kb.btn_touch(index,function(res){
        //                     kb.getinput(kb.group1[res]);
        //               });
        //           },200);
        //       },
        //       touchend: function(e){
        //           var p = this;
        //           clearInterval(p.move);
        //       }
        // });

        $(".kbkeyInner3").unbind();
        $(".kbkeyInner3").mousedown(function(e){
            e.stopPropagation();
            if( index != 8 ){
                $(".kbkeyInner").css({"background":"#b9b9b9","color":"#333333"});
                $(".kbkeyInner2").css({"background":"#b9b9b9","color":"#333333"});
                $(".kbkeyInner3:eq(0)").css({"background":"#b9b9b9","color":"#333333"});
                $(".kbkeyInner3:eq(1)").css({"background":"#b9b9b9","color":"#333333"});
                $(".kbkeyInner3:eq(2)").css({"background":"#b9b9b9","color":"#333333"});
                $(".kbkeyInner3:eq(3)").css({"background":"#b9b9b9","color":"#333333"});
                $(".kbkeyInner3:eq(4)").css({"background":"#b9b9b9","color":"#333333"});
                $(".kbkeyInner3:eq(5)").css({"background":"#b9b9b9","color":"#333333"});
                $(".kbkeyInner3:eq(6)").css({"background":"#b9b9b9","color":"#333333"});
                $(".kbkeyInner3:eq(7)").css({"background":"#b9b9b9","color":"#333333"});
                $(".kbkeyInner4:eq(2)").css({"background":"#b9b9b9","color":"#333333"});
                $(".kbkeyInner4:eq(3)").css({"background":"#b9b9b9","color":"#333333"});
                $(".kbkeyInner4:eq(4)").css({"background":"#b9b9b9","color":"#333333"});
            }
            kb.isMove = false;
            var index = $(this).index();
            if( index != 8 ){
                $(".kbkeyInner3:eq("+index+")").css({"background":"#3299ca","color":"#FFFFFF"});
            }
            kb.switch3(index);
        });
        //长按
        // $(".kbkeyInner3").on({
        //       move:'',
        //       touchstart:function(e){
        //           var p = this;
        //           kb.isMove = false;
        //           var index = $(this).index();
        //           if( index == 8 ){
        //               clearInterval(p.move);
        //               p.move = setInterval(function(){
        //                   kb.btn_touch(index,function(res){
        //                         console.log(res);
        //                         kb.switch3(res);
        //                   });
        //               },200);
        //           }else if( index != -1 ){
        //               clearInterval(p.move);
        //               p.move = setInterval(function(){
        //                   kb.btn_touch(index,function(res){
        //                         if( res != 0 ){
        //                             kb.switch3(res);
        //                         }else{
        //                             clearInterval(p.move);
        //                         }
        //                   });
        //               },200);
        //           }else{
        //               clearInterval(p.move);
        //           }
        //       },
        //       touchend: function(e){
        //           var p = this;
        //           clearInterval(p.move);
        //       }
        // });

        $(".kbkeyInner4").unbind();
        $(".kbkeyInner4").mousedown(function(e){
            e.stopPropagation();
            $(".kbkeyInner4:eq(2)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner4:eq(3)").css({"background":"#b9b9b9","color":"#333333"});
            $(".kbkeyInner4:eq(4)").css({"background":"#b9b9b9","color":"#333333"});
            kb.isMove = false;
            var index = $(this).index();
            if( index != 5 ){
                if( index != 6 ){
                    $(".kbkeyInner4:eq("+index+")").css({"background":"#3299ca","color":"#FFFFFF"});
                }
            }
            kb.switch4(index);
        });
        //长按
        // $(".kbkeyInner4").on({
        //       move:'',
        //       touchstart:function(e){
        //           var p = this;
        //           kb.isMove = false;
        //           var index = $(this).index();
        //           p.move = setInterval(function(){
        //               kb.btn_touch(index,function(res){
        //                   if( res == 3 ){
        //                       kb.switch4(res);
        //                   }
        //               });
        //           },200);
        //       },
        //       touchend: function(e){
        //           var p = this;
        //           clearInterval(p.move);
        //       }
        // });

        $(".kb_keyboard_left").eq(0).unbind();
        $(".kb_keyboard_left").eq(0).mousedown(function(e){
            e.stopPropagation();
            kb.isMove = false;
            // $(".kb_keyboard").animate({"left":"-1000px"},200,function(){
                $(".kb_keyboard").hide();
                kb.inputIndex = '-1';
                obj.end('off',"");
            // });
        });
        $(".kb_keyboard_left").eq(2).unbind();
        $(".kb_keyboard_left").eq(2).mousedown(function(e){
            e.stopPropagation();
            // $(this).fadeOut(50);
            // $(this).fadeIn(50);
            kb.isMove = false;
            // $(".kb_keyboard").animate({"left":"1000px"},200,function(){
                  $(".kb_keyboard").hide();
                  kb.inputIndex = '-1';
                  var inputval = $(obj.el).eq(kb.inputIndex).val();
                  obj.end('OK',inputval);
            // });
        });
        $(".showChineseHanZiList").unbind();
        $(".showChineseHanZiList").mousedown(function(e){
            e.stopPropagation();
            $(this).fadeOut(50);
            $(this).fadeIn(50);
            kb.isMove = false;
            var index = $(this).index();
            if( kb.areChinese ){
              kb.addChCN(kb.allPinYinHanZi[index]);
            }else{
              kb.addChCN(kb.HistoricalRecords[index]);
            }
        });
        $(".kbonclick_close").unbind();
        $(".kbonclick_close").mousedown(function(e){
            e.stopPropagation();
            kb.isMove = false;
            $(".kbBoxChinese_list").show();
            if( kb.cursurPosition > 0 ){
              kb.setcursurPosition(kb.cursurPosition);
            }
        });
        $(".closeHanZiList").unbind();
        $(".closeHanZiList").mousedown(function(e){
            e.stopPropagation();
            kb.isMove = false;
            $(".kbBoxChinese_list").hide();
            if( kb.cursurPosition > 0 ){
              kb.setcursurPosition(kb.cursurPosition);
            }
        });
        $(".kbShengyuHanZiFixel").unbind();
        $(".kbShengyuHanZiFixel").mousedown(function(e){
            e.stopPropagation();
            kb.isMove = false;
            var index = $(this).index();
            if( kb.areChinese ){
              kb.addChCN(kb.allPinYinHanZi[index]);
            }else{
              kb.addChCN(kb.HistoricalRecords[index]);
            }
            $(".kbBoxChinese_list").hide();
            if( kb.cursurPosition > 0 ){
              kb.setcursurPosition(kb.cursurPosition);
            }
        });
        /*触摸屏幕拖动键盘*/
        // $(".kb_keyboard").on({
        //     endx:0,
        //     endy:0,
        //     left:0,
        //     top:0,
        //     downx:0,
        //     downy:0,
        //     touchstart:function(e){
        //       var p = this;
        //       //设置移动后的默认位置
        //       //获取div的初始位置，要注意的是需要转整型，因为获取到值带px
        //       p.left= parseInt($(".kb_keyboard").css("left"));
        //       p.top = parseInt($(".kb_keyboard").css("top"));
        //       //获取鼠标按下时的坐标，区别于下面的es.pageX,es.pageY
        //       p.downx = e.originalEvent.targetTouches[0].pageX;
        //       p.downy = e.originalEvent.targetTouches[0].pageY;   //pageY的y要大写，必须大写！！
        //     },
        //     touchmove: function(e){
        //         var p = this;
        //         //es.pageX,es.pageY:获取鼠标移动后的坐标
        //         p.endx = e.originalEvent.targetTouches[0].pageX - p.downx + p.left;   //计算div的最终位置
        //         p.endy = e.originalEvent.targetTouches[0].pageY - p.downy + p.top;
        //         //带上单位
        //         $(".kb_keyboard").css({"left":p.endx+"px","top":p.endy+"px"});
        //     },
        //     touchend: function(e){}
        // });
        /*鼠标拖动键盘*/
        // $(".kb_keyboard").mousedown(function(e){
        //       e.stopPropagation();
        //       kb.isMove = true;
        //       if( kb.isMove ) {
        //     	    $(".kb_keyboard").css({"cursor":"move"});
        //           //设置移动后的默认位置
        //           var endx=0;
        //           var endy=0;
        //           //获取div的初始位置，要注意的是需要转整型，因为获取到值带px
        //           var left= parseInt($(".kb_keyboard").css("left"));
        //           var top = parseInt($(".kb_keyboard").css("top"));
        //           //获取鼠标按下时的坐标，区别于下面的es.pageX,es.pageY
        //           var downx=e.pageX;
        //           var downy=e.pageY;   //pageY的y要大写，必须大写！！
        //           //  鼠标按下时给div挂事件
        //           $(".kb_keyboard").bind("mousemove",function(es){
        //               //es.pageX,es.pageY:获取鼠标移动后的坐标
        //               var endx= es.pageX-downx+left;   //计算div的最终位置
        //               var endy=es.pageY-downy+top;
        //               //带上单位
        //               $(".kb_keyboard").css({"left":endx+"px","top":endy+"px"});
        //           });
        //     }
        // }).mouseup(function(){
        // 	    $(".kb_keyboard").css({"cursor":"default"});
        //       //鼠标弹起时给div取消事件
        //       $(".kb_keyboard").unbind("mousemove");
        // });
        /*选中框*/
        kb.controlFocus();
    }
    /*数字键盘添加事件*/
    kb.action2 = function(){
        $(".keyBoxFuHao").unbind();
        $(".keyBoxFuHao").mousedown(function(e){
            e.stopPropagation();
            $(this).fadeOut(50);
            $(this).fadeIn(50);
            kb.isMove = false;
            var index = $(this).index();
            if( kb.controltypeval != 'number' ){
              kb.EnglishKeyboard(kb.groupNum0[index]);
            }
        });
        $(".kbnumber_01").unbind();
        $(".kbnumber_01").mousedown(function(e){
            e.stopPropagation();
            $(".kbnumber_01").css({"background":"#FFFFFF","color":"#333333"});
            $(".kbnumber_02").css({"background":"#FFFFFF","color":"#333333"});
            $(".kbnumber_03").css({"background":"#FFFFFF","color":"#333333"});
            $(".lastKyeList:eq(2)").css({"background":"#FFFFFF","color":"#333333"});
            kb.isMove = false;
            var index = $(this).index();
            $(".kbnumber_01:eq("+index+")").css({"background":"#3299ca","color":"#FFFFFF"});
            kb.EnglishKeyboard(kb.groupNum1[index]);
        });
        // $(".kbnumber_01").on({
        //       move:'',
        //       touchstart:function(e){
        //           var p = this;
        //           var index = $(this).index();
        //           p.move = setInterval(function(){
        //               kb.btn_touch(index,function(res){
        //                   kb.EnglishKeyboard(kb.groupNum1[res]);
        //               });
        //           },200);
        //       },
        //       touchend: function(e){
        //           clearInterval(this.move);
        //       }
        // });

        $(".kbnumber_02").unbind();
        $(".kbnumber_02").mousedown(function(e){
            e.stopPropagation();
            $(".kbnumber_01").css({"background":"#FFFFFF","color":"#333333"});
            $(".kbnumber_02").css({"background":"#FFFFFF","color":"#333333"});
            $(".kbnumber_03").css({"background":"#FFFFFF","color":"#333333"});
            $(".lastKyeList:eq(2)").css({"background":"#FFFFFF","color":"#333333"});
            kb.isMove = false;
            var index = $(this).index();
            $(".kbnumber_02:eq("+index+")").css({"background":"#3299ca","color":"#FFFFFF"});
            kb.EnglishKeyboard(kb.groupNum1_2[index]);
        });
        // $(".kbnumber_02").on({
        //       move:'',
        //       touchstart:function(e){
        //           var p = this;
        //           var index = $(this).index();
        //           p.move = setInterval(function(){
        //               kb.btn_touch(index,function(res){
        //                   kb.EnglishKeyboard(kb.groupNum1_2[res]);
        //               });
        //           },200);
        //       },
        //       touchend: function(e){
        //           clearInterval(this.move);
        //       }
        // });

        $(".kbnumber_03").unbind();
        $(".kbnumber_03").mousedown(function(e){
            e.stopPropagation();
            $(".kbnumber_01").css({"background":"#FFFFFF","color":"#333333"});
            $(".kbnumber_02").css({"background":"#FFFFFF","color":"#333333"});
            $(".kbnumber_03").css({"background":"#FFFFFF","color":"#333333"});
            $(".lastKyeList:eq(2)").css({"background":"#FFFFFF","color":"#333333"});
            kb.isMove = false;
            var index = $(this).index();
            $(".kbnumber_03:eq("+index+")").css({"background":"#3299ca","color":"#FFFFFF"});
            kb.EnglishKeyboard(kb.groupNum1_3[index]);
        });
        // $(".kbnumber_03").on({
        //       move:'',
        //       touchstart:function(e){
        //           var p = this;
        //           var index = $(this).index();
        //           p.move = setInterval(function(){
        //               kb.btn_touch(index,function(res){
        //                   kb.EnglishKeyboard(kb.groupNum1_3[res]);
        //               });
        //           },200);
        //       },
        //       touchend: function(e){
        //           clearInterval(this.move);
        //       }
        // });

        $(".keyNumRight").unbind();
        $(".keyNumRight").mousedown(function(e){
            e.stopPropagation();
            kb.isMove = false;
            var index = $(this).index();
            kb.switchNumber1(index);
        });
        // $(".keyNumRight").on({
        //       move:'',
        //       touchstart:function(e){
        //           var p = this;
        //           var index = $(this).index();
        //           p.move = setInterval(function(){
        //               kb.btn_touch(index,function(res){
        //                   if( index == 0 ){
        //                      kb.switchNumber1(res);
        //                   }
        //               });
        //           },200);
        //       },
        //       touchend: function(e){
        //           clearInterval(this.move);
        //       }
        // });

        $(".lastKyeList").unbind();
        $(".lastKyeList").mousedown(function(e){
            e.stopPropagation();
            $(".kbnumber_01").css({"background":"#FFFFFF","color":"#333333"});
            $(".kbnumber_02").css({"background":"#FFFFFF","color":"#333333"});
            $(".kbnumber_03").css({"background":"#FFFFFF","color":"#333333"});
            $(".lastKyeList:eq(2)").css({"background":"#FFFFFF","color":"#333333"});
            kb.isMove = false;
            var index = $(this).index();
            if( index == 2 ){
              $(".lastKyeList:eq("+index+")").css({"background":"#3299ca","color":"#FFFFFF"});
            }
            kb.switchNumber2(index);
        });
        // $(".lastKyeList").on({
        //       move:'',
        //       touchstart:function(e){
        //           var p = this;
        //           var index = $(this).index();
        //           p.move = setInterval(function(){
        //               kb.btn_touch(index,function(res){
        //                   if( index == 2 || index == 3 ){
        //                      kb.switchNumber2(res);
        //                   }
        //               });
        //           },150);
        //       },
        //       touchend: function(e){
        //           clearInterval(this.move);
        //       }
        // });

        $(".kb_keyboard_left").eq(0).unbind();
        $(".kb_keyboard_left").eq(0).mousedown(function(e){
            e.stopPropagation();
            $(this).fadeOut(50);
            $(this).fadeIn(50);
            kb.isMove = false;
            // $(".kb_keyboard").animate({"left":"-1000px"},200,function(){
                $(".kb_keyboard").hide();
                kb.inputIndex = '-1';
                obj.end('OK',"");
            // });
        });
        $(".kb_keyboard_left").eq(2).unbind();
        $(".kb_keyboard_left").eq(2).mousedown(function(e){
            e.stopPropagation();
            $(this).fadeOut(50);
            $(this).fadeIn(50);
            kb.isMove = false;
            // $(".kb_keyboard").animate({"left":"1000px"},200,function(){
                  $(".kb_keyboard").hide();
                  kb.inputIndex = '-1';
                  var inputval = $(obj.el).eq(kb.inputIndex).val();
                  obj.end('OK',inputval);
            // });
        });
        /*选中框*/
        kb.controlFocus();
    }
    /*符号键盘添加事件*/
    kb.action3 = function(){
        $(".leftbutton").unbind();
        $(".leftbutton").mousedown(function(e){
            e.stopPropagation();
            // $(this).fadeOut(50);
            // $(this).fadeIn(50);
            kb.isMove = false;
            var index = $(this).index();
            $(".leftbutton").css({"background":"#b9b9b9","color":"#333333"});
            if( index == 0 ){
                $(".leftbutton").eq(index).css({"background":"#59afec","color":"#FFFFFF"});
                var list = localStorage.getItem("kblist");
                if( list == null ){
                    list = [];
                }else{
                    list = JSON.parse(list);
                }
                kb.kbkeyfuhao.empty();
                var a = [];
                for(var i=0;i<list.length;i++){
                    kb.kbkeyfuhao.append($("<div class='kbkeyfuhaoList'>"+list[i].a+"<div class='XiaoJiaoFlag'>"+list[i].b+"</div></div>"));
                    a.push(list[i].a);
                }
                kb.kbfuhaoInfo = a;
                kb.style3(2),kb.action3();
            }else if( index == 1 ){
                kb.SymbolFlag = 1;
                $(".leftbutton").eq(index).css({"background":"#59afec","color":"#FFFFFF"});
                kb.kbfuhaoInfo = ["＿","*","@","～","#","￥","%","＃","＄","——","％","／","＊","＆","＼","&","｜","？",".","-","，","。","！","：","、","……","“”","；","‘’","（）","《》","〈〉","〔〕","［］","【】","·","｀","ˇ","•","+","=","｛｝","ˉ","¨","．","〃","‖","々","「」","『』","〖〗","∶","＇","＂","︿","＋","－","＝","＜",""];
                kb.kbkeyfuhao.empty();
                for(var i=0;i<kb.kbfuhaoInfo.length;i++){
                    kb.kbkeyfuhao.append($("<div class='kbkeyfuhaoList'>"+kb.kbfuhaoInfo[i]+"</div>"));
                }
                kb.style3(2),kb.action3();
            }else if( index == 2 ){
                kb.SymbolFlag = 2;
                $(".leftbutton").eq(index).css({"background":"#59afec","color":"#FFFFFF"});
                kb.kbfuhaoInfo = ["_","@","#","$","%","*","&","|","-","~",".","?","!",":","/",",","...",'"',";","'","(",")","<",">","()","[]","{}","<>","[","]","\\","`","^","+","=","{","}","","",""];
                kb.kbkeyfuhao.empty();
                for(var i=0;i<kb.kbfuhaoInfo.length;i++){
                    kb.kbkeyfuhao.append($("<div class='kbkeyfuhaoList'>"+kb.kbfuhaoInfo[i]+"</div>"));
                }
                kb.style3(2),kb.action3();
            }else if( index == 3 ){
                if( kb.HistoryBack == 2 ){
                    kb.delete(),kb.layui2(),kb.style2(),kb.action2();
                    kb.setcursurPosition(kb.cursurPosition);
                }else{
                    kb.delete(),kb.layui1(),kb.style1(1),kb.action();
                    kb.setcursurPosition(kb.cursurPosition);
                }
                kb.kbPinyin = [];
                if( kb.switchValue == 'CN' ){
                    $(".bkEnqiehuan").css({"color":"#999999"});
                    $(".bkCNqiehuan").css({"color":"#333333"});
                }else if(  kb.switchValue == 'EN' ){
                    $(".bkEnqiehuan").css({"color":"#333333"});
                    $(".bkCNqiehuan").css({"color":"#999999"});
                }
            }
        });
        $(".kbkeyfuhaoList").unbind();
        $(".kbkeyfuhaoList").mousedown(function(e){
            e.stopPropagation();
            // $(this).fadeOut(50);
            // $(this).fadeIn(50);
            kb.isMove = false;
            var index = $(this).index();
            var list = localStorage.getItem("kblist");
            if( list == null ){
                list = [];
            }else{
                list = JSON.parse(list);
            }
            if( kb.SymbolFlag == 1 ){
                var a = {a:kb.kbfuhaoInfo[index],b:"中"}
                // list.push(a);
                list.splice(0,0,a);
                var b = list.slice(0,32);
                localStorage.setItem("kblist",JSON.stringify(b));
            }else if( kb.SymbolFlag == 2 ){
                var a = {a:kb.kbfuhaoInfo[index],b:"英"}
                list.splice(0,0,a);
                var b = list.slice(0,32);
                localStorage.setItem("kblist",JSON.stringify(b));
            }
            if( kb.controltypeval != 'number' ){
                kb.EnglishKeyboard(kb.kbfuhaoInfo[index]);
            }
        });
        $(".kb_keyboard_left").eq(0).unbind();
        $(".kb_keyboard_left").eq(0).mousedown(function(e){
            e.stopPropagation();
            // $(this).fadeOut(50);
            // $(this).fadeIn(50);
            kb.isMove = false;
            // $(".kb_keyboard").animate({"left":"-1000px"},200,function(){
                $(".kb_keyboard").hide();
                kb.inputIndex = '-1';
                obj.end('OK',"");
            // });
        });
        $(".kb_keyboard_left").eq(2).unbind();
        $(".kb_keyboard_left").eq(2).mousedown(function(e){
            e.stopPropagation();
            // $(this).fadeOut(50);
            // $(this).fadeIn(50);
            kb.isMove = false;
            // $(".kb_keyboard").animate({"left":"1000px"},200,function(){
                  $(".kb_keyboard").hide();
                  kb.inputIndex = '-1';
                  var inputval = $(obj.el).eq(kb.inputIndex).val();
                  obj.end('OK',inputval);
            // });
        });
        /*选中框*/
        kb.controlFocus();
    }
    /*输入控件获取焦点*/
    kb.controlFocus = function(){
        $(obj.el).unbind('focus');
        $(obj.el).each(function(index){
             $(this).focus(function(){
                  kb.controltypeval = $(this).attr("type");
                  if( kb.controltypeval != 'button' ){
                      $(".kb_keyboard").show();
                  }
                  if( kb.inputIndex != index ){
                      var value = $(this).val()+"";
                      kb.outputletter = value.split('');
                      kb.inputIndex = index;
                      kb.addEvent(kb.inputIndex);
                      /*要显示的键盘*/
                      if( kb.controltypeval == 'number' ){
                          kb.delete(),kb.layui2(),kb.style2(),kb.action2();
                      }else if( kb.controltypeval != 'button' ){
                          kb.delete(),kb.layui1(),kb.style1(1),kb.action();
                      }
                      /*选中的键盘*/
                      if( kb.switchValue = 'EN' ){
                          // $(".bkEnqiehuan").css({"color":"#333333"});
                          // $(".bkCNqiehuan").css({"color":"#999999"});

                          kb.switchValue = 'CN';
                          kb.flagkey = '分词';
                          kb.lowercase1();
                          $(".kbkeyInner3").eq(0).html( kb.flagkey );
                          $(".kbkeyInner4").eq(2).html('，');
                          $(".kbkeyInner4").eq(3).html('空格');
                          $(".kbkeyInner4").eq(4).html('。');
                          $(".bkEnqiehuan").css({"color":"#999999"});
                          $(".bkCNqiehuan").css({"color":"#333333"});

                      }else if( kb.switchValue = 'CN' ){
                          // $(".bkEnqiehuan").css({"color":"#999999"});
                          // $(".bkCNqiehuan").css({"color":"#333333"});

                          kb.switchValue = 'EN';
                          kb.flagkey = '大写';
                          $(".kbkeyInner3").eq(0).html( kb.flagkey );
                          $(".kbkeyInner4").eq(2).html(',');
                          $(".kbkeyInner4").eq(3).html('space');
                          $(".kbkeyInner4").eq(4).html('.');
                          $(".bkEnqiehuan").css({"color":"#333333"});
                          $(".bkCNqiehuan").css({"color":"#999999"});
                          $(".kbBoxChineseBox").hide();
                          kb.kbPinyin = [];
                      }
                  }
             });
        });
    }
    /*数字键盘*/
    kb.switchNumber1 = function(index){
        if( index == 0 ){
            if( kb.cursurPosition > 0 ){
                kb.cursurPosition = kb.cursurPosition-1;
                kb.outputletter.splice(kb.cursurPosition,1);
                if( kb.inputIndex > -1 ){
                    $(obj.el).eq(kb.inputIndex).val(kb.outputletter.join(""));
                }
                kb.outputletter = kb.outputletter;
                /*设置光标位置*/
                kb.setcursurPosition(kb.cursurPosition);
            }else{
                setTimeout(function(){
                  kb.cursurPosition = $(obj.el)[kb.inputIndex].selectionStart;
                  $(obj.el).eq(kb.inputIndex).focus();
                },100);
            }
        }else{
          if( kb.controltypeval != 'number' ){
              kb.EnglishKeyboard(kb.groupNum3[index]);
          }
        }
    }
    /*数字键盘最后一排*/
    kb.switchNumber2 = function(index){
        if( index == 0 ){
            kb.HistoryBack = 2;
            kb.delete(),kb.layui3(),kb.style3(1),kb.action3();
            kb.setcursurPosition(kb.cursurPosition);
        }else if( index == 1 ){
          if( kb.controltypeval != 'number' ){
              kb.delete(),kb.layui1(),kb.style1(1),kb.action();
              kb.setcursurPosition(kb.cursurPosition);
              kb.kbPinyin = [];
              if( kb.switchValue == 'CN' ){
                  $(".bkEnqiehuan").css({"color":"#999999"});
                  $(".bkCNqiehuan").css({"color":"#333333"});
              }else if(  kb.switchValue == 'EN' ){
                  $(".bkEnqiehuan").css({"color":"#333333"});
                  $(".bkCNqiehuan").css({"color":"#999999"});
              }
          }
        }else if( index == 3 ){
          if( kb.controltypeval != 'number' ){
            kb.EnglishKeyboard(" ");
          }
        }else if( index == 4 ){
          if( kb.controltypeval != 'number' ){
            kb.EnglishKeyboard("\n");
          }
        }else{
            kb.EnglishKeyboard(kb.groupNum4[index]);
        }
    }
    /*添加输入控件事件*/
    kb.addEvent = function(index){
        $(obj.el).eq(index).unbind('mousedown');
        $(obj.el).eq(index).mousedown(function(){
              kb.flagInput = true;
              var oTxt1 = $(this)[0];
              setTimeout(function(){
                  var cursurPosition=-1;
                  if( oTxt1.selectionStart || oTxt1.selectionStart == '0' ){//非IE浏览器
                    kb.cursurPosition = oTxt1.selectionStart;
                    kb.pos = oTxt1.selectionStart;
                  }else if( document.selection ){//IE
                    var range = document.selection.createRange();
                    range.moveStart("character",-oTxt1.value.length);
                    kb.cursurPosition = range.text.length;
                  }
              },100);
        });
        /*如果是外部键盘输入*/
        $(obj.el).eq(index).unbind('keyup');
        $(obj.el).eq(index).keyup(function(event){
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if( e && e.keyCode == 8 ){
                kb.cursurPosition = kb.cursurPosition-1;
                var value = $(this).val()+"";
                kb.outputletter = value.split('');
            }else{
              var value = $(this).val()+"";
              kb.lengthtxt = value.length;
              if( !kb.flagInput ){
                  kb.outputletter = value.split('');
                  kb.cursurPosition = kb.outputletter.length;
                  if( kb.cursurPosition > 0 ){
                      kb.setcursurPosition(kb.cursurPosition);
                  }
              }else{
                  kb.outputletter = value.split('');
                  setTimeout(function(){
                    var oTxt1 = $(obj.el)[kb.inputIndex];
                    setTimeout(function(){
                        var cursurPosition=-1;
                        if(oTxt1.selectionStart){//非IE浏览器
                          kb.cursurPosition = oTxt1.selectionStart;
                        }else{//IE
                          var range = document.selection.createRange();
                          range.moveStart("character",-oTxt1.value.length);
                          kb.cursurPosition = range.text.length;
                        }
                    },100);
                  },100);
              }
            }
        });
    }
    /*设置文本光标位置*/
    kb.setcursurPosition = function(pos){
        var oTxt1 = $(obj.el)[kb.inputIndex];
        setTimeout(function(){
          // var pos = oTxt1.selectionStart;
          if( oTxt1.selectionStart || oTxt1.selectionStart == '0' ){//非IE浏览器
              oTxt1.setSelectionRange(pos,pos);
              setTimeout(function(){
                oTxt1.focus();
              },100);
          }else if( document.selection ){//IE
            var range = document.selection.createRange();
                range.collapse(true);
                range.moveEnd('character',pos)
                range.moveStart('character',pos)
                range.select();
                setTimeout(function(){
                  oTxt1.focus();
                },100);
          }
        },100);
    }
    /*大写-第一组*/
    kb.capitalize1 = function(){
        kb.group0 = ['Q','W','E','R','T','Y','U','I','O','P'];
        kb.keyBox1.empty();
        for(var i=0;i<10;i++){
          if( i == 0 ){
              kb.keyBox1.append($("<div class='kbkeyInner'>"+kb.group0[i]+"</div>"));
          }else{
              kb.keyBox1.append($("<div class='kbkeyInner kb-en'>"+kb.group0[i]+"</div>"));
          }
        }
        kb.group1 = ['A','S','D','F','G','H','J','K','L'];
        kb.keyBox2.empty();
        for(var i=0;i<9;i++){
            if( i == 0 ){
                kb.keyBox2.append($("<div class='kbkeyInner2'>"+kb.group1[i]+"</div>"));
            }else{
                kb.keyBox2.append($("<div class='kbkeyInner2 kb-en'>"+kb.group1[i]+"</div>"));
            }
        }
        kb.group2 = [kb.flagkey,'Z','X','C','V','B','N','M',''];
        kb.keyBox3.empty();
        for(var i=0;i<9;i++){
            if( i == 0 ){
                kb.keyBox3.append($("<div class='kbkeyInner3'>"+kb.group2[i]+"</div>"));
            }else{
                kb.keyBox3.append($("<div class='kbkeyInner3 kb-en'>"+kb.group2[i]+"</div>"));
            }
        }
        kb.style1(1),kb.action();
    }
    /*小写,第一组*/
    kb.lowercase1 = function(){
        kb.group0 = ['q','w','e','r','t','y','u','i','o','p'];
        kb.keyBox1.empty();
        for(var i=0;i<10;i++){
          if( i == 0 ){
              kb.keyBox1.append($("<div class='kbkeyInner'>"+kb.group0[i]+"</div>"));
          }else{
              kb.keyBox1.append($("<div class='kbkeyInner kb-en'>"+kb.group0[i]+"</div>"));
          }
        }
        kb.group1 = ['a','s','d','f','g','h','j','k','l'];
        kb.keyBox2.empty();
        for(var i=0;i<9;i++){
            if( i == 0 ){
                kb.keyBox2.append($("<div class='kbkeyInner2'>"+kb.group1[i]+"</div>"));
            }else{
                kb.keyBox2.append($("<div class='kbkeyInner2 kb-en'>"+kb.group1[i]+"</div>"));
            }
        }
        kb.group2 = [kb.flagkey,'z','x','c','v','b','n','m',''];
        kb.keyBox3.empty();
        for(var i=0;i<9;i++){
            if( i == 0 ){
                kb.keyBox3.append($("<div class='kbkeyInner3'>"+kb.group2[i]+"</div>"));
            }else{
                kb.keyBox3.append($("<div class='kbkeyInner3 kb-en'>"+kb.group2[i]+"</div>"));
            }
        }
        kb.style1(1),kb.action();
    }
    /*第三组*/
    kb.switch3 = function(index){
        if( index == 0 && kb.flagkey == '大写' ){
            kb.flagkey = '小写';
            $(".kbkeyInner3").eq(0).html(kb.flagkey);
            kb.capitalize1();
        }else if( index == 0 && kb.flagkey == '小写' ){
            kb.flagkey = '大写';
            $(".kbkeyInner3").eq(0).html(kb.flagkey);
            $(".kbkeyInner3").eq(0).html(kb.flagkey);
            kb.lowercase1();
        }else if( index == 0 && kb.flagkey == '分词' ){
            kb.EnglishKeyboard("'");
        }else if( index == 8 ){
            if( kb.switchValue == 'EN' ){
                if( kb.cursurPosition>0){
                    kb.cursurPosition = kb.cursurPosition-1;
                    kb.outputletter.splice(kb.cursurPosition,1);
                    if( kb.inputIndex > -1 ){
                        $(obj.el).eq(kb.inputIndex).val(kb.outputletter.join(""));
                    }
                    kb.outputletter = kb.outputletter;
                    /*设置光标位置*/
                    kb.setcursurPosition(kb.cursurPosition);
                }else{
                    setTimeout(function(){
                      kb.cursurPosition = $(obj.el)[kb.inputIndex].selectionStart;
                      $(obj.el).eq(kb.inputIndex).focus();
                    },100);
                }
            }else if( kb.switchValue == 'CN' ){
                kb.kbPinyin.pop();
                if( kb.kbPinyin.length > 0 ){
                    kb.deleteInfoUser = false;
                    $(".kbBoxChinesePinYin").show();
                }else{
                    $(".kbBoxChinesePinYin").hide();
                }
                var index = kb.kbPinyin.join("");
                $(".kbBoxChinesePinYin").html(index);
                var pinyinList = kb.simplified[index];
                if( pinyinList != undefined ){
                    kb.allPinYinHanZi = pinyinList.split('|')
                    var b = kb.allPinYinHanZi.slice(0,20);
                    kb.showChineseHanZi.empty();
                    for( var i=0;i<b.length;i++){
                        kb.showChineseHanZi.append($("<div class='showChineseHanZiList'>"+b[i]+"</div>"));
                    }
                    kb.HuanziStyle(),kb.action();
                }else{
                    kb.showChineseHanZi.empty();
                    kb.showChineseHanZi.append($("<div class='showChineseHanZiList'>E-labhome输入法</div>"));
                    kb.HuanziStyle();
                    $(".showChineseHanZiList").css({"width":"100%","font-weight":"10","color":"#b5b1b1"});
                }
                /*后退文本框*/
                if( kb.deleteInfoUser ){
                    if( kb.cursurPosition>0){
                        kb.cursurPosition = kb.cursurPosition-1;
                        kb.outputletter.splice(kb.cursurPosition,1);
                        if( kb.inputIndex > -1 ){
                            $(obj.el).eq(kb.inputIndex).val(kb.outputletter.join(""));
                        }
                        kb.outputletter = kb.outputletter;
                        /*设置光标位置*/
                        kb.setcursurPosition(kb.cursurPosition);
                    }else{
                        setTimeout(function(){
                          kb.cursurPosition = $(obj.el)[kb.inputIndex].selectionStart;
                          $(obj.el).eq(kb.inputIndex).focus();
                        },100);
                    }
                }
                if( kb.kbPinyin.length == 0 ){
                    // $(".kbBoxChineseBox").hide();
                    kb.deleteInfoUser = true;
                    if( kb.cursurPosition > 0 ){
                      kb.setcursurPosition(kb.cursurPosition);
                    }
                }
            }
        }else{
            kb.getinput(kb.group2[index], kb.switchValue);
        }
    }
    /*第四组-切换中英*/
    kb.switch4 = function(index){
        if( index == 5 && kb.switchValue == 'EN' ){
            if( kb.cursurPosition > 0 ){
                kb.setcursurPosition( kb.cursurPosition );
            }
            kb.switchValue = 'CN';
            kb.flagkey = '分词';
            kb.lowercase1();
            $(".kbkeyInner3").eq(0).html( kb.flagkey );
            $(".kbkeyInner4").eq(2).html('，');
            $(".kbkeyInner4").eq(3).html('空格');
            $(".kbkeyInner4").eq(4).html('。');
            $(".bkEnqiehuan").css({"color":"#999999"});
            $(".bkCNqiehuan").css({"color":"#333333"});
        }else if( index == 5 && kb.switchValue == 'CN' ){
            if( kb.cursurPosition > 0 ){
                kb.setcursurPosition( kb.cursurPosition );
            }
            kb.switchValue = 'EN';
            kb.flagkey = '大写';
            $(".kbkeyInner3").eq(0).html( kb.flagkey );
            $(".kbkeyInner4").eq(2).html(',');
            $(".kbkeyInner4").eq(3).html('space');
            $(".kbkeyInner4").eq(4).html('.');
            $(".bkEnqiehuan").css({"color":"#333333"});
            $(".bkCNqiehuan").css({"color":"#999999"});
            $(".kbBoxChineseBox").hide();
            kb.kbPinyin = [];
        }else{
            if( kb.group3[index] == '符' ){
                kb.HistoryBack = 1;
                kb.delete(),kb.layui3(),kb.style3(1),kb.action3();
                kb.setcursurPosition(kb.cursurPosition);
            }else if( kb.group3[index] == '123'){
                kb.delete(),kb.layui2(),kb.style2(),kb.action2();
                kb.setcursurPosition(kb.cursurPosition);
            }else if( kb.group3[index] == ''){
                kb.EnglishKeyboard("\n");
            }else if( kb.group3[index] == '空格'){
                kb.EnglishKeyboard(" ");
            }else if( kb.group3[index] == 'space'){
                kb.EnglishKeyboard(" ");
            }else if( index == 2 ){
                if( kb.switchValue == 'CN' ){
                    kb.EnglishKeyboard("，");
                }else if( kb.switchValue == 'EN' ){
                    kb.EnglishKeyboard(",");
                }
            }else if( index == 4 ){
              if( kb.switchValue == 'EN' ){
                  kb.EnglishKeyboard(".");
              }else if( kb.switchValue == 'CN' ){
                  kb.EnglishKeyboard("。");
              }
            }else{
                kb.getinput(kb.group3[index]);
            }
        }
    }
    kb.delete = function(){
        $(".kb_keyboard").empty();/*删除*/
    }
    kb.kbhide = function(){
        $(".kb_keyboard").hide();
    }
    kb.kbshow = function(){
        $(".kb_keyboard").show();
    }
    kb.pageElements = function(){
        $("input").addClass('kbInputClass');
        $("textarea").addClass('kbInputClass');
    }
    kb.run = function(){
        kb.simplified = new kbSimplified();/*导入中文键盘*/
        kb.layui1(),kb.style1(0),kb.action();/*默认英文键盘*/
    }
    return kb;
}

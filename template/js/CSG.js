/**
 * TanLin
 */
function CodeScanningGrab(obj){
	var csg = Object();
	csg.interval = '';
	csg.inputIndex = 1;
	csg.listen = function(){
			var v = $(obj.el).val();
			if( v != '' ){
				$(obj.el).val("");				
				obj.success(v);
				clearInterval(csg.interval);
				$(obj.el).blur();
				setTimeout(function(){
					$(obj.el).focus();
				},obj.time);
			}
	}
	csg.judge = function(c){
			var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\/])+$/;
			if(!reg.test(c)){
					return {name:"other",conent:c};
			}else{
					return {name:"url",conent:c};
			}
	}
	csg.initFocus = function(){
			$(obj.el).focus();
	}
	csg.init = function(){
			$(obj.el).focus(function(){
					clearInterval(csg.interval);
					csg.interval = setInterval(csg.listen,obj.time);
			});
			$(obj.el).focus();
			if( obj.addClick != undefined ){
					$(obj.addClick).click(function(){
								if( csg.inputIndex == 1 ){
										// csg.inputIndex = 2;
										// $(obj.addClass).eq(0).hide();
										// $(obj.addClass).eq(1).show();
										// $(obj.addClass).eq(1).focus();
										// clearInterval(csg.interval);
										$(obj.addClass).eq(0).show();
										$(obj.addClass).eq(1).hide();
										csg.initFocus();
										if( obj.endClick != undefined ){
												obj.endClick(csg.inputIndex);
										}
								}else{
										// csg.inputIndex = 1;
										$(obj.addClass).eq(0).show();
										$(obj.addClass).eq(1).hide();
										csg.initFocus();
										if( obj.endClick != undefined ){
												obj.endClick(csg.inputIndex);
										}
								}
					});
			}
	}
	csg.init();
	return csg;
}

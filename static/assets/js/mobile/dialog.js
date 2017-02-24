var Dialog = {
	CreateDialog:function(setting){ //手机端 弹窗
		$body = $('body');
		var _this = this;
	    this.cssStyle = [
	        '<style type="text/css" id="dialog-style">',
	        '.dialog-mask{display:block;position:fixed;z-index:9000;width:100%;height:100%;background:#000000;background:rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.Alpha(opacity=60);top:0;cursor:pointer}.dialog-area{overflow:hidden;position:fixed;z-index:9100;left:50%;top:50%;color:#000;background-color:#fff;border-radius:.25rem;-moz-border-radius:.25rem;-webkit-border-radius:.25rem}.dialog-temp{margin-left:-7rem;width:14rem;height:auto;margin-top:-3.5rem}.dialog-title{text-align:center;color:#333;padding:.65rem 1rem 0;font:600 .8rem/.95rem "Microsoft YaHei",tahoma,arial,sans-serif}.dialog-content{text-align: center;color:#888;padding:1.15rem 1rem;font:100 .7rem/.95rem "Microsoft YaHei",tahoma,arial,sans-serif}.dialog-btns{height:2.62rem}.dialog-btn:active{background-color:#f5f5f5;}.dialog-btn{text-align:center;width:50%;height:100%;margin:0 auto;color:#323230;font:100 .75rem/2.62rem "Microsoft YaHei",tahoma,arial,sans-serif}.pull-left{float:left}',
	        '.thinner-boder-left{position:relative}.thinner-boder-left:before{content:"";position:absolute;width:1px;height:5.24rem;border-left:1px solid #d4d4d4;-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-ms-transform-origin:0 0;-o-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scale(0.5,0.5);-ms-transform:scale(0.5,0.5);-o-transform:scale(0.5,0.5);transform:scale(0.5,0.5);-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.thinner-border-top{position:relative}.thinner-border-top:before{content:"";position:absolute;width:200%;height:200%;border-top:1px solid #d4d4d4;-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-ms-transform-origin:0 0;-o-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scale(0.5,0.5);-ms-transform:scale(0.5,0.5);-o-transform:scale(0.5,0.5);transform:scale(0.5,0.5);-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}',
	        '.pt-page-moveFromBottom{-webkit-animation:moveFromBottom .6s ease both;animation:moveFromBottom .6s ease both}@-webkit-keyframes moveFromBottom{from{-webkit-transform:translateY(100%)}}@keyframes moveFromBottom{from{-webkit-transform:translateY(100%);transform:translateY(100%)}}',
	        '</style>'
	    ].join('');
	    this.template = {
			mask:'<div class="dialog-mask maxWidth"></div>'
		};
		this._setting = {
			cancelBtn:''
			,otherBtns:[] //[{text: string, func: function}]
			,maskClickTrigger: false
			,thinborder: true
	        ,title: null
			,content: null
		};
	    this.setting = $.extend(this._setting, setting);
		this.hide = function(){
			$("div[class^=dialog]").remove();
		};
		this.maskClickEvent = function(){
			if(_this.setting.maskClickTrigger){
				_this.hide();
			}
		};
		this.init = function(){
			$body.append(($('#dialog-style').length===0)?_this.cssStyle:'');
			$body.append(($('.dialog-mask').length===0)? $(_this.template.mask).off().on('click', _this.maskClickEvent):'');
			var mainDiv = $('<div class="dialog-area"></div>');
			mainDiv.addClass('dialog-temp').addClass('pt-page-moveFromBottom');
	        this.setting.title && mainDiv.append(['<div class="dialog-title">',this.setting.title,'</div>'].join(''));
	        this.setting.content && mainDiv.append(['<div class="dialog-content">',this.setting.content,'</div>'].join(''));
	       	this.setting.thinborder && mainDiv.append(['<div class="thinner-border-top"></div>'].join(''));
			
			var btnsDiv = $('<div class="dialog-btns"></div>');

	        if(this.setting.otherBtns.length){
	        	this.setting.cancelBtn && btnsDiv.append($('<div class="dialog-btn pull-left">'+this.setting.cancelBtn+'</div>').off().on('click', this.hide));
	        	this.setting.otherBtns.map(function(btn,index) {
	        		btnsDiv.append('<div class="thinner-boder-left"></div>');
	        		btnsDiv.append(
	        			$('<div class="dialog-btn pull-left">'+btn.title+'</div>').off().on('click',btn.func)
	        		);
	            });
	        }
	        else{
	        	this.setting.cancelBtn && btnsDiv.append($('<div class="dialog-btn" style="width: 100%;">'+this.setting.cancelBtn+'</div>').off().on('click', this.hide));
	        }
	        mainDiv.append(btnsDiv);
	        $body.append(mainDiv);
		};
	},
	ShowDialog:function(setting){
		var dg = new Dialog.CreateDialog(setting);
		dg.init();
	},
	RemoveDialog:function(){
		$("div[class^=dialog]").remove();
	}
};

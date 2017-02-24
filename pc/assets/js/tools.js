var Tools = {
	Modal:function (setting) {
	    this.defaultSetting = {
	        cancelButton: '返回',
	        otherButton: null, // [{title: String, func: function}]
	        content: null,
	        title: null,
	        target: 'body',
	        targetEventFunc: function() {},
	        targetEvent: 'click',
	        css: {
	            position: 'fixed',
	            height: 270,
	            width: 500,
	            left: '50%',
	            top: '50%',
	            'margin-left': -250,
	            'margin-top': -135
	        }
	    };
	    this.setting = $.extend(this.defaultSetting, setting);
	    this.cssStyle=[
	        '<style type="text/css" id="modal-style" media="screen">',
	        '.modal-mask{position:fixed;left:0;top:0;width:100%;height:100%;background-color:#000;opacity:0.4;filter:Alpha(40);z-index:1000}.modal{z-index:1200;position:relative}.modal .modal-content{position:relative;overflow:hidden;background-color:#fff}.modal .modal-content .modal-header{border-bottom:0;position:relative;height:60px;margin-bottom:3px}.modal .modal-content .modal-header h4{margin:0 auto;text-align:center;font:bold 24px/60px "Microsoft YaHei",tahoma,arial;color:#333}.modal .modal-content .modal-header .close{position:absolute;right:23px;top:23px;height:13px;width:13px;background:url("assets/images/newmall/icon-close.png") no-repeat;background-size:contain;cursor:pointer}.modal .modal-content .modal-body{text-align:center;min-height:88px;font:300 18px/24px "Microsoft YaHei",tahoma,arial;color:#333}.modal .modal-content .modal-footer{background-color:transparent;position:relative;bottom:40px;overflow:hidden;text-align:center;margin:30px auto 40px}.modal .modal-content .modal-footer .btn{padding: 0 !important;float:left;margin-left:20px;width:160px;height:48px;font:100 14px/48px "Microsoft YaHei",tahoma,arial;color:#fff;cursor:pointer}.btn:hover{background-color: #999 !important;}.modal .modal-content .modal-footer .btn:first-child{margin-left:0}.modal .modal-content .modal-footer .btn-cancel{background-color:#999}.modal .modal-content .modal-footer .btn-primary{background-color:#333}',
	        '.pt-page-moveFromBottom{-webkit-animation:moveFromBottom .6s ease both;animation:moveFromBottom .6s ease both}',
	        '@-webkit-keyframes moveFromBottom{from{-webkit-transform:translateY(100%)}}@keyframes moveFromBottom{from{-webkit-transform:translateY(100%);transform:translateY(100%)}}',
	        '</style>'
	    ].join('');
	    this.hide = function(event) {
	        event.preventDefault();
	        $('body').css('overflow', 'auto');
	        $('.modal-mask').hide();
	        $(/#[\w\-]+\b/.exec(setting.target)[0] + '-modal').remove();
	    };
	    this.init = function() {
	    	$('body').css('overflow', 'hidden');
	        var mainDiv =
	            $('<div class="modal" id="' +
	                /[\w+\-]+\b/.exec(this.setting.target)[0] +
	                '-modal">')
	                .append($('<div class="modal-dialog pt-page-moveFromBottom"><div class="modal-content"></div></div>')
	                    .css(this.setting.css));
	        var div = mainDiv.find('.modal-content');
	        // header & title
	        div.append($('<div class="modal-header"></div>')
	            .append($('<div class="close"></div>')
	                .off().on('click', this.hide)));
	        if (this.setting.title) {
	            div.find('.modal-header')
	                .append('<h4>' + this.setting.title + '</h4>')
	        }
	        // body & content
	        if (this.setting.content) {
	            div.append($('<div class="modal-body"></div>')
	                .append(this.setting.content));
	        }
	        // footer
	        div.append($('<div class="modal-footer"></div>')
	            .width(160 + this.setting.otherButton.length * 180)
	            .append($('<div class="btn btn-cancel">' + this.setting.cancelButton + '</div>')
	                .off().on('click', this.hide)));
	        if (this.setting.otherButton) {
	            var footer = div.find('.modal-footer');
	            this.setting.otherButton.map(function(btnInfo) {
	                footer.append(
	                    $('<div class="btn btn-primary">' + btnInfo['title'] + '</div>')
	                        .off().on('click', btnInfo['func']));
	            });
	        }
	        $('body')
	        	.append(($('#modal-style').length===0)?this.cssStyle:'')
	        	.append(mainDiv);
	        $(setting.target).on(setting.targetEvent, setting.targetEventFunc);
	        if ($('.modal-mask').length === 0) {
	            $('body').append($('<div class="modal-mask"></div>')
	                .off().on('click', undefined));
	        }
	        else{
	        	$('.modal-mask').show();
	        }
	        return mainDiv;
	    };
	},
	UseModal:function(otherButtonArr,cancelButtonText,showContent,cssObj){
    	var modal;
        var $modal = $('#modal-modal');
        if ($modal.length) {
            $modal.show();
        } else {
            var m = new Tools.Modal({
                    otherButton: otherButtonArr,
                    cancelButton: cancelButtonText,
                    content: showContent,
                    target: '#modal-target',
                    css: cssObj
                });
            modal = m.init();
        }
        $('.modal-mask').show();
    }
};

var p = {};
p.init = function() {
	p.initVar();
	p.initCss();
	p.initEvent();
	user.checkLogin(p.initData);
};
p.initVar = function() {
	$logOut=$('#logOut')
};
p.initCss = function() {
	$out_wrap.css("visibility","visible");
};
p.initData = function() {
	if(user.currentUser.get('userRole')=='Users'){
		$('.j_users_see').show();
	}else{
		$('.j_admins_see').show();
	}
};
p.initEvent = function() {
	$logOut.on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		Dialog.ShowDialog({
	        title: '',
	        otherBtns: [{
	        	title:'确定',
	        	func: function() {
	        		user.logOut();
	            }
	        }],
	        cancelBtn: '取消',
	        content: '是否退出当前账号？'
		});
	});
};
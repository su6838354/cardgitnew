var p={
	'classname':'Users'
};
p.init=function() {
	p.initVar();
	p.initCss();
	p.initEvent();
};
p.initVar=function() {
	$j_login_btn=$out_wrap.find('.j_login_btn');
	$j_wait_tip=$out_wrap.find('.j_wait_tip');
	p.l='立即登录';
};
p.initCss=function() {
	$out_wrap.css("visibility","visible");
};
p.initEvent=function() {
	$out_wrap.delegate('.j_login_btn', 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var $username=$('#username');
		if(!$username.val()){
			$username.focus();
			return false;
		}
		if($j_login_btn.hasClass(misc.vars.disable)){
			return false;
		}
		$j_login_btn.addClass(misc.vars.disable);
		btnText($j_login_btn,'正在登录...',0);
		user.logIn({
			"userRole": p.classname,
			"userName": $username.val().toLowerCase(),
			"userPwd": "123456"
		},function(res){
	    	if(res.code){
	    		misc.fillAlert($j_wait_tip,res.msg);
	    		$j_login_btn.html(p.l);
				$j_login_btn.removeClass(misc.vars.disable);
	    	}else{
            	misc.clearCookie('userInfo');
	  			res.data['age']=misc.getAge(res.data['birth']);
	  			res.data['arole']=res.data['political']=="团员"?(res.data['age']<=28?'团员':'青年'):res.data['political'].replace(/[S]/gm, '');
            	res.data['userRole']=p.classname;
	    		misc.setCookie('userInfo',JSON.stringify(res.data),1);
	    		misc.fillAlert($j_wait_tip,'登录成功!');
				waitRedirect('../../mobile/index/',500);

				// misc.clearCookie('userInfo');
    //         	var res={data:{}};
    //         	res.data['age']=28;
    //         	res.data['group']={
    //         		"pid":"57071cdda34131004cfea8fe",
    //         		"name":"建管委"
    //         	};
    //         	res.data['location']={
    //         	};
	  	// 		res.data['arole']="团员"
    //         	res.data['userRole']="Users";
    //         	res.data['realname']="李琰";
    //         	res.data['username']="ly0522";
    //         	res.data['pid']="57109f762e958a0069edaaa3";
    //         	res.data['isShow']="1";
	   //  		misc.setCookie('userInfo',JSON.stringify(res.data),1);

	    		// misc.setCookie('userInfo','{"userRole":"Users","username":"ly0522","group":{"username":"shcm_jgw","tel":"13916943886 13816828918","name":"建管委","objectId":"57071cdd71cfe400542f07c4","mobile":"13916943886 13816828918","updatedAt":"2016-05-07T10:01:20Z","pid":"57071cdda34131004cfea8fe","isShow":"1","person":"邵军 顾禹龙","pwd":"152009","address":"人民路138号","type":"group","createdAt":"2016-04-08T02:52:13Z","flagNumber":null},"realname":"李琰","objectId":"57109f762e958a005c9e6b8e","mobile":"13816919305","political":"团员","checkin":["true","2016","05","23","14:41:59"],"idcard":"630104198808280522","pid":"57109f762e958a0069edaaa3","isShow":"1","sex":"女","job":"职员","location":null,"birth":"1988-08-27T16:00:00Z","address":"上海市崇明县鼓浪屿路1000弄164号301","updatedAt":"2016-05-23T06:41:59Z","createdAt":"2016-04-15T07:59:50Z","flagNumber":"16005125","age":"28","arole":"团员"}',1);

	    		
	    	}
	    },function(err){
    		misc.fillAlert($j_wait_tip,'服务器不给力哦!');
    		$j_login_btn.html(p.l);
			$j_login_btn.removeClass(misc.vars.disable);
	    });
	});
};





var p={};
p.init=function() {
	p.initVar();
	$out_wrap.css("visibility","visible");
	user.checkLogin(p.initData);
	p.initEvent();
};
p.initVar = function() {
	id=misc.getParam('id');
	$propertys=$('.Users .property');
	activities=[];
	_user={};
	enable=checkIn=false;
};
p.initData = function() {
	if(!id){
		loadingHide();
		$out_wrap.find('.profile-box').html('<div style="width:100%;text-align:center;margin-top:30px;"">查无此人</div>');
		return false;
	}
	if(user.currentUser.get('userRole')=="Admins"){
		p.loadUserById(p.renderUserInfo); //查看用户资料
	}else{
		loadingHide();
		$out_wrap.find('.profile-box').html('<div style="width:100%;text-align:center;margin-top:30px;"">请交给管理员扫描</div>');
	} 
};
p.loadUserById = function(callback){
	misc.func.user.get_user({
		"pid":id
	},function(res){
		loadingHide();
		if(res.code){
			$out_wrap.find('.profile-box').html('<div style="width:100%;text-align:center;margin-top:30px;"">查无此人</div>');
		}else if(res.data){
			_user=res.data;
			if(_user && _user.pid){
				_user.get=function(prop){
					return _user[prop];
				};
				_user['age']=misc.getAge(new Date(_user['birth']));
				_user['arole']=_user['political']=="团员"?(_user['age']<=28?'团员':'青年'):_user['political'].replace(/[S]/gm, '');
				callback();
			}
			else{
				$out_wrap.find('.profile-box').html('<div style="width:100%;text-align:center;margin-top:30px;"">查无此人！</div>');
			}
		}
	},function(err){
		$out_wrap.find('.profile-box').html('<div style="width:100%;text-align:center;margin-top:30px;"">服务器不给力哦！</div>');
	});
};
p.renderUserInfo = function(){
	var obj = _user;
	$propertys.eq(0).append(obj.get('username'));
	$propertys.eq(1).append(obj.get('realname'));
	$propertys.eq(2).append(obj.get('sex'));
	$propertys.eq(3).append(obj.get('age')+'岁');
	$propertys.eq(4).append(obj.get('arole'));
	$propertys.eq(5).append(obj.get('job'));
	$propertys.eq(6).append(obj.get('group')?obj.get('group')['name']||'无':'无');
	$propertys.eq(7).append(obj.get('location')?obj.get('location')['name']||'无':'无');
	$propertys.eq(8).append(obj.get('checkin')[0]=="true"?'已报到':'未报到').css('color',obj.get('checkin')[0]=="true"?'green':'red');
	if(obj.get('checkin')[0]!=="true"){//未报到
		var temp='';
		var location=obj.get('location')||{};
		var group=obj.get('group')||{};
		if(location['pid']==user.currentUser.pid){
			// 扫码出的用户的所在居委是当前负责报到的管理员用户
			checkIn=true;
			temp='<span class="check-in-btn j_save_checkin">点此报到</span>';
		}
		else if(!location['pid'] && group['pid']==user.currentUser.pid){
			// 扫码出的用户没有居委，则用户的所在单位是当前负责报到的管理员用户
			checkIn=true;
			temp='<span class="check-in-btn j_save_checkin">点此报到</span>';
		}
		$propertys.eq(8).append(temp);
	}
	$('.Users').show();
	p.loadActivities();
};
p.loadActivities=function(){
    var param={
		"user":_user.get('pid'),
	  	"admin":user.currentUser.get('pid'),
		"page_index": 1,
		"limit": 100,
		"join": false
	}
	misc.func.activity.get_activities_by_join(param,function(res){
    	if(res.code===0&&res.data){
    		activities=res.data;
			if(activities.length){
				var arr = [
					'<select class="activitiy-select j_activitiy_select">',
					'<option value="" selected="selected">请选择所参加的活动</option>'
				];
				for (var i = activities.length-1; i>=0; i--) {
					var obj=activities[i];
					arr.push('<option value=',obj.objectId,'>',obj["title"],'</option>');
				}
				arr.push('</select>');
				arr.push([
					'<select class="activitiy-select j_star_select">',
					'<option value="" selected="selected">请选择评分星级</option>',
					'<option value="5">5星</option>',
					'<option value="4">4星</option>',
					'<option value="3">3星</option>',
					'<option value="2">2星</option>',
					'<option value="1">1星</option>',
					'</select>'
				].join(''));
				arr.push('<div class="save-btn j_save">提交</div>');
				if(arr.length==5) return false;
				$out_wrap.find('.profile-box').append(arr.join(''));
				enable = true;
		  	}
    	}
    },function(err){

    });
};
p.createActJoinLog = function(value1,value2){
	var activity = activities.filter(function(d){ return d.objectId == value1 })[0];
	var isInner=false;
	p.param={
	  	"star": value2,
		"admin":activity.admin_id,
		"activity":activity.objectId,
		"user":_user.pid,
		"userGroupArr":"",
		"userLocationArr":""
	};
    var group=_user.get('group');
    if(group&&group.pid){
    	p.param["userGroupArr"]=group.pid;
    	isInner=(activity.admin_id==group.pid);
    }
    var location=_user.get('location');
    if(location&&location.pid){
    	p.param["userLocationArr"]=location.pid;
    	isInner=(activity.admin_id==location.pid);
    }
	p.param["isInner"]=isInner;
    var $this=$('.j_save');
	misc.func.activity.create_act_join_log(p.param,function(res){
		debugger
		if(res.code=="0"&&res.data){
			$this.html('提交成功');
		}else{
	    	enable = true;
			$this.html('提交失败');
			btnText($this,'重新提交');
		}
	},function(err){
    	enable = true;
		$this.html('提交失败');
		btnText($this,'重新提交');
	});
};
p.initEvent = function(){
	$out_wrap.delegate('.j_save', 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var $selects = $('select.activitiy-select');
		var v0 = $.trim($selects.eq(0).val()),
		v1 = $.trim($selects.eq(1).val());
		if(enable){
			if(!v0){
				$selects.eq(0).focus();
			} else if(!v1){
				$selects.eq(1).focus();
			} else{
				enable = false;
				p.createActJoinLog(v0,parseInt(v1));
			}
		}
	});
	$out_wrap.delegate('.j_save_checkin', 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		checkIn && p.saveCheckIn();
	});
};
p.saveCheckIn = function(){
    checkIn=false;
    var $this = $('.j_save_checkin');
    var cd = new Date();
    var checkinArr = [];
    checkinArr.push("true");
    checkinArr.push(misc.formatDateTime(cd,misc.formatType['5']));
    checkinArr.push(misc.formatDateTime(cd,misc.formatType['6']));
    checkinArr.push(misc.formatDateTime(cd,misc.formatType['7']));
    checkinArr.push(misc.formatDateTime(cd,misc.formatType['8']));
    var param={
		"user": _user.pid,
		"checkin": checkinArr
    };
    $this.html('报到中...');
    misc.func.user.update_user_checkin(param,function(res){
    	if(res.code=="0"){
			$this.html('报到成功');
			$this.parent().css('color','green').html('<label>状态：</label>已报到');
    	}else{
			checkIn = true;
			$this.html('报到失败');
			btnText($this,'重新报到');
    	}
    },function(err){
		checkIn = true;
		$this.html('报到失败');
		btnText($this,'重新报到');
    });
};
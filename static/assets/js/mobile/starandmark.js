var p={};
p.init=function() {
	p.initVar();
	user.currentUser.get=function(prop){
		return user.currentUser[prop];
	};
	if(!user.currentUser.get('userRole')=='Users'){
		p.id=user.currentUser.pid;
		user.checkLogin(p.initData);
	}else{
		p.id=misc.getParam('id');
		p.getUserInfoById(p.id,p.commonCheckLog,p.loadMyActJoinLog);
	}
};
p.initVar=function() {
	mark=0;
	$star_count_log=$('.star-count-log');
};
p.initData = function() {
	p.showMyCheckLog();
	p.loadMyActJoinLog();
};
p.loadMyActJoinLog = function(){
	misc.func.activity.get_act_join_log({
		"user":user.currentUser.get('pid'),
	  	"page_index": 1,
  		"limit": 1000
	},function(res){
		loadingHide();
		$out_wrap.css("visibility","visible");
		if(res.code===0&&res.data){
			datas=res.data;
			var l=datas.length,act_count=0,extra_total=0;
			var arr=[];
			if(l>0){
				for (var i = 0; i < l; i++) {
					var obj = datas[i];
					obj.get=function(prop){
						return obj[prop];
					};
					extra_total += obj.get('extra')||0;
					act_count += obj.get('star')||0;
					arr.push([
						'<li>',
							'<div class="name">',mark+i+1,'. ',obj.get("activity__name")||"活动名",'</div>',
							'<div class="marks">',(1+obj.get("extra")),'分</div>',
							'<div class="stars">',obj.get('star'),'星</div>',
						'</li>'
					].join(''))
				}
				$out_wrap.find('.j_mark_count').html(mark+l+extra_total);
				$out_wrap.find('.j_star_count').html(act_count);
				$star_count_log.append(arr.join('')).show();
			}
			else{
				$out_wrap.find('.j_mark_count').html(mark+l);
			}
		}else{
			$out_wrap.find('.j_mark_count').html(mark);
		}
	},function(err){
		loadingHide();
		$out_wrap.css("visibility","visible");
		$out_wrap.find('.j_mark_count').html(mark);
	});
};
p.showMyCheckLog = function(){
	if(user.userInfo.get("checkin")[0]=="true"){
		p.commonCheckLog();
	}
};
p.commonCheckLog = function(){
	mark=1;
	$star_count_log.append([
		'<li>',
			'<div class="name">',1,'. 报到</div>',
			'<div class="marks">1分</div>',
			'<div class="stars"></div>',
		'</li>'
	].join('')).show();
};
p.getUserInfoById = function(id,callback1,callback2){
	misc.func.user.get_user({
		"pid": id
	},function(res){
		if(res.code=="0"&&res.data){
			var data=res.data;
			data.get=function(prop){
				return data[prop];
			};
			if(data.pid){
		  		$('.user-profile')
		  			.append(data.get("username")+'&nbsp;&nbsp;')
		  			.append(data.get("realname")+'<br/>')
		  			.show();
		  		var gr = data.get('group');
		  		if(gr){
		  			$('.user-profile').append("单位："+gr.name+'<br/>');
		  		}
		  		var lo = data.get('location');
		  		if(lo){
		  			$('.user-profile').append("居委："+lo.name+'<br/>');
		  		}
		  		data.get("checkin")[0]=="true" && callback1 && callback1();
		  		callback2 && callback2();
		  	}
		}else{

		}
	},function(err){

	}); 
};
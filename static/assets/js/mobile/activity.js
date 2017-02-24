var p = {};
p.init=function() {
	p.initVar();
	user.checkLogin(p.initData);
};
p.initVar=function(){
	$box=$('.box');
	id=misc.getParam('id');
	activity = {};
	p.size=10;
	p.page=0;
};
p.initData=function(){
	if(id){
		p.loadActivity();
	}else{
		loadingHide();
		Dialog.ShowDialog({
	        title: '',
	        otherBtns: [],
	        cancelBtn: '我知道啦',
	        content: '活动不存在哦！'
		});
	}
};
p.loadActivity=function(){
	misc.func.activity.get_activity({
		"objectId": id
    },function(res){
		loadingHide();
		$out_wrap.css("visibility","visible");
    	if(res.code){
    		Dialog.ShowDialog({
		        title: '温馨提示',
		        otherBtns: [],
		        cancelBtn: '我知道了',
		        content: '当前活动不存在！'
			});
    	}else if(res.data){
    		activity=res.data;
			if(activity && activity.objectId){
				$box.find('.title').append(activity['title']);
				$box.find('.date').append(misc.formatDateTime(new Date(activity.createdAt),misc.formatType["3"]));

				$box.find('.tags li').eq(0).append(activity['admin']['name']);
				activity['place'] && $box.find('.tags li').eq(1).append("活动地点："+activity['place']);
				activity['limit'] && $box.find('.tags li').eq(2).append("建议人数："+activity['limit']);
				var pArr = activity['content'].split('-b');
				for (var i = 0,l = pArr.length; i < l; i++) {
					$box.find('.content').append('<p>'+pArr[i]+'</p>');
				}
				renderingByRole();
			}
    	}
    },function(err){
    	Dialog.ShowDialog({
	        title: '温馨提示',
	        otherBtns: [],
	        cancelBtn: '我知道了',
	        content: '服务器不给力哦！'
		});
    }); 
};
function renderingByRole(){
	// 得到活动报名人数
    misc.func.activity.get_act_registration_count({
		"activity": activity.objectId
    },function(res){
    	if(res.code=="0"&&res.data){
    		p.count=res.data.count;
    		p.count>0 && $out_wrap.find('.j_join_count').html(p.count);
    	}
    },function(err){

    });
	if(user.currentUser.get('userRole')=='Admins' && user.currentUser.pid==activity.admin.pid){
		$out_wrap.append([
			'<div class="thinner-border" style="width:90%;margin:0 auto;"></div>',
			'<div class="comments-title j_reply">',
				'<span class="count">报名人员列表</span>',
			'</div>',
			'<div class="comments">',
				'<ul class="list j_join_list"></ul>',
				'<div class="clearboth"></div>',
			'</div>',
			'<div class="more j_loadmore" style="border:none;"><img class="loading-img" src="../../static/assets/images/mobile/loading.jpg"><span>正在加载...</span></div>',
			'<div class="edit-btn" onclick="location.href=',("'../activitycreateoredit/?id="+activity.objectId+"'"),'" ><p style="margin-top:.5rem">修改</p><p>活动</p></div>',
		].join(''));
		p.ActRegistration();
	}
	else if(user.currentUser.get('userRole')=='Users'){
		//查看该用户是否报名过该活动
		misc.func.activity.get_act_registration_count({
			"activity": activity.objectId,
			"user":user.currentUser.pid 
	    },function(res){
	    	if(res.code=="0"&&res.data){
	    		p.isRegisCount=res.data.count;
	    		if(p.isRegisCount){
		  			$out_wrap.addClass('pBottom25').append('<div class="join-btn maxWidth">已报名</div>');
	    		}else{
				  	$out_wrap.addClass('pBottom25').append('<div class="join-btn maxWidth j_join">我要报名</div>');
					p.lateEvent(1);
	    		}
	    	}
	    },function(err){

	    });
	}
}
p.ActRegistration = function(){
	// 得到活动报名人数
    misc.func.activity.get_act_registration({
		"activity": activity.objectId,
	 	"limit":p.size,
	 	"page_index":p.page+1
    },function(res){
    	if(res.code=="0"&&res.data){
    		var datas=res.data;
    		if(datas && datas.length>0){
				var arrHtml=[];
				for (var i=0,l=datas.length;i<l; i++) {
					arrHtml.push(p.liHtml(datas[i],i+1));
				};
				$out_wrap.find('ul.j_join_list').append(arrHtml.join(''));
				p['page']++;
				if(datas.length<p['size']){
		  			$('.j_loadmore').html('已加载完所有数据');
				}
		  	}
		  	else if(p.page>0){
		  		$('.j_loadmore').html('已加载完所有数据');
		  	}
		  	else{
		  		$('.j_loadmore').html('暂无报名人员');
		  	}
    	}
    },function(err){
		 $('.j_loadmore').html('当前网络不给力哦！');
    });
};
p.liHtml = function(obj,number){
	obj.get=function(prop){
		return obj[prop];
	};
	return [
		'<li class="">',
			'<div class="user-name">',p.page*p.size+number,'. ',obj.get('user__realname')||"暂无",' ',obj.get('user__sex')||"暂无",' ',obj.get('user__job')||"暂无",' ',obj.get('user__group__name').replace('崇明县','')||"暂无",' ',obj.get('user__location__name')||"暂无",'</div>',
			'<div class="createAt">',misc.formatDateTime(new Date(obj.createdAt),misc.formatType['4']),'</div>',
		'</li>'
	].join('');
};

p.lateEvent=function(type){
	if(type==1){
		enable = true;
		$out_wrap.delegate('.j_join', 'click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			var $this = $(this);
			if(user.currentUser.get('userRole')=='Users' && enable){
				enable = false;
		        var isInner=false;
				p.param={
					"admin":activity.admin.pid,
					"activity":activity.objectId,
					"user":user.currentUser.pid,
					"userGroupArr":"",
					"userLocationArr":""
				};
		        var group=user.userInfo.get('group');
		        if(group&&group.pid){
		        	p.param["userGroupArr"]=group.pid;
		        	isInner=(activity.admin.pid==group.pid);
		        }
		        var location=user.userInfo.get('location');
		        if(location&&location.pid){
		        	p.param["userLocationArr"]=location.pid;
		        	isInner=(activity.admin.pid==location.pid);
		        }
				p.param["isInner"]=isInner;
				$this.html('报名中...')
				misc.func.activity.create_act_registration(p.param,function(res){
					if(res.code=="0"&&res.data){
						$this.html('报名成功');
						setTimeout(function(){
							window.location.reload();
						},300);
					}else{
				    	enable = true;
						$this.html('报名失败');
						btnText($this,'重新报名');
					}
				},function(err){
			    	enable = true;
					$this.html('报名失败');
					btnText($this,'重新报名');
				});
			}
		});
	}
};
window.onscroll = function () { 
    if (getScrollTop()+getClientHeight()==getScrollHeight()) { 
		p.ActRegistration();
    } 
} 
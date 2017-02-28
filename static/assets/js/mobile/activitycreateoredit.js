var p={};
p.init=function() {
	p.initVar();
	p.initEvent();
	user.checkLogin(p.initData);
};
p.initVar=function(){
	activity={};
	activity.objectId=misc.getParam('id')||'';
	$create_confirm_btn=$('.create-confirm-btn');
	$textarea=$('textarea');;
	enable=true;
};
p.initEvent=function(){
	$('body').delegate('.isShow', 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var $this = $(this);
		p.param2={
			"title":activity.title,
			"content":activity.content,
			"place":activity.place,
			"limit":activity.limit,
			"admin":user.currentUser.pid,
			"objectId":activity.objectId,
			"isDelete":activity.isDelete
		};
		if(!$this.hasClass('green')){
			Dialog.ShowDialog({
		        title: '',
		        otherBtns: [{
		        	title:'确定',
		        	func: function() {
						p.param2["isShow"]="0";
						activity["isShow"]="0";
						misc.func.activity.update_activity(p.param2,function(res){
							Dialog.RemoveDialog();
							if(res.code=="0"&&res.data){
								$('.isShow').prev('i').html('未上线');
								$('.isShow').html('上线').addClass('green');
							}else{
						    	enable = !enable;
								$('.isShow').html('下线失败');
								btnText($('.isShow'),'下线');
							}
						},function(err){
							Dialog.RemoveDialog();
					    	enable = !enable;
							$('.isShow').html('下线失败');
							btnText($('.isShow'),'下线');
						});
		            }
		        }],
		        cancelBtn: '取消',
		        content: '确认下线该活动？'
			});
		}
		else{
			Dialog.ShowDialog({
		        title: '',
		        otherBtns: [{
		        	title:'确定',
		        	func: function() {
						p.param2["isShow"]="1";
						activity["isShow"]="1";
						misc.func.activity.update_activity(p.param2,function(res){
							Dialog.RemoveDialog();
							if(res.code=="0"&&res.data){
								$('.isShow').prev('i').html('已上线');
								$('.isShow').html('下线').removeClass('green');
							}else{
						    	enable = !enable;
								$('.isShow').html('上线失败');
								btnText($('.isShow'),'上线');
							}
						},function(err){
							Dialog.RemoveDialog();
					    	enable = !enable;
							$('.isShow').html('上线失败');
							btnText($('.isShow'),'上线');
						});
		            }
		        }],
		        cancelBtn: '取消',
		        content: '确认上线该活动？'
			});
		}
	});
	$('body').delegate('.isDelete', 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var $this = $(this);
		p.param2={
			"title":activity.title,
			"content":activity.content,
			"place":activity.place,
			"limit":activity.limit,
			"admin":user.currentUser.pid,
			"objectId":activity.objectId,
			"isShow":activity.isShow
		};
		if($this.hasClass('green')){
			Dialog.ShowDialog({
		        title: '',
		        otherBtns: [{
		        	title:'确定',
		        	func: function() {
						p.param2["isDelete"]="0";
						activity["isDelete"]="0";
						misc.func.activity.update_activity(p.param2,function(res){
							Dialog.RemoveDialog();
							if(res.code=="0"&&res.data){
								$('.isDelete').html('撤销成功');
								btnText($('.isDelete'),'删除');
								$('.isDelete').removeClass('green');
							}else{
						    	enable = !enable;
								$('.isDelete').html('撤销失败');
								btnText($('.isDelete'),'撤销');
							}
						},function(err){
					    	enable = !enable;
							$('.isDelete').html('撤销失败');
							btnText($('.isDelete'),'撤销');
						});

					    	
		            }
		        }],
		        cancelBtn: '取消',
		        content: '确认撤销删除该活动？'
			});
		}
		else{
			Dialog.ShowDialog({
		        title: '',
		        otherBtns: [{
		        	title:'确定',
		        	func: function() {
						p.param2["isDelete"]="1";
						activity["isDelete"]="1";
						misc.func.activity.update_activity(p.param2,function(res){
							Dialog.RemoveDialog();
							if(res.code=="0"&&res.data){
								$('.isDelete').html('删除成功');
								location.replace('../activities/');
							}else{
						    	enable = !enable;
								$('.isDelete').html('删除失败');
								btnText($('.isDelete'),'删除');
							}
						},function(err){
					    	enable = !enable;
							$('.isDelete').html('删除失败');
							btnText($('.isDelete'),'删除');
						});
		            }
		        }],
		        cancelBtn: '取消',
		        content: '不可恢复哦，确认删除该活动？'
			});
		}
	});
	$create_confirm_btn.on('click',function(e){
		e.preventDefault();
		e.stopPropagation();
		var v0 = $.trim($textarea.eq(0).val()),
		v1 = $.trim($textarea.eq(1).val()),
		v2 = $.trim($textarea.eq(2).val()),
		v3 = $.trim($textarea.eq(3).val());
		if(activity.objectId){
			// 修改
			p.param2={
				"title":v0,
				"content":v1,
				"place":v2,
				"limit":v3,
				"admin":user.currentUser.pid,
				"objectId":activity.objectId,
				"isShow":activity.isShow,
				"isDelete":activity.isDelete
			};
			misc.func.activity.update_activity(p.param2,function(res){
				if(res.code=="0"&&res.data){
					$create_confirm_btn.html('修改成功');
					btnText($create_confirm_btn,'提交保存');
				}else{
			    	enable = !enable;
					$create_confirm_btn.html('修改失败');
					btnText($create_confirm_btn,'提交保存');
				}
			},function(err){
		    	enable = !enable;
				$create_confirm_btn.html('修改失败');
				btnText($create_confirm_btn,'提交保存');
			});
		}else{
			// 创建
			if(enable && v0 && v1){
				enable = false;
				p.param={
					"title":v0,
					"content":v1,
					"place":v2,
					"limit":v3,
					"admin":user.currentUser.pid,
					"isDelete":"0",
					"isShow":"0",
					"joinnum":0
				}
				misc.func.activity.create_activity(p.param,function(res){
					if(res.code=="0"&&res.data){
				    	activity=p.param;
				    	activity["objectId"]=res.data.objectId;
						$create_confirm_btn.html('创建成功');
						btnText($create_confirm_btn,'提交保存');
						p.doHtml();
					}else{
				    	enable = !enable;
						$create_confirm_btn.html('创建失败');
						btnText($create_confirm_btn,'提交保存');
					}
				},function(err){
			    	enable = !enable;
					$create_confirm_btn.html('创建失败');
					btnText($create_confirm_btn,'提交保存');
				});
			}
			else{
				$create_confirm_btn.html('请填写完整活动数据');
				btnText($create_confirm_btn,'提交保存');
			}
		}
	});
};
p.initData=function(){
	if(activity.objectId){
		loading('加载中...');
		misc.func.activity.get_activity({
			"objectId": activity.objectId
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
					p.doHtml();
				}else{
					Dialog.ShowDialog({
				        title: '温馨提示',
				        otherBtns: [],
				        cancelBtn: '我知道了',
				        content: '当前活动不存在！'
					});
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
	}
	else{
		$out_wrap.css("visibility","visible");
	}
};

p.doHtml = function(){
	if(activity && activity.objectId){
		activity.get=function(prop){return activity[prop]};
		$textarea.eq(0).val(activity.get("title"));
		$textarea.eq(1).val(activity.get("content"));
		if(activity.get("place"))
			$textarea.eq(2).val(activity.get("place"));
		else 
			$textarea.eq(2).attr('placeholder',"无");

		if(activity.get("limit"))
			$textarea.eq(3).val(activity.get("limit"));
		else 
			$textarea.eq(3).attr('placeholder',"无");
		
		if(activity.get("isShow")=="1"){
			$('.j_is_show').append('是否上线：<i>已上线</i><span class="btnn isShow">下线</span>');
		}
		else{
			$('.j_is_show').append('是否上线：<i>未上线</i><span class="btnn green isShow">上线</span>');
		}
		if(activity.get("isDelete")=="1"){
			$('.j_is_delete').append('是否删除：<i>已删除</i><span class="btnn green isDelete">撤销</span>');
		}
		else{
			$('.j_is_delete').append('是否删除：<i>未删除</i><span class="btnn isDelete">删除</span>');
		}
	}else{
		Dialog.ShowDialog({
	        title: '',
	        otherBtns: [],
	        cancelBtn: '我知道啦',
	        content: '活动不存在哦！'
		});
	}
};
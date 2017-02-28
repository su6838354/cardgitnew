var p = {
    'className': 'Admins'
};
p.init = function(){
    p.initVar();
    p.loadDatas();
    p.initEvent();
};
p.initVar = function(){
    obj = {};
    obj.pid = misc.getParam('id')||userObj.currentUser.pid;
};
p.renderData=function(){
    $('.name').val(obj.get('name'));
    $('.type').val(obj.get('type'));
    $('.tel').val(obj.get('tel'));
    $('.mobile').val(obj.get('mobile'));
    $('.address').val(obj.get('address'));
    $('.username').val(obj.get('username'));
    $('.person').val(obj.get('person'));
    // $('.createdAt').text(misc.formatDateTime(obj['createdAt'],userObj.format));
    // $('.updatedAt').text(misc.formatDateTime(obj['updatedAt'],userObj.format));
};
p.loadDatas = function(){
    misc.func.admin.get_admin({
        "pid":obj.pid
    },function(res){
        if(res.code=="0"&&res.data){
            obj=res.data;
            obj.get=function(p){
                return obj[p];
            };
            p.renderData();
        }else{
            alert('该账号不存在');
        }
    },function(err){
        alert('该账号不存在');
    });
};

p.initEvent = function(){
  $('.j_btn_modify').on('click',function(e){
    e.stopPropagation();
    e.preventDefault();
    var span_el = $(this).siblings('span').first();
    var param=$.extend({},userObj.currentUser);
    delete param["userRole"];
    delete param["get"];
    param["tel"]=$.trim($('.tel').val());
    param["mobile"]=$.trim($('.mobile').val());
    param["address"]=$.trim($('.address').val());
    param["person"]=$.trim($('.person').val());
    misc.func.admin.update_admin(param,function(res){
        if(res.code=="0"&&res.data){
            span_el.text('修改成功').show().fadeOut(800);
        }else{
            span_el.text('修改失败').show().fadeOut(800);
        }
    },function(err){
        span_el.text('修改失败').show().fadeOut(800);
    });
  });
};


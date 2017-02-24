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
    obj.pid = misc.getParam('id');
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
    if(obj.pid){
        misc.func.admin.get_admin({
            "pid":obj.pid
        },function(res){
            if(res.code=="0"&&res.data){
                obj=res.data;
                p.renderData();
            }else{
                alert('该账号不存在');
            }
        },function(err){
            alert('该账号不存在');
        });
    }else{
        obj=userObj.currentUser;
        p.renderData();
    }
};

p.initEvent = function(){
  $('.j_btn_modify').on('click',function(e){
    e.stopPropagation();
    e.preventDefault();
    var span_el = $(this).siblings('span').first();
    var param={};
    misc.func.admin.update_admin(param,function(res){
        if(res.code=="0"&&res.data){
            span_el.text('修改成功').show().fadeOut(800);
        }else{
            span_el.text('修改失败').show().fadeOut(800);
        }
    },function(err){
        span_el.text('修改失败').show().fadeOut(800);
    });
    // var query = new AV.Query(p.className);
    // query.get(obj.id, {
    //     success: function(data) {
    //       data.set('tel',$.trim($('.tel').val()));
    //       data.set('mobile',$.trim($('.mobile').val()));
    //       data.set('address',$.trim($('.address').val()));
    //       data.set('person',$.trim($('.person').val()));

    //       data.save(null,{
    //         success: function(d){
    //           span_el.text('修改成功').show().fadeOut(800);
    //         },
    //         error: function(d, error) {
    //           span_el.text('修改失败').show().fadeOut(800);
    //         }
    //       });
    //     },
    //     error: function(shop, error) {   
    //       span_el.text('修改失败').show().fadeOut(800);
    //     }
    // });
  });
};


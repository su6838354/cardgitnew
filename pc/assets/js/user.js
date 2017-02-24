var p = {
  'className': 'Users'
};
p.init = function(){
  p.initVar();
  p.loadAdmins(p.loadDatas);
  p.initEvent();
};
p.initVar = function(){
  obj = {};
  obj.pid = misc.getParam('id') || '';
  $group = $('.group');
  $location = $('.location');
  admins=[];
};
p.loadAdmins= function(cb){
  var query = new AV.Query('Admins');
  query.equalTo('isShow','1');
  query.find({
    success:function(datas){
      var l = datas?datas.length:0;
      if(l>0){
        admins=datas;
        for (var i = 0; i < l; i++) {
          var admin = datas[i];
          var s = ['<option value="',admin.get("pid"),"$",admin.get("username"),"$",admin.get("name"),"$",admin.get("type"),'">',admin.get('name'),'</option>'].join('');
          if(admin.get('type')=='group'){
            $group.append(s);
          }
          else{
            $location.append(s);
          }
        }
        cb && cb();
      }
    }
  });
};
p.loadDatas = function(){
  var query = new AV.Query(p.className);
  query.equalTo("pid",obj.pid);
  query.find({
    success: function(datas){
      obj = datas[0];
      if(obj && obj.id){
          // $('.createdAt').text(misc.formatDateTime(obj['createdAt'],userObj.format));
          // $('.updatedAt').text(misc.formatDateTime(obj['updatedAt'],userObj.format));
          $('.job').val(obj.get('job'));
          $('.political').val(obj.get("political")=="团员"?(misc.getAge(obj.get('birth'))<=28 ?"团员":'青年'):(userObj.currentUser.get('userRole')=='Admins'?obj.get("political").replace('S',''):obj.get("political")));
          $('.mobile').val(obj.get('mobile'));
          $('.address').val(obj.get('address'));
          
          $('.realname').val(obj.get('realname'));
          $('.sex').val(obj.get('sex'));
          $('.idcard').val(obj.get('idcard'));
          $('.username').val(obj.get('username'));
          $('.flagNumber').val(obj.get('flagNumber'));
          $('.age').val(misc.getAge(obj.get('birth'))+' 岁');
          $('.birth').val(misc.formatDateTime(obj.get('birth'),misc.formatType['3']));
          p.locationArr = obj.get('location');
          if(p.locationArr && p.locationArr.length>0){
            $location.val(p.locationArr.join('$'));
          }
          p.groupArr = obj.get('group');
          if(p.groupArr && p.groupArr.length>0){
            $group.val(p.groupArr.join('$'));
          }
          
          // if(userObj.currentUser.get('userRole')!=='SuperAdmin'){
            // $('input,select,textarea').attr('disabled', 'disabled');

            // if(p.groupArr && p.groupArr.length>0 && p.groupArr[0]==userObj.currentUser.id){
            //   $('.political,.job,.address,.mobile').removeAttr('disabled');
            // }
            // else{
            //   $('.j_btn_modify').parent().remove();
            // }
          // }

      }
      else{
          alert('该账号不存在');
          return false;
      }
    },
    error: function(user, error) {
      alert('网络不给力哦');
    }
  });  
};
p.initEvent = function(){
  $('.j_btn_modify').on('click',function(e){
    e.stopPropagation();
    e.preventDefault();
    var span_el = $(this).siblings('span').first();
    var query = new AV.Query(p.className);
    query.get(obj.id, {
        success: function(data) {
          data.set('job',$.trim($('.job').val()));
          data.set('mobile',$.trim($('.mobile').val()));
          data.set('address',$.trim($('.address').val()));
          data.set('political',$.trim($('.political').val()));
          // if(userObj.currentUser.get('userRole')=='SuperAdmin'){
            if($.trim($('.birthDate').val())){
              data.set('birthDate',strToDate($.trim($('.birthDate').val())));
            }
            data.set('realname',$.trim($('.realname').val()));
            data.set('sex',$.trim($('.sex').val()));
            data.set('flagNumber',$.trim($('.flagNumber').val()));
            data.set("location",$location.val().split('$'));//居委
            data.set("group",$group.val().split('$'));//单位
          // }

          data.save(null,{
            success: function(d){
              // span_el.text('修改成功').show().fadeOut(800);
              location.reload();
            },
            error: function(d, error) {
              span_el.text('修改失败').show().fadeOut(800);
            }
          });
        },
        error: function(shop, error) {   
          span_el.text('修改失败').show().fadeOut(800);
        }
    });
  });
};


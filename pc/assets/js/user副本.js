var p = {
  'className': 'Users'
};
p.init = function(){
  p.initVar();
  p.loadAdmins();
  p.loadDatas();
  if(userObj.currentUser.get('userRole')=='SuperAdmin'){
    p.initEvent();
  }else{
    $('.j_btn_modify').parent().remove();
    $('input,select,textarea').attr('disabled', 'disabled');
  }
};
p.loadAdmins= function(){
  var query = new AV.Query('Admins');
  query.equalTo('isShow','1');
  query.find({
    success:function(datas){
      var l = datas?datas.length:0;
      if(l>0){
        admins=datas;
        for (var i = 0; i < l; i++) {
          var admin = datas[i];
          var s = ['<option value="',admin.get("type"),"-",admin.get("pid"),"-",admin.get("name"),'">',admin.get('name'),'</option>'].join('');
          if(admin.get('type')=='group'){
            $group.append(s);
          }
          else{
            $location.append(s);
          }
        }
      }
    }
  });
};
p.getUAMapping = function(){
  var query = new AV.Query('UAMapping');
  query.ascending("createdAt");
  query.equalTo('isKeep',true);
  query.equalTo('userId',obj.get('pid'));
  query.find({
    success:function(datas){
      var l = datas?datas.length:0;
      if(l>0){
        for (var i = 0; i < l; i++) {
          var uamap = datas[i];
          if(uamap.get("type")=="location"){
            p.locationInfo=['location','-',uamap.get("adminId"),'-',uamap.get("adminName")];
            $location.val(p.locationInfo.join(''));
          }else{
            p.groupInfo=['group','-',uamap.get("adminId"),'-',uamap.get("adminName")];
            $group.val(p.groupInfo.join(''));
          }
        }
      }
    }
  });
};
p.initVar = function(){
  obj = {};
  obj.pid = misc.getParam('id') || '';
  $group = $('.group');
  $location = $('.location');
  admins=[];
};
p.loadDatas = function(){
  var query = new AV.Query(p.className);
  query.equalTo("pid",obj.pid);
  query.find({
    success: function(datas){
      obj = datas[0];
      if(obj && obj.id){
          $('.createdAt').text(misc.formatDateTime(obj['createdAt'],userObj.format));
          $('.updatedAt').text(misc.formatDateTime(obj['updatedAt'],userObj.format));
          $('.realname').val(obj.get('realname'));
          $('.sex').val(obj.get('sex'));
          $('.job').val(obj.get('job'));
          $('.idcard').val(obj.get('idcard'));
          $('.mobile').val(obj.get('mobile'));
          $('.address').val(obj.get('address'));
          $('.political').val(obj.get("political")=="团员"?(misc.getAge(obj.get('birth'))<=28 ?"团员":'青年'):obj.get("political"));
          $('.username').val(obj.get('username'));
          $('.flagNumber').val(obj.get('flagNumber'));
          $('.age').val(misc.getAge(obj.get('birth'))+' 岁');
          $('.birth').val(misc.formatDateTime(obj.get('birth'),misc.formatType['3']));
          p.getUAMapping();
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
  $('.j_UA').change(function(e) {
    e.stopPropagation();
    e.preventDefault();
    var $this = $(this),
        arr = $this.val().split('-');// 0: type, 1:adminId, 2:adminName

    var temp;
    if(arr[0]=='location'){
      temp=p.locationInfo;
    }else if(arr[0]=='group'){
      temp=p.groupInfo;
    }
    if(temp && temp[0]){
      var query = new AV.Query('UAMapping');
      query.equalTo('type',temp[0]);
      query.equalTo('userId',obj.get("pid"));
      query.find({
        success:function(datas){
          var l = datas?datas.length:0;
          if(l){
            var ua = datas[0];
            if(arr[1]){//修改
              ua.set('adminId',arr[1]||'');
              ua.set('adminName',arr[2]||'');
              ua.save().then(function(){
                $('<span style="margin-left:5px;color:red">设置成功</span>').insertAfter($this);
                setTimeout(function(){
                    $this.next().remove();
                },800);
              }, function(){
                $this.val('');
                $('<span style="margin-left:5px;color:red">设置失败</span>').insertAfter($this);
                setTimeout(function(){
                    $this.next().remove();
                },800);
              });
            }
            else{//删除记录
              ua.destroy().then(function() {
                $('<span style="margin-left:5px;color:red">设置成功</span>').insertAfter($this);
                setTimeout(function(){
                    $this.next().remove();
                },800);
              }, function(error) {
                $this.val('');
                $('<span style="margin-left:5px;color:red">设置失败</span>').insertAfter($this);
                setTimeout(function(){
                    $this.next().remove();
                },800);
              });
            }
            
          }
        },
        error:function(){

        }
      });
    }
    else if(arr.length==3){//新建
      var UAMapping = AV.Object.extend('UAMapping');
      var ua = new UAMapping();
      ua.set('type',arr[0]);
      ua.set('adminId',arr[1]);
      ua.set('adminName',arr[2]);
      ua.set('userId',obj.get('pid'));
      ua.set('userRealName',obj.get('realname'));
      ua.set('isKeep',true);
      
      ua.save().then(function(){
        $this.parent().append('<span style="margin-left:5px;color:red">设置成功</span>');
      }, function(){
        $this.val('');
        $this.parent().append('<span style="margin-left:5px;color:red">设置失败</span>');
      });
    }



    // if(arr[0]){//修改
    //   if(temp[0]){
    //     var query = new AV.Query('UAMapping');
    //     query.equalTo('type',temp[0]);
    //     query.equalTo('userId',obj.get("pid"));
    //     query.find({
    //       success:function(datas){
            
    //         var l = datas?datas.length:0;
    //         if(l){
    //           var ua = datas[0];
    //           ua.set('adminId',arr[1]);
    //           ua.set('adminName',arr[2]);
    //           ua.save().then(function(){
    //             $this.parent().append('<span style="margin-left:5px;color:red">设置成功</span>');
    //           }, function(){
    //             $this.val('');
    //             $this.parent().append('<span style="margin-left:5px;color:red">设置失败</span>');
    //           });
    //         }
    //       },
    //       error:function(){

    //       }
    //     });
    //   }
    //   else{//新建
    //     var UAMapping = AV.Object.extend('UAMapping');
    //     var ua = new UAMapping();
    //     ua.set('type',arr[0]);
    //     ua.set('adminId',arr[1]);
    //     ua.set('adminName',arr[2]);
    //     ua.set('userId',obj.get('pid'));
    //     ua.set('userRealName',obj.get('realname'));
    //     ua.set('isKeep',true);
        
    //     ua.save().then(function(){
    //       $this.parent().append('<span style="margin-left:5px;color:red">设置成功</span>');
    //     }, function(){
    //       $this.val('');
    //       $this.parent().append('<span style="margin-left:5px;color:red">设置失败</span>');
    //     });
    //   }
    // }
    // else{//删除记录
    //   myObject.destroy().then(function() {
    //     // 删除成功
    //   }, function(error) {
    //     // 失败
    //   });
    // }

  });
  $('.j_btn_modify').on('click',function(e){
    e.stopPropagation();
    e.preventDefault();
    var span_el = $(this).siblings('span').first();
    var query = new AV.Query(p.className);
    query.get(obj.id, {
        success: function(data) {
          if($.trim($('.birthDate').val())){
            data.set('birthDate',strToDate($.trim($('.birthDate').val())));
          }
          data.set('sex',$.trim($('.sex').val()));
          data.set('job',$.trim($('.job').val()));
          data.set('mobile',$.trim($('.mobile').val()));
          data.set('address',$.trim($('.address').val()));
          data.set('realname',$.trim($('.realname').val()));
          data.set('political',$.trim($('.political').val()));
          data.set('flagNumber',$.trim($('.flagNumber').val()));

          data.save(null,{
            success: function(d){
              span_el.text('修改成功').show().fadeOut(800);
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


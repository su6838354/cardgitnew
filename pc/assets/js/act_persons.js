var p = {
  'className': 'Users',
  'page': 1,
  'size': 10
};
p.init = function(){
  p.page = misc.getParam('page') || 1;
  $j_pagenation = $('.j_pagenation');
  p.loadPersonsByAdminId();
  p.initEvent();
};
p.loadUserById = function(ids){
  if(ids.length==0){
    $j_pagenation.html('');
    $('#datatable tbody').html('');
    return false;
  }
  var query = new AV.Query(p.className);
  query.containedIn('pid',ids);
  var searchType = $('.search-type').val(),
      searchWord = $.trim($('#search-word').val());
  searchWord && query.startsWith(searchType,searchWord.toLowerCase());
  // searchWord && query.equalTo(searchType,searchWord.toLowerCase());
  query.count({
    success: function(data){
      p.maxPage = Math.ceil(data/p.size);
      $('#maxCount').text(data);
    }
  });
  query.descending("createdAt");
  query.limit(p['size']);
  query.skip((p['page']-1)*p['size']);
  query.find().then(function(datas) {
      $('#datatable tbody').html(p.htmlDatas(datas));
      operateEvent();
      p.maxPage>=1 && $j_pagenation.show() && p.loadPagination();
  }, function(error) {

  });

};
p.loadPersonsByAdminId = function(){
  var query = new AV.Query('UAMapping');
  query.equalTo('adminId',userObj.currentUser.id);
  query.select('userId');
  query.limit(1000);
  query.find().then(function(datas) {
    var l = datas.length;
    if(l>0){
      userIds = datas.map(function(data, index) {
        return data.get('userId');
      });
      // p.loadUserById(userIds);
    }
    
  }, function(error) {

  });
};
p.loadPagination = function(){
  pg.pageCount = p.maxPage; // 定义总页数(必要)
  pg.argName = 'page';  // 定义参数名(可选,默认为page)
  pg.element = $j_pagenation; // 文本渲染在那个标签里面
  pg.printHtml(1);
};
p.initEvent = function(){
  $('#j_create_new').on('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
      if($('.cancel').length<=0){
          createRow('create');
      }else{
          alert('请先执行完当前的操作！');
      }
  });
  $('#search').on('click', function (e) {
      e.preventDefault();
      var searchWord = $.trim($('#search-word').val());
      if(searchWord)
        p.loadUserById(userIds);
  });
  $('.j_check_in').on('click', function (e) {
      e.preventDefault();
      $('#search-word').val('');
      p.loadUserById([]);
      if(!p.checkInUsers){
        p.loadCheckInUsersByAdminId(userObj.currentUser.id,p.showCheckIn);
      }else{
        p.showCheckIn();
      }
  });
  $('.j_uncheck_in').on('click', function (e) {
      e.preventDefault();
      $('#search-word').val('');
      p.page=1;
      if(!p.checkInUsers){
        p.loadCheckInUsersByAdminId(userObj.currentUser.id,undefined,p.showUnCheckIn);
      }else{
        p.showUnCheckIn();
      }
  });
  $('.j_show_persons').on('click', function (e) {
      e.preventDefault();
      $('#search-word').val('');
      p.page=1;
      p.loadUserById(userIds);
  });
  $('.j_btn').on('click', function (e) {
      e.preventDefault();
      var $this = $(this);
      p.btn = $this.index();
      $this.siblings().removeClass('beclick');
      $this.addClass('beclick');
      $this.blur();
  });
};
p.getCheckInUserIds = function(){
  p.unCheckInUserIds = userIds.map(function(data, index) {
    if(checkInUserIds.indexOf(data)==-1)
      return data;
  });
};
p.showUnCheckIn = function(){
  if(!p.unCheckInUserIds){
    p.getCheckInUserIds();
  }
  p.loadUserById(p.unCheckInUserIds);
};
p.showCheckIn = function(){
  var datas = p.checkInUsers,
      l = datas.length;
  var arrHtml = [];
  if(l==0){
    arrHtml = [
          '<h3>暂无已报到人员</h3>'
    ];
  }
  else{
    arrHtml = [
          '<h3>已报到人员名单</h3>'
    ];
    arrHtml.push('<ul class="users-list">');
    for (var i = 0; i < l; i++) {
      arrHtml.push([
          '<li>',
            '<div style="width:15%;text-align:center;">',i+1,'.</div>',
            '<a target="_blank" href="./user.html?id=',datas[i].get("userId"),'#user"><div style="width:25%;">',datas[i].get("userRealName"),'</div></a>',
            '<div style="width:60%;">',misc.formatDateTime(datas[i].createdAt,userObj.format),'</div>',
          '</li>',            
            // $('.createdAt').text(misc.formatDateTime(obj['createdAt'],userObj.format));
      ].join(''));
    }
    arrHtml.push('</ul');
  }
  Tools.UseModal([],'关闭',arrHtml.join(''),{
      'width': 700,
      'height': 480,
      'margin-left':-350,
      'margin-top':-200,
      'position': 'fixed',
      'left': '50%',
      'top': '50%',
  });
  $('.modal-footer').remove();
  $('.modal-body').css('margin-bottom', '50px');
};
p.loadCheckInUsersByAdminId = function(adminId,checkInFunc,unCheckInFunc){
  var query = new AV.Query('CheckInLog');
  query.limit(1000);
  query.equalTo('adminId',adminId);
  query.descending('createdAt');
  query.find().then(function(datas) {
    p.checkInUsers = datas;
    checkInUserIds = datas.map(function(data, index) {
      return data.get('userId');
    });
    checkInFunc && checkInFunc();
    unCheckInFunc && unCheckInFunc();
  }, function(error) {

  });
};
p.htmlDatas = function(datas){
  var arr = [];
  for(var i=0,l=datas.length;i<l;i++){
    arr.push(htmlRow(datas[i]));
  }
  return arr.join('');
};
function htmlRow(data){
    // var s = data.get("isShow") == "0" ? '<div class="outter-block outter-border"><div class="circle-block boxshowdow"><div></div>':'<div class="outter-block colorGreen"><div class="circle-block boxshowdow pull-right"><div></div>';
    return ['<tr data-id="',data.id,'" data-pid="',data.get("pid"),'">',
              // '<td>',s,'</td>',
              '<td>',data.get("username"),'</td>',
              '<td class="j_view" style="color:#4b8df8;cursor:pointer;">',data.get("realname"),'</td>',
              '<td>',data.get("sex")=="男"?"男":"女",'</td>',
              '<td>',data.get("idcard"),'</td>',
              '<td >',data.get("mobile"),'</td>',
              '<td>',data.get("address"),'</td>',
              '<td>',data.get("political")=="团员"?(misc.getAge(data.get('birth'))<=28 ?"团员":'青年'):data.get("political"),'</td>',
              '<td>',data.get("job"),'</td>',
              '<td>',data.get("flagNumber"),'</td>',
              // '<td>',misc.getAge(data.get('birth')),'岁</td>',
              // '<td>',misc.formatDateTime(data.createdAt,userObj.format2),'</td>',
              // '<td>',misc.formatDateTime(data.updatedAt,userObj.format2),'</td>',
            '</tr>'].join('');
}
function operateEvent(){

  $('#datatable div.circle-block').off().on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        if($this.hasClass('pull-right')){
          $this.removeClass('pull-right');
          $this.parent().removeClass('colorGreen').addClass('outter-border');
        }
        else{
          $this.addClass('pull-right');
          $this.parent().addClass('colorGreen').removeClass('outter-border');
        }
        var curTR = $(this).closest('tr'),
        id = curTR.attr('data-id');
        if(!id){
          return false;
        }
        var query = new AV.Query(p.className);
        query.get(id, {
            success: function(data) {
              var property = 'isShow';
              var s = (data.get(property) == '1') ? '0' : '1';
              data.set(property,s);
              data.save();
            },
            error: function(user, error) {   
                alert("操作失败 " + error.message);
            }
        });
    });

    $('#datatable .j_view').off().on('click', function (e) {
        e.preventDefault();
        window.open('user.html?id='+$(this).parent().attr('data-pid')+'#user');
    });
}
function createLateEvent(){
    $('#datatable a.cancel').off().on('click', function (e) {
        e.preventDefault();
        $(this).parent().parent().remove();
    });
    $('#datatable a.add').off().on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        var params = {
          'idcard': $('.idcard').val(),
          'username': $('input.username').val(),
          'realname': $('.realname').val(),
          'sex': $('.sex').val(),
          'address': $('.address').val(),
          'political': $('.political').val(),
          'job': $('.job').val(),
          'mobile': $('.mobile').val()
        };
        var birthArr = params.idcard.substring(6,14).split('');
        params.birth = new Date([birthArr[0],birthArr[1],birthArr[2],birthArr[3],'/',birthArr[4],birthArr[5],'/',birthArr[6],birthArr[7]].join(''));
        params.username = params.username+params.idcard.substring(14).toLowerCase();
        for (var i in params){
          if(!params[i]){
            alert("请将信息填写完整！");
            return false;
          }
        }

        var params1 = {
          'password': '123456',//6位固定密码
          'username': params.username,
          'userRole': p['className']
        };
        var params2 = {
          'isShow': '1',
          'username': params.username,
          'realname': params.realname,
          'sex': params.sex,
          'idcard': params.idcard,
          'address': params.address,
          'mobile': params.mobile,
          'job': params.job,
          'birth': params.birth,
          'political': params.political
        };
        var user = new AV.User();
        for (var property in params1){
          user.set(property, params1[property]);
        }
        user.signUp(null, {
          success: function(data) {
            var Users = AV.Object.extend(p.className);
            var u = new Users();
            for (var property in params2){
              u.set(property, params2[property]);
            }
            u.set('pid',data.id);
            u.save(null, {
              success: function(data) {
                userObj.logOut();
              },
              error: function(data, error) {
                alert("添加失败 " + error.message);
              }
            });
          },
          error: function(user, error) {
            alert("添加失败 " + error.message);
          }
        });
    });
}

function createRow() {
    var $tbody = $('tbody').eq(0),
        firstTR = $tbody.find("tr:first"),
        tempTR = $('<tr><td style="width:35px;"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
    if(firstTR.length==0){
      tempTR.appendTo($tbody);
    }else{
      tempTR.insertBefore(firstTR);
    }

    var tempTRTDs = tempTR.find('td');
    tempTRTDs.eq(0).html('<a class="add" href="">添加</a> <a class="cancel" href="">取消</a>');
    tempTRTDs.eq(1).html('<input class="username" type="text" style="width: 70px !important;background: #ffffff;" value="">');
    tempTRTDs.eq(2).html('<input class="realname" type="text" style="width: 70px !important;background: #ffffff;" value="">');
    tempTRTDs.eq(3).html('<select class="sex" style="width:90px;"><option value="">请选择</option><option selected="selected" value="男">男</option><option value="女">女</option></select>');
    tempTRTDs.eq(4).html('<input class="idcard" type="text" style="width: 70px !important;background: #ffffff;" value="">');
    tempTRTDs.eq(5).html('<input class="mobile" type="text" style="width: 70px !important;background: #ffffff;" value="">');
    tempTRTDs.eq(6).html('<input class="address" type="text" style="width: 70px !important;background: #ffffff;" value="">');
    tempTRTDs.eq(7).html('<input class="political" type="text" style="width: 70px !important;background: #ffffff;" value="团员">');
    tempTRTDs.eq(8).html('<input class="job" type="text" style="width: 70px !important;background: #ffffff;" value="学生">');
    tempTRTDs.eq(9).html('');
    createLateEvent();
}
// 重写分页函数
showPages.prototype.toPage = function(page){ //页面跳转
 var turnTo = 1;
 if (typeof(page) == 'object') {
  turnTo = page.options[page.selectedIndex].value;
 } else {
  turnTo = page;
 }
 p.page = turnTo;
 if(p.btn == '1'){
   p.loadCheckInUsersByAdminId(userObj.currentUser.id,undefined,p.showUnCheckIn);
 }
 else if(p.btn == '2'){
   p.loadUserById(userIds);
 }
 // self.location.href = this.createUrl(turnTo);
};
showPages.prototype.printHtml = function(mode){ //显示html代码
 this.page = p.page ? p.page : 1;
 // this.getPage();
 this.checkPages();
 this.showTimes += 1;
 this.element.append('<div id="pages_' + this.name + '_' + this.showTimes + '" class="pages"></div>');
 document.getElementById('pages_' + this.name + '_' + this.showTimes).innerHTML = this.createHtml(mode);
};

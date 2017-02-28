var p = {
    'className': 'Users',
    'page': 1,
    'size': 10
};
p.init = function(){
    $j_pagenation=$('.j_pagenation');
    p.page=misc.getParam('page')||1;
    p.admin=userObj.currentUser;
    var op_str="";
    if(userObj.currentUser.get("userRole")=="Admins"){
        if(p.admin.get("type")=="location"){
            op_str='<option value="group">单位</option>';
        }else{
            op_str='<option value="location">居委会</option>';
        }
        $('#j_create_new').removeClass('hide');
    }else{
        op_str+='<option value="group">单位</option>';
        op_str+='<option value="location">居委会</option>';
    }
    $('.search-type').append(op_str);
    p.initEvent();
};
p.clearTablePages = function(){
    $j_pagenation.html('');
    $('#datatable tbody').html('');
};
p.loadUserById = function(ids){
  if(ids.length==0){
    p.clearTablePages();
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
      if(searchWord){
        p.loadUsersByArrayKey();
      }
  });
  $('.j_show_persons').on('click', function (e) {
      e.preventDefault();
      p.checkin="";
      // $('#search-word').val('');
      p.page=1;
      p.loadUsersByArrayKey();
  });
  $('.j_check_in').on('click', function (e) {
      e.preventDefault();
      p.checkin="checkin";
      // $('#search-word').val('');
      p.page=1;
      p.loadUsersByArrayKey(p.admin.get("type"),userObj.currentUser.id,p.showUsers);
  });
  $('.j_uncheck_in').on('click', function (e) {
      e.preventDefault();
      p.checkin="uncheckin";
      // $('#search-word').val('');
      p.page=1;
      p.loadUsersByArrayKey(p.admin.get("type"),userObj.currentUser.id,p.showUsers);
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
p.loadUsersByArrayKey=function(type,adminId,cb){
  var type=p.admin.get("type"),
      adminId=userObj.currentUser.pid,
      cb=p.showUsers;
  var searchType = $('.search-type').val(),
      searchWord = $.trim($('#search-word').val());
  // if(p.checkin=="checkin"){
  //   query.equalTo("checkin","true");
  // }else if(p.checkin=="uncheckin"){
  //   query.notEqualTo("checkin","true");
  // }
  // type && query.equalTo(type, adminId);
  var param={
      "isShow": "-1",
      "limit": p['size'],
      "page_index": p['page'],
      "group": "",
      "location":"",
      "flagNumber": "",
      "mobile": "",
      "idcard": "",
      "realname": "",
      "username": "",
      "order_by": "-flagNumber"
  };
  if(type=="group"||type=="location"){
      param[type]=adminId;
  }
  param[searchType]=searchWord.toLowerCase();
  misc.func.user.get_users(param,function(res){
    if(res.code=="0"&&res.data){
        p.pagination=res.pagination;
        p.maxPage=p.pagination.page_count;
        $('#maxCount').text(p.pagination.count);
        datas=res.data;
        if(datas && datas.length>0){
            cb && cb(datas);
        }
        else{
            p.clearTablePages();
        }
    }
    else{
        alert('没有数据哦')
    }
  },function(err){
      alert('没有数据哦')
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
    data.get=function(d){
        return data[d];
    };
    var cki = data.get("checkin"),
    cki_str = cki.length>1?[cki[1],"-",cki[2],"-",cki[3]," ",cki[4]].join(""):"未报到";
    var s = data.get("isShow") == "0" ? '<div class="outter-block outter-border"><div class="circle-block boxshowdow"><div></div>':'<div class="outter-block colorGreen"><div class="circle-block boxshowdow pull-right"><div></div>';
    return ['<tr data-id="',data.objectId,'" data-pid="',data.get("pid"),'">',
              '<td>',s,'</td>',
              '<td>',data.get("flagNumber"),'</td>',
              '<td class="j_starmark">',data.get("username"),'</td>',
              '<td class="j_view" style="color:#4b8df8;cursor:pointer;max-width: 60px;">',data.get("realname"),'</td>',
              '<td>',data.get("sex")=="男"?"男":"女",'</td>',
              '<td>',data.get("idcard"),'</td>',
              '<td style="max-width:100px;">',data.get("mobile"),'</td>',
              '<td>',data.get("political")=="团员"?(misc.getAge(data.get('birth'))<=28 ?"团员":'青年'):data.get("political").replace('S',''),'</td>',
              '<td>',misc.getAge(data.get('birth')),'岁</td>',
              '<td>',(data.get("group")||"暂无"),'</td>',
              '<td>',(data.get("location")||"暂无"),'</td>',
              // '<td style="max-width:120px;">',data.get("job"),'</td>',
              // '<td>',(data.get(p.admin.get("type")=="group"?"location":"group")[2]||"暂无"),'</td>',
              '<td>',cki_str,'</td>',
            '</tr>'].join('');
}
function operateEvent(){
    $('#datatable .j_view').off().on('click', function (e) {
        e.preventDefault();
        window.open('user.html?id='+$(this).parent().attr('data-pid')+'#user');
    });
    $('#datatable .j_starmark').off().on('click', function (e) {
        e.preventDefault();
        window.open('/card/mobile/starandmark/?id='+$(this).parent().attr('data-pid')+'#user');
    });
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
}

function createRow() {
    var $tbody = $('tbody').eq(0),
        firstTR = $tbody.find("tr:first"),
        tempTR = $('<tr><td style="width:35px;"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
    if(firstTR.length==0){
      tempTR.appendTo($tbody);
    }else{
      tempTR.insertBefore(firstTR);
    }

    var tempTRTDs = tempTR.find('td');
    tempTRTDs.eq(0).html('<a class="add" href="">添加</a> <a class="cancel" href="">取消</a>');
    tempTRTDs.eq(1).html('<input class="flagNumber" type="text" style="width: 70px !important;background: #ffffff;" value="">');
    tempTRTDs.eq(2).html('<input class="username" type="text" style="width: 70px !important;background: #ffffff;" value="">');
    tempTRTDs.eq(3).html('<input class="realname" type="text" style="width: 70px !important;background: #ffffff;" value="">');
    tempTRTDs.eq(4).html('<select class="sex" style="width:90px;"><option value="">请选择</option><option selected="selected" value="男">男</option><option value="女">女</option></select>');
    tempTRTDs.eq(5).html('<input class="idcard" type="text" style="width: 70px !important;background: #ffffff;" value="">');
    tempTRTDs.eq(6).html('<input class="mobile" type="text" style="width: 70px !important;background: #ffffff;" value="">');
    tempTRTDs.eq(7).html('<input class="political" type="text" style="width: 70px !important;background: #ffffff;" value="">');
    createLateEvent();
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
          'flagNumber': $('input.flagNumber').val(),
          'username': $('input.username').val(),
          'realname': $('.realname').val(),
          'sex': $('.sex').val(),
          'political': $('.political').val(),
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
          'mobile': params.mobile,
          // 'address': params.address,
          // 'job': params.job,
          'birth': params.birth,
          'flagNumber': params.flagNumber,
          'political': params.political
        };
        params2[p.admin.get("type")]=[
            p.admin.get('pid'),
            p.admin.get("username"),
            p.admin.get("name"),
            p.admin.get("type")
        ];
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
                // userObj.logOut();
                AV.User.logOut();
                AV.User.logIn(p.admin.get('username'), p.admin.get('pwd')||"admin", {
                    success: function(user) {
                      if(user && user.getObjectId()){
                          Tools.UseModal([],'关闭',['添加成功！'].join(''),{
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
                          waitRedirect('persons.html',600);
                      }
                    },
                    error: function(user, error) {
                      fillAlert(errorEnum[error.code].msg);
                    }
                });
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
p.showUsers = function(datas){
  $('#datatable tbody').html(p.htmlDatas(datas));
  operateEvent();
  p.maxPage>=1 && $j_pagenation.show() && p.loadPagination();
};
// 重写分页函数
showPages.prototype.toPage = function(page){ //页面跳转
 var turnTo = 1;
 if (typeof(page) == 'object') {
  turnTo = page.options[page.selectedIndex].value;
 } else {
  turnTo = page;
 }
 p.page = turnTo;
 p.loadUsersByArrayKey(p.admin.get("type"),userObj.currentUser.pid,p.showUsers);
 // if(p.btn == '1'){
 //  p.loadUsersByArrayKey(p.admin.get("type"),userObj.currentUser.id,p.showUsers);
 // }
 // else if(p.btn == '2'){
 //  p.loadUsersByArrayKey(p.admin.get("type"),userObj.currentUser.id,p.showUsers);
 // }
 // else{
 //  p.loadUsersByArrayKey(p.admin.get("type"),userObj.currentUser.id,p.showUsers);
 // }
 // self.location.href = this.createUrl(turnTo);
};
showPages.prototype.printHtml = function(mode){ //显示html代码
 this.page = p.page ? p.page : 1;
 // this.getPage();
 this.checkPages();
 this.showTimes += 1;
 this.element.html(pagestyle+this.createHtml(mode));
};


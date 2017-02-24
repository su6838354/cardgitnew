var p = {
  'className': 'Users',
  'page': 1,
  'size': 10
};
p.init = function(){
  p.page = misc.getParam('page') || 1;
  $j_pagenation = $('.j_pagenation');
  p.loadDatas();
  p.initEvent();
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
      p.loadDatas();
  });
  $('.j_check_in').on('click', function (e) {
      e.preventDefault();
      p.checkin="true";
      $('#search-word').val('');
      p.page=1;
      p.loadDatas();
  });
  $('.j_uncheck_in').on('click', function (e) {
      e.preventDefault();
      p.checkin="false";
      $('#search-word').val('');
      p.page=1;
      p.loadDatas();
  });
};
p.loadDatas = function(){
  var query = new AV.Query(p.className);
  var searchType = $('.search-type').val(),
      searchWord = $.trim($('#search-word').val());
  searchWord && query.startsWith(searchType,searchWord.toLowerCase());
  if(p.checkin=="true"){
      query.equalTo("checkin","true") 
  }
  else if(p.checkin=="false"){
      query.notEqualTo("checkin","true") 
  }
  // query.equalTo("isShow","1");
  query.count({
    success: function(data){
      p.maxPage = Math.ceil(data/p.size);
      $('#maxCount').text(data);
    }
  });
  query.descending("createdAt");
  query.limit(p['size']);
  query.skip((p['page']-1)*p['size']);
  query.find({
    success: function(datas) {
      $('#datatable tbody').html(p.htmlDatas(datas));
      operateEvent();
      p.maxPage>=1 && p.loadPagination();
    },
    error: function(datas, error) {

    }
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
    var cki = data.get("checkin"),
    cki_str = cki.length>1?[cki[1],"-",cki[2],"-",cki[3]," ",cki[4]].join(""):"未报到";
    var s = data.get("isShow") == "0" ? '<div class="outter-block outter-border"><div class="circle-block boxshowdow"><div></div>':'<div class="outter-block colorGreen"><div class="circle-block boxshowdow pull-right"><div></div>';
    return ['<tr data-id="',data.id,'" data-pid="',data.get("pid"),'">',
              '<td>',s,'</td>',
              '<td>',data.get("flagNumber"),'</td>',
              '<td>',data.get("username"),'</td>',
              '<td class="j_view" style="color:#4b8df8;cursor:pointer;">',data.get("realname"),'</td>',
              '<td>',data.get("sex")=="男"?"男":"女",'</td>',
              '<td>',data.get("idcard"),'</td>',
              '<td >',data.get("mobile"),'</td>',
              // '<td>',data.get("address"),'</td>',
              '<td>',data.get("political")=="团员"?(misc.getAge(data.get('birth'))<=28 ?"团员":'青年'):data.get("political"),'</td>',
              '<td>',misc.getAge(data.get('birth')),'岁</td>',
              '<td>',(data.get("group")[2]||"暂无"),'</td>',
              '<td>',(data.get("location")[2]||"暂无"),'</td>',
              '<td>',cki_str,'</td>',
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
                AV.User.logIn("admin", "admin", {
                    success: function(user) {
                      if(user && user.getObjectId()){
                          waitRedirect('users.html',400);
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

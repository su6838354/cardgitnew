var p = {
  'className': 'Admins',
  'page': 1,
  'size': 5
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
};
p.loadDatas = function(){
  var query = new AV.Query(p.className);
  var searchType = $('.search-type').val(),
      searchWord = $.trim($('#search-word').val());
  // searchWord && query.equalTo(searchType,searchWord.toLowerCase());
  if(searchType=="type"){
    switch(searchWord){
      case '单位': searchWord='group';break;
      case '居委': searchWord='location';break;
      default: searchWord='';break;
    }
  }
  searchWord && query.startsWith(searchType,searchWord.toLowerCase());
  query.count({
    success: function(data){
      p.maxPage = Math.ceil(data/p.size);
      $('#maxCount').text(data);
    }
  });

// query.startsWith('pubUser', 'LeanCloud');
  query.descending("createdAt");
  query.limit(p['size']);
  query.skip((p['page']-1)*p['size']);
  query.find({
    success: function(datas) {
      $('#datatable tbody').html(p.htmlDatas(datas));
      operateEvent();
      p.maxPage>=1 && $('.j_pagenation').show() && p.loadPagination();
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
    var s = data.get("isShow") == "0" ? '<div class="outter-block outter-border"><div class="circle-block boxshowdow"><div></div>':'<div class="outter-block colorGreen"><div class="circle-block boxshowdow pull-right"></div></div>';
    return ['<tr data-id="',data.id,'" data-pid="',data.get("pid"),'" data-name="',data.get("name"),'">',
              '<td>',s,'</td>',
              '<td class="j_show_users">',data.get("username"),'</td>',
              '<td onclick="alert(',data.get("pwd"),')" class="" style="color:#4b8df8;cursor:pointer;">',data.get("name"),'</td>',
              '<td>',data.get("type")=="group"?"单位":"居委",'</td>',
              '<td>',data.get("address"),'</td>',
              '<td >',data.get("person"),'</td>',
              '<td>',data.get("tel"),'</td>',
              '<td>',data.get("mobile"),'</td>',
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
        window.open('teacher.html?id='+$(this).parent().attr('data-id')+'#user');
    });

    // $('#datatable .j_show_users').off().on('click', function(e){
    //     e.preventDefault();
    //     var $par = $(this).parent();
    //     // p.getUAMappingByAdminId($par.attr('data-pid'),$par.attr('data-name'));
    // });
}
// p.getUAMappingByAdminId = function(id,name){
//   var query = new AV.Query('UAMapping');
//   query.ascending("updatedAt");
//   query.equalTo('isKeep',true);
//   query.equalTo('adminId',id);
//   query.limit(1000);
//   query.select('userId', 'userRealName');
//   query.find({
//     success:function(datas){
//       var l = datas?datas.length:0;
//       if(l>0){
//         var arrHtml = [
//             '<h3>',name,'所属人员名单</h3>'
//         ];
//         arrHtml.push('<ul class="users-list">');
//         for (var i = 0; i < l; i++) {
//           arrHtml.push([
//               '<li>',
//                 '<div style="width:30%;text-align:center;">',i+1,'.</div>',
//                 '<a target="_blank" href="./user.html?id=',datas[i].get("userId"),'#user"><div style="width:70%;">',datas[i].get("userRealName"),'</div></a>',
//               '</li>',            
//           ].join(''));
//         }
//         arrHtml.push('</ul');
//         Tools.UseModal([],'关闭',arrHtml.join(''),{
//             'width': 700,
//             'height': 600,
//             'margin-left':-350,
//             'margin-top':-180,
//             'position': 'fixed',
//             'left': '50%',
//             'top': '50%',
//         });
//         $('.modal-footer').remove();
//         $('.modal-body').css('margin-bottom', '50px');
//       }
//     }
//   });
// };
function createLateEvent(){
    $('#datatable a.cancel').off().on('click', function (e) {
        e.preventDefault();
        $(this).parent().parent().remove();
    });
    $('#datatable a.add').off().on('click', function (e) {
        e.preventDefault();
        var $this = $(this);

        var params = {
          'username': $('input.username').val(),
          'name': $('.name').val(),
          'type': $('.type').val(),
          'address': $('.address').val(),
          'person': $('.person').val(),
          'tel': $('.tel').val(),
          'mobile': $('.mobile').val()
        };
        for (var i in params){
          if(!params[i]){
            alert("请将信息填写完整！");
            return false;
          }
        }

        var params1 = {
          // 'password': parseInt(Math.random()*1000000).toString(),//6位随机密码
          'password': misc.generateRandom(100000).toString(),//6位随机密码
          'username': params.username,
          'userRole': p['className']
        };
        var params2 = {
          'isShow': '1',
          'pwd': params1.password,
          'username': params1.username,
          'name': params.name,
          'type': params.type,
          'person': params.person,
          'address': params.address,
          'mobile': params.mobile,
          'tel': params.tel
        };
        var user = new AV.User();
        for (var property in params1){
          user.set(property, params1[property]);
        }
        user.signUp(null, {
          success: function(data) {
            var Admins = AV.Object.extend(p.className);
            var u = new Admins();
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
        tempTR = $('<tr><td style="width:35px;"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
    
    if(firstTR.length==0){
      tempTR.appendTo($tbody);
    }else{
      tempTR.insertBefore(firstTR);
    }

    var tempTRTDs = tempTR.find('td');
    tempTRTDs.eq(0).html('<a class="add" href="">添加</a> <a class="cancel" href="">取消</a>');
    tempTRTDs.eq(1).html('<input class="username" type="text" style="width: 70px !important;background: #ffffff;" value="">');
    tempTRTDs.eq(2).html('<input class="name" type="text" style="width: 70px !important;background: #ffffff;" value="">');
    tempTRTDs.eq(3).html('<select class="type" style="width:90px;"><option value="">请选择</option><option value="group">单位</option><option value="location">居委</option></select>');
    tempTRTDs.eq(4).html('<input class="address" type="text" style="width: 70px !important;background: #ffffff;" value="">');
    tempTRTDs.eq(5).html('<input class="person" type="text" style="width: 70px !important;background: #ffffff;" value="">');
    tempTRTDs.eq(6).html('<input class="mobile" type="text" style="width: 70px !important;background: #ffffff;" value="">');
    tempTRTDs.eq(7).html('<input class="tel" type="text" style="width: 70px !important;background: #ffffff;" value="">');
    tempTRTDs.eq(8).html('');
    createLateEvent();
}

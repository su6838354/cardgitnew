var p = {
  'className': 'Admins',
  'page': 1,
  'size': 1
};
p.init = function(){
  p.page = parseInt(misc.getParam('page')) || 1;
  // if(p.page>1) return false;
  $j_pagenation = $('.j_pagenation');
  p.loadDatas();
};
p.loadPagination = function(){
  pg.pageCount = p.maxPage; // 定义总页数(必要)
  pg.argName = 'page';  // 定义参数名(可选,默认为page)
  pg.element = $j_pagenation; // 文本渲染在那个标签里面
  pg.printHtml(1);
};
p.loadDatas = function(){
  var query = new AV.Query('CheckInLog');
  // query.equalTo("userRealName","杨璞");
  query.count({
    success: function(data){
      p.maxPage = Math.ceil(data/p.size);
      $('#maxCount').html(data);
    }
  });
  query.ascending('userId');
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
    var s = true ? '<div class="outter-block outter-border"><div class="circle-block boxshowdow"><div></div>':'<div class="outter-block colorGreen"><div class="circle-block boxshowdow pull-right"></div></div>';
    return ['<tr data-day="',misc.formatDateTime(data.createdAt,"dd"),'" data-time="',misc.formatDateTime(data.createdAt,"hh:mm:ss"),'" data-userId="',data.get("userId"),'">',
              '<td>',s,'</td>',
              '<td>',data.get("userRealName"),'</td>',
              '<td>',data.get("adminType")=="group"?"单位":"居委",'</td>',
              '<td >',data.get("adminName"),'</td>',
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
        day = curTR.attr('data-day'),
        time = curTR.attr('data-time'),
        userId = curTR.attr('data-userId');
        if(!userId){
          return false;
        }

        p.loadByPID('Users',userId,function(data,type){
          if(data.id){
            data.set("checkin", ["true","2016","05",day,time]);
            data.save().then(function(data){
              // alert('save success');
              location.href = 'http://127.0.0.1:8020/card/pc/docheckin.html?page='+(p.page+1)+'#user'
            }, function(error){
              alert('save error');
            })
          }
          else{
            alert('user not exist');
          }
        },"");

        // p.loadByPID('Admins',adminId,function(data){
        //   if(data.id){
        //     var admin = new Admins();
        //     admin.id = adminId;
        //     var admin = AV.Object.createWithoutData('Admins', data.id);
        //     p.loadByPID('Users',userId,function(data,type){
        //       if(data.id){
        //         debugger
        //         // data.set(type, admin);
        //         data.set("admin", [adminId,"崇明县东门中学"]);
        //         debugger
        //         data.save().then(function(data){
        //           debugger
        //         }, function(error){
        //           debugger
        //           alert('save error');
        //         })
        //       }
        //     },data.get('type'));
        //   }
        // });
  });
  $('#datatable div.circle-block').eq(0).trigger('click');
};
p.loadByPID = function(cname,pid,cb,type){
  var query = new AV.Query(cname);
  query.equalTo("pid",pid)
  query.find().then(function(datas){
    if(datas && datas.length>0){
      cb && cb(datas[0],type);
    }
  }, function(error){
    alert('query error')
  });
};
p.loadUsersByArrayKey= function(adminId,type){
  var query = new AV.Query('Users');
  // query.containedIn('admin', ['57053a32d342d300541430d9','570539af7db2a20051ae8e9f']);
  // query.equalTo('admin', '57053a32d342d300541430d9');
  query.containsAll('admin', ['57053a32d342d300541430d9','崇明县东门中学']);
  // query.sizeEqualTo('admin', 2);
  debugger
  query.find().then(function(datas){
    debugger
    if(datas && datas.length>0){
      
    }
  }, function(error){
    debugger
    alert('query error')
  });
}
p.loadUsersByAdminIdAndType = function(adminId,type){
  var query = new AV.Query('Users');
  var Admins = AV.Object.extend('Admins');
  var admin = new Admins();
  // admin.id = adminId;
  admin.set("name","崇明县东门中学")
  query.equalTo(type, admin);
  debugger
  query.find().then(function(datas){
    debugger
    if(datas && datas.length>0){
      
    }
  }, function(error){
    debugger
    alert('query error')
  });
}
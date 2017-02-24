var p = {
    'page':1,
    'size':2
};
p.init = function(){
    $j_pagenation=$('.j_pagenation');
    p.page=misc.getParam('page')||1;
    p.page=parseInt(p.page);
    p.loadDatas();
    p.initEvent();
};
p.loadPagination = function(){
  pg.pageCount=p.maxPage; // 定义总页数(必要)
  pg.argName='page';  // 定义参数名(可选,默认为page)
  pg.element=$j_pagenation; // 文本渲染在那个标签里面
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
  $('body').delegate('select', 'change', function(e) {
      e.stopPropagation();
      var $this = $(this);
      var extra = parseInt($this.val()),
      act_id = $this.attr('data-id');
      var query = new AV.Query('ActJoinLog');
      query.get(act_id, {
          success: function(data) {
            data.set("extra",extra);
            data.save().then(function(){
              alert("加分成功");
            }, function(){
              alert("加分失败 ");
            });
          },
          error: function(user, error) {   
            alert("加分失败 " + error.message);
          }
      });
  });
};
p.loadDatas = function(){
  // var searchType = $('.search-type').val(),
  //     searchWord = $.trim($('#search-word').val());
  // // searchWord && query.equalTo(searchType,searchWord.toLowerCase());
  // if(searchType=="type"){
  //   switch(searchWord){
  //     case '单位': searchWord='group';break;
  //     case '居委': searchWord='location';break;
  //     default: searchWord='';break;
  //   }
  // }
  // searchWord && query.startsWith(searchType,searchWord.toLowerCase());
    var param={
        "isDelete":"0",
        "isShow":"1",
        "limit":p.size,
        "page_index":p.page
    };
    if(userObj.currentUser.get("userRole")=="Admins"){
        // param["admin"]=userObj.currentUser.pid;
    }
    misc.func.activity.get_activities(param,function(res){
        if(res.code=="0"&&res.data){
            p.pagination=res.pagination;
            p.maxPage=p.pagination.page_count;
            $('#maxCount').text(p.maxPage);

            activities=res.data;
            $('#datatable tbody').html(p.htmlDatas(activities));
            p.maxPage>=1 && p.loadPagination();
            operateEvent();
        }else{
            alert('出错啦')
        }
    },function(err){
        alert('出错啦')
    });
};
p.htmlDatas = function(datas){
  var arr = [];
  for(var i=0,l=datas.length;i<l;i++){
    arr.push(htmlRow(datas[i],i));
  }
  return arr.join('');
};
function htmlRow(data,idx){
    data.get=function(prop){
        return data[prop];
    };
    var reg_str = '<a class="reg_act" style="margin-left:10px;" href="javascript:;">报名人员</a>';
    var join_str = '<a class="join_act" style="margin-left:10px;" href="javascript:;">参加人员</a>';
    var del = '<a class="del_act" style="margin-left:10px;" href="javascript:;">删除</a>';
    var s = data.get("isShow") == "0" ? '<div style="float:left !important;" class="outter-block outter-border"><div class="circle-block boxshowdow"></div></div>':'<div style="float:left !important;" class="outter-block colorGreen"><div class="circle-block boxshowdow pull-right"></div></div>';
    return ['<tr data-id="',data.id,'">',
              '<td>',s,del,join_str,'</td>',
              '<td class="" style="color:#4b8df8;cursor:pointer;">',data.get("admin__name"),'</td>',
              '<td class="" style="color:#4b8df8;cursor:pointer;">',data.get("title"),'</td>',
              '<td style="max-width:260px;">',data.get("content"),data.get("content"),data.get("content"),'</td>',
              '<td class="">',data.get("place"),'</td>',
              '<td class="">',data.get("limit"),'</td>',
              '<td class="">',data.get("joinnum"),'</td>',
              '<td>',misc.formatDateTime(new Date(data.updatedAt),userObj.format2),'</td>',
              '<td>',misc.formatDateTime(new Date(data.createdAt),userObj.format2),'</td>',
            '</tr>'].join('');
}
function operateEvent(){
  $('#datatable a.del_act').off().on('click', function (e) {
        e.preventDefault();
        if(confirm('不可撤销，确认删除该活动？')){
          var $this = $(this);
          var curTR = $this.closest('tr'),
          id = curTR.attr('data-id');
          if(!id){
            return false;
          }
          // var query = new AV.Query(p.className);
          // query.get(id, {
          //     success: function(data) {
          //       var property = 'isDelete';
          //       var s = (data.get(property) == '1') ? '0' : '1';
          //       data.set(property,s);
          //       data.save();
          //       curTR.fadeOut('fast', function() {
                  
          //       });
          //     },
          //     error: function(user, error) {   
          //         alert("操作失败 " + error.message);
          //     }
          // });
        }

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
        // var query = new AV.Query(p.className);
        // query.get(id, {
        //     success: function(data) {
        //       var property = 'isShow';
        //       var s = (data.get(property) == '1') ? '0' : '1';
        //       data.set(property,s);
        //       data.save();
        //     },
        //     error: function(user, error) {   
        //         alert("操作失败 " + error.message);
        //     }
        // });
    });

    // $('#datatable .j_view').off().on('click', function (e) {
    //     e.preventDefault();
    //     window.open('teacher.html?id='+$(this).parent().attr('data-id')+'#user');
    // });

    $('#datatable .join_act').off().on('click', function(e){
        e.preventDefault();
        var $par = $(this).parent().parent();
        p.getJoinUsers($par.attr('data-id'));
    });
}
p.renderJoinUser=function(datas){
    var l=datas?datas.length:0;
    var arrHtml=[];
    if(l>0){
      arrHtml = [
          '<h3>',datas[0].get("activity")[1],'参加人员</h3>',
      ];
      arrHtml.push('<ul class="users-list">');
      arrHtml.push([
        '<li>',
            '<div>序号</div>',
            '<a target="_blank" href="javascript:;"><div>姓名</div></a>',
            '<div style="width:30%;">单位</div>',
            '<div style="width:20%;">居委</div>',
            '<div style="width:10%;">是否所属</div>',
            '<div style="width:8%;">评星</div>',
            '<div style="width:16%;">加分</div>',
          '</li>'
      ].join(''));
      for (var i = 0; i < l; i++) {
        var extra = datas[i].get("extra");
        arrHtml.push([
            '<li>',
              '<div>',i+1,'.</div>',
              '<a target="_blank" href="./user.html?id=',datas[i].get("user")[0],'#user"><div>',datas[i].get("user")[2],'</div></a>',
               '<div style="width:30%;">',datas[i].get("userGroupArr")[2],'</div>',
              '<div style="width:20%;">',datas[i].get("userLocationArr").length>0?datas[i].get("userLocationArr")[2]:"暂无",'</div>',
              '<div style="width:10%;">',datas[i].get("isInner")?"是":"否",'</div>',
              '<div style="width:8%;">',datas[i].get("star"),'星</div>',
              '<div style="width:16%;"><select data-extra=',extra,' style="width:70px" data-id=',datas[i].id,'><option value=0>不加分</option><option ',(extra==1?"selected":""),' value=1>1分</option><option ',(extra==2?"selected":""),' value=2>2分</option><option ',(extra==3?"selected":""),' value=3>3分</option></select></div>',
            '</li>',            
        ].join(''));
      }
      arrHtml.push('</ul');
      
    }else{
       arrHtml = [
          '<h3>暂无参加活动人员名单</h3>',
      ];
    }
    Tools.UseModal([],'关闭',arrHtml.join(''),{
        'width': 1000,
        'height': 800,
        'margin-left':-500,
        'margin-top':-250,
        'position': 'fixed',
        'left': '50%',
        'top': '50%',
    });
    $('.modal-footer').remove();
    $('.modal-body').css('margin-bottom', '50px');
};
p.getJoinUsers = function(act_id){
    misc.func.activity.get_act_join_log({
        "page_index": 1,
        "limit": 100,
        "admin":userObj.currentUser.get('pid')
    },function(res){
        if(res.code===0&&res.data){
          debugger
          p.renderJoinUser(res.data);
        }
    },function(err){

    });
};
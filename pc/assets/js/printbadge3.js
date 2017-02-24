var p = {};
p.loadPagination = function(){
  pg.pageCount = p.maxPage; // 定义总页数(必要)
  pg.argName = 'page';  // 定义参数名(可选,默认为page)
  pg.element = $j_pagenation; // 文本渲染在那个标签里面
  pg.printHtml(1);
};
p.init = function(){
	p.size=2;
  p.page = misc.getParam("page") || 1;
  // p.begin = misc.getParam("begin") || '2016/04/27';
  // p.begin = misc.getParam("begin") || '2016/04/27';
  p.begin = misc.getParam("begin");
  p.end = misc.getParam("end");
  $j_pagenation = $('.j_pagenation');
  if(p.begin && p.end){
    p.loadUsers();
  }
	p.initEvent();
};
p.initEvent = function(){
  // $('.confirm').click(function(event) {
  //   /* Act on the event */
  // });
};
p.showMyQRCode = function(index,id){
	qrcodeEle = document.getElementsByClassName('qrcode')[index];
    var qrcode = new QRCode(qrcodeEle, {
        width: 158,//设置宽高
        height: 158
    });
 	var url = ['http://www.weichongming.com/card/mobile/scanqrcode/?id=',id];
    qrcode.makeCode(url.join(''));
    qrcodeEle.style.visibility = 'visible';
};
p.loadUsers = function(){
  var query = new AV.Query('Users');
  query.greaterThanOrEqualTo('updatedAt', new Date(p.begin+' '+'00:00:00'));
  query.lessThanOrEqualTo('updatedAt', new Date(p.end+' '+'23:59:59'));
  query.equalTo('isShow', '1');
  query.startsWith('flagNumber', '1');
  query.count({
    success: function(data){
      p.maxPage = Math.ceil(data/p.size);
      $('#maxCount').text(data);
      $('#maxPage').text(p.maxPage);
    }
  });
  query.ascending("updatedAt");
  query.limit(p['size']);
  query.skip((p['page']-1)*p['size']);
  // query.select('pid', 'realname', 'flagNumber');
  query.find({
    success:function(datas){
      var l = datas?datas.length:0;
      if(l>0){
        var arrHtml = [];
        for (var i = 0; i < l; i++) {
          var huizhang;
          if(datas[i].get("political")=="团员" || datas[i].get("political")=="青年" || datas[i].get("political")=="党员S" || datas[i].get("political")=="中共党员S" || datas[i].get("political")=="预备党员S"
            ){
            huizhang='bg12-1';
          }
          else{
            huizhang='bg14-1';
          }
          // datas[i].get("political")=="团员"?(misc.getAge(datas[i].get('birth'))<=28 ?"1":"2"):"2";
          arrHtml.push([
            '<div class="badge" style="background-image: url(assets/images/badge/',huizhang,'.jpg);">',
          '<div class="qrcode"></div>',
          '<div class="flagNumber">',datas[i].get("flagNumber"),'</div>',
          '<div class="name">',datas[i].get("realname"),'</div>',
        '</div>'          
          ].join(''));
        }
        $('.badges').html(arrHtml.join(''))
        p.maxPage>=1 && $('.j_pagenation').show() && p.loadPagination();
        for (var i = 0; i < l; i++) {
          p.showMyQRCode(i,datas[i].get("pid"));
        }
      }
    }
  });
};
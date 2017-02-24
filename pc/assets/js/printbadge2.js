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
  $j_pagenation = $('.j_pagenation');
	// p.loadAdmins();
// p.loadUsers();
	p.initEvent();
};
p.initEvent = function(){
	$('.j_admins').change(function(e) {
	    e.stopPropagation();
	    e.preventDefault();
	    p.adminId=$(this).val();
		p.getUAMappingByAdminId(p.adminId);
	});
};
p.showMyQRCode = function(index,id){
	qrcodeEle = document.getElementsByClassName('qrcode')[index];
    var qrcode = new QRCode(qrcodeEle, {
        width: 140,//设置宽高
        height: 140
    });
 	var url = ['http://www.weichongming.com/card/mobile/scanqrcode/?id=',id];
    qrcode.makeCode(url.join(''));
    qrcodeEle.style.visibility = 'visible';
};

p.getUserNumber = function(id){
  var query = new AV.Query('Users');
  query.equalTo('pid',id);
  query.select('flagNumber');
  query.find({
    success:function(datas){
    	// debugger
  	}  
  });
};
p.getUAMappingByAdminId = function(id){
  var query = new AV.Query('UAMapping');
  query.equalTo('adminId',id);
  query.equalTo('isKeep',true);
  query.count({
    success: function(data){
      p.maxPage = Math.ceil(data/p.size);
      // $('#maxCount').text(data);
    }
  });
  query.descending("createdAt");
  query.limit(p['size']);
  query.skip((p['page']-1)*p['size']);
  query.select('userId', 'userRealName');
  query.find({
    success:function(datas){
      var l = datas?datas.length:0;
      if(l>0){
        var arrHtml = [];
        for (var i = 0; i < l; i++) {
          arrHtml.push([
	          '<div class="badge" style="background-image: url(assets/images/badge/bg1-1.png);">',
					'<div class="qrcode"></div>',
					'<div class="flagNumber">16000001</div>',
					'<div class="name">',datas[i].get("userRealName"),'</div>',
			  '</div>'          
          ].join(''));
        }
        $('.badges').html(arrHtml.join(''))
      	p.maxPage>=1 && $('.j_pagenation').show() && p.loadPagination();
        for (var i = 0; i < l; i++) {
			     p.showMyQRCode(i,datas[i].get("userId"));
        }
      }
    }
  });
};
// p.roleEnum = {
//   '青年':'bg1-1',
//   '团员':'bg1-1'
//   '党员':'bg1-1',
//   '预备党员':'bg1-1'
//   '群众':'bg2-2',
//   '其他':'bg2-2',
//   '无保留团籍的党员':'bg2-2'
// };
p.loadUsers = function(){
  var query = new AV.Query('Users');
  query.equalTo('isShow', '1');
  query.startsWith('flagNumber', '1');
  query.count({
    success: function(data){
      p.maxPage = Math.ceil(data/p.size);
      $('#maxCount').text(data);
    }
  });
  query.descending("flagNumber");
  // query.descending("updatedAt");
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
          if(datas[i].get("political")=="团员" || datas[i].get("political")=="青年" || datas[i].get("political")=="党员S" || datas[i].get("political")=="预备党员S"
            ){
            huizhang='bg1-1';
          }
          else{
            huizhang='bg2-2';
          }
          // datas[i].get("political")=="团员"?(misc.getAge(datas[i].get('birth'))<=28 ?"1":"2"):"2";
          arrHtml.push([
            '<div class="badge" style="background-image: url(assets/images/badge/',huizhang,'.png);">',
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
p.loadAdmins = function(){
  var query = new AV.Query('Admins');
  query.find({
    success: function(datas) {
      p.admins = datas;
      var arr=[];
      for (var i = 0,l = p.admins.length; i < l; i++) {
        var admin = p.admins[i];
      arr[i]='<option value="'+admin.get('pid')+'">'+admin.get('name')+'</option>';
      }
      $('.j_admins').append(arr.join(''));
    },
    error: function(datas, error) {

    }
  });  
};
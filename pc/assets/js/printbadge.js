showPages.prototype.printHtml = function(mode){ //显示html代码
 this.page = p.page ? p.page : 1;
 this.checkPages();
 this.showTimes += 1;
 this.element.append('<div id="pages_' + this.name + '_' + this.showTimes + '" class="pages"></div>');
 document.getElementById('pages_' + this.name + '_' + this.showTimes).innerHTML = this.createHtml(mode);
};
showPages.prototype.toPage = function(page){ //页面跳转
 var turnTo = 1;
 if (typeof(page) == 'object') {
  turnTo = page.options[page.selectedIndex].value;
 } else {
  turnTo = page;
 }
 p.page = page;
 p.getUAMappingByAdminId(p.adminId);
 // self.location.href = this.createUrl(turnTo);
};
var p = {};
p.loadPagination = function(){
  $('.pages').remove();
  $j_pagenation.append(pagestyle);
  pg.pageCount = p.maxPage; // 定义总页数(必要)
  pg.argName = 'page';  // 定义参数名(可选,默认为page)
  pg.element = $j_pagenation; // 文本渲染在那个标签里面
  pg.printHtml(1);
};
p.init = function(){
	p.size=3;
    p.page = 1;
    $j_pagenation = $('.j_pagenation');
	p.loadAdmins();
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
        width: 94,//设置宽高
        height: 94
    });
 	var url = ['http://www.weichongming.com/card/mobile/card/mobile/scanqrcode/?id=',id];
    qrcode.makeCode(url.join(''));
    qrcodeEle.style.visibility = 'visible';
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
p.getUserNumber = function(id){
  var query = new AV.Query('Users');
  query.equalTo('pid',id);
  query.select('flagNumber');
  query.find({
    success:function(datas){
    	debugger
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
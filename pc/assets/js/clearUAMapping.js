var p = {};
var query;
p.init = function(){
  p.page=1;
	p.size=1000;
  p.list={};
  p.getUAMappings();
  $exec=$('#exec');
  $exec.on('click', function(e) {
    e.preventDefault();
    p.execByBtnClick();
  });
};
p.getUAMappings = function(id){
  query = new AV.Query('UAMapping');
  query.equalTo('type','group');
  // query.equalTo('type','location');
  // query.equalTo('isKeep',true);
  query.count({
    success: function(data){
      p.maxPage = Math.ceil(data/p.size);
      $exec.html('点此执行, '+ p.maxPage);
    }
  });
};
p.execByBtnClick = function(){
  query.descending("createdAt");
  query.limit(p['size']);
  query.skip((p['page']-1)*p['size']);
  query.find({
    success:function(datas){
      var l = datas?datas.length:0;
      if(l>0){
        for (var i = 0; i < l; i++) {
          var property = datas[i].get("userId");
          p.list[property] = p.list[property]?p.list[property]+1:1;
        }
        $exec.html('点此执行, '+ (p.maxPage-p.page));
        p.page++;
      }
    }
  });
};
function doCountGreaterThanOne(obj){
  var newObj={};
  for (var i in obj) {
    if(obj[i]>1)
      newObj[i]=obj[i];
  }
  return newObj;
}
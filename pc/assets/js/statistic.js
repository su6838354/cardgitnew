var p={};
p.init=function(){
	userObj.loadByPID("Admins",userObj.currentUser.id,function(data){
		if(data){
			p.printTable(data.get("name"));
		}else{
			$('tbody').append('<tr border="1"><td>账号不存在哦!</td></tr>');
		}
	});
};
p.printTable=function(groupName){
	var tableArr=JSON.parse(json);
	var thArr = tableArr[0].map(function(item) {
		return item.trim()?'<th>'+item+'</th>':"";
	});
	$('thead').append('<tr>'+thArr.join('')+'</tr>');
	var groupRow = tableArr.filter(function(group){ return group[0]==groupName});
	
	var trArr = groupRow[0].map(function(item) {
		return item.trim()?'<td>'+item+'</td>':"";
	});
	$('tbody').append('<tr border="1">'+trArr.join('')+'</tr>');
};
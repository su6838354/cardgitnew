var p={};
p.init = function(){
	p.actTitle="混放";
	p.initVars();
	p.initData();
};
p.initVars = function(){
	p.publishTotal = 0;
};
p.initData = function(){

	// 单位总数组
	// p.totalArr=["农委", "人力资源和社会保障局", "住房保障房屋管理局", "市场监管局", "农业发展银行", "建管委", "移动崇明分公司", "水务局", "崇明中学", "交通委", "民政局", "卫生计生委", "公安局", "城桥中学", "实验中学", "崇明客轮公司", "城桥镇团委", "城管执法局", "经委", "教育局", "文广影视局", "规划土地局", "崇明工业园区", "亚通公司", "税务局", "县级机关", "联通崇明分公司", "崇明巴士公交公司", "邮政银行", "崇明邮政局", "建行崇明支行", "农商行崇明支行", "浦发行崇明支行", "村镇银行", "申万宏源证券崇明营业部", "上海证券公司崇明营业部", "新华人寿", "崇明电信局", "工行崇明支行", "社保", "农行崇明支行", "中国人寿", "人民保险", "燃气公司", "崇明电力公司", "交行崇明支行", "县气象局", "海关", "检验检疫局", "安信农保", "上海银行崇明支行", "扬子中学", "育林中学", "凌云中学", "崇明县东门中学"];

	// 根据已知的publshArr，得到p.restArr
	// p.restArr = p.totalArr.filter(function(i){ return !p.publishArr.includes(i) });

	// 海洋宣传 分别是 
	// p.publishArr=['崇明中学','城桥中学','卫生计生委','实验中学','城桥镇团委','公安局','市场监管局','移动崇明分公司','人力资源和社会保障局','建管委','农委','住房保障房屋管理局','水务局','交通委','崇明客轮公司','民政局','亚通公司','城管执法局','农业发展银行'];

	// 征集微心愿 
	// p.publishArr=['崇明中学','城桥中学','扬子中学','卫生计生委','县级机关','实验中学','市场监管局','移动崇明分公司','规划土地局','人力资源和社会保障局','建管委','经委','文广影视局','农委','住房保障房屋管理局','水务局','交通委','崇明电信局','民政局','社保','上海银行崇明支行','农业发展银行'];
	
	// 服务进社区 
	// p.publishArr=['崇明中学','城桥中学','扬子中学','实验中学','市场监管局','移动崇明分公司','建管委','住房保障房屋管理局','民政局','城管执法局'];

	// 行车不抛物 分别是 
	// p.publishArr=['崇明中学','城桥中学','卫生计生委','县级机关','实验中学','崇明邮政局','城桥镇团委','公安局','崇明巴士公交公司','市场监管局','移动崇明分公司','人力资源和社会保障局','建管委','经委','文广影视局','农委','税务局','燃气公司','住房保障房屋管理局','水务局','交通委','崇明电信局','崇明客轮公司','民政局','联通崇明分公司','城管执法局','教育局','农业发展银行'];

	//禁烟控烟
	// p.publishArr=['崇明中学','县级机关','公安局','市场监管局','人力资源和社会保障局','建管委','住房保障房屋管理局','民政局','城管执法局','农业发展银行'];

	//拥军优属服务
	// p.publishArr=['崇明中学','实验中学','城桥镇团委','市场监管局','移动崇明分公司','人力资源和社会保障局','经委','住房保障房屋管理局','交通委','民政局','城管执法局','农业发展银行'];

	//混放是垃圾
	// p.publishArr=['农业发展银行','县气象局'];

	//为希望着彩
	// p.publishArr=['崇明中学','扬子中学'];

	//啄木鸟行动
	// p.publishArr=['崇明中学','城桥中学','扬子中学','卫生计生委','县级机关','公安局','崇明巴士公交公司','市场监管局','人力资源和社会保障局','建管委','经委','文广影视局','农委','住房保障房屋管理局','水务局','交通委'];

	//争当创城美容师
	// p.publishArr=['崇明中学','城桥中学','扬子中学','卫生计生委','县级机关','崇明巴士公交公司','市场监管局','人力资源和社会保障局','建管委','经委','文广影视局','税务局','住房保障房屋管理局','崇明工业园区','交通委','亚通公司'];

	//中秋情浓意更浓
	// p.publishArr=['崇明中学','城桥中学','扬子中学','卫生计生委','县级机关','实验中学','城桥镇团委','公安局','崇明巴士公交公司','市场监管局','人力资源和社会保障局','建管委','经委','文广影视局','农委','税务局','住房保障房屋管理局','水务局','交通委','民政局','亚通公司','城管执法局'];


	// 查看总居委
	// p.publishArr=['城西','南门','金鳌山','玉环','西门北村','西泯沟','川心街','观潮','金珠','城中','明珠花苑','湄洲','新崇','吴家弄','小港','永凤','花园弄','海岛','北门','东门','怡祥居','东河沿','城东','江山','学宫','西门南村'];

	// 查看总单位
	p.publishArr=['崇明中学','城桥中学','扬子中学','卫生计生委','县级机关','崇明县东门中学','实验中学','农行崇明支行','崇明邮政局','城桥镇团委','公安局','崇明巴士公交公司','市场监管局','工行崇明支行','移动崇明分公司','规划土地局','人力资源和社会保障局','经委','建管委','农委','文广影视局','邮政银行','税务局','燃气公司','住房保障房屋管理局','浦发行崇明支行','崇明工业园区','建行崇明支行','水务局','交通委','农商行崇明支行','崇明电信局','崇明客轮公司','不在所属区域','民政局','亚通公司','联通崇明分公司','城管执法局','社保','检验检疫局','交行崇明支行','崇明电力公司','上海银行崇明支行','申万宏源证券崇明营业部','中国人寿','人民保险','海关','育林中学','凌云中学','教育局','上海证券公司崇明营业部','农业发展银行','县气象局','安信农保','村镇银行','新华人寿','大龄青年']

	// p.getAdminsByActivityTiltleLike();
	// p.getRestAdmins();
};

p.getGroupUserCheckInInfo = function(){
	var query = new AV.Query('Users');
    query.equalTo("isShow","1");
	query.containedIn('realname',p.publishArr);
	query.find().then(function(datas){
		var arr = datas.map(function(data,index) {
			return [
				'<tr>',
					'<td>',data.get("realname"),'</td>',
					'<td>',data.get("checkin")[0],'</td>',
				'</tr>'].join('');
		})
		$('tbody').append(arr.join(''));
	}, function(error){
		
	})

};
// 通过报到状态得到单位、居委的人数
p.getUserCountByCheckStatus = function(searchType,status){
	var query = new AV.Query('Users');
    query.equalTo("isShow","1");
	query.startsWith(searchType,p.publishArr[p.publishTotal]);
	if(status){
    	query.equalTo("checkin","true");
 	}else{
    	query.notEqualTo("checkin","true");
    }
	query.notContainedIn('political',["单位"]);
    // query.equalTo("location","location");
    query.notEqualTo("location","location");
    query.count().then(function(count){
		var arr = [
				'<tr>',
					'<td>',p.publishArr[p.publishTotal],'</td>',
					'<td>',count,'</td>',
				'</tr>'];
		$('tbody').append(arr.join(''));
		p.publishTotal++;
		// if(p.publishTotal!=6){
		if(p.publishTotal!=p.publishArr.length){
			p.getUserCountByCheckStatus(searchType,status);
		}
	}, function(error){

	});

};
// 模糊查询某主题下所有单位发布的活动
p.getAdminsByActivityTiltleLike = function(){
	var query = new AV.Query('Activities');
	query.notEqualTo('isDelete','1');
	// query.equalTo('isShow','1');
	// query.equalTo('admin','location');
	query.contains('title',p.actTitle);
	// query.limit(1);
	// query.count().then(function(count){
	// 	p.publishTotal=count;
	// 	p.printTables();
	// }, function(error){

	// });
	query.select("title","admin");
	query.find().then(function(datas){
		p.activities=datas;
		p.printTables(p.activities);
	}, function(error){
	});
};
p.printTables = function(datas){
	var l=datas.length||0;
	if(l>0){
		var arr = [];
		for (var i = 0; i < l; i++) {
			var d = datas[i];
			arr.push([
				'<tr>',
					'<td>',d.get("title"),'</td>',
					'<td>',d.get("admin")[2],'</td>',
					'<td>1</td>',
				'</tr>'
			].join(''));
		}
		$('tbody').append(arr.join(''));
	}
};
p.printTables2 = function(datas){
	var l=datas.length||0;
	if(l>0){
		var arr = [];
		for (var i = 0; i < l; i++) {
			var d = datas[i];
			arr.push([
				'<tr>',
					'<td>',d.get("name")||d,'</td>',
					'<td>0</td>',
				'</tr>'
			].join(''));
		}
		$('tbody').append(arr.join(''));
	}
};

p.getAdmins = function(){
	var query = new AV.Query('Admins');
	query.equalTo('isShow','1');
	// query.notContainedIn('name',p.publishArr);
	// query.limit(1);
	query.select("name");
	// query.equalTo('type','group');
	query.equalTo('type','location');
	query.find().then(function(datas){
		p.printTables2(datas);
	}, function(error){
	});
};
p.getRestAdmins = function(){
	var query = new AV.Query('Admins');
	query.equalTo('isShow','1');
	query.notContainedIn('name',p.publishArr);
	// query.limit(1);
	query.select("pid","name");
	query.find().then(function(datas){
		p.printTables2(datas);
	}, function(error){
	});
};
// 得到单位的人数
p.getUserCountByAdmins = function(groupName){
	var query = new AV.Query('Users');
	query.equalTo('isShow','1');
	query.equalTo('group',groupName);
	// query.containsAll();
	// query.notContainedIn('name',p.publishArr);
	// query.limit(1);
	query.count().then(function(count){
		p.printTables2(datas);
		// if(p.publishTotal>0)
	}, function(error){
	});
};

// 得到单位的团员人数
p.getTuanUserCountByAdmins = function(){
	var query = new AV.Query('Users');
	query.equalTo('isShow','1');
	query.equalTo('group',p.publishArr[p.publishTotal]);
	// query.equalTo('group',"农委");
	// query.containedIn('political',["青年"]);
	// query.containedIn('political',["团员","青年","党员S","预备党员S"]);
	query.notContainedIn('political',["单位"]);
	query.count().then(function(count){
		var arr = [
				'<tr>',
					'<td>',p.publishArr[p.publishTotal],'</td>',
					'<td>',count,'</td>',
				'</tr>'];
		$('tbody').append(arr.join(''));
		p.publishTotal++;
		// if(p.publishTotal!=3){
		if(p.publishTotal!=p.publishArr.length){
			p.getTuanUserCountByAdmins();
		}
	}, function(error){
	});
};
p.recursionArr=function(){
	var query = new AV.Query('Users');
	query.equalTo('isShow','1');
	query.equalTo('group',p.publishArr[p.publishTotal]);
	query.count().then(function(count){
		var arr = [
				'<tr>',
					'<td>',count,'</td>',
				'</tr>'];
		$('tbody').append(arr.join(''));
		p.publishTotal++;
		// if(p.publishTotal!=1){
		if(p.publishTotal!=p.publishArr.length){
			p.recursionArr();
		}
	}, function(error){
	});
};
// 递归查询参与活动的团员人数
p.recursionTuanActJoins=function(){
	var query = new AV.Query('ActJoinLog');
	// query.notEqualTo('isInner',false);
	query.equalTo('admin',p.publishArr[p.publishTotal]);
	query.containedIn('user',["团员","青年","党员S","预备党员S"]);
	query.contains('activity',p.actTitle);
	query.count().then(function(count){
		var arr = [
				'<tr>',
					'<td>',count,'</td>',
				'</tr>'];
		$('tbody').append(arr.join(''));
		p.publishTotal++;
		// if(p.publishTotal!=5){
		if(p.publishTotal!=p.publishArr.length){
			p.recursionTuanActJoins();
		}
	}, function(error){

	});
};
// 递归查询参与活动的人数
p.recursionActJoins=function(){
	var query = new AV.Query('ActJoinLog');
	// query.notEqualTo('isInner',false);
	query.equalTo('admin',p.publishArr[p.publishTotal]);
	query.contains('activity',p.actTitle);
	query.count().then(function(count){
		var arr = [
				'<tr>',
					'<td>',count,'</td>',
				'</tr>'];
		$('tbody').append(arr.join(''));
		p.publishTotal++;
		// if(p.publishTotal!=10){
		if(p.publishTotal!=p.publishArr.length){
			p.recursionActJoins();
		}
	}, function(error){
	});
};

// 平均星级
p.recursionAverageActStar=function(){
	var query = new AV.Query('ActJoinLog');
	query.equalTo('admin',p.publishArr[p.publishTotal]);
	query.contains('activity',p.actTitle);
	// query.limit(2);
	query.find().then(function(datas){
		var total = 0;
		var starArr = datas.map(function(elem,index) {
			total += elem.get('star')
			return elem.get('star');
		});
		var avg = total/starArr.length;
		var arr = [
				'<tr>',
					'<td>',avg.toFixed(2),'</td>',
				'</tr>'];
		$('tbody').append(arr.join(''));
		p.publishTotal++;
		// if(p.publishTotal!=1){
		if(p.publishTotal!=p.publishArr.length){
			p.recursionAverageActStar();
		}
	}, function(error){
	});
};

// 发布的活动
p.loadActByToExcel=function(){
	var query = new AV.Query('Activities');
	query.descending("createdAt");
	query.equalTo("isShow","1");
	query.notEqualTo("isDelete","1");
	query.limit(1000);
	query.find().then(function(datas){
		$('tbody').append([
				'<tr>',
					'<th>',"序号",'</th>',
					'<th>',"账号",'</th>',
					'<th>',"名称",'</th>',
					'<th>',"类型",'</th>',
					'<th>',"活动名",'</th>',
					'<th>',"活动内容",'</th>',
					'<th>',"建议人数",'</th>',
					'<th>',"发布时间",'</th>',
				'</tr>'].join(''));
		var htmlArr = datas.map(function(data, index) {
			return [
				'<tr>',
					'<td>',index+1,'</td>',
					'<td>',data.get("admin")[1],'</td>',
					'<td>',data.get("admin")[2],'</td>',
					'<td>',data.get("admin")[3]=="group"?"单位":"居委",'</td>',
					'<td>',data.get("title"),'</td>',
					'<td>',data.get("content"),'</td>',
					'<td>',data.get("limit"),'</td>',
					'<td>',misc.formatDateTime(data.createdAt,"yyyy/MM/dd hh:mm:ss"),'</td>',
				'</tr>'].join('');
		});
		$('tbody').append(htmlArr.join(''));
	}, function(err){

	});
};
// 活动的参与人数报表
p.loadActLogByToExcel=function(type,page,size){
	page=page||0;
	size=size||10;
	var query = new AV.Query('ActJoinLog');
	query.equalTo("admin",type);
    query.descending("admin");
	query.limit(size);
	query.skip(page*size)
	query.find().then(function(datas){
		datas_json = JSON.stringify(datas);
		$('tbody').append([
				'<tr>',
					'<th>',"序号",'</th>',
					'<th>',"单位账号",'</th>',
					'<th>',"单位名称",'</th>',
					'<th>',"活动名称",'</th>',
					'<th>',"星级",'</th>',
					'<th>',"加分",'</th>',
					'<th>',"参与人数",'</th>',
					'<th>',"用户名",'</th>',
					'<th>',"姓名",'</th>',
					'<th>',"性别",'</th>',
					'<th>',"职务",'</th>',
					'<th>',"手机",'</th>',
					'<th>',"角色",'</th>',
					'<th>',"是否所属",'</th>',
					'<th>',"所在单位",'</th>',
					'<th>',"所在居委",'</th>',
				'</tr>'].join(''));
		var htmlArr = datas.map(function(data, index) {
			return [
				'<tr>',
					'<td>',index+1,'</td>',
					'<td>',data.get("admin")[1],'</td>',
					'<td>',data.get("admin")[2],'</td>',
					'<td>',data.get("activity")[1],'</td>',
					'<td>',data.get("star"),'</td>',
					'<td>',data.get("extra"),'</td>',
					'<td>1</td>',
					'<td>',data.get("user")[1],'</td>',
					'<td>',data.get("user")[2],'</td>',
					'<td>',data.get("user")[3],'</td>',
					'<td>',data.get("user")[4],'</td>',
					'<td>',data.get("user")[5],'</td>',
					'<td>',data.get("user")[6],'</td>',
					'<td>',data.get("isInner")?"是":"否",'</td>',
					'<td>',data.get("userGroupArr").length>0?data.get("userGroupArr")[2]:"暂无",'</td>',
					'<td>',data.get("userLocationArr").length>0?data.get("userLocationArr")[2]:"暂无",'</td>',
				'</tr>'].join('');
		});
		
		$('tbody').append(htmlArr.join(''));
	}, function(err){});
};


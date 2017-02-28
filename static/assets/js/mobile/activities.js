var p = {};
p.init = function() {
	window._filter={
		admin:'',
		id:'',
	};
	p.initVar();
	p.initCss();
	user.checkLogin(p.initData);
	p.initEvent();
};
p.initVar = function(){
	$j_activities_box = $('.j_activities_box');
	$j_create_btn = $('.j_create_btn');
	$j_loadmore = $('.j_loadmore');
	$j_tabs = $('.tab');
	$j_items = $('.items');
	_t_down='t-down';
	_t_up='t-up';
	_active='active';
	activities = [];
	p.size=10;
	p.page=0;
	// 初始化单位
	admins='[{"name":"崇明县东门中学","type":"group","pid":"5704024971cfe4005dc06f9d","objectId":"57040249c4c9710051371b69","createdAt":"2016-04-05T18:22:01.223Z","updatedAt":"2016-04-07T09:19:15.018Z"},{"name":"城西","type":"location","pid":"5704bfd371cfe4005418a086","objectId":"5704bfd4a34131004ce8603a","createdAt":"2016-04-06T07:50:44.035Z","updatedAt":"2016-10-13T05:57:10.873Z"},{"name":"南门","type":"location","pid":"5704c034d342d300540dcd26","objectId":"5704c0341ea493005589424c","createdAt":"2016-04-06T07:52:20.235Z","updatedAt":"2016-05-16T07:53:17.099Z"},{"name":"金鳌山","type":"location","pid":"570539afa34131004ceeb5a3","objectId":"570539af7db2a20051ae8e9f","createdAt":"2016-04-06T16:30:39.859Z","updatedAt":"2016-09-07T06:25:20.063Z"},{"name":"玉环","type":"location","pid":"57053a32d342d300541430d9","objectId":"57053a321ea493005db55505","createdAt":"2016-04-06T16:32:50.759Z","updatedAt":"2016-05-17T02:38:37.434Z"},{"name":"西门北村","type":"location","pid":"570549c6128fe1005259fdd9","objectId":"570549c62e958a0057a3e251","createdAt":"2016-04-06T17:39:18.662Z","updatedAt":"2016-04-06T17:39:18.662Z"},{"name":"西泯沟","type":"location","pid":"57054a1dc4c971005149327e","objectId":"57054a1d1ea4930055900dcf","createdAt":"2016-04-06T17:40:45.317Z","updatedAt":"2016-05-17T07:43:52.124Z"},{"name":"川心街","type":"location","pid":"57054a7bc4c971005149399a","objectId":"57054a7bd342d3005414997b","createdAt":"2016-04-06T17:42:19.318Z","updatedAt":"2016-04-06T17:42:19.318Z"},{"name":"观潮","type":"location","pid":"57054b16c4c97100514944de","objectId":"57054b161ea493005db5c13d","createdAt":"2016-04-06T17:44:54.981Z","updatedAt":"2016-06-06T07:54:42.510Z"},{"name":"金珠","type":"location","pid":"57054b64c4c97100514948d7","objectId":"57054b651ea493005db5c2ce","createdAt":"2016-04-06T17:46:13.115Z","updatedAt":"2016-04-06T17:46:13.115Z"},{"name":"城中","type":"location","pid":"57054ba171cfe4005dcd3b40","objectId":"57054ba239b05700539f8d79","createdAt":"2016-04-06T17:47:14.001Z","updatedAt":"2016-06-06T08:25:39.355Z"},{"name":"明珠花苑","type":"location","pid":"57054e635bbb500051df96e6","objectId":"57054e637db2a20051af1845","createdAt":"2016-04-06T17:58:59.521Z","updatedAt":"2016-04-06T17:58:59.521Z"},{"name":"湄洲","type":"location","pid":"57054ed95bbb500051df99df","objectId":"57054ed97db2a20051af1b05","createdAt":"2016-04-06T18:00:57.648Z","updatedAt":"2016-04-06T18:00:57.648Z"},{"name":"新崇","type":"location","pid":"5706319f8ac247004c07af53","objectId":"5706319fa34131004cf755d6","createdAt":"2016-04-07T10:08:31.720Z","updatedAt":"2016-05-17T05:57:09.199Z"},{"name":"吴家弄","type":"location","pid":"570631f97db2a20051b73c5b","objectId":"570631f92e958a0059c82035","createdAt":"2016-04-07T10:10:01.879Z","updatedAt":"2016-04-07T10:10:01.879Z"},{"name":"小港","type":"location","pid":"5707184a71cfe400542ed288","objectId":"5707184a71cfe4005ddc97ae","createdAt":"2016-04-08T02:32:42.869Z","updatedAt":"2016-04-08T02:32:42.869Z"},{"name":"永凤","type":"location","pid":"57071996a34131004cfe859c","objectId":"5707199739b0570053aeea38","createdAt":"2016-04-08T02:38:15.136Z","updatedAt":"2016-04-08T13:21:15.406Z"},{"name":"花园弄","type":"location","pid":"570719e7128fe10052697846","objectId":"570719e739b0570053aeedcc","createdAt":"2016-04-08T02:39:35.658Z","updatedAt":"2016-05-17T00:43:04.735Z"},{"name":"海岛","type":"location","pid":"57071a392e958a0057b35801","objectId":"57071a391ea493005dc52bdf","createdAt":"2016-04-08T02:40:57.531Z","updatedAt":"2016-04-08T02:40:57.531Z"},{"name":"北门","type":"location","pid":"57071a7971cfe400542eec39","objectId":"57071a7a79bc44004c542278","createdAt":"2016-04-08T02:42:02.108Z","updatedAt":"2016-04-08T02:42:02.108Z"},{"name":"东门","type":"location","pid":"57071adb1ea493005dc53356","objectId":"57071adb8ac247004c0ee462","createdAt":"2016-04-08T02:43:39.779Z","updatedAt":"2016-09-14T01:57:48.364Z"},{"name":"怡祥居","type":"location","pid":"57071b122e958a0059cf5d49","objectId":"57071b125bbb500051eef4bb","createdAt":"2016-04-08T02:44:34.983Z","updatedAt":"2016-04-08T02:44:34.983Z"},{"name":"东河沿","type":"location","pid":"57071b737db2a20051be7d8d","objectId":"57071b73128fe10052698971","createdAt":"2016-04-08T02:46:11.652Z","updatedAt":"2016-04-08T02:46:11.652Z"},{"name":"城东","type":"location","pid":"57071b97128fe10052698b5b","objectId":"57071b972e958a0059cf62ec","createdAt":"2016-04-08T02:46:47.328Z","updatedAt":"2016-04-08T02:46:47.328Z"},{"name":"江山","type":"location","pid":"57071bc27db2a20051be80e1","objectId":"57071bc22e958a0059cf64f4","createdAt":"2016-04-08T02:47:30.767Z","updatedAt":"2016-05-17T01:53:31.795Z"},{"name":"学宫","type":"location","pid":"57071bf0d342d300542429bc","objectId":"57071bf039b0570053af0419","createdAt":"2016-04-08T02:48:16.771Z","updatedAt":"2016-04-08T02:48:16.771Z"},{"name":"城桥镇团委","type":"group","pid":"57071c3b1ea493005dc5438a","objectId":"57071c3b1ea49300559f98fb","createdAt":"2016-04-08T02:49:31.343Z","updatedAt":"2016-06-13T08:36:33.508Z"},{"name":"经委","type":"group","pid":"57071c7b79bc44004c54393f","objectId":"57071c7b7db2a20051be896c","createdAt":"2016-04-08T02:50:35.849Z","updatedAt":"2016-04-08T16:57:05.988Z"},{"name":"农委","type":"group","pid":"57071ca539b0570053af0bd3","objectId":"57071ca579bc44004c543b2d","createdAt":"2016-04-08T02:51:17.969Z","updatedAt":"2016-04-19T06:56:36.220Z"},{"name":"建管委","type":"group","pid":"57071cdda34131004cfea8fe","objectId":"57071cdd71cfe400542f07c4","createdAt":"2016-04-08T02:52:13.941Z","updatedAt":"2016-05-07T10:01:20.758Z"},{"name":"卫生计生委","type":"group","pid":"57071d078ac247004c0efd05","objectId":"57071d077db2a20051be8f44","createdAt":"2016-04-08T02:52:55.396Z","updatedAt":"2016-04-08T02:52:55.396Z"},{"name":"公安局","type":"group","pid":"57071d2ed342d300542437ea","objectId":"57071d2e2e958a0059cf7618","createdAt":"2016-04-08T02:53:34.852Z","updatedAt":"2016-04-08T16:50:35.761Z"},{"name":"人力资源和社会保障局","type":"group","pid":"57071d5e8ac247004c0f0194","objectId":"57071d5e128fe1005269a064","createdAt":"2016-04-08T02:54:22.220Z","updatedAt":"2016-04-08T02:54:22.220Z"},{"name":"民政局","type":"group","pid":"57071d8679bc44004c544576","objectId":"57071d862e958a0059cf7a8a","createdAt":"2016-04-08T02:55:02.903Z","updatedAt":"2016-05-07T10:01:12.353Z"},{"name":"教育局","type":"group","pid":"57071dbaa34131004cfeb36f","objectId":"57071dba2e958a0057b37f6c","createdAt":"2016-04-08T02:55:54.324Z","updatedAt":"2016-05-07T10:01:04.032Z"},{"name":"文广影视局","type":"group","pid":"57071e1039b0570053af1b84","objectId":"57071e1079bc44004c544a69","createdAt":"2016-04-08T02:57:20.757Z","updatedAt":"2016-04-08T16:50:20.427Z"},{"name":"规划土地局","type":"group","pid":"57071e3c128fe1005269a7e0","objectId":"57071e3ca34131004cfeb7de","createdAt":"2016-04-08T02:58:04.766Z","updatedAt":"2016-04-08T16:50:17.526Z"},{"name":"住房保障房屋管理局","type":"group","pid":"57071e6a79bc44004c544db5","objectId":"57071e6a7db2a20051be9d9a","createdAt":"2016-04-08T02:58:50.206Z","updatedAt":"2016-04-08T13:22:48.813Z"},{"name":"城管执法局","type":"group","pid":"57071eb571cfe4005ddcddcf","objectId":"57071eb51ea493005dc55f07","createdAt":"2016-04-08T03:00:05.629Z","updatedAt":"2016-04-08T03:00:05.629Z"},{"name":"水务局","type":"group","pid":"57071ee939b0570053af2430","objectId":"57071eea8ac247004c0f11a9","createdAt":"2016-04-08T03:00:58.089Z","updatedAt":"2016-04-08T16:50:14.201Z"},{"name":"交通委","type":"group","pid":"57071f1279bc44004c5454e6","objectId":"57071f128ac247004c0f12fc","createdAt":"2016-04-08T03:01:38.434Z","updatedAt":"2016-04-08T16:50:11.789Z"},{"name":"崇明工业园区","type":"group","pid":"57071f4b79bc44004c545761","objectId":"57071f4b5bbb500051ef22bf","createdAt":"2016-04-08T03:02:35.938Z","updatedAt":"2016-05-07T10:00:51.960Z"},{"name":"亚通公司","type":"group","pid":"57071f932e958a0059cf8dd9","objectId":"57071f9339b0570053af2a6d","createdAt":"2016-04-08T03:03:47.516Z","updatedAt":"2016-04-08T03:03:47.516Z"},{"name":"税务局","type":"group","pid":"57071ffb1ea493005dc56dc0","objectId":"57071ffc2e958a0059cf933f","createdAt":"2016-04-08T03:05:32.958Z","updatedAt":"2016-05-07T10:00:56.676Z"},{"name":"市场监管局","type":"group","pid":"5707205e128fe1005269c163","objectId":"5707205fc4c97100516ef9a0","createdAt":"2016-04-08T03:07:11.018Z","updatedAt":"2016-04-08T13:23:08.996Z"},{"name":"崇明客轮公司","type":"group","pid":"5707217079bc44004c547397","objectId":"570721705bbb500051ef3dab","createdAt":"2016-04-08T03:11:44.853Z","updatedAt":"2016-04-08T16:50:08.245Z"},{"name":"县级机关","type":"group","pid":"570721b88ac247004c0f33d2","objectId":"570721b8a34131004cfee18c","createdAt":"2016-04-08T03:12:56.601Z","updatedAt":"2016-04-08T03:12:56.601Z"},{"name":"联通崇明分公司","type":"group","pid":"570722027db2a20051bec896","objectId":"570722032e958a0057b3b1dd","createdAt":"2016-04-08T03:14:11.079Z","updatedAt":"2016-04-08T03:14:11.079Z"},{"name":"崇明巴士公交公司","type":"group","pid":"570722337db2a20051becb2d","objectId":"570722332e958a0057b3b414","createdAt":"2016-04-08T03:14:59.272Z","updatedAt":"2016-04-08T03:14:59.272Z"},{"name":"邮政银行","type":"group","pid":"5707225bc4c97100516f2742","objectId":"5707225b1ea493005dc58b88","createdAt":"2016-04-08T03:15:39.600Z","updatedAt":"2016-04-08T03:15:39.600Z"},{"name":"崇明邮政局","type":"group","pid":"5707228e2e958a0057b3b84d","objectId":"5707228e71cfe4005ddd0be6","createdAt":"2016-04-08T03:16:30.939Z","updatedAt":"2016-04-08T16:49:57.694Z"},{"name":"建行崇明支行","type":"group","pid":"570722b81ea49300559fe350","objectId":"570722b88ac247004c0f3f62","createdAt":"2016-04-08T03:17:12.944Z","updatedAt":"2016-04-08T03:17:12.944Z"},{"name":"农商行崇明支行","type":"group","pid":"570722e7a34131004cfeefab","objectId":"570722e77db2a20051bed3c6","createdAt":"2016-04-08T03:17:59.962Z","updatedAt":"2016-04-19T07:34:38.334Z"},{"name":"浦发行崇明支行","type":"group","pid":"57072345d342d30054247e77","objectId":"57072345a34131004cfef335","createdAt":"2016-04-08T03:19:33.560Z","updatedAt":"2016-04-08T16:49:54.437Z"},{"name":"村镇银行","type":"group","pid":"57072377d342d30054248119","objectId":"570723781ea49300559fec79","createdAt":"2016-04-08T03:20:24.048Z","updatedAt":"2016-04-08T03:20:24.048Z"},{"name":"申万宏源证券崇明营业部","type":"group","pid":"570723a3c4c97100516f488a","objectId":"570723a31ea493005dc59acb","createdAt":"2016-04-08T03:21:07.904Z","updatedAt":"2016-04-08T16:49:50.214Z"},{"name":"农业发展银行","type":"group","pid":"5707240071cfe4005ddd1bb1","objectId":"57072400c4c97100516f518b","createdAt":"2016-04-08T03:22:40.793Z","updatedAt":"2016-04-08T16:49:45.632Z"},{"name":"上海证券公司崇明营业部","type":"group","pid":"5707256c2e958a0059cfd25f","objectId":"5707256c39b0570053af6f6d","createdAt":"2016-04-08T03:28:44.484Z","updatedAt":"2016-06-02T05:42:22.027Z"},{"name":"新华人寿","type":"group","pid":"570725a02e958a0057b3dab5","objectId":"570725a02e958a0059cfd478","createdAt":"2016-04-08T03:29:36.686Z","updatedAt":"2016-04-08T03:29:36.686Z"},{"name":"移动崇明分公司","type":"group","pid":"57072613c4c97100516f83ef","objectId":"570726131ea493005dc5b4cb","createdAt":"2016-04-08T03:31:31.934Z","updatedAt":"2016-04-08T16:48:55.553Z"},{"name":"崇明电信局","type":"group","pid":"5707269b2e958a0057b3e3b0","objectId":"5707269b2e958a0059cfddd3","createdAt":"2016-04-08T03:33:47.917Z","updatedAt":"2016-10-20T03:05:05.945Z"},{"name":"工行崇明支行","type":"group","pid":"570726c45bbb500051ef7736","objectId":"570726c471cfe400542f779c","createdAt":"2016-04-08T03:34:28.126Z","updatedAt":"2016-04-08T16:49:41.115Z"},{"name":"社保","type":"group","pid":"570726e8c4c97100516f94fe","objectId":"570726e81ea493005dc5bc0d","createdAt":"2016-04-08T03:35:04.295Z","updatedAt":"2016-04-08T03:35:04.295Z"},{"name":"农行崇明支行","type":"group","pid":"570727131ea493005dc5bd94","objectId":"570727138ac247004c0f6cdd","createdAt":"2016-04-08T03:35:47.395Z","updatedAt":"2016-04-08T16:48:02.279Z"},{"name":"中国人寿","type":"group","pid":"5707273b39b0570053af8054","objectId":"5707273bd342d3005424a7d3","createdAt":"2016-04-08T03:36:27.076Z","updatedAt":"2016-05-24T04:17:44.358Z"},{"name":"人民保险","type":"group","pid":"5707276571cfe400542f7d10","objectId":"5707276571cfe4005ddd3d76","createdAt":"2016-04-08T03:37:09.383Z","updatedAt":"2016-12-08T09:34:01.093Z"},{"name":"燃气公司","type":"group","pid":"570727d61ea4930055a01839","objectId":"570727d679bc44004c54b65f","createdAt":"2016-04-08T03:39:02.819Z","updatedAt":"2016-04-08T16:49:36.605Z"},{"name":"崇明电力公司","type":"group","pid":"57072831128fe100526a15dc","objectId":"570728312e958a0059cfec92","createdAt":"2016-04-08T03:40:33.084Z","updatedAt":"2016-04-08T16:49:27.995Z"},{"name":"交行崇明支行","type":"group","pid":"57074da3c4c971005172b69a","objectId":"57074da31ea493005dc74c7b","createdAt":"2016-04-08T06:20:19.580Z","updatedAt":"2016-04-08T06:20:19.580Z"},{"name":"县气象局","type":"group","pid":"57074de31ea493005dc74e80","objectId":"57074de31ea4930055a19dbe","createdAt":"2016-04-08T06:21:23.850Z","updatedAt":"2016-04-08T13:25:16.317Z"},{"name":"城桥中学","type":"group","pid":"57074e1e5bbb500051f10d3a","objectId":"57074e1e7db2a20051c08d09","createdAt":"2016-04-08T06:22:22.164Z","updatedAt":"2016-04-08T16:49:25.074Z"},{"name":"海关","type":"group","pid":"57074e84d342d30054263933","objectId":"57074e841ea493005dc75375","createdAt":"2016-04-08T06:24:04.282Z","updatedAt":"2016-04-08T06:24:04.282Z"},{"name":"检验检疫局","type":"group","pid":"57074ed71ea493005dc7577b","objectId":"57074ed779bc44004c564352","createdAt":"2016-04-08T06:25:27.317Z","updatedAt":"2016-04-08T16:49:22.021Z"},{"name":"安信农保","type":"group","pid":"57074f1a5bbb500051f11882","objectId":"57074f1a7db2a20051c098bf","createdAt":"2016-04-08T06:26:34.528Z","updatedAt":"2016-04-08T06:26:34.528Z"},{"name":"上海银行崇明支行","type":"group","pid":"57074f4a79bc44004c5649cf","objectId":"57074f4a8ac247004c11089e","createdAt":"2016-04-08T06:27:22.546Z","updatedAt":"2016-04-08T06:27:22.546Z"},{"name":"崇明中学","type":"group","pid":"5707502ea34131004c00c0ac","objectId":"5707502f7db2a20051c0a5f4","createdAt":"2016-04-08T06:31:11.033Z","updatedAt":"2016-05-31T01:25:10.585Z"},{"name":"扬子中学","type":"group","pid":"5707507839b0570053b128cc","objectId":"570750795bbb500051f127d8","createdAt":"2016-04-08T06:32:25.253Z","updatedAt":"2016-04-08T06:32:25.253Z"},{"name":"实验中学","type":"group","pid":"570750ad5bbb500051f12989","objectId":"570750ad2e958a0057b5960c","createdAt":"2016-04-08T06:33:17.974Z","updatedAt":"2016-04-08T16:49:01.516Z"},{"name":"育林中学","type":"group","pid":"570750ef5bbb500051f12c2c","objectId":"570750ef71cfe4005ddeee9b","createdAt":"2016-04-08T06:34:23.605Z","updatedAt":"2016-04-08T16:49:05.385Z"},{"name":"凌云中学","type":"group","pid":"570751331ea4930055a1c1f4","objectId":"5707513379bc44004c565deb","createdAt":"2016-04-08T06:35:31.225Z","updatedAt":"2016-05-29T12:02:55.337Z"},{"name":"西门南村","type":"location","pid":"57071b4c2e958a0059cf5f72","objectId":"57071b4c71cfe4005ddcb92f","createdAt":"2016-04-08T02:45:32.827Z","updatedAt":"2016-05-23T06:22:03.507Z"},{"name":"不在所属区域","type":"group","pid":"580ee95ca0bb9f0061cfa432","objectId":"580ee95ca22b9d00638de632","createdAt":"2016-10-25T05:10:52.794Z","updatedAt":"2016-10-25T05:10:52.794Z"},{"name":"大龄青年","type":"group","pid":"580ee9ad570c350068fb837c","objectId":"580ee9ad2f301e005c4ced10","createdAt":"2016-10-25T05:12:13.643Z","updatedAt":"2016-10-25T05:12:13.643Z"}]';
	admins=JSON.parse(admins);
	admins=admins.sort(misc.getSortFun('desc', 'type'));
};
p.initCss = function() {
	$out_wrap.css("visibility","visible");
};
p.initEvent = function(){
	$j_activities_box.delegate('li', 'click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		location.href='../activity/?id='+$(this).attr('data-id');
	});
	$j_create_btn.on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		location.href='../activitycreateoredit/';
	});
	$j_tabs.on('click', function(e) {
		e.preventDefault();
		var $this=$(this),
		i=$this.index();
		if(!$this.hasClass(_active)||$this.find('.'+_t_down).length>0){
			$j_tabs.removeClass(_active);
			$this.addClass(_active);
			$j_tabs.find('a').removeClass(_t_up).addClass(_t_down);
			$this.find('a').removeClass(_t_down).addClass(_t_up);
			$j_items.hide();
			$j_items.eq(i).show();
		}else{
			$this.removeClass(_active);
			$this.find('a').removeClass(_t_up).addClass(_t_down);
			$j_items.eq(i).hide();
		}
	});
	$j_items.delegate('a', 'click', function(e) {
		e.preventDefault();
		var $this=$(this),
		txt=$this.attr('data-name'),
		_id=$this.attr('data-id'),
		_pid=$this.attr('data-pid');
		if(_pid){//发布方筛选
			p.page=0;
			_filter.id=_pid;
			$j_activities_box.find('ul.j_activities').html('');
			if(_filter.id!=="undefined"){
				$('.'+_active).html('<a class="t-down"></a>'+txt);
			}else{
				_filter.id=undefined;
				$('.'+_active).html('<a class="t-down"></a>发布方筛选').removeClass(_active);
			}
			$j_tabs.eq(1).html('<a class="t-down"></a>快速筛选');
			p.loadActivities();
		}
		if(_id){//快速筛选
			p.page=0;
			_filter.id=_id;
			$j_activities_box.find('ul.j_activities').html('');
			if(_filter.id!=="undefined"){
				$('.'+_active).html('<a class="t-down"></a>'+txt);
			}else{
				_filter.id=undefined;
				$('.'+_active).html('<a class="t-down"></a>快速筛选').removeClass(_active);
			}
			$j_tabs.eq(0).html('<a class="t-down"></a>发布方筛选');
			p.loadActivities();
		}
		$j_items.hide();
	});
};
p.initData = function(){
	p.loadActivities();
	p.renderAdmins(admins);
	p.renderMyAdmin();
	if(user.currentUser.get('userRole')=='Admins'){
		$j_create_btn.show();
	}
};
p.renderMyAdmin=function(){
	var arr=[];
	if(user.currentUser.get("userRole")=="Admins"){
		arr.push('<a data-id="'+user.userInfo.get('pid')+'" data-name="'+user.userInfo.get('name')+'">[本',(user.userInfo.get('type')=="group")?"单位":"居委",'] '+user.userInfo.get('name')+'</a>');

	}else if(user.currentUser.get("userRole")=="Users"){
		user.userInfo.get('location') && arr.push('<a data-id="'+user.userInfo.get('location')['pid']+'" data-name="'+user.userInfo.get('location')['name']+'">[所在居委] '+user.userInfo.get('location')['name']+'</a>');
		user.userInfo.get('group') && arr.push('<a data-id="'+user.userInfo.get('group')['pid']+'" data-name="'+user.userInfo.get('group')['name']+'">[所在单位] '+user.userInfo.get('group')['name']+'</a>');
	}

	$j_items.eq(1).append(arr.join(''));
};
p.renderAdmins=function(datas){
	var arr=datas.map(function(data) {
		return ['<a class="text-elip" data-pid="',data.pid,'" data-name="',data.name,'">',"[",(data.type=="location"?"居委":"单位"),"] ",data.name,'</a>'].join('');
	});
	$j_items.eq(0).append(arr.join(''));
};
p.loadActivities = function(){
	var param={
    	"isDelete":"0",
		"isShow":"1",
	 	"limit":p.size,
	 	"page_index":p.page+1
    };
    if(window._filter.id){
    	param["admin"]=window._filter.id;
    }
	misc.func.activity.get_activities(param,function(res){
		loadingHide();
    	if(res.code){
	  		$j_loadmore.html(errorEnum[res.code]||'当前网络不给力哦！');
    	}else{
    		activities = res.data;
			if(activities && activities.length>0){
				var arrHtml = [];
				for (var i = 0,l = activities.length; i < l; i++) {
					arrHtml.push(p.liHtml(activities[i],i+1));
				};
				$j_activities_box.find('ul.j_activities').append(arrHtml.join(''));
				p['page']++;
				if(activities.length < p['size']){
		  			$j_loadmore.html('已加载完所有活动');
				}
		  	}
		  	else if(p.page==0){
		  		$j_loadmore.html('当前还没有活动');
		  	}
		  	else{
		  		$j_loadmore.html('已加载完所有活动');
		  	}
    	}
    },function(err){
	  	$j_loadmore.html('当前网络不给力哦！');
    });
};
p.liHtml = function(obj,number){
	return [
		'<li class="thinner-border" data-id="',obj.objectId,'">',
			'<div class="userarea j_view">',
			'<div class="userinfo">',
				'<div class="objname">',(p.page*p.size)+number,'、',obj["title"],'</div>',
				'<div class="usersepcial">',obj["content"].replace(/-b/g,' '),'</div>',
				'<ul class="usertags" style="left: 0.7rem;">',
					'<li style="margin-right: .25rem;"><img src="../../static/assets/images/mobile/broadcast1.png" class="desc-tag-img" style="width: 1rem;height: auto;top: 0.05rem;"></li>',
					'<li>',obj["admin__name"],'</li>',
				'</ul>',
				'<ul class="usertags">',
					'<li><img src="../../static/assets/images/mobile/iconfont-rili.png" class="desc-tag-img"></li>',
					'<li>',misc.formatDateTime(new Date(obj.createdAt),misc.formatType["9"]),'</li>',
				'</ul>',
			'</div>',
			'<div class="follow j_follow"><span style="top: 1.75rem;position: relative;">查看详情</span></div></div>',
		'</li>'
	].join('');
};
window.onscroll=function(){ 
   if (getScrollTop()+getClientHeight()==getScrollHeight()) { 
		p.loadActivities();
   } 
}; 

layui.define(function(exports){
	layui.use(['layer', 'form', 'echarts', 'wzClone', 'readEcharts', 'table'], function(){
		const layer = layui.layer,
			$ = layui.$,
			admin = layui.admin,
			setter = layui.setter,
			laydate = layui.laydate,
			form = layui.form,
			echarts = layui.echarts,
			wzClone = layui.wzClone,
			table = layui.table,
			readEcharts = layui.readEcharts;

		laydate.render({
			elem: '#zentao-rangeLinked',
			range: ['#zentao-start-date-1', '#zentao-end-date-1'],
			rangeLinked: true
		});

		$("#tb1-header").css({"font-weight":"bold"}).html("按类型分类");
		$("#tb2-header").css({"font-weight":"bold"}).html("按类型分组\n" +
			"<div class=\"layui-btn-group\" style=\"float:right;\">\n" +
			"<button data-method=\"offset\" id=\"tb2-yuji\" data-type=\"yuji\" class=\"leixing layui-btn layui-btn-primary layui-btn-xs layui-bg-blue\">预计</button>\n" +
			"<button data-method=\"offset\" id=\"tb2-shiji\" data-type=\"shiji\" class=\"leixing layui-btn layui-btn-primary layui-btn-xs\">实际</button>\n" +
			"</div>");
		$("#tb3-header").css({"font-weight":"bold"}).html("按客户分组\n" +
			"<div class=\"layui-btn-group\" style=\"float:right;\">\n" +
			"<button data-method=\"offset\" id=\"tb3-yuji\" data-type=\"yuji\" class=\"kehu layui-btn layui-btn-primary layui-btn-xs layui-bg-blue\">预计</button>\n" +
			"<button data-method=\"offset\" id=\"tb3-shiji\" data-type=\"shiji\" class=\"kehu layui-btn layui-btn-primary layui-btn-xs\">实际</button>\n" +
			"</div>");
		$("#tb4-header").css({"font-weight":"bold"}).html("按客户分类");

		// 获取到数据
		function getDataLeixing(data){
			let result = ''
			admin.req({
				url: setter.mainAddress + 'zentao/getAnalysisLeixing'
				,data: data
				,method: "GET"
				,async: false
				,cache: false
				,dataType: "JSON"
				,done: function(res){
					result = res;
				}
			});
			return result;
		}

		function getDataCustomer(data){
			let result = ''
			admin.req({
				url: setter.mainAddress + 'zentao/getAnalysisCustomer'
				,data: data
				,method: "GET"
				,async: false
				,cache: false
				,dataType: "JSON"
				,done: function(res){
					result = res;
				}
			});
			return result;
		}

		function getDataTable(tableId,divID){
			table.render({
				elem: '#'+tableId,
				cols: [[ //标题栏
					{field: 'id', title: 'ID', width: 80, sort: true},
					{field: 'username', title: '用户', width: 120},
					{field: 'sign', title: '签名', minWidth: 160},
					{field: 'sex', title: '性别', width: 80},
					{field: 'city', title: '城市', width: 100},
					{field: 'experience', title: '积分', width: 80, sort: true}
				]],
				data: [{ // 赋值已知数据
					"id": "10001",
					"username": "张三1",
					"sex": "男",
					"city": "浙江杭州",
					"sign": "人生恰似一场修行",
					"experience": "116"
				}, {
					"id": "10002",
					"username": "张三2",
					"sex": "男",
					"city": "浙江杭州",
					"sign": "人生恰似一场修行",
					"experience": "12",
					"LAY_CHECKED": true
				}, {
					"id": "10003",
					"username": "张三3",
					"sex": "男",
					"city": "浙江杭州",
					"sign": "人生恰似一场修行",
					"experience": "65"
				}, {
					"id": "10004",
					"username": "张三4",
					"sex": "男",
					"city": "浙江杭州",
					"sign": "人生恰似一场修行",
					"experience": "777"
				}, {
					"id": "10005",
					"username": "张三5",
					"sex": "男",
					"city": "浙江杭州",
					"sign": "人生恰似一场修行",
					"experience": "86"
				}, {
					"id": "10006",
					"username": "张三6",
					"sex": "男",
					"city": "浙江杭州",
					"sign": "人生恰似一场修行",
					"experience": "12"
				}, {
					"id": "10007",
					"username": "张三7",
					"sex": "男",
					"city": "浙江杭州",
					"sign": "人生恰似一场修行",
					"experience": "16"
				}, {
					"id": "10008",
					"username": "张三8",
					"sex": "男",
					"city": "浙江杭州",
					"sign": "人生恰似一场修行",
					"experience": "106"
				}],
				height: '#'+divID+'-0',
				//skin: 'line', // 表格风格
				//even: true,
				page: true, // 是否显示分页
				limits: [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100],
				limit: 5 // 每页默认显示的数量
			});
		}
		function getDataList(data){
			layer.open({
				type: 1, // page 层类型
				area: ['60%', '60%'],
				title: data.name,
				shade: 0.6, // 遮罩透明度
				shadeClose: true, // 点击遮罩区域，关闭弹层
				maxmin: true, // 允许全屏最小化
				anim: 0, // 0-6 的动画形式，-1 不开启
				content: '<div id="openwindow1" style="height: 100%"><table class="layui-hide" id="ID-table-demo-data"></table></div>'
			});
			getDataTable("ID-table-demo-data","openwindow1");
		}

		let option = ""
		/*******************第一个图表-start*********************/
		const myChart_leixing_s = echarts.init(document.getElementById('tb1-body'));
		function getZentaoLeixingSearch1(mychart,option,data){
			option.legend.left = "center";
			option.xAxis.boundaryGap = true;
			option.xAxis.data = data.data.type1;
			option.xAxis.axisLabel = { interval: 0, rotate: 20 };
			option.series[0].name = "预计时长";
			option.series[0].type = "line";
			option.series[0].smooth = false;
			option.series[0].markPoint = {};
			option.series[0].markLine = {};
			option.series[0].data = data.data.yuji;
			option.dataZoom = [];

			let series1 = wzClone.deepClone(readEcharts.seriesEcharts);
			series1.name = "实际时长";
			series1.type = "line";
			series1.smooth = false;
			series1.data = data.data.shiji;
			series1.markPoint = {};
			series1.markLine = {};
			option.series.push(series1);
			// 使用刚指定的配置项和数据显示图表。
			mychart.setOption(option);
		}
		/*******************第一个图表-end*********************/

		/*******************第二个图表-start*********************/
		const myChart_leixing_ys = echarts.init(document.getElementById('tb2-body'));
		function getZentaoLeixingSearch2(mychart,option,data){
			delete option.legend;
			delete option.xAxis;
			delete option.yAxis;
			option.tooltip.trigger = "item";
			option.tooltip.formatter = "{b} : {c} ({d}%)";
			option.series[0].name = "时长";
			option.series[0].type = "pie";
			option.series[0].markPoint = {};
			option.series[0].markLine = {};
			option.series[0].data = data.data;
			option.dataZoom = [];
			// 使用刚指定的配置项和数据显示图表。
			mychart.setOption(option);
			// 点击事件
			mychart.on('click', function (param){
				getDataList(param);
			});
		}
		let yujiLeixing = ""
		let shijiLeixing = ""
		/*******************第二个图表-end*********************/
		/*******************第三个图表-start*********************/
		const myChart_customer_ys = echarts.init(document.getElementById('tb3-body'));
		function getZentaoCustomerSearch1(mychart,option,data){
			delete option.legend;
			delete option.xAxis;
			delete option.yAxis;
			option.tooltip.trigger = "item";
			option.tooltip.formatter = "{b} : {c} ({d}%)";
			option.series[0].name = "时长";
			option.series[0].type = "pie";
			option.series[0].markPoint = {};
			option.series[0].markLine = {};
			option.series[0].data = data.data;
			option.dataZoom = [];
			// 使用刚指定的配置项和数据显示图表。
			mychart.setOption(option);
			// 点击事件
			mychart.on('click', function (param){
				getDataList(param);
			});
		}
		let yujiCustomer = ""
		let shijiCustomer = ""
		/*******************第三个图表-end*********************/
		/*******************第四个图表-start*********************/
		const myChart_customer_s = echarts.init(document.getElementById('tb4-body'));
		function getZentaoCustomerSearch2(mychart,option,data){
			option.legend.left = "center";
			option.xAxis.boundaryGap = true;
			option.xAxis.data = data.data.type1;
			option.series[0].name = "预计时长";
			option.series[0].type = "bar";
			option.series[0].smooth = false;
			option.series[0].markPoint = {};
			option.series[0].markLine = {};
			option.series[0].data = data.data.yuji;
			option.dataZoom = [];

			let series1 = wzClone.deepClone(readEcharts.seriesEcharts);
			series1.name = "实际时长";
			series1.type = "bar";
			series1.smooth = false;
			series1.data = data.data.shiji;
			series1.markPoint = {};
			series1.markLine = {};
			option.series.push(series1);
			// 使用刚指定的配置项和数据显示图表。
			mychart.setOption(option);
		}
		/*******************第四个图表-end*********************/

		form.on('submit(zentaoSearch)', function(data){
			var field = data.field;
			/*******************第一个图表-start*********************/
			field.type0 = "1"
			const sLeixing = getDataLeixing(field);
			option = wzClone.deepClone(readEcharts.simpleEcharts);
			getZentaoLeixingSearch1(myChart_leixing_s,option,sLeixing);
			/*******************第一个图表-end*********************/
			/*******************第二个图表-start*********************/
			field.type0 = "2"
			yujiLeixing = getDataLeixing(field);
			field.type0 = "3"
			shijiLeixing = getDataLeixing(field);
			option = wzClone.deepClone(readEcharts.simpleEcharts);
			getZentaoLeixingSearch2(myChart_leixing_ys,option,yujiLeixing);
			/*******************第二个图表-end*********************/
			/*******************第三个图表-start*********************/
			field.type0 = "2"
			yujiCustomer = getDataCustomer(field);
			field.type0 = "3"
			shijiCustomer = getDataCustomer(field);
			option = wzClone.deepClone(readEcharts.simpleEcharts);
			getZentaoCustomerSearch1(myChart_customer_ys,option,yujiCustomer);
			/*******************第三个图表-end*********************/
			/*******************第四个图表-start*********************/
			field.type0 = "1"
			const sCustomer = getDataCustomer(field);
			option = wzClone.deepClone(readEcharts.simpleEcharts);
			getZentaoCustomerSearch2(myChart_customer_s,option,sCustomer);
			/*******************第四个图表-end*********************/
			return false; // 阻止默认 form 跳转
		});

		//触发事件-按钮事件
		const activeLeixing = {
			offset: function (othis) {
				const type = othis.data('type');
				$(".leixing").attr("class","leixing layui-btn layui-btn-primary layui-btn-xs");
				$("#tb2-"+type).attr("class","leixing layui-btn layui-btn-primary layui-btn-xs layui-bg-blue");
				if (type==="yuji"){
					option = wzClone.deepClone(readEcharts.simpleEcharts);
					getZentaoLeixingSearch2(myChart_leixing_ys,option,yujiLeixing);
				}
				if (type==="shiji"){
					option = wzClone.deepClone(readEcharts.simpleEcharts);
					getZentaoLeixingSearch2(myChart_leixing_ys,option,shijiLeixing);
				}
			}
		};
		$('.leixing').on('click', function(){
			const othis = $(this), method = othis.data('method');
			activeLeixing[method] ? activeLeixing[method].call(this, othis) : '';
		});

		const activeCustomer = {
			offset: function (othis) {
				const type = othis.data('type');
				$(".kehu").attr("class","kehu layui-btn layui-btn-primary layui-btn-xs");
				$("#tb3-"+type).attr("class","kehu layui-btn layui-btn-primary layui-btn-xs layui-bg-blue");
				if (type==="yuji"){
					option = wzClone.deepClone(readEcharts.simpleEcharts);
					getZentaoCustomerSearch1(myChart_customer_ys,option,yujiCustomer);
				}
				if (type==="shiji"){
					option = wzClone.deepClone(readEcharts.simpleEcharts);
					getZentaoCustomerSearch1(myChart_customer_ys,option,shijiCustomer);
				}
			}
		};
		$('.kehu').on('click', function(){
			const othis = $(this), method = othis.data('method');
			activeCustomer[method] ? activeCustomer[method].call(this, othis) : '';
		});

	});
	exports('zentao', {})
});
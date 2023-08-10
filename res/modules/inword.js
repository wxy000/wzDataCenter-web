layui.define(function(exports){
	layui.use(['layer', 'form'], function(){
		const layer = layui.layer,
			$ = layui.$,
			admin = layui.admin,
			setter = layui.setter,
			laydate = layui.laydate,
			element = layui.element,
			form = layui.form;

		function getInWord(){
			admin.req({
				url: setter.mainAddress + 'inword/getRandomWords?nums=' + setter.inwordNum
				,method: "GET"
				,async: false
				,cache: false
				,dataType: "JSON"
				,done: function(res){
					for (var i=0;i<res.data.length;i++){
						$("#inword"+(i+1)).html(res.data[i]);
					}
				}
			});
		}

		function getImg() {
			admin.req({
				url: setter.mainAddress + 'inword/getRandomImgs?nums=' + setter.inwordNum
				,method: "GET"
				,async: false
				,cache: false
				,dataType: "JSON"
				,done: function(res){
					for (var i=0;i<res.data.length;i++){
						$("#inwordimg"+(i+1)).attr("src", res.data[i]);
					}
				}
			});
		}

		getInWord();
		getImg();

		//监听窗口尺寸改变事件，控制宽度相同
		admin.resize(function(){
			var cardBody = $('#LAY-component-grid-speed-dial .layui-card-body');
			cardBody.height(cardBody.width()/1.5);
		});
	});
	exports('inword', {})
});
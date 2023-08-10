layui.define(function(exports){
	layui.use(['layer', 'form', 'laytpl'], function(){
		const $ = layui.$,
			admin = layui.admin,
			setter = layui.setter,
			laytpl = layui.laytpl;

		function getInWord(){
			let result = [];
			admin.req({
				url: setter.mainAddress + 'inword/getRandomWords?nums=' + setter.inwordNum
				,method: "GET"
				,async: false
				,cache: false
				,dataType: "JSON"
				,done: function(res){
					/*for (var i=0;i<res.data.length;i++){
						$("#inword"+(i+1)).html(res.data[i]);
					}*/
					result = res.data;
				}
			});
			return result;
		}

		function getInImg() {
			let result = [];
			admin.req({
				url: setter.mainAddress + 'inword/getRandomImgs?nums=' + setter.inwordNum
				,method: "GET"
				,async: false
				,cache: false
				,dataType: "JSON"
				,done: function(res){
					/*for (var i=0;i<res.data.length;i++){
						$("#inwordimg"+(i+1)).attr("src", res.data[i]);
					}*/
					result = res.data;
				}
			});
			return result;
		}

		let getInWords = getInWord();
		let getInImgs = getInImg();

		let inwordsimgs = [];
		for (let i=0; i<setter.inwordNum; i++){
			let tmp = {"inword":getInWords[i],"inimg":getInImgs[i]}
			inwordsimgs.push(tmp);
		}

		let inwordTPL = document.getElementById("inwordTPL").innerHTML;
		let inword = document.getElementById("inword");
		laytpl(inwordTPL).render(inwordsimgs,function (html){
			inword.innerHTML = html;
		});

		//监听窗口尺寸改变事件，控制宽度相同
		admin.resize(function(){
			var cardBody = $('#LAY-component-grid-speed-dial .layui-card-body');
			cardBody.height(cardBody.width()/1.5);
		});
	});
	exports('inword', {})
});
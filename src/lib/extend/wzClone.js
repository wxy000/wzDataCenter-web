layui.define(function(exports) {
	exports('wzClone', {
		deepClone: function (obj){
			let objClone =  Array.isArray(obj) ? [] : {};
			if (obj && typeof obj === 'object') {
				for(let key in obj){
					if (obj[key] && typeof obj[key] === 'object'){ // 判断对象的这条属性是否为对象
						objClone[key] = this.deepClone(obj[key]); // 若是对象进行嵌套调用
					}else{
						objClone[key] = obj[key]
					}
				}
			}
			return objClone; //返回深度克隆后的对象
		}
	});
});
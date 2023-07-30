/**
 * console
 */

layui.define(function(exports){

  	/*
    	下面通过 layui.use 分段加载不同的模块，实现不同区域的同时渲染，从而保证视图的快速呈现
  	*/


  	//区块轮播切换
  	layui.use(['admin', 'carousel'], function(){
    	var $ = layui.$
        	,admin = layui.admin
        	,carousel = layui.carousel
        	,element = layui.element
        	,device = layui.device();

    	//轮播切换
    	$('.layadmin-carousel').each(function(){
      		var othis = $(this);
      		carousel.render({
        		elem: this
        		,width: '100%'
        		,arrow: 'none'
        		,interval: othis.data('interval')
        		,autoplay: othis.data('autoplay') === true
        		,trigger: (device.ios || device.android) ? 'click' : 'hover'
        		,anim: othis.data('anim')
      		});
    	});

    	element.render('progress');

  	});

  	//数据概览
  	layui.use(['admin', 'carousel', 'echarts'], function(){
    	var $ = layui.$
        	,admin = layui.admin
        	,carousel = layui.carousel
        	,echarts = layui.echarts;


  	});

  	//地图
  	layui.use(['carousel', 'echarts'], function(){
    	var $ = layui.$
        	,carousel = layui.carousel
        	,echarts = layui.echarts;


  	});

  	exports('console', {})
});
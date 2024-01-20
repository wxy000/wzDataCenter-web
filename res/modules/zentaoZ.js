layui.define(function(exports){
    layui.use(['layer', 'form', 'echarts', 'wzClone', 'readEcharts'], function(){
        const layer = layui.layer,
            $ = layui.$,
            admin = layui.admin,
            setter = layui.setter,
            laydate = layui.laydate,
            form = layui.form,
            echarts = layui.echarts,
            wzClone = layui.wzClone,
            readEcharts = layui.readEcharts;

        laydate.render({
            elem: '#zentaoZ-year',
            type: 'year'
        });

        $("#Ztb1-header").css({"font-weight":"bold"}).html("问题类型热力图（预计时长）");
        $("#Ztb2-header").css({"font-weight":"bold"}).html("客户热力图（预计时长）");

        function getDataZLeixing(data){
            let result = ''
            admin.req({
                url: setter.mainAddress + 'zentao/getAnalysisHeatMapLeixing'
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

        function getDataZCustomer(data){
            let result = ''
            admin.req({
                url: setter.mainAddress + 'zentao/getAnalysisHeatMapCustomer'
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

        let option = ""
        /*******************问题类型热力图-start*********************/
        const myChart_leixing_y = echarts.init(document.getElementById('Ztb1-body'));
        function getZentaoZLeixingSearch1(mychart,option,data){

            const data1 = data.data.dataContent.map(function (item) {
                    return [item[1], item[0], item[2] || '-'];
                });

            delete option.tooltip.trigger;
            option.xAxis.boundaryGap = true;
            option.xAxis.data = data.data.dataType;
            option.xAxis.splitArea = {"show": true};
            option.xAxis.axisLabel = { interval: 0, rotate: 20 };
            option.yAxis.type = "category";
            option.yAxis.boundaryGap = true;
            option.yAxis.data = data.data.dataDate;
            option.yAxis.splitArea = {"show": true};
            option.visualMap = {min: 0,max: data.data.dataMax,calculable: true,left: 'right'};
            option.series[0].type = "heatmap";
            option.series[0].smooth = false;
            option.series[0].markPoint = {};
            option.series[0].markLine = {};
            option.series[0].label = {"show": true};
            option.series[0].data = data1;
            option.dataZoom = [];
            // 使用刚指定的配置项和数据显示图表。
            mychart.setOption(option);
        }
        /*******************问题类型热力图-end*********************/

        /*******************客户热力图-start*********************/
        const myChart_customer_y = echarts.init(document.getElementById('Ztb2-body'));
        function getZentaoZCustomerSearch1(mychart,option,data){
            console.log(data);

            const data1 = data.data.dataContent.map(function (item) {
                return [item[1], item[0], item[2] || '-'];
            });

            delete option.tooltip.trigger;
            option.xAxis.boundaryGap = true;
            option.xAxis.data = data.data.dataType;
            option.xAxis.splitArea = {"show": true};
            option.xAxis.axisLabel = { interval: 0, rotate: 20 };
            option.yAxis.type = "category";
            option.yAxis.boundaryGap = true;
            option.yAxis.data = data.data.dataDate;
            option.yAxis.splitArea = {"show": true};
            option.visualMap = {min: 0,max: data.data.dataMax,calculable: true,left: 'right'};
            option.series[0].type = "heatmap";
            option.series[0].smooth = false;
            option.series[0].markPoint = {};
            option.series[0].markLine = {};
            option.series[0].label = {"show": true};
            option.series[0].data = data1;
            option.dataZoom = [];
            // 使用刚指定的配置项和数据显示图表。
            mychart.setOption(option);
        }
        /*******************客户热力图-end*********************/

        form.on('submit(zentaoZSearch)', function(data){
            const field = data.field;
            if (field.dateYear===undefined||field.dateYear===""){
                layer.msg('查询条件必填');
            }else {
                /*******************问题类型热力图-start*********************/
                const yLeixing = getDataZLeixing(field);
                option = wzClone.deepClone(readEcharts.simpleEcharts);
                getZentaoZLeixingSearch1(myChart_leixing_y,option,yLeixing);
                /*******************问题类型热力图-end*********************/
                /*******************客户热力图-start*********************/
                const yCustomer = getDataZCustomer(field);
                option = wzClone.deepClone(readEcharts.simpleEcharts);
                getZentaoZCustomerSearch1(myChart_customer_y,option,yCustomer);
                /*******************客户热力图-end*********************/
            }
            return false; // 阻止默认 form 跳转
        });

    });
    exports('zentaoZ', {})
});
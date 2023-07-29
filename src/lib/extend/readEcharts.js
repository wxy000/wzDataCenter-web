layui.define(function(exports) {
	exports('readEcharts', {
		simpleEcharts: {
			"title": {
				"text": "",
				"subtext": "",
				"left": "left"
			},
			"tooltip": {
				"trigger": "axis"
			},
			"legend": {
				"orient": "horizontal",
				"left": "left"
			},
			"xAxis": {
				"type": "category",
				"boundaryGap": true,
				"data": []
			},
			"yAxis": {
				"type": "value"
			},
			"series": [
				{
					"data": [],
					"name": "",
					"type": "line",
					"smooth": true,
					"markPoint": {
						"data": [
							{"type": "max", "name": "Max"},
							{"type": "min", "name": "Min"}
						]
					},
					"markLine": {
						"data": [
							{"type": "average", "name": "Avg"}
						]
					},
					"radius": "50%",
					"emphasis": {
						"itemStyle": {
							"shadowBlur": 10,
							"shadowOffsetX": 0,
							"shadowColor": "rgba(0, 0, 0, 0.5)"
						}
					},
					"symbolSize": 5
				}
			],
			"dataZoom": [
				{
					"type": "inside",
					"start": 0,
					"end": 100
				},
				{
					"start": 0,
					"end": 100
				}
			]
		},
		seriesEcharts: {
			"data": [],
			"name": "",
			"type": "line",
			"smooth": true,
			"markPoint": {
				"data": [
					{"type": "max", "name": "Max"},
					{"type": "min", "name": "Min"}
				]
			},
			"markLine": {
				"data": [
					{"type": "average", "name": "Avg"}
				]
			},
			"radius": "50%",
			"emphasis": {
				"itemStyle": {
					"shadowBlur": 10,
					"shadowOffsetX": 0,
					"shadowColor": "rgba(0, 0, 0, 0.5)"
				}
			},
			"symbolSize": 5
		}
	});
});
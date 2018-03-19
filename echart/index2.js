//	返回时间
function getBeginTime(dayNum) {
	var todayTimer = new Date().getTime();
	var beginTimer = todayTimer - dayNum * 24 * 60 * 60 * 1000;
	var year = new Date(beginTimer).getFullYear();
	var month = parseInt(new Date(beginTimer).getMonth()) + 1;
	if(month < 10) {
		month = "0" + month;
	}
	var day = new Date(beginTimer).getDate();
	if(day < 10) {
		day = "0" + day;
	}
	return year + "-" + month + "-" + day;
}


//折线图数据
//平台用户数据   折线图
(function userDataChartFn() {
	var beginNum = 15,finishNum = 0;

	//配置折线图参数
	var chartOption = {
		tooltip: {
			trigger: 'axis'
		},
		grid: { //布局
			x: 35,
			x2: 35,
			y: 25,
			y2: 50,
			borderColor: '#fff',
		},
		legend: { //图例组件
			show: true,
			type: "plain", //普通图例
			//			width: "86px",
			//			align:"left",
			left: "left",
			orient: 'vertical',
			bottom: "-10px",
			itemWidth: 10, //图例标记的图像宽度
			inactiveColor: "#ff3a46",
			selectedMode: 'single',
			data: [ //图例的数据数组
				{
					name: '新注册用户数',
					icon: 'circle', //图像为圆
					textStyle: { //文本颜色
						color: '#333',
						fontSize: "14"
					}
				},{
					name: '新开店用户数',
					icon: 'circle', //图像为圆
					textStyle: { //文本颜色
						color: '#333',
						fontSize: "14"
					}
				}
			]
		},
		xAxis: [{ //x轴
			type: 'category', //坐标轴类型   
			data: dataX, //按需求配置X轴区间     类目数据，在type:"category"中有效
			splitLine: {
				show: false //坐标轴在grid区域的分割线   默认不显示
			},
			boundaryGap: false,
			axisLabel: {
				interval: 0
			},
			axisLine: { //x轴样式
				lineStyle: {
					color: "#999",
					width: 1,
					opacity: 1
				}
			}
		},{ //x轴
            type: 'category', //坐标轴类型
            data: dataX, //按需求配置X轴区间     类目数据，在type:"category"中有效
            splitLine: {
                show: false //坐标轴在grid区域的分割线   默认不显示
            },
            boundaryGap: false,
            axisLabel: {
                interval: 0
            },
            axisLine: { //x轴样式
                lineStyle: {
                    color: "#999",
                    width: 1,
                    opacity: 1
                }
            }
        }],
		dataZoom: [{
			type: 'inside',
			show: true,
			xAxisIndex: [0],
			end: 100,
		}],
		yAxis: [{
				type: 'value',
				show: true,
				splitLine: {
					show: false
				},
				axisLine: {
					lineStyle: {
						color: "#999",
						width: 1,
						opacity: 1
					}
				}
			}
					// ,   //y轴样式
					// 	{
					// 		type: 'value',
					// 		show: true,
					// 		min: 'dataMin',
					// 		max: 'dataMax',
					// 		splitLine: {
					// 			show: false
					// 		},
					// 		axisLine: {
					// 			lineStyle: {
					// 				color: "#999",
					// 				width: 1,
					// 				opacity: 1
					// 			}
					// 		}
					// 	}
		],
		series: [//指定图标的类型     series[0].areaStyle.normal.color.colorStops[1].color="#ffece4";
		{ 	name: '新注册用户数',
			type: "line", //带节点
			smooth: true,
			symbol: 'circle', //节点标记类型
			symbolSize: 8, //节点标记大小
			sampling: 'average',
			areaStyle: {
				normal: {
					color: {
						type: 'linear',
						x: 0,
						y: 1,
						x2: 0,
						y2: 0,
						colorStops: [{
							offset: 0,
							color: '#fff' // 0% 处的颜色
						}, {
							offset: 1,
							color: '#fffaed' // 100% 处的颜色
						}],
					}
				}
			},
			data: regNum, //节点数据列表
			connectNulls: true,
			clipOverflow: false,
			animation: true, //开启动画
			itemStyle: { //图像样式
				normal: {
					label: {
						show: true //图形上的文本标签
					},
					lineStyle: {
						width: 2,
						color: "#fbbd00" //线的颜色
					},
					color: "#fbbd00",
				}
			},
		},{ 	name: '新开店用户数',
			type: "line", //带节点
			smooth: true,
			symbol: 'circle', //节点标记类型
			symbolSize: 8, //节点标记大小
			sampling: 'average',
			areaStyle: {
				normal: {
					color: {
						type: 'linear',
						x: 0,
						y: 1,
						x2: 0,
						y2: 0,
						colorStops: [{
							offset: 0,
							color: '#fff' // 0% 处的颜色
						}, {
							offset: 1,
							color: '#fffaed' // 100% 处的颜色
						}],
					}
				}
			},
			data: regNum, //节点数据列表
			connectNulls: true,
			clipOverflow: false,
			animation: true, //开启动画
			itemStyle: { //图像样式
				normal: {
					label: {
						show: true //图形上的文本标签
					},
					lineStyle: {
						width: 2,
						color: "#fbbd00" //线的颜色
					},
					color: "#fbbd00",
				}
			},
		}]

	};

	var regNum = []; //新注册用户数   serious中设置   节点数据列表
	var openShopNum = []; //新开店用户数   节点数据列表
	var dataX = []; //按需求配置X轴区间  在xAxis中设置
	var dataX2 = []; //按需求配置X轴区间  在xAxis中设置
	//折线图对象   初始化
	var lineChart = echarts.init(document.getElementById('lineChart1'));

	function reqChartData() {
        regNum =[24.60,0.00,19.60,0.00,5.80,0.00,0.00];
        openShopNum = [2,6,4, 8,4,13,12];
        dataX =["03-01","03-02","03-03","03-04","03-05","03-06","03-07"];
        randerChartFn();
	}
    reqChartData();
//	渲染折线图
	function randerChartFn() {   //ajax请求完数据后,将值赋值给折线图的相应值就OK
		chartOption.series[0].data = regNum;
		chartOption.xAxis[0].data = dataX;

		chartOption.series[1].data = openShopNum;
		chartOption.xAxis[0].data = dataX;
		lineChart.setOption(chartOption);
	}





    //下拉列表
    // $(".userDataBlock .chartsBlock .dropdown li a").on('click', function() {
    //     day = $(this).attr('data-day');
    //     var daynum = $(this).attr("data-daynum");
    //     $(this).parent().parent().parent().find('input').val($(this).html());
    //     if(daynum == 0) {
    //         $(this).parent().parent().parent().parent().find(".beginTime").html(getBeginTime(daynum));
    //         daynum = -1;
    //         $(this).parent().parent().parent().parent().find(".finishTime").html(getBeginTime(daynum));
    //     } else if(daynum == 1 || daynum == 7 || daynum == 15 || daynum == 30) {
    //         $(this).parent().parent().parent().parent().find(".beginTime").html(getBeginTime(daynum));
    //         daynum = 0;
    //         $(this).parent().parent().parent().parent().find(".finishTime").html(getBeginTime(daynum));
    //     }
    //     //		平台用户数据
    //     reqChartData()
    // });


})();


	//配置折线图参数
	var chartOption = {
		grid: {  //布局
			x: 35,
			x2: 35,
			y: 25,
			y2: 50,
			borderColor: '#fff',
		},
		legend:{   //图例组件
			show:true,
			type:"plain", //普通图例
			width:"100%",
			left:"80px",
			bottom:"-4%",
			itemWidth:10, //图例标记的图像宽度
			inactiveColor:"#b5d9fd",
			selectedMode:'single',
			data: [   //图例的数据数组
			{
				name: '云店利润',
			    icon: 'circle',  //图像为圆
			    textStyle: {   //文本颜色
			        color: '#333',
			        fontSize:"14"
			    }
			},
			{
				name: '奖金',
			    icon: 'circle',
			    textStyle: {
			        color: '#333',
			        fontSize:"14"
			    }
			},
			{
				name: '翻宝币收入',
			    icon: 'circle',
			    textStyle: {
			        color: '#333',
			        fontSize:"14"
			    }
			}]
		},
		xAxis: [{   //x轴
			type: 'category',  //坐标轴类型   
			data: DataX,  //按需求配置X轴区间     类目数据，在type:"category"中有效
			splitLine: {show: false},  //坐标轴在grid区域的分割线   默认不显示
			boundaryGap:false,
			axisLabel:{
				interval:0
			},
			axisLine:{
				lineStyle:{
					color:"#999",
					width:0,
					opacity:0.5
				}
			}
		}],
		dataZoom:[{
			type: 'inside',  
           	show: true,  
           	xAxisIndex: [0],  
           	end: 100,
		}],
		yAxis: [{
			type: 'value', //数值轴  连续数据
			show:true,
			splitLine: {show: false},
			axisLine:{ //坐标轴轴线相关设置
				lineStyle:{
					color:"#999",
					width:1,
					opacity:1
				}
			}
		},
		{
			type: 'value',
			show:true,
			min:'dataMin',  //坐标轴刻度最小值
			max:'dataMax',
			splitLine: {show: false},
			axisLine:{
				lineStyle:{
					color:"#999",
					width:1,
					opacity:1
				}
			}
		}],
		series: [{   //指定图标的类型
			name: '新注册用户数',
//			type: "line",
			type:"graph", //带节点
			smooth: true,
            symbol: 'circle',  //节点标记的形状
            symbolSize: 2,  //节点标记大小
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
						    offset: 0, color: '#fff' // 0% 处的颜色
						}, {
						    offset: 1, color: '#fffbee' // 100% 处的颜色
						}],
					}
                }
            },
			
			data: Data1,  //节点数据列表
			connectNulls:true,
			clipOverflow:false,
			animation:true,  //开启动画
			itemStyle : {  //图像样式
				normal: {
					label : {show: true}, //图形上的文本标签
					lineStyle : {
						width:2,
						color:"#fbbd00"  //线的颜色
					},
					color:"#fb7ca3",
				}
			},
		},
		{
			name: '新开店用户数',
			type: "line",
			smooth: true,
            symbol: 'circle',
            symbolSize: 2,
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
						    offset: 0, color: '#fff' // 0% 处的颜色
						}, {
						    offset: 1, color: '#fff0e6' // 100% 处的颜色
						}],
					}
                }
            },
			data: Data2,
			connectNulls:true,
			clipOverflow:false,
			animation:true,
			itemStyle : {
				normal: {
					label : {show: true},
					lineStyle : {
						width:2,
						color:"#459ffb"
					},
					color:"#459ffb",
				}
			},
		}
	};
	
	//数据请求接口
	var userinfo = JSON.parse(localStorage.getItem("userinfo"));
	var user_token = userinfo.token;
	var user_id = userinfo.uid;
//	var user_token = JSON.parse(localStorage.getItem("userinfo")).token;
//	var user_id = JSON.parse(localStorage.getItem("userinfo")).userinfo.uid;
	
	//收入金额数据数组 series中的data字段
	var Data1 = []; //新注册用户数     serious中设置 节点数据列表
	var Data2 = []; //新开店用户数     节点数据列表
	
	
	var Data3 = []; //奖金
	var Data4 = []; //翻宝币收入
	//X轴范围
	var DataX = [];  //按需求配置X轴区间   在xAxis中设置
	var DataX2 = [];
	var DataX1_1 = [];
	var Time = 1;
	//折线图对象
	var lineChart = lineChart = echarts.init(document.getElementById('lineChart'));
	//收入概览函数
	function write_money(moneyInfo){
		doc.querySelector("#all-money").innerHTML = moneyInfo.all;
		doc.querySelector("#cloudmoney").innerHTML = moneyInfo.allcloudstore;
		doc.querySelector("#reward").innerHTML = moneyInfo.allprice;
		doc.querySelector("#fanbaobi").innerHTML = moneyInfo.allfbmoney;
	}
	//生成收入明细数据结构ff3a46
	function income_detail(time,dataInfo){
		for(var i=0;i<dataInfo.length;i++){
			var data = doc.createElement("div");
			data.className = "data";
			if(i>0){
				var difference = (parseFloat(dataInfo[i])-parseFloat(dataInfo[i-1])).toFixed(2);
			}else{
				var difference = 0;
			}
			if(difference >= 0){
				data.innerHTML = "<span>"+time[i]+"</span><span style='text-align: center;'>"+dataInfo[i]+"</span><span class='add'>"+difference+"</span>";
			}else{
				data.innerHTML = "<span>"+time[i]+"</span><span style='text-align: center;'>"+dataInfo[i]+"</span><span class='reduce'>"+difference+"</span>";
			}
			doc.querySelector(".data-content").appendChild(data);
		}
	}
	//折线图渲染函数
	function write_line(dataInfo,Time){
		console.log(JSON.stringify(dataInfo));
		DataX = [];
		DataX2 = [];
		DataX1_1 = [];
		
		Data1 = [];
		Data2 = [];
		Data3 = [];
		Data4 = [];
		for(var i in dataInfo){
			//X轴数据
			DataX.push(dataInfo[i].date);
			DataX2.push(dataInfo[i].date);
			
			Data1.push(dataInfo[i].all);
			DataX1_1.push(dataInfo[i].all);
			Data2.push(dataInfo[i].cloudstore);
			Data3.push(dataInfo[i].price);
			Data4.push(dataInfo[i].fbmoney);
		}
		income_detail(DataX2.reverse(),DataX1_1.reverse()); //总收入明细
		chartOption.xAxis[0].data = DataX;
		chartOption.series[0].data = Data1;
		chartOption.series[1].data = Data2;
		chartOption.series[2].data = Data3;
		chartOption.series[3].data = Data4;
		if(Time == 1){
			chartOption.dataZoom[0].end = 100;
		}else if(Time == 2){
			if(DataX.length > 15){
				chartOption.dataZoom[0].end = 33;
			}else{
				chartOption.dataZoom[0].end = 100;
			}
		}else if(Time == 3){
			chartOption.dataZoom[0].end = 33;
		}else if(Time == 4){
			chartOption.dataZoom[0].end = 100;
		}else if(Time == 5){
			chartOption.dataZoom[0].end = 100;
		}
//		设置数据
		lineChart.setOption(chartOption);
	}
	function data_request(Time){
		$.ajax({
			type:"post",
			url:"https://app.fanbaoyundian.com/appapi/revenuereport.app.php",
			data:{ 
				uid:user_id,
				token:user_token,
				time:Time
			},
			success:function(data){
				//console.log(JSON.stringify(data));
				write_money(data);
				write_line(data.report.reverse(),Time);
			},
			error:function(){
//				$.toast("获取数据列表失败");
			}
		});
	}
	data_request(Time);
	//切换明细类型
	var time = [];
	var allmonry = [];
	var cloudstoremonry = [];
	var pricemonry = [];
	var fbmoney = [];
	//收入明细数据请求
	function datadetail_request(){
		time = [];
		allmonry = [];
		cloudstoremonry = [];
		pricemonry = [];
		fbmoney = [];
		$.ajax({
			type:"post",
			url:"https://app.fanbaoyundian.com/appapi/revenuereport.app.php",
			data:{
				uid:user_id,
				token:user_token,
				time:Time
			},
			success:function(data){
				//console.log(JSON.stringify(data));
				//data.report = data.report.reverse();
				for(var i in data.report){
					time.push(data.report[i].date);
					time.reverse();
					allmonry.push(data.report[i].all);
					allmonry.reverse();
					cloudstoremonry.push(data.report[i].cloudstore);
					cloudstoremonry.reverse();
					pricemonry.push(data.report[i].price);
					pricemonry.reverse();
					fbmoney.push(data.report[i].fbmoney);
					fbmoney.reverse();
				}
				$(".money-tab").on("tap","span",function(e){
					e.stopPropagation();
					var data_type = this.getAttribute("data-type");
					for (var i=0;i<4;i++) {
						document.querySelector(".money-tab").getElementsByTagName("span")[i].classList.remove("active");
					}
					this.classList.add("active");
					doc.querySelector(".data-content").innerHTML = "";
					if(data_type == 1){
						income_detail(time,allmonry);
					}else if(data_type == 2){
						income_detail(time,cloudstoremonry);
					}else if(data_type == 3){
						income_detail(time,pricemonry);
					}else if(data_type == 4){
						income_detail(time,fbmoney);
					}
				})
			},
			error:function(){
				$.toast("获取数据列表失败");
			}
		});
	}
	$.ajax({
		type:"post",
		url:"https://app.fanbaoyundian.com/appapi/revenuereport.app.php",
		data:{
			uid:user_id,
			token:user_token,
			time:Time
		},
		success:function(data){
			//data.report = data.report.reverse();
			console.log(1,JSON.stringify(data))
			for(var i in data.report){
				time.push(data.report[i].date);
				allmonry.push(data.report[i].all);
				cloudstoremonry.push(data.report[i].cloudstore);
				pricemonry.push(data.report[i].price);
				fbmoney.push(data.report[i].fbmoney);
			}
			$(".money-tab").on("tap","span",function(e){
				e.stopPropagation();
				var data_type = this.getAttribute("data-type");
				for (var i=0;i<4;i++) {
					document.querySelector(".money-tab").getElementsByTagName("span")[i].classList.remove("active");
				}
				this.classList.add("active");
				document.querySelector(".data-content").innerHTML = "";
				if(data_type == 1){
					income_detail(time,allmonry);
				}else if(data_type == 2){
					income_detail(time,cloudstoremonry);
				}else if(data_type == 3){
					income_detail(time,pricemonry);
				}else if(data_type == 4){
					income_detail(time,fbmoney);
				}
			})
		},
		error:function(){
//			$.toast("获取数据列表失败");
		}
	});


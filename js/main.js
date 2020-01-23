$(function(){
	d3.csv("data/line_vs_market_2019.csv?r="+Math.random()).then(
		function(data) {
			var chart = new ApexCharts(document.querySelector("#stocks_line_vs_market_2019"), {
				chart: {
					type: 'line',
					width: '99%',
					height: 400
				},
				series: [{
					name: 'portfolio',
					data: data.map(x => x.val)
				}, {
					name: 'market',
					data: data.map(x => x.market_val)	
				}],
				xaxis: {
					type: 'datetime',
					categories: data.map(x => x.session_dt.split(' ')[0]),
					labels: {
						datetimeFormatter: {
							month: 'MMM'
						}
					}
				}
			});
			chart.render();
		}
	);

	d3.csv("data/line_vs_market.csv?r="+Math.random()).then(
		function(data) {
			var chart = new ApexCharts(document.querySelector("#stocks_line_vs_market"), {
				chart: {
					type: 'line',
					width: '99%',
					height: 400
				},
				series: [{
					name: 'portfolio',
					data: data.map(x => x.val)
				}, {
					name: 'market',
					data: data.map(x => x.market_val)	
				}],
				xaxis: {
					type: 'datetime',
					categories: data.map(x => x.session_dt.split(' ')[0]),
					labels: {
						datetimeFormatter: {
							month: 'MMM'
						}
					}
				}
			});
			chart.render();
		}
	);

	d3.csv("data/best.csv?r="+Math.random()).then(
		function(data) {
			var chart = new ApexCharts(document.querySelector("#stocks_best"), {
				chart: {
					type: 'bar',
					width: '98%',
					height: 400,
				},
				plotOptions: {
					bar: {
						horizontal: true,
						barHeight: '80%'
					}
				},
				series: [{
					name: 'Best transactions',
					data: data.map(x => x.profit)
				}],
				xaxis: {
					categories: data.map(x => x.comp_name.replace('&amp;','&'))
				},
				yaxis: {
					opposite: true
				},
				dataLabels: {
					formatter: x => '+'+x+'%'
				}
			});
			chart.render();
		}
	);

	d3.csv("data/worst.csv?r="+Math.random()).then(
		function(data) {
			var chart = new ApexCharts(document.querySelector("#stocks_worst"), {
				chart: {
					type: 'bar',
					width: '98%',
					height: 400,
				},
				colors: ['#FF4560'],
				plotOptions: {
					bar: {
						horizontal: true,
						barHeight: '80%'	
					}
				},
				series: [{
					name: 'Worst transactions',
					data: data.map(x => x.profit)
				}],
				xaxis: {
					categories: data.map(x => x.comp_name.replace('&amp;','&'))
				},
				dataLabels: {
					formatter: x => x+'%'
				}
				
			});
			chart.render();

		}
	);

	d3.csv("data/success.csv?r="+Math.random()).then(
		function(data) {
			var chart = new ApexCharts(document.querySelector("#stocks_success"), {
				chart: {
					type: 'bar',
					width: '98%',
					height: 400,
				},
				colors: ['#FF4560','#008FFB'],
				plotOptions: {
					bar: {
						horizontal: false,
						columnWidth: '75%',
					},
				},
				stroke: {
					show: true,
					width: 50,
					colors: ['transparent']
				},
				series: [{
					name: '# bad trans',
					data: [data[0].n]
				},{
					name: '# good trans',
					data: [data[1].n]
				}],
				xaxis: {
					categories: data.map(x => x.successful)
				}
			});
			chart.render();

		}
	);
});

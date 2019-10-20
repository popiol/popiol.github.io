$(function(){
	d3.csv("data/line_vs_market.csv").then(
		function(data) {
			var chart = new ApexCharts(document.querySelector("#stocks_line_vs_market"), {
				chart: {
					type: 'line',
					width: '90%',
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
					categories: data.map(x => x.session_dt.split(' ')[0])
				}
			});
			chart.render();
		}
	);
});

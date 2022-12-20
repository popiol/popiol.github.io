function create_line_plot(id) {
	return function(data) {
		var chart = new ApexCharts(document.querySelector("#"+id), {
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
		var year = id.replace('stocks_line_vs_market_','');
		$('#profit'+year).text(Math.round(data[data.length-1].val));
		setTimeout(function(){
			$('#bot_'+year).text(Math.round(data[data.length-1].val * 100) / 100 + '%');
			val = parseFloat($('#bot_All').text().replace('%', '')) / 100 + 1;
			val *= data[data.length-1].val / 100 + 1; 
			$('#bot_All').text(Math.round((val - 1) * 10000) / 100 + '%');
		}, 10);
		$('#market'+year).text(Math.round(data[data.length-1].market_val));
	}
}


$(function(){
	d3.csv("data/etfs.csv?r="+Math.random()).then(
		function(data) {
			table = $('<table class="table"></table>');
			header = $('<tr></tr>');
			for (key in data[0]) {
				console.log(key);
				if (key == 'All') {
					header.append($('<td></td>').text(key));
				} else {
					header.prepend($('<td></td>').text(key));
				}
			}
			table.append($('<thead></thead>').append(header));
			tbody = $('<tbody></tbody>');
			row = $('<tr></tr>');
			for (key in data[0]) {
				if (key == 'All') {
					row.append($('<td id="bot_'+key+'" class="all">0.00%</td>'));
				} else {
					row.prepend($('<td id="bot_'+key+'"></td>'));
				}
			}
			row.find('#bot_Name').text("BOT");
			tbody.append(row);
			for (rowi in data) {
				if (rowi >= data.length-1) break;
				row = $('<tr></tr>');
				for (key in data[rowi]) {
					if (key == 'All') {
						row.append($('<td class="all"></td>').text(data[rowi][key]));
					} else {
						row.prepend($('<td></td>').text(data[rowi][key]));
					}
				}
				tbody.append(row);
			}
			w = $(window).width();
			table.width(Math.min(w, 800));
			$('#etfs').append(table.append(tbody));
		}
	);
	
	$('.stocks_line_vs_market').each(function(){
		id = this.id;
		filename = "data/"+id.replace('stocks_','')+'.csv';
		d3.csv(filename+"?r="+Math.random()).then(create_line_plot(id))
	});

	best_worst_scale = {x:1,y:1,xx:.7,yy:.3,done:0,rescale(){
		if (best_worst_scale.done == 2) {
			$('#stocks_best').width(function(){return $(this).width() * (best_worst_scale.xx + best_worst_scale.yy * best_worst_scale.x / best_worst_scale.y)});
			$('#stocks_worst').width(function(){return $(this).width() * (best_worst_scale.xx + best_worst_scale.yy * best_worst_scale.y / best_worst_scale.x)});
			best_worst_scale.best_chart.render();
			best_worst_scale.worst_chart.render();
		}
	}};

	d3.csv("data/best.csv?r="+Math.random()).then(
		function(data) {
			best_worst_scale.x = Math.abs(data[0].profit);
			best_worst_scale.done++;
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
					categories: data.map(x => x.comp_name.replace('&amp;','&').split(',')[0])
				},
				yaxis: {
					opposite: true
				},
				dataLabels: {
					formatter: x => '+'+x+'%',
					style: {
						colors: ['black']
					},
					textAnchor: 'start'
				}
			});
			best_worst_scale.best_chart = chart;
			best_worst_scale.rescale();
		}
	);

	d3.csv("data/worst.csv?r="+Math.random()).then(
		function(data) {
			best_worst_scale.y = Math.abs(data[0].profit);
			best_worst_scale.done++;
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
					formatter: x => x+'%',
					style: {
						colors: ['black']
					},
					textAnchor: 'middle'
				}				
			});
			best_worst_scale.worst_chart = chart;
			best_worst_scale.rescale();
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

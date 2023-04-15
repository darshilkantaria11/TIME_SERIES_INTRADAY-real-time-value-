const options = {
	method: 'GET',
	headers: {
		// 'X-RapidAPI-Key': 'd516a4915emsh8d0c711196067cdp14edygtcjbh4ajsn7253f13db007',   //[get this from rapid api   link:- https://rapidapi.com/alphavantage/api/alpha-vantage]
		// 'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
	}
};

fetch('https://alpha-vantage.p.rapidapi.com/query?interval=5min&function=TIME_SERIES_INTRADAY&symbol=MSFT&datatype=json&output_size=compact', options)
	.then(response => response.json())
	.then(data => {
		const chartData = {
			labels: Object.keys(data['Time Series (5min)']).reverse(),
			datasets: [{
				label: 'Stock Price',
				data: Object.values(data['Time Series (5min)']).map(obj => obj['1. open']).reverse(),
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1
			}]
		};

		const chart = new Chart('chart', {
			type: 'line',
			data: chartData,
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: false
						}
					}]
				}
			}
		});
	})
	.catch(err => console.error(err));

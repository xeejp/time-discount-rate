import React from 'react'

import Highcharts from 'react-highcharts'

const Chart1 = ({rate,history,basetime,uplim,lowlim}) => {
	var lowrate = rate.map((value)=>(value[0]))
	var uprate = rate.map((value)=>(value[2]))
	lowrate = basetime.map((value,index) => ([value,lowrate[index]]))
	uprate = basetime.map((value,index) => ([value,uprate[index]]))
	console.log(basetime)
	console.log(lowrate)
	console.log(uprate)
	return (<Highcharts 
	config = {{
				credits: {
						enabled: false
				},
				chart: {
					type: 'scatter'
				},
				title: {
						text: null
				},
				xAxis: {
						title: {
								text: '期間'
						},
						allowDecimals: false
				},
				yAxis: {
					max: uplim,
					min: lowlim,
						title: {
								text: '割引率'
						},
						labels: {
								format: '{value} %',
						}
				},
			/*	plotOptions: {
					scatter: {
						marker: {
							radius: 5
						},
						tooltip: {
							headerFormat: '<b>{series.name}</b><br>',
							pointFormat: '{point.x} 日後, {point.y} %'
						}
					}
				},*/
				series: [{
					name: '割引率の下限',
					data: lowrate
				},{
					name: '割引率の上限',
					data: uprate
				}]
		}} />)
}

export default Chart1

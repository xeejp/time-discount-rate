import React, { Component } from 'react'
import { connect } from 'react-redux'

import Highcharts from 'react-highcharts'

import { ReadJSON, InsertVariable } from '../shared/ReadJSON'

const multi_text = ReadJSON().static_text
const $s = multi_text["shared"]["Chart1"]

const mapStateToProps = ({ rate, basetime, uplim, lowlim }) => ({
    rate,
    basetime,
    uplim,
    lowlim
})

class Chart1 extends Component {
	constructor(props, context) {
		super(props, context)
	}

	render() {
		const { rate, basetime, uplim, lowlim } = this.props
		var lowrate = rate.map((value) => (value[0]))
		var uprate = rate.map((value) => (value[2]))
		lowrate = basetime.map((value, index) => ([value, lowrate[index]])).sort((a, b) => a[0] - b[0])
		uprate = basetime.map((value, index) => ([value, uprate[index]])).sort((a, b) => a[0] - b[0])
		console.log(basetime)
		console.log(lowrate)
		console.log(uprate)
		return (<Highcharts
			config={{
				credits: {
					enabled: false
				},
				chart: {
					type: 'line'
				},
				title: {
					text: null
				},
				xAxis: {
					title: {
						text: $s["xAxis"]["title"]["text"]
					},
					labels: {
						format: $s["xAxis"]["labels"]["format"],
					},
					allowDecimals: false,
				},
				yAxis: {
					max: uplim,
					min: lowlim,
					title: {
						text: $s["yAxis"]["title"]["text"]
					},
					labels: {
						format: $s["yAxis"]["labels"]["format"]
					}
				},
				series: [
					{
					name: $s["series"]["name"][1],
					data: uprate
					},
					{
					name: $s["series"]["name"][0],
					data: lowrate
				}],
				tooltip: {
					headerFormat: '<b>{point.x}日後</b><br>',
					shared: true
				}
			}} />)

	}
}

export default connect(mapStateToProps)(Chart1)

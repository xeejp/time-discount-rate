import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReactHighcharts from 'react-highcharts'
import HighchartsMore from 'highcharts-more'
HighchartsMore(ReactHighcharts.Highcharts)

import { ReadJSON, InsertVariable } from '../shared/ReadJSON'

const multi_text = ReadJSON().static_text
const $s = multi_text["shared"]["Chart2"]

const mapStateToProps = ({ results, basetime, uplim, lowlim }) => ({
    results,
    basetime,
    uplim,
    lowlim
})

class Chart2 extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const { results, basetime, uplim, lowlim } = this.props
        if (!results) return (null)
        if (results.length <= 0) return (<p>{$s["error"]}</p>)
        var rate_data = basetime.map(
            (day, index) => [day, results.map(
                rates => rates[index][1] 
            )]
        )

        let num = results.length
        let half_num = Math.floor(num / 2)
        let index1 = [Math.floor(half_num / 2), Math.floor((half_num - 1) / 2)]
        let index2 = [Math.floor(     num / 2), Math.floor((     num - 1) / 2)]
        let index3 = [num - 1 - index1[1], num - 1 - index1[0]]

        var data = rate_data.sort((a,b) => a[0] - b[0]).map(
            rates => {
                let sorted = rates[1].sort((a, b) => a - b)
                let t0 = sorted[0]
                let t1 = (sorted[index1[0]] + sorted[index1[1]]) / 2
                let t2 = (sorted[index2[0]] + sorted[index2[1]]) / 2
                let t3 = (sorted[index3[0]] + sorted[index3[1]]) / 2
                let t4 = sorted[num - 1]
                return [t0,t1,t2,t3,t4].map(a => Math.round(a*100)/100)
            }
        )

        return (
            <span>
                <p>{InsertVariable($s["anses"],{num: num},null)}</p>
                <ReactHighcharts
                    config = {{
                        chart: {
                            type: 'boxplot'
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: null
                        },
                        legend: {
                            enabled: false
                        },
                        xAxis: {
                            categories: basetime.sort((a, b) => a - b),
                            title: {
                                text: $s["xAxis"]["title"]["text"]
                            },
                            labels: {
                                format: $s["xAxis"]["labels"]["format"],
                            }
                        },
                        yAxis: {
                            title: {
                                text: $s["yAxis"]["title"]["text"]
                            },
                            labels: {
                                format: $s["yAxis"]["labels"]["format"]
                            }
                        },
                        series: [{
                            name: $s["series"]["name"],
                            data: data
                        }]
                    }}
                />
            </span>
        )
}}

export default connect(mapStateToProps)(Chart2)

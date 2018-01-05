import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import ReactHighcharts from 'react-highcharts'
import HighchartsMore from 'highcharts-more'
HighchartsMore(ReactHighcharts.Highcharts)

import { ReadJSON, InsertVariable } from '../shared/ReadJSON'

const multi_text = ReadJSON().static_text
const $s = multi_text["shared"]["Chart2"]

const mapStateToProps = ({ results, basetime, uplim, lowlim }) => {
    if (!results) return {error: true, display: false, config: null,num: 0}
    if (results.length <= 0) return {error: false, display: false, config: null,num: 0}
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

    var data = rate_data.map(
        rates => {
            let sorted = rates[1].sort((a, b) => a - b)
            let t0 = sorted[0]
            let t1 = (sorted[index1[0]] + sorted[index1[1]]) / 2
            let t2 = (sorted[index2[0]] + sorted[index2[1]]) / 2
            let t3 = (sorted[index3[0]] + sorted[index3[1]]) / 2
            let t4 = sorted[num - 1]
            return [rates[0], [t0,t1,t2,t3,t4].map(a => Math.round(a*100)/100)]
        }
    )
    //console.log(data)
    var data1 = data.map(a => a)
    //data1.sort((a, b) => a[0] - b[0])
    //console.log(data1)

    const config = {
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
            categories: basetime,
            title: {
                text: $s["xAxis"]["title"]["text"]
            },
            labels: {
                format: $s["xAxis"]["labels"]["format"],
            }
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
        series: [{
            name: $s["series"]["name"],
            data: data1.map(a => a[1])
        }]
    }

    return {
        display:true,
        error: false,
        num,
        config
    }    
}

const Chart2 = ({ config, error, display, num}) =>  (
    (display)?(
    <span>
        <p>{InsertVariable($s["anses"],{num: num},null)}</p>
        <ReactHighcharts
            config={config}
        />
    </span>) :
    (error)? null:
    (<p>{$s["error"]}</p>)
)

export default connect(mapStateToProps)(throttle(Chart2,200))

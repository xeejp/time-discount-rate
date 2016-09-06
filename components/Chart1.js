import React from 'react'

import Highcharts from 'react-highcharts'

const Chart1 = ({rate}) => {
  return (<Highcharts 
  config = {{
        credits: {
            enabled: false
        },
        title: {
            text: null
        },
        xAxis: {
            categories: ['一ヵ月後','半年後','一年後'],
            title: {
                text: '期間'
            }
        },
        yAxis: {
            title: {
                text: '割引率'
            },
            labels: {
                format: '{value} %',
            }
        },
        series: [{
            name: '割引率',
            data: [
              (rate[0][0]+rate[0][2])/2-100,
              (rate[1][0]+rate[1][2])/2-100,
              (rate[2][0]+rate[2][2])/2-100,
            ]
	      }]
    }} />)
}

export default Chart1

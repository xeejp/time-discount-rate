import React from 'react'

import ReactHighcharts from 'react-highcharts'
import HighchartsMore from 'highcharts-more'
HighchartsMore(ReactHighcharts.Highcharts)

const Chart2 = ({participants}) => {
 var data1 = [],data2 = [],data3 =[],i=0
	for (var key in participants){
	  if(participants[key].state == 2) {
      const rate = participants[key].rate
      data1[i] = (rate[0][0]+rate[0][2])/2-100
      data2[i] = (rate[1][0]+rate[1][2])/2-100
      data3[i] = (rate[2][0]+rate[2][2])/2-100
      i++
	  }
  }
  if(i == 0) return (<p>実験を終えてる人がいません</p>)
  data1.sort(
        function(a,b){
	        if( a < b ) return -1;
            if( a > b ) return 1;
            return 0;
         }
  )
  data2.sort(
        function(a,b){
	        if( a < b ) return -1;
            if( a > b ) return 1;
            return 0;
         }
  )
  data3.sort(
        function(a,b){
	        if( a < b ) return -1;
            if( a > b ) return 1;
            return 0;
         }
  )
var data
const t = (i-1)/4
if(t == Math.round(t)){
    data = [
        [data1[0],data1[t],data1[t*2],data1[t*3],data1[i-1]],
        [data2[0],data2[t],data2[t*2],data2[t*3],data2[i-1]],
        [data3[0],data3[t],data3[t*2],data3[t*3],data3[i-1]]
    ]
}else{
    const t1 = Math.ceil(t)
    const t2 = Math.floor(t)
    const t3 = t1-t
    const t4 = t-t2
    const t5 = Math.ceil(t*3)
    const t6 = Math.floor(t*3)
    const t7 = Math.ceil((i-1)/2)
    const t8 = Math.floor((i-1)/2)
    data = [
        [data1[0],t3*data1[t2]+t4*data1[t1],(data1[t7]+data1[t8])/2,t4*data1[t6]+t3*data1[t5],data1[i-1]],
        [data2[0],t3*data2[t2]+t4*data2[t1],(data2[t7]+data2[t8])/2,t4*data2[t6]+t3*data2[t5],data2[i-1]],
        [data3[0],t3*data3[t2]+t4*data3[t1],(data3[t7]+data3[t8])/2,t4*data3[t6]+t3*data3[t5],data3[i-1]]
    ]
}
console.log(data1)
console.log(data2)
console.log(data3)
console.log(data)
  return (<span><p>回答人数:{i}人</p>
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
            name: "割引率",
            data: data
        }]
      }}
    /></span>
	 )
}

export default Chart2

import React, { Component } from 'react'
import { connect } from 'react-redux'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'
import LinearProgress from 'material-ui/LinearProgress'
import { next } from './actions'

const actionCreators = {
    next
}

const mapStateToProps = ({ money, unit, basetime, rest_interval, rest_time ,distance, ansed, question, slideIndex, rate}) => ({
    money,
    unit,
    basetime,
    rest_interval,
    rest_time,
    distance,
    ansed,
    question,
    slideIndex,
    rate
})

class Question extends Component  {
    constructor(props) {
    super(props)
    this.only = true
  }

  next(value) {
    this.only = true
    this.props.next(value)
  }

  Question_text(index){
	  const { money, unit, basetime, distance, question, rate} = this.props
	  const type = question[index]
      let basemoney = money;
      let nextmoney = money*Math.pow(rate[type][1]/100,distance);
      basemoney = Math.round(basemoney/100)*100
      nextmoney = Math.round(nextmoney/100)*100
      return (
  <span>
   <RaisedButton onClick={this.next.bind(this, {choice: 1 ,type: type, rate: rate} )} style={{float:  'left', width: '40%', height: '300px', position: 'relative', margin: '5%'}}>
    <div style={{position: 'absolute', top: '40%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
        {(() => {
            return (<p>{(basetime[type]==0)?"今日、":(basetime[type]==1)?"明日、":basetime[type] + "日後に"}<br/>{basemoney.toLocaleString() + unit}<br/>を受け取る</p>)                        
        })()}
     </div>
   </RaisedButton>
   <RaisedButton onClick={this.next.bind(this, {choice:2 ,type: type, rate: rate} )} style={{float: 'right', width: '40%', height: '300px', position: 'relative', margin: '5%'}} labelStyle={{position: 'absolute', top: '50%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
     <div style={{position: 'absolute', top: '40%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
        {(() => {
            return (<p>{(basetime[type]==0)?"明日、":(basetime[type] + distance) + "日後に"}<br/>{nextmoney.toLocaleString() + unit}<br/>を受け取る</p>)                        
        })()}
     </div>
   </RaisedButton>
  </span>)
  }

  wait(){
	  const {rate, rest_time, question, rest_interval, slideIndex} = this.props
      if(this.only && slideIndex%(rest_interval+1) == rest_interval && slideIndex != question.length +Math.floor((question.length-1)/rest_interval)){
          setTimeout(this.next.bind(this, {choice:1 ,type: -1, rate: rate}),rest_time * 1000)
          this.only = false
      }
      return(<div style={{margin: "5%"}}>
      <p>しばらくお待ちください</p>
      <br/><br/><br/>
      <LinearProgress mode="indeterminate" />
      </div>
      )
  }

  finish(){
	  const {rate} = this.props
      return(<div style={{margin: "5%"}}>
      <p>これで実験は終了です</p>
      <RaisedButton onClick={this.next.bind(this, {choice:1 ,type: -2, rate: rate})}>結果へ</RaisedButton>
      </div>
      )
  }

  render(){
    const { money, unit, rest_interval, ansed, question, slideIndex} = this.props
    var Questions = question.concat()
    var index
    console.log(question)
    const list_size = question.length
    var questionlist = []
    var t= 0,s = 0
    console.log(this.props)
    while(s < list_size){
        for(var j = 0; j < rest_interval && s < list_size ; j++){
            questionlist[t++] = <div key = {t}>{this.Question_text(s++)}</div>
        }
        questionlist[t++] = <div key = {t}>{this.wait()}</div>
    }
    
    questionlist[t-1] = <div key = {t}>{this.finish()}</div>
    return (
        <div>
        	<p>実験画面</p>
      		<div style={{height: 'auto'}}>
      	  	<h5>どちらが良いか選択してください</h5>
        		<SwipeableViews index={slideIndex} disabled={true}>          		
                  {questionlist}
        		</SwipeableViews>
      		</div>
      	</div>
    )

  }
}

export default connect(mapStateToProps, actionCreators)(Question)
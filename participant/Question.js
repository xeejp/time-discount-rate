import React, { Component } from 'react'
import { connect } from 'react-redux'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'
import LinearProgress from 'material-ui/LinearProgress'
import { next } from './actions'
import { ReadJSON, InsertVariable } from '../shared/ReadJSON'

const multi_text = ReadJSON().static_text
const $s = multi_text["participant"]["Question"]

const actionCreators = {
    next
}

const mapStateToProps = ({ money, unit, basetime, rest_interval, rest_time ,distance, ansed, question, slideIndex, rate, question_text}) => ({
    money,
    unit,
    basetime,
    rest_interval,
    rest_time,
    distance,
    ansed,
    question,
    slideIndex,
    rate,
    question_text
})

class Question extends Component  {
    constructor(props, context) {
    super(props, context)
    this.only = true
  }

  next(value) {
    this.only = true
    this.props.next(value)
  }

  Question_text(index){
	  const { money, unit, basetime, distance, question, rate, question_text} = this.props
	  const type = question[index]
      let basemoney = money;
      let nextmoney = money * Math.pow(rate[type][1] / 100, distance);
      const left_date_text = (basetime[type] == 0) ?
          question_text["date_text"]["today"]
          : (basetime[type] == 1) ?
              question_text["date_text"]["tomorrow"]
              : InsertVariable(question_text["date_text"]["default"], {day: basetime[type]}, null)
      const right_date_text = (basetime[type] == 0) ?
          question_text["date_text"]["tomorrow"]   
          : InsertVariable(question_text["date_text"]["default"], {day: basetime[type] + distance}, null)
      basemoney = Math.round(basemoney/100)*100
      nextmoney = Math.round(nextmoney/100)*100
      return (
  <span>
   <RaisedButton onClick={this.next.bind(this, {choice: 1 ,type: type, rate: rate} )} style={{float:  'left', width: '40%', height: '300px', position: 'relative', margin: '5%'}}>
    <div style={{position: 'absolute', top: '40%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
        {(() => {
                          return (<p>{InsertVariable(question_text["question_text"], {date_text: left_date_text, money: basemoney, unit: unit })}</p>)                        
        })()}
     </div>
   </RaisedButton>
   <RaisedButton onClick={this.next.bind(this, {choice:2 ,type: type, rate: rate} )} style={{float: 'right', width: '40%', height: '300px', position: 'relative', margin: '5%'}} labelStyle={{position: 'absolute', top: '50%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
     <div style={{position: 'absolute', top: '40%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
        {(() => {
            return (<p>{InsertVariable(question_text["question_text"], {date_text: right_date_text, money: nextmoney, unit: unit })}</p>)                        
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
      <p>{$s["wait"]}</p>
      <br/><br/><br/>
      <LinearProgress mode="indeterminate" />
      </div>
      )
  }

  finish(){
	  const {rate} = this.props
      return(<div style={{margin: "5%"}}>
        <p>{$s["finish"]}</p>
        <RaisedButton onClick={this.next.bind(this, { choice: 1, type: -2, rate: rate })}>{$s["finishButton"]}</RaisedButton>
      </div>
      )
  }

  render(){
    const { money, unit, rest_interval, ansed, question, slideIndex, question_text} = this.props
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
        	<p>{$s["title"]}</p>
      		<div style={{height: 'auto'}}>
      	  	<h5>{question_text["select_text"]}</h5>
        		<SwipeableViews index={slideIndex} disabled={true}>          		
                  {questionlist}
        		</SwipeableViews>
      		</div>
      	</div>
    )

  }
}

export default connect(mapStateToProps, actionCreators)(Question)
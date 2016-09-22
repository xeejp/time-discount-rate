import React, { Component } from 'react'
import { connect } from 'react-redux'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'
import LinearProgress from 'material-ui/LinearProgress'
import { next } from './actions'

const mapStateToProps = ({ money,unit,ansed,question,slideIndex,rate}) => ({
  money,unit,ansed,question,slideIndex,rate
})

class Question extends Component  {
    constructor(props) {
    super(props)
    this.only = true
  }

  next(value) {
    this.only = true
    const{ dispatch } = this.props
    dispatch(next(value))
  }

  Question_text(index){
	  const { money,unit,question,rate} = this.props
	  const type = question[index]
  return (
  <span>
   <RaisedButton onClick={this.next.bind(this, {choice: 1 ,type: type, rate: rate} )} style={{float:  'left', width: '40%', height: '300px', position: 'relative', margin: '5%'}}>
    <div style={{position: 'absolute', top: '40%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
        {(() => {
            let str = ""                    
            switch(type){
                case 0:
                    str = "一ヶ月後に"
                    break
                case 1:
                    str = "半年後に"
                    break;
                case 2:
                    str = "一年後に"
                    break;
                default:
                    return <span></span>
            }
            return (<p>{str}<br/>{money.toLocaleString()+unit}<br/>を受け取る</p>)                        
        })()}
     </div>
   </RaisedButton>
   <RaisedButton onClick={this.next.bind(this, {choice:2 ,type: type, rate: rate} )} style={{float: 'right', width: '40%', height: '300px', position: 'relative', margin: '5%'}} labelStyle={{position: 'absolute', top: '50%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
     <div style={{position: 'absolute', top: '40%', left: '50%', width: '100%', margin: '-1.5em 0 0 -50%'}}>
        {(() => {
            let str = ""                   
            switch(type){
                case 0:
                    str = "一ヶ月と一週間後に"
                    break;
                case 1:
                    str = "半年と一週間後に"
                    break;
                case 2:
                    str = "一年と一週間後に"
                    break;
                default:
                    str = ""
                    break;
            }
            return (<p>{str}<br/>{Math.round(money * rate[type][1]/100).toLocaleString() + unit}<br/>を受け取る</p>)                        
        })()}
     </div>
   </RaisedButton>
  </span>)
  }

  wait(){
	  const {rate,slideIndex} = this.props
      if(this.only && (slideIndex == 7 || slideIndex == 15)){
          setTimeout(this.next.bind(this, {choice:1 ,type: 3, rate: rate}),10000)
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
      <RaisedButton onClick={this.next.bind(this, {choice:1 ,type: 4, rate: rate})}>結果へ</RaisedButton>
      </div>
      )
  }

  render(){
    const { money,unit,ansed,question,slideIndex} = this.props
    var Questions = question.concat()
    var index
    console.log(question)
    var questionlist = []
    var t= 0
    for(var i = 0; i < 3; i++){
        for(var j = 0; j < 7 ; j++){
            questionlist[t++] = <div key = {t}>{this.Question_text(7*i+j)}</div>
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

export default connect(mapStateToProps)(Question)
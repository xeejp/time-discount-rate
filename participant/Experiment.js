import React, { Component } from 'react'
import { connect } from 'react-redux'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import {Card, CardText, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'
import Question from './Question'
import { Start } from './actions'
import Result from './Result'

const actionCreators = {
	Start
}

const mapStateToProps = ({ money, unit, ansed, question, state, basetime, q_num, uplim, lowlim}) => ({
	money,
	unit,
	ansed,
	question,
	state,
	basetime,
	q_num,
	uplim,
	lowlim
})

class Experiment extends Component {
  constructor(props) {
    super(props)
  }

	start() {
		const { basetime, q_num, uplim, lowlim} = this.props
    let questions = []
    {
      for(let i = 0; i < basetime.length ; i++){
        for(let j = 0;j < q_num ; j++){
          questions.push(i)
        }
      }
    }
    {	
      let i = questions.length
      while(i){
        let j = Math.floor(Math.random() * i)
        let t = questions[--i]
        questions[i] = questions[j]
        questions[j] = t
      }
    }
    let r = [];
    {
      for(let i = 0; i < basetime.length ; i++){
        const rate = [lowlim,(uplim-lowlim)*Math.random()+lowlim,uplim] //init_rate
        r.push(rate);
      }
    }
    console.log(questions)
		this.props.Start({questions:questions, rate:r})
	}
  
  render() {
    const { money,unit,ansed,question,state} = this.props
		console.log(state)
    switch (state){
		case 0:
			return (
				<Card>
					<CardTitle title="時間割引率" subtitle="ルールの説明" />
					<CardText>
						<p>いくつかの二択の質問に答えてもらいます</p>
						<p>OKを押すと実験が始まります</p> <br/>
						<RaisedButton onClick = {this.start.bind(this)} style ={{textAlign: "center"}} primary={true} >OK</RaisedButton>
					</CardText>
				</Card>
			)
    case 1:
      return (<Card><CardText><Question /></CardText></Card>)
		case 2:
			return (<div> <p>結果画面</p>{<Result />}</div>)
    }
  }
}

export default connect(mapStateToProps, actionCreators)(Experiment)

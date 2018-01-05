import React, { Component } from 'react'
import { connect } from 'react-redux'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import {Card, CardText, CardTitle } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'
import Question from './Question'
import { Start } from './actions'
import Result from './Result'

import { ReadJSON, InsertVariable } from '../shared/ReadJSON'

const multi_text = ReadJSON().static_text
const $s = multi_text["participant"]["Experiment"]

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
		this.props.Start({questions:questions, rate:r})
	}
  
  render() {
    const { money,unit,ansed,question,state} = this.props
    switch (state){
		case 0:
			return (
				<Card>
					<CardTitle title={$s["title"]} subtitle={$s["subtitle"][0]} />
					<CardText>
						{$s["descrption"]}
            <br />
						<RaisedButton onClick = {this.start.bind(this)} style ={{textAlign: "center"}} primary={true} >OK</RaisedButton>
					</CardText>
				</Card>
			)
    case 1:
        return (
          <Card>
				  	<CardTitle title={$s["title"]} subtitle={$s["subtitle"][1]} />
            <CardText>
              <Question />
            </CardText>
          </Card>)
		case 2:
        return (
          <Card>
            <CardTitle title={$s["title"]} subtitle={$s["subtitle"][2]} />
            <CardText>
              <Result />
            </CardText>
          </Card>)
    }
  }
}
  
export default connect(mapStateToProps, actionCreators)(Experiment)

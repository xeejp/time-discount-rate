import React, { Component } from 'react'
import { connect } from 'react-redux'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import SwipeableViews from 'react-swipeable-views'
import { next } from './actions'

const mapStateToProps = ({ money,unit,ansed,question,slideIndex,rate}) => ({
  money,unit,ansed,question,slideIndex,rate
})

class Question extends Component  {
    constructor(props) {
    super(props)
  }

  next(value) {
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
            return (<p>{str+money+unit}を受け取る</p>)                        
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
            return (<p>{str + Math.round(money * rate[type][1]) + unit}を受け取る</p>)                        
        })()}
     </div>
   </RaisedButton>
  </span>)
  }

  wait(){
	  const {rate,slideIndex} = this.props
      if(slideIndex == 7 || slideIndex == 15) setTimeout(this.next.bind(this, {choice:1 ,type: 3, rate: rate}),10000)
      return(<div>
      <p>しばらくお待ちください</p>
      </div>
      )
  }

  finish(){
	  const {rate} = this.props
      return(<div>
      <p>終わり</p>
      <RaisedButton onClick={this.next.bind(this, {choice:1 ,type: 4, rate: rate})}>結果へ</RaisedButton>
      </div>
      )
  }

  render(){
    const { money,unit,ansed,question,slideIndex} = this.props
    var Questions = question.concat()
    var index
    console.log(question)

    return (
        <div>
        	<p>実験画面</p>
      		<div style={{height: 'auto'}}>
      	  	<h5>どちらが良いか選択してください</h5>
        		<SwipeableViews index={slideIndex} disabled={true}>          		
                  <div>{this.Question_text(0)}  	</div>
                  <div>{this.Question_text(1)}    	</div>
                  <div>{this.Question_text(2)} 		</div>
                  <div>{this.Question_text(3)} 		</div>
                  <div>{this.Question_text(4)} 		</div>
                  <div>{this.Question_text(5)} 		</div>
                  <div>{this.Question_text(6)} 		</div>
                  <div>{this.wait()} 				</div>
                  <div>{this.Question_text(7)} 		</div>
                  <div>{this.Question_text(8)} 		</div>
                  <div>{this.Question_text(9)} 		</div>
                  <div>{this.Question_text(10)} 	</div>
                  <div>{this.Question_text(11)} 	</div>
                  <div>{this.Question_text(12)} 	</div>
                  <div>{this.Question_text(13)} 	</div>
                  <div>{this.wait()} 				</div>
                  <div>{this.Question_text(14)} 	</div>
                  <div>{this.Question_text(15)} 	</div>
                  <div>{this.Question_text(16)} 	</div>
                  <div>{this.Question_text(17)} 	</div>
                  <div>{this.Question_text(18)} 	</div>
                  <div>{this.Question_text(19)} 	</div>
                  <div>{this.Question_text(20)}		</div>
                  <div>{this.finish()} 				</div>
        		</SwipeableViews>
      		</div>
      	</div>
    )

  }
}

export default connect(mapStateToProps)(Question)
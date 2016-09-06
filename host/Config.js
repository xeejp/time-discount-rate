import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import SnackBar from 'material-ui/SnackBar'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import { upadateConfig } from './actions'

const mapStateToProps = ({ money, unit, page }) => ({
        money, unit, page
})

class Config extends Component {
  constructor(props) {
		super(props)
        const {money , unit} = this.props
        this.state = {
			value1: money+'',
            value2: unit,
			isValid1: true,
            isValid2: true,
			snack: false
        }
	}

    closeSnack() {
    		this.setState({
      			snack: false
    		})
  	}

    handleChange1(event){
        const value1 = event.target.value
		const numValue = parseInt(value1,10)
	    const isValid1 = (!isNaN(value1) && (value1.indexOf('.') == -1) && 100 <= numValue)
		this.setState({
		      	value1,
		      	isValid1
		})
    }

    handleChange2(event){
        const value2 = event.target.value
	    const isValid2 = value2.length > 0
		this.setState({
		      	value2,
		      	isValid2
		})
    }


  handleClick() {
		const { dispatch } = this.props
		const { value1,value2 } = this.state
		this.setState({
      		snack: true
		})
		dispatch(upadateConfig({money:parseInt(value1,10),unit:value2}))
	}

  render() {
    const { snack, isValid1, isValid2} = this.state
    const {money, unit, page} = this.props
    console.log("AAAAAAAAAAAAA")
    return (<Card>
          <CardHeader
            title={"オプション"}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
                <p>現在の元金:{money} 現在の単位: {unit}</p>
                <TextField
                    floatingLabelText="元金(100以上の整数)"
                    value={this.state.value1}
                    onChange={this.handleChange1.bind(this)}
                    disabled={page != 'waiting'}
                />
                <br/>
                <TextField
                    floatingLabelText= "単位"
                    value={this.state.value2}
                    onChange={this.handleChange2.bind(this)}
                    disabled={page != 'waiting'}
                />
                <br/>
                <RaisedButton
			        primary={true}
			        label= {"適用"}
			        disabled={!isValid1 || !isValid2 || page != 'waiting'}
			        onClick = {this.handleClick.bind(this)}
                    style = {{
             		    float:"right"
           		    }}
			    />
                <br/>
                <SnackBar
          		   open={snack}
          		   message={"適用しました。"}
          		   autoHideDuration={3000}
          	 	   onRequestClose={this.closeSnack.bind(this)}
        		/>
          </CardText>
    </Card>)
  }
}

export default connect(mapStateToProps)(Config)

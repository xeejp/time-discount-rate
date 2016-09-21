import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import SnackBar from 'material-ui/SnackBar'
import Dialog from 'material-ui/Dialog'
import { upadateConfig, fetchContents } from './actions'

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
            open: false,
			snack: false,
            message: "設定を送信しました。"
        }
	}

    handleOpen() {
        const { dispatch } = this.props
        dispatch(fetchContents())
        this.setState({
           value1: this.props.money+'',
           value2: this.props.unit,
           isValid1: true,
           isValid2: true,
           open: true,
        })
    }

    handleClose() {
        this.setState({ open: false })
    }

    reset() {
        this.setState({
            open: false,
            snack: true,
            message: "設定を初期化しました。"
        })
        const { dispatch } = this.props
        dispatch(upadateConfig({money: 7500, unit: '円'}))
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
      		snack: true,
            open: false,
            message: "設定を送信しました。"
		})
		dispatch(upadateConfig({money:parseInt(value1,10),unit:value2}))
	}

  render() {
    const { snack, isValid1, isValid2, message} = this.state
    const {money, unit, page} = this.props
    const actions = [
        <RaisedButton
          primary={true}
          label= {"適用"}
          disabled={!isValid1 || !isValid2 || page != 'waiting'}
          onTouchTap={this.handleClick.bind(this)}
        />,
        <RaisedButton
          label={"キャンセル"}
          onTouchTap={this.handleClose.bind(this)}
        />,
        <RaisedButton
          label={"初期化"}
          onTouchTap={this.reset.bind(this)}
        />
    ]
    console.log("AAAAAAAAAAAAA")
    return (
        <span>
        <FloatingActionButton
            onClick={this.handleOpen.bind(this)}
            disabled={page != "waiting"}
        >
            <ActionSettings />
        </FloatingActionButton>
        <Dialog
            title={"オプション"}
            actions={actions}
            model={false}
            open={this.state.open}
            autoScrollBodyContent={true}
        >
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
        </Dialog>
        <SnackBar
           open={snack}
          message={message}
          autoHideDuration={3000}
          onRequestClose={this.closeSnack.bind(this)}
        />
     </span>
    )
  }
}

export default connect(mapStateToProps)(Config)
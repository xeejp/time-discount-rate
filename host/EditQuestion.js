import React, { Component } from 'react'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ImageEdit from 'material-ui/svg-icons/image/edit'
import SnackBar from 'material-ui/SnackBar'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { updateQuestion } from './actions'

import { ReadJSON, InsertVariable } from '../shared/ReadJSON'

const multi_text = ReadJSON().static_text
const $s = multi_text["host"]["EditQuestion"]

const actionCreators = {
  updateQuestion
}

const mapStateToProps = ({page, question_text}) => ({
  page,
  question_text
})

class EditQuestion extends Component {
  constructor(props, context) {
    super(props, context)
    const { question_text } = this.props
    var default_text = question_text
    if (!default_text) {
        const text = ReadJSON().dynamic_text
        default_text = text["Question"]
        this.props.updateQuestion(default_text)
    }
    
    this.state = {
      question_texts: default_text,
      message: "",
      open: false,
      snack: false
    }
  }

  handleOpen() {
    this.setState({
      open: true
    })
  }

  handleClose() {
    this.setState({
      open: false
    })
  }

  reset() {
    const text = ReadJSON().dynamic_text
    var default_text = text["Config"]["Question"]
    this.setState({
      open: false,
      snack: true,
      message: $s["reset_message"]
    })
    this.props.updateQuestion(default_text)
  }

  handleClick() {
    const { date_text, question_text, select_text } = this.state
    this.setState({
      open: false,
      snack: true,
      message: $s["message"]
    })

    this.props.updateQuestion(this.state.question_texts)

  }

  handleChangeQuestionText(event, value) {
    var { question_texts } = this.state
    question_texts.question_text = value
    this.setState({
      question_texts: question_texts
    })
  }
  handleChangeSelectText(event, value) {
    var { question_texts } = this.state
    question_texts.select_text = value
    this.setState({
      question_texts: question_texts
    })
  }
  handleChangeToday(event, value) {
    var { question_texts } = this.state
    question_texts.date_text.today = value
    this.setState({
      question_texts: question_texts
    })
  }
  handleChangeTomorrow(event, value) {
    var { question_texts } = this.state
    question_texts.date_text.tomorrow = value
    this.setState({
      question_texts: question_texts
    })
  }
  handleChangeDefault(event, value) {
    var { question_texts } = this.state
    question_texts.date_text.default = value
    this.setState({
      question_texts: question_texts
    })
  }

  render(){
    const { page } = this.props
    console.log(this.state.question_texts)
    const actions = [
			<RaisedButton
			primary={true}
			label= {$s["button"][0]}
			onTouchTap={this.handleClick.bind(this)}
			/>,
			<RaisedButton
			label={$s["button"][1]}
			onTouchTap={this.handleClose.bind(this)}
			/>,
			<RaisedButton
			label={$s["button"][2]}
			onTouchTap={this.reset.bind(this)}
			/>
		]
    return (<span>
      <FloatingActionButton
        onClick={this.handleOpen.bind(this)}
        disabled={page != "waiting"}
        style={{marginLeft: '2%'}}
      >
         <ImageEdit />
      </FloatingActionButton>
      <Dialog
        title={$s["dialog"]}
        actions={actions}
        model={false}
        open={this.state.open}
        autoScrollBodyContent={true}
      >
        <div>
          <table>
            <tbody>
              <tr><td>
                <TextField
                  floatingLabelText={$s["labels"][0]}
                  defaultValue={this.state.question_texts.question_text}
                  onChange={this.handleChangeQuestionText.bind(this)}
                  multiLine={true}
                  fullWidth={true}
                />
              </td></tr>

              <tr><td>
                <TextField
                  floatingLabelText={$s["labels"][1]}
                  defaultValue={this.state.question_texts.select_text}
                  onChange={this.handleChangeSelectText.bind(this)}
                  multiLine={true}
                  fullWidth={true}
                />
              </td></tr>

              <tr><td>
                <TextField
                  floatingLabelText={$s["labels"][2]}
                  defaultValue={this.state.question_texts.date_text.today}
                  onChange={this.handleChangeToday.bind(this)}
                  multiLine={true}
                  fullWidth={true}
                />
              </td></tr>

              <tr><td>
                <TextField
                  floatingLabelText={$s["labels"][3]}
                  defaultValue={this.state.question_texts.date_text.tomorrow}
                  onChange={this.handleChangeTomorrow.bind(this)}
                  multiLine={true}
                  fullWidth={true}
                />
              </td></tr>

              <tr><td>
                <TextField
                  floatingLabelText={$s["labels"][4]}
                  defaultValue={this.state.question_texts.date_text.default}
                  onChange={this.handleChangeDefault.bind(this)}
                  multiLine={true}
                  fullWidth={true}
                />
              </td></tr>
            </tbody>
          </table>
        </div>
      </Dialog>
    </span>)
  }
}

export default connect(mapStateToProps, actionCreators)(EditQuestion)

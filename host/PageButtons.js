import React, { Component } from 'react'
import { connect } from 'react-redux'

import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Step, Stepper, StepButton } from 'material-ui/Stepper'

import { changePage } from './actions'
import { ReadJSON, InsertVariable } from '../shared/ReadJSON'
import { getPage } from '../shared/getPage'

const multi_text = ReadJSON().static_text
const $s = multi_text["host"]["PageButtons"]

const pages = ["waiting", "experiment", "result"]

const actionCreators = {
  changePage,
}

const mapStateToProps = ({ page }) => ({
  page
})

class PageButtons extends Component {
  changePage(page) {
    this.props.changePage(page)
  }

  nextPage() {
    const { page } = this.props
    switch (page) {
      case "waiting":
        this.changePage("experiment")
        break
      case "experiment":
        this.changePage("result")
        break
      case "result":
        this.changePage("waiting")
        break
    }
  }

  backPage() {
    const { page } = this.props
    switch (page) {
      case "waiting":
        this.changePage("result")
        break
      case "experiment":
        this.changePage("waiting")
        break
      case "result":
        this.changePage("experiment")
        break
    }
  }

  render() {
    const { page } = this.props
    const buttons = []
    for (let i = 0; i < pages.length; i ++) {
      buttons[i] = (
        <Step key={i}>
          <StepButton onClick={this.changePage.bind(this, pages[i])}>
            {getPage(pages[i])}
          </StepButton>
        </Step>
      )
    }
    return (
      <span>
        <Stepper activeStep={pages.indexOf(page)} linear={false}>
          {buttons}
        </Stepper>
        <FlatButton
          label={$s["back"]}  
          onClick={this.backPage.bind(this)}
          disabled={page == "waiting"}
          style={{ marginLeft: '3%' }}>
        </FlatButton>
        <RaisedButton
          label={$s["next"]}  
          onClick={this.nextPage.bind(this)}
          primary={true}
          style={{ marginLeft: '3%' }}>
        </RaisedButton>
      </span>
    )
  }
}

export default connect(mapStateToProps, actionCreators)(PageButtons)

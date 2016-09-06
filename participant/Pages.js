import React, { Component } from 'react'
import { connect } from 'react-redux'

import Waiting from './Waiting'
import Experiment from './Experiment'
import Result from './Result'

const mapStateToProps = ({ page }) => ({
  page
})

const Pages = ({ page }) => (() => {
  switch (page) {
    case "waiting":
      return <Waiting />
    case "experiment":
      return <Experiment />
    case "result":
      return <div> <p>結果画面</p>{<Result />}</div>
    default:
      return <span></span>
  }
})()

export default connect(mapStateToProps)(Pages)

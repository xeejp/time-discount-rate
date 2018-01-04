import React, { Component } from 'react'
import { connect } from 'react-redux'

import Waiting from './Waiting'
import Experiment from './Experiment'
import Result from './Result'

import { ReadJSON, InsertVariable } from '../shared/ReadJSON'

const multi_text = ReadJSON().static_text
const $s = multi_text["participant"]["Pages"]

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
      return <div> <p>{$s["result"]}</p>{<Result />}</div>
    default:
      return <span></span>
  }
})()

export default connect(mapStateToProps)(Pages)

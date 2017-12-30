import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'

const mapStateToProps = ({results, rate, uplim, lowlim, state, basetime}) => ({
  results,
  rate,
  uplim,
  lowlim,
  state,
  basetime
})

const Result = ({ results, rate, uplim, lowlim, state, basetime}) => (
  <div>
  </div>
)

export default connect(mapStateToProps)(throttle(Result, 200))

import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import Chart1 from '../components/Chart1'
import Chart2 from '../components/Chart2'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import { ReadJSON, InsertVariable } from '../shared/ReadJSON'

const multi_text = ReadJSON().static_text
const $s = multi_text["participant"]["Result"]

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
    <Card>
          <CardHeader
            title={$s["title"][0]}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <Chart1 />
          </CardText>
    </Card>
    <br />
    <Card>
          <CardHeader
            title={$s["title"][1]}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <Chart2 />
          </CardText>
        </Card>
  </div>
)

export default connect(mapStateToProps)(throttle(Result, 200))

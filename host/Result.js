import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import Chart2 from '../components/Chart2'

import { Card, CardHeader, CardText } from 'material-ui/Card'
import { ReadJSON, InsertVariable } from '../shared/ReadJSON'

const multi_text = ReadJSON().static_text
const $s = multi_text["host"]["Result"]

const mapStateToProps = ({results,basetime,uplim,lowlim}) => ({
  results,
  basetime,
  uplim,
  lowlim
})

class Result extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    const { results, basetime, uplim, lowlim } = this.props
    return (
      <div>
        <Card>
          <CardHeader
            title={$s["title"]}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <Chart2 />
          </CardText>
        </Card>
      </div>
    )
  }
}

export default connect(mapStateToProps)(throttle(Result, 200))

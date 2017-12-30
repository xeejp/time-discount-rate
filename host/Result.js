import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import { Card, CardHeader, CardText } from 'material-ui/Card'

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
            title={"実験結果"}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
           
          </CardText>
        </Card>
      </div>
    )
  }
}

export default connect(mapStateToProps)(throttle(Result, 200))

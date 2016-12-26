import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import Chart2 from 'components/Chart2'
import { Card, CardHeader, CardText } from 'material-ui/Card'

const mapStateToProps = ({results,basetime,uplim,lowlim}) => ({
  results,basetime,uplim,lowlim
})

const Result = ({ results,basetime,uplim,lowlim }) => (
  <div>
    <Card>
      <CardHeader
        title={"実験結果"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <Chart2
          participants = {results.participants}
           uplim = {uplim}
           lowlim = {lowlim}
           basetime = {basetime}
        />
      </CardText>
    </Card>
  </div>
)

export default connect(mapStateToProps)(throttle(Result, 200))

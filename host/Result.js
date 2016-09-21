import React, { Component } from 'react'
import { connect } from 'react-redux'

import Chart2 from 'components/Chart2'
import { Card, CardHeader, CardText } from 'material-ui/Card'

const mapStateToProps = ({results}) => ({
  results
})

const Result = ({ results }) => (
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
        />
      </CardText>
    </Card>
  </div>
)

export default connect(mapStateToProps)(Result)
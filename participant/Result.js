import React, { Component } from 'react'
import { connect } from 'react-redux'
import throttle from 'react-throttle-render'

import Chart1 from 'components/Chart1'
import Chart2 from 'components/Chart2'
import { Card, CardHeader, CardText } from 'material-ui/Card'

const mapStateToProps = ({results,rate,state}) => ({
  results,rate,state
})

const Result = ({ results,rate,state}) => (
  <div>
    <Card>
      <CardHeader
        title={"実験結果(個人)"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        {(state == 2)?
         <Chart1
           rate = {rate}
         />
        : <p> 実験を終えられなかったので個人用の結果は表示できません</p>
        }
      </CardText>
    </Card>
    <br/>

    <Card>
      <CardHeader
        title={"実験結果(全体)"}
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

export default connect(mapStateToProps)(throttle(Result, 50))

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, CardHeader, CardText } from 'material-ui/Card'

const User = ({ id, status }) => (
  <tr><td>{id}</td><td>{status}</td></tr>
)

const mapStateToProps = ({ participants, page }) => ({ participants, page })

const UsersList = ({participants, page }) => (
  <table>
    <thead><tr><th>id</th><th>status</th></tr></thead>
    <tbody>
      {
        Object.keys(participants).map(id => (
          <User
            key={id}
            id={id}
            status={"aaa"}
          />
        ))
      }
    </tbody>
  </table>
)

const Users = ({ participants, page }) => (
  <div>
    <Card>
      <CardHeader
        title={"Users (" + Object.keys(participants).length + "人)"}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <UsersList
          participants={participants}
          page={page}
        />
      </CardText>
    </Card>
  </div>
)

export default connect(mapStateToProps)(Users)

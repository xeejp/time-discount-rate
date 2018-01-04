import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import throttle from 'react-throttle-render'

import { openParticipantPage } from './actions'
import { Card, CardHeader, CardText } from 'material-ui/Card'

import { ReadJSON, InsertVariable } from '../shared/ReadJSON'

const multi_text = ReadJSON().static_text
const $s = multi_text["host"]["Users"]

const User = ({ id, status }) => (
  <tr><td>{id}</td><td>{status}</td></tr>
)

const mapStateToProps = ({ participants, page }) => ({
  participants,
  page
})

const UsersList = ({participants, page }) => (
  <table>
    <thead><tr><th>id</th><th>status</th></tr></thead>
    <tbody>
      {
        Object.keys(participants).map(id => (
          <User
            key={id}
            id={id}
            status={
              (participants[id].state == 0)
              ?$s["status"][0]
              :(participants[id].state == 1)
              ?$s["status"][1]
              :(participants[id].state == 2)
              ?$s["status"][2]
              :"-"
            }
          />
        ))
      }
    </tbody>
  </table>
)

const mapDispatchToProps = (dispatch) => {
  const open = bindActionCreators(openParticipantPage, dispatch)
  return {
    openParticipantPage: (id) => () => open(id)
  }
}

class Users extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    const { participants, page } = this.props    
    return (
      <div>
        <Card>
          <CardHeader
            title={InsertVariable($s["title"], {participants: ((participants)? Object.keys(participants).length : "0")}, null)}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(throttle(Users, 200))

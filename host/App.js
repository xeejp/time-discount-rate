import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import Divider from 'material-ui/Divider'
import PageButtons from './PageButtons'
import Users from './Users'
import Result from './Result'
import Config from './Config'
import DownloadButton from './DownloadButton'

const mapStateToProps = ({loading, participants, page}) => ({
  loading, participants, page
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchContents())
  }

  render() {
    const { loading, participants, page } = this.props
    if (loading) {
      return <p>ロード中です。</p>
    } else {
      return (
        <div>
          <PageButtons />
          <Divider
              style={{
                marginTop: '5%',
                marginBottom: '5%'
             }}
          />
          <Users /><br/>
          <Result /><br/>
          <Config />
          <DownloadButton
            fileName={"time_discount_rate.csv"}
            list={[
              ["時間割引率"],
              ["実験日", new Date()],
              ["登録者数", Object.keys(participants).length],
              ["ID", '一ヵ月後','半年後','一年後'],
            ].concat(
              Object.keys(participants).map(id => [id, (participants[id].rate[0][0] + participants[id].rate[0][2]) / 2 - 100, (participants[id].rate[1][0] + participants[id].rate[1][2]) / 2 - 100, (participants[id].rate[2][0] + participants[id].rate[2][2]) / 2 - 100])
            )}
            style={{marginLeft: '2%'}}
            disabled={page != "result"}
          />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import Divider from 'material-ui/Divider'
import PageButtons from './PageButtons'
import Users from './Users'
import Result from './Result'
import Config from './Config'

const mapStateToProps = ({loading, page}) => ({
  loading, page
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
    const { loading, page } = this.props
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
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)
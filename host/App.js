import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from './actions'

import PageButtons from './PageButtons'
import Information from './Information'
import Users from './Users'

import Chart from 'components/Chart'

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
          <Information />
          <Users />
        </div>
      )
    }
  }
}

export default connect(mapStateToProps)(App)
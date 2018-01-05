import React, { Component } from 'react'
import { connect } from 'react-redux'


import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

import { fetchContents } from '../shared/actions'

import Pages from './Pages'

const actionCreators = {
  fetchContents
}

const mapStateToProps = ({ loading }) => ({
  loading
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchContents()
  }

  render() {
    const { loading, active } = this.props
    
      return (
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>        
        <div>
          <Pages />
        </div>
        </MuiThemeProvider>
      )
    }
}

export default connect(mapStateToProps, actionCreators)(App)

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchContents } from '../shared/actions'

import Divider from 'material-ui/Divider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

import PageButtons from './PageButtons'
import Users from './Users'
import DownloadButton from './DownloadButton'
import Result from './Result'
import Config from './Config'
import EditQuestion from './EditQuestion'

const actionCreators = {
  fetchContents
}

const mapStateToProps = ({loading, participants, page}) => ({
  loading, participants, page
})

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchContents();
  }

  render() {
    const { participants, page } = this.props
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>     
        <div>
          <PageButtons />
          <Divider
              style={{
                marginTop: '5%',
                marginBottom: '5%',
              }}
          />
          <Users /><br />
          <Result /><br/>          
          <Config />
          <EditQuestion 
            style={{marginLeft: "2%"}}
            disabled={page != "waiting"}
          />
          <DownloadButton />
          
        </div>
      </MuiThemeProvider>
    )  }
}

export default connect(mapStateToProps, actionCreators)(App)

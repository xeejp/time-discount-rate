import React, { Component } from 'react'
import { connect } from 'react-redux'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import FileFileDownload from 'material-ui/svg-icons/file/file-download'

import { ReadJSON, InsertVariable } from '../shared/ReadJSON'

const multi_text = ReadJSON().static_text
const $s = multi_text["host"]["DownloadButton"]

const mapStateToProps = ({ participants, basetime, q_num, distance, uplim, lowlim, money, page }) => ({
  participants,
  basetime,
  q_num,
  distance,
  uplim,
  lowlim,
  money,
  page
})

class DownloadButton extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  handleDownload() {
    const { participants, basetime, q_num, distance, uplim, lowlim, money } = this.props
    const fileName = "time_discount_rate.csv"
    const participantData = Object.keys(participants).reduce((acc, key) => {
      let participant = participants[key]
      acc.push(
        [key,$s["uplim"]].concat(participant.rate.map(a => a[2]))
      )
      acc.push(
        ["",$s["lowlim"]].concat(participant.rate.map(a => a[0]))
      )
      return acc
    },[])
    
    const list=[
      [$s["text"][0]],
      [$s["text"][1], new Date()],
      [$s["text"][2], Object.keys(participants).length],
      [$s["text"][3]].concat(basetime),
      [$s["text"][4], q_num],
      [$s["text"][5], distance],
      [$s["text"][6], uplim],
      [$s["text"][7], lowlim],
      [$s["text"][8], money],
      [],
      ["",""].concat(basetime)
    ].concat(participantData)
    
    var content = list.map(line => line.join(',')).join("\n")
    
    var blob = new Blob([content], {type: 'text/csv'});
    var url = window.URL || window.webkitURL;
    var blobURL = url.createObjectURL(blob);

    if(window.navigator.msSaveBlob){
      window.navigator.msSaveBlob(blob, fileName)
    }
    else{
      var a = document.createElement('a');
      a.download = fileName;
      a.href = blobURL;
      a.click();  
    }
  }

  render() {
    const { page } = this.props
    const style = { marginLeft: '2%' }
    const disabled = (page != "result")
    return (
      <FloatingActionButton
        style={style}
        disabled={disabled}
        onClick={this.handleDownload.bind(this)}
      >
        <FileFileDownload />
      </FloatingActionButton>
    )
  }
}
  
export default connect(mapStateToProps)(DownloadButton) 
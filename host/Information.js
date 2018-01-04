import React from 'react'
import { connect } from 'react-redux'

import { ReadJSON, InsertVariable } from '../shared/ReadJSON'

const multi_text = ReadJSON().static_text
const $s = multi_text["host"]["Information"]

const mapStateToProps = ({ page }) => ({
  page
})

const Information = ({ page }) =>
<div>
  { (page == "waiting")?
    <p>{$s["text"][0]}</p>
    : (page == "experiment")?
    <p>{$s["text"][1]}</p>
    : (page == "result")?
    <p>{$s["text"][2]}</p>
    : <span></span>
  }
</div>

export default connect(mapStateToProps)(Information)
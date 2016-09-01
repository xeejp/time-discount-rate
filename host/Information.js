import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ page }) => ({
  page
})

const Information = ({ page }) =>
<div>
  { (page == "waiting")?
    <p>待機画面です。</p>
    : (page == "experiment")?
    <p>実験画面です。全員が回答すると自動的に結果に遷移します。</p>
    : (page == "result")?
    <p>結果画面です。</p>
    : <span></span>
  }
</div>

export default connect(mapStateToProps)(Information)
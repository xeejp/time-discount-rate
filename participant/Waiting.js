import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

const mapStateToProps = ({ actives }) => ({
  actives 
})

const Waiting = ({ actives }) => (
	<Card>
		<CardTitle title="時間割引率" subtitle="待機画面" />
		<CardText>
			<p>参加者の登録を待っています。</p>
            <p>現在{actives}人が参加してます。</p>
			<p>この画面のまましばらくお待ち下さい。</p>
		</CardText>
		<div style={{textAlign: "center"}}>
			<CircularProgress size={2}/>
		</div>
	</Card>
)

export default connect(mapStateToProps)(Waiting)

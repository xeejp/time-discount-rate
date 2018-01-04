import React, { Component } from 'react'
import { connect } from 'react-redux'

import {Card, CardText, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import { ReadJSON, InsertVariable } from '../shared/ReadJSON'

const multi_text = ReadJSON().static_text
const $s = multi_text["participant"]["Waiting"]

const mapStateToProps = ({ participantsNumber }) => ({
	participantsNumber
})

const Waiting = ({ participantsNumber }) => (
	<Card>
		<CardTitle title={$s["title"]} subtitle={$s["subtitle"]} />
		<CardText>
			{$s["text"].map((text, index) => <p key={index}>{InsertVariable(text, {participantsNumber: participantsNumber}, null)}</p>)}
		</CardText>
		<div style={{textAlign: "center"}}>
			<CircularProgress size={2}/>
		</div>
	</Card>
)

export default connect(mapStateToProps)(Waiting)

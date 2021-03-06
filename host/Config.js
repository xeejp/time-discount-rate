import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import ImageDelete from 'material-ui/svg-icons/action/delete'
import ImageAdd from 'material-ui/svg-icons/content/add'
import SwipeableViews from 'react-swipeable-views'
import {Tabs, Tab} from 'material-ui/Tabs'
import SnackBar from 'material-ui/SnackBar'
import Dialog from 'material-ui/Dialog'

import { updateConfig, updateUnit, visit } from './actions'
import { ReadJSON, InsertVariable } from '../shared/ReadJSON'

const multi_text = ReadJSON().static_text
const $s = multi_text["host"]["Config"]

const actionCreators = {
	updateConfig,
	updateUnit,
    visit
}

const mapStateToProps = ({ money, unit, basetime, distance, q_num, rest_interval, rest_time, uplim, lowlim, page, isFirstVisit }) => ({
	money,
	unit,
	basetime,
	distance,
	q_num,
	rest_interval,
	rest_time,
	uplim,
	lowlim,
	page,
	isFirstVisit
})

class Config extends Component {
	constructor(props, context) {
		super(props, context)
		const { unit } = this.props
		var default_unit = unit
		if (!default_unit) {
			const text = ReadJSON().dynamic_text
			default_unit = text["Config"]["Unit"]
			this.props.updateUnit(default_unit)
		}
		this.state = {
			Basetime: [0,7,14,10],
			Q_num: 3,
			Rest_interval: 4,
			Rest_time: 3,
			Distance: 1,
			Uplim: 150,
			Lowlim: 80,
			Money: 7500,
			Unit: default_unit,

			BasetimeValid: true,
			Q_numValid: true,
			Rest_intervalValid: true,
			Rest_timeValid: true,
			DistanceValid: true,
			limValid: true,
			MoneyValid: true,
			UnitValid: true,
			open: false,
			snack: false,
			slideIndex: 0,
			message: $s["message"]
		}
	}

	componentWillReceiveProps(nextProps) {
		const {money, unit, basetime, distance, q_num, rest_interval, uplim, lowlim, rest_time, isFirstVisit, visit} = nextProps
        const open = isFirstVisit || this.state.open
        if (isFirstVisit) {
            visit()
        }
        this.setState({
            Basetime: basetime,
			Q_num: q_num,
			Rest_interval: rest_interval,
			Rest_time: rest_time,
			Distance: distance,
			Uplim: uplim-100,
			Lowlim: lowlim-100,
			Money: money,
			Unit: unit,
			open: open			
        })
    }

	handleOpen() {
		this.setState({
			slideIndex: 0,
		 	open: true,
		})
	}

	handleClose() {
		this.setState({ open: false })
	}

	reset() {
		const text = ReadJSON().dynamic_text
		const default_unit = text["Config"]["Unit"]

		const options = {
			basetime: [0,7,10,14],
			q_num: 3,
			rest_interval: 4,
			rest_time: 3,
			distance: 1,
			uplim: 150,
			lowlim: 80,
			money: 7500,
			unit: default_unit
		}
		this.setState({
			open: false,
			snack: true,
			message: $s["reset_message"]
		})
		this.props.updateConfig(options)
	}

	closeSnack() {
			this.setState({
				snack: false
			})
	}

	isNum(str){
		return !isNaN(str) && (str.indexOf('.') == -1);
	}

	handleSlideIndex(value) {
		this.setState({
			slideIndex: value,
		})
	}

	handleChangeBasetime(index,event){
		const str = event.target.value
		var { Basetime } = this.state
		var Valid = true;
		Basetime[index] = str
		Basetime.map(function(value){
			var num = parseInt(value)
			Valid = Valid && num >=0 && !isNaN(value)
		})
		this.setState({
			Basetime,
			BasetimeValid: Valid
		})
	}

	handleChangeDis(event){
		const str = event.target.value
		const value = parseInt(str,10)
		const Valid = this.isNum(str) && 1 <= value
		this.setState({
			Distance: str,
			DistanceValid: Valid
		})
	}

	handleChangeMoney(event){
		const str = event.target.value
		const value = parseInt(str,10)
		const Valid = this.isNum(str) && 100 <= value
		this.setState({
		Money: str,
		MoneyValid: Valid
		})
	}

	handleChangeLow(event){
		const str = event.target.value
		const value = parseFloat(str)
		const { Uplim } = this.state
		const Valid = !isNaN(str) && -100 <= value && value < Uplim
		this.setState({
			Lowlim: str,
			limValid: Valid
		})
	}

	handleChangeUp(event){
		const str = event.target.value
		const value = parseFloat(str)
		const { Lowlim } = this.state
		const Valid = !isNaN(str) && -99 <= value && value > Lowlim
		this.setState({
			Uplim: str,
			limValid: Valid
		})
	}

	handleChangeQnum(event){
		const str = event.target.value
		const value = parseInt(str,10)
		const Valid = this.isNum(str) && 1 <= value
		this.setState({
			Q_num: str,
			Q_numValid: Valid
		})
	}

	handleChangeRestI(event){
		const str = event.target.value
		const value = parseInt(str,10)
		const Valid = this.isNum(str) && 1 <= value
		this.setState({
			Rest_interval: str,
			Rest_intervalValid: Valid
		})
	}

	handleChangeRestT(event){
		const str = event.target.value
		const value = parseFloat(str)
		const Valid = !isNaN(str) && 0 <= value
		this.setState({
			Rest_time: str,
			Rest_timeValid: Valid
		})
	}

	handleChangeUnit(event){
		const str = event.target.value
		const Valid = str.length > 0
		this.setState({
			Unit: str,
			UnitValid: Valid
		})
	}

	handleClick() {
		var { Basetime, Distance, Money, Lowlim, Uplim, Q_num, Rest_interval, Rest_time, Unit} = this.state
		Basetime = Basetime.map((value)=>(parseInt(value, 10))).sort((a,b) => a-b)
		Distance = parseInt(Distance, 10)
		Money = parseInt(Money, 10)
		Lowlim = parseFloat(Lowlim)+100
		Uplim = parseFloat(Uplim)+100
		Q_num = parseInt(Q_num, 10)
		Rest_interval = parseInt(Rest_interval, 10)
		Rest_time = parseFloat(Rest_time);
		this.setState({
			snack: true,
			open: false,
			message: $s["message"]
		})
		let config = {
			basetime: Basetime,
			distance: Distance,
			money: Money,
			lowlim: Lowlim + '',
			uplim: Uplim + '',
			q_num: Q_num,
			rest_interval: Rest_interval,
			rest_time: Rest_time + '',
			unit: Unit
		}
		Object.keys(config).forEach(
			key => {
			  if(config[key] === null || config[key] === undefined || config[key] === "" || (Number.isNaN(config[key]) && key!="Unit")) config[key] = this.props[key]
			}
		)
		this.props.updateConfig(config)		
		
	}

	deleteTime(index,event){
		var { Basetime } = this.state
		Basetime.splice(index,1)
		this.setState({
		Basetime
		})
	}

	addTime(event){
		var { Basetime } = this.state
		Basetime.push(0)
		this.setState({
		Basetime
		})
	}

	Basetimes(){
		const { Basetime } = this.state
		
		return (
		<table>
		<tbody>
				{Basetime.map((value, index)=>
					<tr key={index}><td>
						<FloatingActionButton
							mini={true}
							secondary={true}
							onTouchTap={this.deleteTime.bind(this, index)}
							disabled={this.state.Basetime.length <= 1}
						>
							<ImageDelete />
						</FloatingActionButton>
					</td>
					<td>
						<TextField
								floatingLabelText={$s["baseTime"]["label"]}
								defaultValue={value}
								onChange={this.handleChangeBasetime.bind(this, index)}
						/>{$s["baseTime"]["unit"]}
					</td></tr>
				)}
			<tr><td>
				<FloatingActionButton 
					mini={true}
					onTouchTap={this.addTime.bind(this)}
				>
					<ImageAdd />
				</FloatingActionButton>
			</td></tr>
		</tbody>
		</table>
		)
	}

	Options(){
		return(
		<div>
		<table>
				<tbody>
				<tr><td>
					<TextField
						floatingLabelText={$s["distance"]["label"]}
						defaultValue={this.state.Distance}
						onChange={this.handleChangeDis.bind(this)}
					/>
					{$s["distance"]["unit"]}
				</td></tr>
				<tr><td>
					<TextField
						floatingLabelText= {InsertVariable($s["money"]["label"],{moneyMin: 100},null)}
						defaultValue={this.state.Money}
						onChange={this.handleChangeMoney.bind(this)}
					/>
					{this.state.Unit}
				</td></tr>
				<tr><td>
					<TextField
						floatingLabelText={$s["lim"]["lowLabel"]}
						defaultValue={this.state.Lowlim}
						onChange={this.handleChangeLow.bind(this)}
					/>%
					{$s["lim"]["tilde"]} 
					<TextField
						floatingLabelText={$s["lim"]["upLabel"]}
						defaultValue={this.state.Uplim}
						onChange={this.handleChangeUp.bind(this)}
					/>%
				</td></tr>
				<tr><td>
					<TextField
						floatingLabelText={$s["q_num"]["label"]}
						defaultValue={this.state.Q_num}
						onChange={this.handleChangeQnum.bind(this)}
					/>{$s["q_num"]["unit"]}
				</td></tr>
				<tr><td>
					<TextField
						floatingLabelText={$s["rest_interval"]["label"]}
						defaultValue={this.state.Rest_interval}
						onChange={this.handleChangeRestI.bind(this)}
					/>{$s["rest_interval"]["unit"]}
				</td></tr>
				<tr><td>
					<TextField
						floatingLabelText={$s["rest_time"]["label"]}
						defaultValue={this.state.Rest_time}
						onChange={this.handleChangeRestT.bind(this)}
					/>{$s["rest_time"]["unit"]}
				</td></tr>
				<tr><td>
					<TextField
						floatingLabelText={$s["unit"]["label"]}
						defaultValue={this.state.Unit}
						onChange={this.handleChangeUnit.bind(this)}
					/>
				</td></tr>
				</tbody>
		</table>
		</div>
		)
	}

	disabled(){
		const { MoneyValid, UnitValid, BasetimeValid, DistanceValid, Q_numValid, Rest_intervalValid, Rest_timeValid, limValid } = this.state
		return  MoneyValid && UnitValid && BasetimeValid && DistanceValid && Q_numValid && Rest_intervalValid && Rest_timeValid && limValid ;
	}

	render() {
		const { snack, MoneyValid, UnitValid, message} = this.state
		const {money, unit, basetime, distance, q_num, rest_interval, rest_time, uplim, lowlim, page} = this.props
		const actions = [
			<RaisedButton
			primary={true}
			label= {$s["button"][0]}
			disabled={!this.disabled()}
			onTouchTap={this.handleClick.bind(this)}
			/>,
			<RaisedButton
			label={$s["button"][1]}
			onTouchTap={this.handleClose.bind(this)}
			/>,
			<RaisedButton
			label={$s["button"][2]}
			onTouchTap={this.reset.bind(this)}
			/>
		]
		return (
			<span>
				<FloatingActionButton
					onClick={this.handleOpen.bind(this)}
					disabled={page != "waiting"}
				>
					<ActionSettings />
				</FloatingActionButton>
				<Dialog
					title = {$s["dialog"]}
					actions={actions}
					model={false}
					open={this.state.open}
					autoScrollBodyContent={true}
				>
				<Tabs
					onChange={this.handleSlideIndex.bind(this)}
					value={this.state.slideIndex}
				>
					<Tab label={$s["tab"][0]} value={0} />
            		<Tab label={$s["tab"][1]} value={1} />
				</Tabs>
				<SwipeableViews
					index={this.state.slideIndex}
				>
					<div style={{overflow: 'hidden'}}>{this.Basetimes()}</div>
					<div style={{overflow: 'hidden'}}>{this.Options()}</div>
				</SwipeableViews>
				</Dialog>
				<SnackBar
					open={snack}
					message={message}
					autoHideDuration={3000}
					onRequestClose={this.closeSnack.bind(this)}
				/>
		 </span>
		)
	}
}

export default connect(mapStateToProps, actionCreators)(Config)
import { combineReducers } from 'redux'

import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'change page': (_, { payload }) => ({ page: payload }),
    'joined': (_, { payload }) => ({ actives: payload }),
    'reset': (_, { payload }) => ( 
      { 
        anses: 0,
        ansed: false,
        rate: [[80,140,200],[80,140,200],[80,140,200]],
        state: 0,
        slideIndex: 0,
        result: {participants: {}}
      }
    ),
    'updata config': (_, {payload:{ money_data,unit_data}}) => (
      {
        money: money_data,
        unit: unit_data
      }
    ),
    'set question': (_, { payload }) => (
      {
        question: payload,
        state: 1,
      }
    ),
    'change index': (_, {payload:{ slideIndex_data,rate_data }}) => (
      {
        slideIndex: slideIndex_data,
        rate: rate_data,
      }
    ),
    'to_result': (_, { payload }) => (
      {
        state: 2
      }
    ),
    'send result': (_, { payload }) => (
      {
        results: payload
      }
    )
  }),
  handleAction('update contents', () => ({ loading: false }), { loading: true }),
])

export default reducer
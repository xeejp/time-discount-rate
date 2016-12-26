import { combineReducers } from 'redux'

import concatenateReducers from 'redux-concatenate-reducers'
import { handleAction, handleActions } from 'redux-actions'

const reducer = concatenateReducers([
  handleActions({
    'update contents': (_, { payload }) => payload,
    'change page': (_, { payload }) => ({ page: payload }),
    'joined': (_, { payload }) => ({ actives: payload }),
    'set_ex': (_, { payload:{question_data,rate_data} }) => (
      {
        question: question_data,
        rate: rate_data,
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
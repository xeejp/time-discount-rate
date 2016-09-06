import { createAction } from 'redux-actions'

export const fetchContents = createAction('fetch contents')
export const Start = createAction('start')
export const ToResult = createAction('to_result')
export const next = createAction('next',({choice,type,rate}) => ({choice,type,rate}))
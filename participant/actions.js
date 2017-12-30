import { createAction } from 'redux-act'

export const fetchContents = createAction('fetch contents')
export const Start = createAction('start', (payload) => payload)
export const ToResult = createAction('to_result')
export const next = createAction('next', (payload) => payload)
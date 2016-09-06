import { createAction } from 'redux-actions'

export const fetchContents = createAction('fetch contents')

export const changePage = createAction('change page', page => page)
export const submitPage = createAction('submit page', page => page)
export const backPage = createAction('back page')
export const nextPage = createAction('next page')
export const upadateConfig = createAction('upadate config',({money,unit}) => ({money,unit}))
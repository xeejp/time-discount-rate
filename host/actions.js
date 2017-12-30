import { createAction } from 'redux-act'

export const changePage = createAction('change page', page => page)
export const updateConfig = createAction('update config', options => options)
export const visit = createAction('visit')
export const openParticipantPage = createAction('open participant page')

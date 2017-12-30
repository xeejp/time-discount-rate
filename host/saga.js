import { fork, take, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'

import { fetchContents } from 'shared/actions'
import { changePage, updateConfig, visit } from './actions'

function* changePageSaga(action) {
  const { payload } = action
  yield call(sendData, 'change page', payload)
}

function* updateConfigSaga(action) {
  const { payload } = action
  yield call(sendData, 'update config', payload)
}

function* fetchContentsSaga() {
  yield call(sendData, 'fetch contents')
}

function* visitSaga() {
  yield call(sendData, 'visit')
}

function* saga() {
  yield fork(takeEvery, changePage.getType(), changePageSaga)
  yield fork(takeEvery,updateConfig.getType(),updateConfigSaga)
  yield fork(takeEvery, fetchContents.getType(), fetchContentsSaga)
  yield fork(takeEvery, visit.getType(), visitSaga)  
}

export default saga
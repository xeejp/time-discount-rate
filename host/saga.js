import { put, take, call, select, fork } from 'redux-saga/effects'

import { fetchContents, nextPage, submitPage, changePage, backPage,upadateConfig } from './actions'

function* changePageSaga() {
  while (true) {
    const { payload } = yield take(`${submitPage}`)
    sendData('change page', payload)
    if(payload == "experiment"){
      yield call(sendData,'all reset')
    }
    yield put(changePage(payload))
  }
}

function* backPageSaga() {
  const pages = ["experiment", "result", "waiting"]
  while (true) {
    yield take(`${backPage}`)
    const page = yield select(({ page }) => page)
    let next = pages[pages.length - 1]
    for (let i = pages.length - 1; i >= 0; i --) {
      if (page == pages[i]) {
        next = pages[(pages.length - 1 + i) % pages.length]
        break
      }
    }
    yield put(submitPage(next))
  }
}

function* nextPageSaga() {
  const pages = ["experiment", "result", "waiting"]
  while (true) {
    yield take(`${nextPage}`)
    const page = yield select(({ page }) => page)
    let next = pages[0]
    for (let i = 0; i < pages.length; i ++) {
      if (page == pages[i]) {
        next = pages[(i + 1) % pages.length]
        break
      }
    }
    yield put(submitPage(next))
  }
}

function* updataConfigSaga() {
  while (true) {
    const { payload } = yield take(`${upadateConfig}`)
    yield call(sendData, 'updata config', payload)
  }
}

function* fetchContentsSaga() {
  while (true) {
    yield take(`${fetchContents}`)
    yield call(sendData, 'fetch contents')
  }
}

function* saga() {
  yield fork(changePageSaga)
  yield fork(backPageSaga)
  yield fork(nextPageSaga)
  yield fork(updataConfigSaga)
  yield fork(fetchContentsSaga)
}

export default saga
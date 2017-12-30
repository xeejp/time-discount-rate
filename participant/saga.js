import { fork, take, call, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'

import { fetchContents } from 'shared/actions'
import { Start, next, ToResult} from './actions'

function* fetchContentsSaga() {
    yield call(sendData, 'fetch contents')
}

function* startSaga(action){
  const { payload } = action
  yield call(sendData, 'start', payload)
}

function* resultSaga(){
  yield call(sendData, 'send result')
}

function* nextSaga(action){
  const { payload } = action
  const {choice, type, rate} = payload
  console.log(choice)
  console.log(type)
  switch(type){
    default:
      let next_rate = rate.concat()
      let prev_rate = next_rate[type][1]
      if(choice == 1){
        next_rate[type][0] = next_rate[type][1]
      }else {
        next_rate[type][2] = next_rate[type][1]
      }
      next_rate[type][1] = (next_rate[type][2]-next_rate[type][0])*Math.random()+next_rate[type][0]
      //next_rate
      yield call(sendData, 'next', next_rate )
      break;
    case -2:
      yield call(sendData, 'finish')
      break
    case -1:
      yield call(sendData, 'next', rate )
      break
  }
}

function* saga() {
  yield fork(takeEvery,fetchContents.getType(),fetchContentsSaga)
  yield fork(takeEvery,Start.getType(),startSaga)
  yield fork(takeEvery,next.getType(),nextSaga)
  yield fork(takeEvery,ToResult.getType(),resultSaga)
}

export default saga

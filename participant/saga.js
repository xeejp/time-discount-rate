import { put, take, call, select, fork } from 'redux-saga/effects'

import { fetchContents, Start, next, ToResult} from './actions'

function* fetchContentsSaga() {
  while (true) {
    yield take(`${fetchContents}`)
    yield call(sendData, 'fetch contents')
  }
}

function* startSaga(){
  while(true){
    yield take(`${Start}`)
    let q = [0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,2,2,2,2]
    {
      let i = q.length
      while(i){
        let j = Math.floor(Math.random() * i)
        let t = q[--i]
        q[i] = q[j]
        q[j] = t
      }
    }
    yield call(sendData, 'set question',q)
  }
}

function* resultSaga(){
  while(true){
    const { payload } = yield take(`${ToResult}`)
    yield call(sendData, 'send result')
  }
}

function* nextSaga(){
  while(true){
    const { payload:{choice,type,rate} } = yield take(`${next}`)
    console.log(choice)
    console.log(type)
    switch(type){
      case 0:
      case 1:
      case 2:
        let next_rate = rate.concat()
        let prev_rate = next_rate[type][1]
        if(choice == 1){
          next_rate[type][0] = next_rate[type][1]
        }else {
          next_rate[type][2] = next_rate[type][1]
        }
        next_rate[type][1] = Math.round((next_rate[type][2]-next_rate[type][0])*Math.random()+next_rate[type][0])
        if(prev_rate == next_rate[type][1]) next_rate[type][1] += 0.5 
        yield call(sendData, 'next',next_rate)
        break;
      case 4:
        yield call(sendData, 'finish')
        break
      default:
        yield call(sendData, 'next',rate)
        break
  }
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
  yield fork(startSaga)
  yield fork(nextSaga)
  yield fork(resultSaga)
}

export default saga

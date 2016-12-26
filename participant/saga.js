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
    const { basetime, q_num, uplim, lowlim} = yield select()
    let q = []
    {
      for(let i = 0; i < basetime.length ; i++){
        for(let j = 0;j < q_num ; j++){
          q.push(i)
        }
      }
    }
    {
      let i = q.length
      while(i){
        let j = Math.floor(Math.random() * i)
        let t = q[--i]
        q[i] = q[j]
        q[j] = t
      }
    }
    let r = [];
    let h = [];
    {
      for(let i = 0; i < basetime.length ; i++){
        const rate = [lowlim,(uplim-lowlim)*Math.random()+lowlim,uplim] //init_rate
        r.push(rate);
        h.push([rate[1]])
      }
    }

    yield call(sendData, 'set', {question:q,rate:r,history:h})
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
    let { history } = yield select()
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
        history[type].push(next_rate[type][1])
        yield call(sendData, 'next',{ next_rate:next_rate, history:history})
        break;
      case -2:
        yield call(sendData, 'finish')
        break
      case -1:
        yield call(sendData, 'next',{ next_rate:rate, history:history})
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

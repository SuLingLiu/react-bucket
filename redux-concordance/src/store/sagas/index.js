import { take, put, call, fork, select, delay, takeEvery,all } from 'redux-saga/effects'
import * as actions from '../actions/counter'
import { ADD_ASYNC, ADD } from "../types/counter";

export function* addAsync(reddit) {
    yield delay(1000)
    
    yield put(actions.bindAdd(2))
}
function* watchAddAsync() {
    yield takeEvery(ADD_ASYNC, addAsync)
}

function* watchFetchData() {
    while (true) {
        const action = yield take('ADD');
        console.log(action, 11)
    }
}

// export default function* root() {
//     yield takeEvery(ADD_ASYNC, addAsync)
// }



export default function* root() {
    
    yield all([fork(watchAddAsync), fork(watchFetchData)])
}

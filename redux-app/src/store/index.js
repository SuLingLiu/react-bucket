import {createStore} from 'redux';


//Reducer
const counterReducer = (state = 0, action) => {
    console.log(action)
    let {type, payload = 1} = action;
    switch (type) {
        case 'add': 
            return state + payload;
        case 'minus': 
            return state - payload;
        default: //默认相当于初始化
            return state
    }
}

//通过createStore创建store实例
const store = createStore(counterReducer)


export default store;
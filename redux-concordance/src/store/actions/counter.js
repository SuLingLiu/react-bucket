
import {
    ADD,
    MINUS,
    ADD_ASYNC
} from '../types/counter'


export function bindAdd(num) {
    return {
        type: ADD,
        num: num || 1
    }
}

// <button onClick={()=> {bindMinus(2)}}>-</button>
//<button onClick={bindMinus}>-</button>
//参数如果是事件第二种方式默认会传事件对象，传过来来的参数会有问题
export function bindMinus(num) {
    return {
        type: MINUS,
        num: num || 1
    }
}

export function bindAddAsync(num) {
    
    return {
        type: ADD_ASYNC,
        num: num || 1
    }
}



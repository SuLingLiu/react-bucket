import {
    ADD,
    MINUS,
} from '../types/counter'


export function counter(state = 0, action) {
    let {type, num=1} = action
    switch (type) {
        case ADD:
            return state + num
        case MINUS:
            return state - num
        default:
            return state
    }
}
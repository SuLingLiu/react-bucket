import React, { Component } from "react";

import store from './store'

export default class Home extends Component {
    componentDidMount() {
        //订阅状态变更，一旦变化执行回调函数，如果不执行这个，则不会更新
        let unsubscribe = store.subscribe(() => {
            console.log('store.subscribe', store.getState())
            this.forceUpdate();//强制刷新更新视图
        });
    }
    render() {
        return (
            <div >
                <p>首页</p>
                <p>{store.getState()}</p>
                <p>
                    <button onClick={() => store.dispatch({ type: 'add', payload: 2 })}>+</button>
                    <button onClick={() => store.dispatch({ type: 'minus', payload: 3 })}>-</button>
                </p>
            </div>
        )
    }
}
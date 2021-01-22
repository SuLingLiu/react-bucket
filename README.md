

# React 全家桶

## 资源
1. [redux](https://redux.js.org/)
2. 参考阮一峰老师的  [Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
3. [react-redux](https://www.redux.org.cn/docs/react-redux/)
4. 参考阮一峰老师的[Redux 入门教程（三）：React-Redux 的用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)
5. 参考阮一峰老师的[Redux 入门教程（二）：中间件与异步操作](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)

## Redux

### 上手基础用法

`npm install redux --save`

**1. Store**

Store 就是保存数据的地方。是单例模式，整个应用只能有一个 Store。

Redux 提供`createStore`这个函数，用来生成 Store。



提供了三个方法

* store.getState()
* store.dispatch()
* store.subscribe()

``` txt

import { createStore } from 'redux';
let { subscribe, dispatch, getState } = createStore(reducer);
```



**2.获取数据用 store.getState()**

**3.Action与dispatch**

`dispatch`相当于`vuex`的`commit`用来触发`Mutation`，而`dispatch`用来触发`reducer`提交对数据的修改

而`action`相当于存放触发`mutation`的函数名和参数

``` js
const action = {
  type: 'add',
  payload: 2
};
```

`dispatch`和`action`的用法

```
<button onClick={() => store.dispatch({type: 'add', payload: 2})}>+</button>
```

**4.Reducer** 是`redux`用来改状态的函数，相当于`vuex`的`mutation`。用于接收`action`初始化state并定义state修改规则

Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

Reducer  只是一个接收 state 和 action，并返回新的 state 的函数。

> Reducer 函数最重要的特征是，它是一个纯函数。用的是函数式编程的方式，值是可预测的，是不应该改变原有的state，而是创建一个新state，所以这里用了return，而不是直接用state=xx这样

> 纯函数是函数式编程的概念，必须遵守以下一些约束。
>
> ``` txt
> 1.不得改写参数
> 2.不能调用系统 I/O 的API
> 3.不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果
> ```

```js
const counterReducer = (state = {num: 0}, action) => {
    let {type, payload = 1} = action;
    switch (type) {
        case 'add': 
            return Object.assign({},state,{num: state.num + payload});
        case 'minus': 
        return Object.assign({},state,{num: state.num - payload});
        default: //默认相当于初始化
            return state
    }
}
```

> 因为要返回新的值所以要用Object.assign复制一份，注意第一个参数一定要是{}，因为它会改变第一个参数的值，也可用展开运算符

**5.store.subscribe()**

vuex里的值是响应式，状态变了界面中任何地方都会变。而react不是它用`store.subscribe`去订阅

`Store` 允许使用`store.subscribe`方法设置监听函数，一旦 `State` 发生变化，就自动执行这个函数。

显然，只要把 View 的更新函数（对于 React 项目，就是组件的`render`方法或`setState`方法）放入`listen`，就会实现 View 的自动渲染。

`store.subscribe`方法返回一个函数，调用这个函数就可以解除监听。

``` js
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe();
```

> 参考 redux-app文件夹

在src里创建store文件夹及里面的`index.js`文件

`index.js`

```js
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
```

> 没有改值怎么更新？

**怎么调用**

看Home.js

```js
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
                <p>{store.getState()}</p>(num)
                <p>
                    <button onClick={() => store.dispatch({ type: 'add', payload: 2 })}>+</button>
                    <button onClick={() => store.dispatch({ type: 'minus', payload: 3 })}>-</button>
                </p>
            </div>
        )
    }
}
```

#### 总结

1. createStore创建store
2. Reducer 初始化、修改状态函数
3. getState获取状态值
4. dispatch提交更新
5. subscribe变更订阅

#### 流程图

![流程图](./img/1.jpg)

需要改变状态时先通过组件通过action的dispatch 到store，再从store去执行reducers，reducers得到新的值后到store，最后再去更新视图

### 模块化

> 参考项目redux-module

先从redux里导出combineReducers模块来模块化reducers

`import {createStore, applyMiddleware, combineReducers} from 'redux';`

createStore的第一个参数换成combineReducers，combineReducers的参数是一个对象，每一个key值对应一个reducer

`store/index.js`

```js
import {createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {counterReducer} from './counter'

const store = createStore(
    combineReducers({counter: counterReducer}),
);

export default store;
```

取值得时候加上对应reducer的key值就行`(state) => {return {num: state.counter.num}}`

### react-redux

redux最原始的使用方式太麻烦，想用更react的方式来写，需要用react-redux的支撑

#### 上手

`npm install react-redux --save`

`react-redux`提供了两个api

1. Provider为后代组件提供store，放在index.js入口文件里用
2. connect为组件提供数据和变更方法

```js
import { connect } from 'react-redux'

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
```

connect方法接受两个参数：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑。前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。

`connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`



```js
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
```

```js
const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    bindAdd: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      });
    }
  };
}
```

 `入口文件 redux-concordance/src/index.js` `Provider`用法

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'


import store from './store/index'



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();

```

`connect`用法

文件`redux-concordance/src/components/counter/counter.js`

```js
import * as React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindAdd, bindMinus,bindAddAsync } from "../../store/actions/counter";

const Counter  = ({total,bindAdd,bindMinus,bindAddAsync}) => {
    return (
        <>
            <div>{total}</div>
            <div>
                <button onClick={() => {bindAdd()}}>+</button>
                <button onClick={()=> {bindMinus(2)}}>-</button>
                <button onClick={()=> {bindAddAsync(2)}}>异步+</button>
            </div>
        </>
    )
}

Counter.propTypes = {
    total: PropTypes.number,
    bindAdd: PropTypes.func,
    bindMinus: PropTypes.func,
}
  
// export default connect(
//     state => ({
//         total: state.counter,
//     }),
// )(Counter)

export default connect(
    ({counter}) => ({
        total: counter,
    }),
    {bindAdd,bindMinus,bindAddAsync}
)(Counter)
```





### 异步--中间件

react默认只支持同步，实现异步任务（延迟，网络请求）需要中间件的支持

`npm install redux-thunk redux-logger --save`

redux-logger 日记的中间件，redux-thunk异步中间件

#### 流程图

![中间件](./img/2.jpg)

当出发一个 action 会经过中间件 middlewares，**这时所有的 side effect 操作，例如调用 api 获取数据等等都将在这里完成。**然后再经由 reducer 更新 state，最后传递到 view 完成 MVC 的数据流循环

有的中间件有次序要求，使用前要查一下文档。比如，`logger`就一定要放在最后，否则输出结果会不正确

#### redux-saga异步中间件

[https://redux-saga-in-chinese.js.org/docs/basics/UsingSagaHelpers.html](https://redux-saga-in-chinese.js.org/docs/basics/UsingSagaHelpers.html)

**api**

[资料](https://redux-saga-in-chinese.js.org/docs/api/)

1. **takeEvery**：监听action，每监听到一个action，就执行一次操作

2. **takeLatest**：监听action，监听到多个action，只执行最近的一次，取消之前的，如果只想得到最新那个请求的响应，可以使用 takeLatest 辅助函数

3. **call(fn, ...args)**：异步阻塞调用

   同时执行多个任务

   ```js
   const [users, repos] = yield [
     call(fetch, '/users'),
     call(fetch, '/repos')
   ]
   ```

   当我们需要 `yield` 一个包含 effects 的数组， generator 会被阻塞直到所有的 effects 都执行完毕，或者当一个 effect 被拒绝 （就像 `Promise.all` 的行为）

4. **put(action)**： 相当于dispatch，分发一个action

5. **take(pattern)**：pattern是action的type。函数可以理解为监听未来的action，它创建了一个命令对象，告诉middleware等待一个特定的action， Generator会暂停，直到一个与pattern匹配的action被发起，才会继续执行下面的语句，也就是说，take是一个阻塞的 effect。返回的action对象

   ```js
   function* watchFetchData() {
    while(true) {
    // 监听一个type为 'FETCH_REQUESTED' 的action的执行，直到等到这个Action被触发，才会接着执行下面的 yield fork(fetchData) 语句
     yield take('FETCH_REQUESTED');
     yield fork(fetchData);
    }
   }
   
   
   //上面的操作可以用下面的代替
   function* watchFetchData() {
    yield* takeEvery("FETCH_REQUESTED", fetchData)
   }
   ```

   `yield take(['LOGOUT', 'LOGIN_ERROR'])`意思是监听 2 个并发的 action

6. **fork(fn, ...args)**：fn是要执行的函数，...args是需要执行函数的参数。fork 函数和 call 函数很像，都是用来调用其他函数的，但是fork函数是非阻塞函数，也就是说，程序执行完 yield fork(fn， args) 这一行代码后，会立即接着执行下一行代码语句，而不会等待fn函数返回结果后，在执行下面的语句

   ```js
   import { fork } from 'redux-saga/effects'
    
   export default function* rootSaga() {
    // 下面的四个 Generator 函数会一次执行，不会阻塞执行
    yield fork(addItemFlow)
    yield fork(removeItemFlow)
    yield fork(toggleItemFlow)
    yield fork(modifyItem)
   }
   ```

   

7.   **select**：select 函数取Store上的state数据，可以理解为redux获取store上的 state数据一样的功能 ：store.getState()

   ```js
   export function* toggleItemFlow() {
     // 通过 select effect 来获取 全局 state上的 `getTodoList` 中的 list
     let tempList = yield select(state => state.getTodoList.list)
   }
   
   const state = yield select()//获取所有的状态
   ```

   

8. **all**：

9. **cancel**：一旦任务被 fork，可以使用 `yield cancel(task)` 来中止任务执行。取消正在运行的任务，cancel 是一个无阻塞 Effect。也就是说，Generator 将在取消异常被抛出后立即恢复

10. **race**：

11. **throttle**：节流

12. **delay**：延迟

    ```js
    export function* addAsync(reddit) {
        yield delay(1000)
        yield put(actions.bindAdd(2))
    }
    ```

    

    具体用法参考：`redux-concordance`










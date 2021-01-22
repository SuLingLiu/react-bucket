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
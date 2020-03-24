import React from 'react'
import {connect} from 'react-redux'
import {buyStock} from '../store'

export const BuyStock = props => {
  const {
    shares,
    total,
    error,
    symbol,
    companyName,
    cash,
    current,
    userId
  } = props

  console.log(props, props.shares)
  const handlechange = e => {}

  const handlebuy = e => {}

  return (
    <div>
      <input type="text" value={shares} onChange={handlechange} />
      <button type="button" onClick={handlebuy}>
        TEST
      </button>
    </div>
  )
}

const mapState = (state, ownProps) => {
  return {
    shares: '1000',
    total: 0,
    error: state.buy.error,
    symbol: ownProps.symbol,
    companyName: ownProps.companyName,
    cash: ownProps.cash,
    current: ownProps.current,
    userId: ownProps.userId
  }
}

const mapDispatch = dispatch => {
  return {
    buyStock: stock => dispatch(buyStock(stock))
  }
}

export default connect(mapState, mapDispatch)(BuyStock)

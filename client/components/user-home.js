import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getStock} from '../store'
import {StockHeader} from './sub/stockheader'
import {BuyStock} from './sub/buystock'
import {StatsInfo} from './sub/statsinfo'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {
    handleSubmit,
    name,
    cash,
    symbol,
    companyName,
    open,
    current,
    high,
    low,
    volume,
    avgVol,
    marketCap
  } = props

  return (
    <div>
      <h1>Welcome {name.charAt(0).toUpperCase() + name.slice(1)},</h1>
      <h2>Search A Stock</h2>
      <form onSubmit={handleSubmit}>
        <input name="symbol" type="text" placeholder="i.e. AAPL" />
        <button type="submit">Search</button>
      </form>
      {symbol && (
        <div id="buy-info">
          <StockHeader
            symbol={symbol}
            companyName={companyName}
            current={current}
            open={open}
          />
          <StatsInfo
            open={open}
            high={high}
            low={low}
            volume={volume}
            avgVol={avgVol}
            marketCap={marketCap}
          />
          <BuyStock symbol={symbol} cash={cash} current={current} />
        </div>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.name,
    cash: state.user.cash,
    symbol: state.buy.symbol,
    companyName: state.buy.companyName,
    open: state.buy.open,
    current:
      state.buy.calculationPrice === 'close'
        ? state.buy.close
        : state.buy.calculationPrice,
    high: state.buy.high,
    low: state.buy.low,
    volume: state.buy.volume,
    avgVol: state.buy.avgTotalVolume,
    marketCap: state.buy.marketCap
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      dispatch(getStock(evt.target.symbol.value))
    }
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  name: PropTypes.string
}

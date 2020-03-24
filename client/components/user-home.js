import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getStock} from '../store'
import {StockHeader} from './sub/stockheader'
import {BuyStock} from './sub/buystock'
// import {BuyStock} from './buystock'
import {StatsInfo} from './sub/statsinfo'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {
    handleSubmit,
    userId,
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
    marketCap,
    error
  } = props

  const floatToPerc = n => {
    n *= 100
    n = n.toFixed(2)
    return n
  }

  let change = (current - open) / open
  change = floatToPerc(change)

  let color = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral'

  console.log('user-home', props)
  return (
    <div id="user-home">
      {/* <h2>SEARCH STOCKS</h2> */}
      <form onSubmit={handleSubmit}>
        <input
          name="symbol"
          type="text"
          placeholder="Search stocks by ticker symbol i.e. AAPL"
        />
        <button type="submit">Search</button>
      </form>
      {error && (
        <div className="error">
          Stock not found, please enter a valid ticker symbol
        </div>
      )}
      {symbol && (
        <div id="buy-info">
          <StockHeader
            symbol={symbol}
            companyName={companyName}
            current={current}
            open={open}
            color={color}
          />
          <StatsInfo
            open={open}
            high={high}
            low={low}
            volume={volume}
            avgVol={avgVol}
            marketCap={marketCap}
          />
          <BuyStock
            symbol={symbol}
            companyName={companyName}
            cash={cash}
            current={current}
            userId={userId}
          />
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
    userId: state.user.id,
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
    marketCap: state.buy.marketCap,
    error: state.buy.error
  }
}

const mapDispatch = dispatch => {
  return {
    getstock: s => dispatch(getStock(s)),
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

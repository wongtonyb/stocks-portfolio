import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
  getStock,
  // getUstockByIdSymbol,
  createTrans,
  updateQty,
  updateOrCreateUstock,
  updateCash
} from '../store'
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
    change,
    high,
    low,
    volume,
    avgVol,
    marketCap,
    error
  } = props

  let color = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral'

  return (
    <div id="user-home">
      {/* <h2>SEARCH STOCKS</h2> */}
      <form name={userId} onSubmit={handleSubmit}>
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
            change={change}
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
            createTrans={props.createTrans}
            // ustockQty={props.ustockQty}
            updateOrCreateUstock={props.updateOrCreateUstock}
            updateCash={props.updateCash}
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
    // ustockQty: state.portfolio.ustockIdSymbol
    //   ? state.portfolio.ustockIdSymbol.qty
    //   : 0,
    symbol: state.buy.symbol,
    companyName: state.buy.companyName,
    //market closed - use previousClose
    open: state.buy.open || state.buy.previousClose,
    //market closed - use latestPrice
    current: isNaN(state.buy.calculationPrice)
      ? state.buy.latestPrice
      : state.buy.calculationPrice,
    change: state.buy.change,
    // market closed - use 'close'
    high: state.buy.high || 'close',
    low: state.buy.low || 'close',
    //market closed - use lastVolume
    volume: state.buy.volume || state.buy.previousVolume,
    avgVol: state.buy.avgTotalVolume,
    marketCap: state.buy.marketCap,
    error: state.buy.error
  }
}

const mapDispatch = dispatch => {
  return {
    createTrans: stock => dispatch(createTrans(stock)),
    updateQty: ustock => dispatch(updateQty(ustock)),
    updateOrCreateUstock: ustock => dispatch(updateOrCreateUstock(ustock)),
    updateCash: userObj => dispatch(updateCash(userObj)),
    handleSubmit(evt) {
      evt.preventDefault()
      dispatch(getStock(evt.target.symbol.value))
      // dispatch(getUstockByIdSymbol(evt.target.name, evt.target.symbol.value))
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

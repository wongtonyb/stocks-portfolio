import React from 'react'
import {connect} from 'react-redux'
import {buyStock} from '../../store'

export class SellStock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {shares: '', total: 0, error: false}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    let sum = (this.props.current * e.target.value).toFixed(2)
    this.setState({
      shares: e.target.value,
      total: sum
    })
  }

  handleSell(e) {}

  render() {
    const {symbol, cash, current} = this.props

    const numberWithCommas = x => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return (
      <form id="sellstock">
        <h1>Sell {symbol}</h1>
        <div id="line">
          <h2>Number of Shares</h2>
          <input
            name="shares"
            type="text"
            placeholder="0"
            max="9999"
            value={this.state.shares}
            onChange={this.handleChange}
          />
        </div>
        <div id="line">
          <h2>Market Price</h2>
          <h3>${current}</h3>
        </div>
        <div id="last-line">
          <h2>Estimated Value</h2>
          <h3>
            {isNaN(this.state.total)
              ? 'Enter a numeric value'
              : this.state.shares.includes('.')
              ? 'Enter a whole quantity'
              : `$${numberWithCommas(this.state.total)}`}
          </h3>
        </div>
        <div id="btn-line">
          {this.state.error === 'Insufficient Balance' ||
          this.state.error === 'Invalid Quantity' ? (
            <div id="buy-notice" className="error">
              {this.state.error}
            </div>
          ) : // this.props.error ? (
          //   <div id="buy-notice" className="error">
          //     Transaction Failed
          //   </div>
          // ) :
          this.state.error === 'Transaction Completed' ? (
            <div id="buy-notice" className="success">
              {this.state.error}
            </div>
          ) : (
            <div id="buy-notice"></div>
          )}
          <button type="button" onClick={this.handleSell}>
            SELL
          </button>
        </div>
      </form>
    )
  }
}

const mapState = state => {
  return {
    error: state.buy.error || 'does not exist'
  }
}

const mapDispatch = dispatch => {
  return {
    buyStock: stock => dispatch(buyStock(stock))
  }
}

export default connect(mapState, mapDispatch)(SellStock)

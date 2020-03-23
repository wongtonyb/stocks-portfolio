import React from 'react'
import {connect} from 'react-redux'
import {buyStock} from '../../store'

export class BuyStock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {shares: '', total: 0, error: false}
    this.handleChange = this.handleChange.bind(this)
    this.handleBuy = this.handleBuy.bind(this)
  }
  handleChange(e) {
    let sum = (this.props.current * e.target.value).toFixed(2)
    console.log(e.target.value, sum)
    this.setState({
      shares: e.target.value,
      total: sum
    })
  }
  handleBuy(e) {
    var today = new Date()
    var date =
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    var time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    var dateTime = date + ' ' + time
    //stock for transaction
    let tstock = {
      symbol: this.props.symbol,
      companyName: this.props.companyName,
      type: 'buy',
      price: this.props.current,
      qty: Number(this.state.shares),
      total: Number(this.state.total),
      date: dateTime
      //fk
    }
    //stock for portfolio
    let ustock = {
      symbol: this.props.symbol,
      companyName: this.props.companyName
      //fk
    }
    // balance > total && total is numb !isNaN(n) &&  shares has no .
    if (tstock.total > Number(this.props.cash)) {
      this.setState({
        error: 'Insufficient Balance'
      })
    } else if (isNaN(tstock.qty) || this.state.shares.includes('.')) {
      this.setState({
        error: 'Invalid Quantity'
      })
    } else {
      this.setState({
        error: 'Transaction Completed'
      })
    }
  }

  render() {
    const {symbol, cash, current} = this.props

    const numberWithCommas = x => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return (
      <form id="buystock">
        <h1>Buy {symbol}</h1>
        <h5>${cash} Available</h5>
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
          <h2>Estimated Cost</h2>
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
          ) : this.state.error === 'Transaction Completed' ? (
            <div id="buy-notice" className="success">
              {this.state.error}
            </div>
          ) : (
            <div id="buy-notice"></div>
          )}
          <button type="button" onClick={this.handleBuy}>
            BUY
          </button>
        </div>
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    buyStock: stock => dispatch(buyStock(stock))
  }
}

export default connect(null, mapDispatch)(BuyStock)

import React from 'react'
import {connect} from 'react-redux'
import {sellStock} from '../../store'

export class SellStock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {shares: '', total: 0, error: false}
    this.handleChange = this.handleChange.bind(this)
    this.handleSell = this.handleSell.bind(this)
  }

  handleChange(e) {
    e.preventDefault()
    let sum = (this.props.current * e.target.value).toFixed(2)
    this.setState({
      shares: e.target.value,
      total: sum
    })
  }

  handleSell(e) {
    e.preventDefault()
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
      type: 'sell',
      price: this.props.current,
      qty: Number(this.state.shares),
      total: Number(this.state.total),
      date: dateTime,
      userId: this.props.userId
    }
    //stock for portfolio
    let ustock = {
      symbol: this.props.symbol,
      companyName: this.props.companyName,
      userId: this.props.userId
    }
    //update user cash
    // error handling
    if (tstock.qty > Number(this.props.shares)) {
      this.setState({
        error: 'Not Enough Shares'
      })
    } else if (
      tstock.qty < 1 ||
      isNaN(tstock.qty) ||
      this.state.shares.includes('.')
    ) {
      this.setState({
        error: 'Invalid Quantity'
      })
    } else {
      this.props.sellStock(tstock)
      // buyStock(tstock)
      console.log(this.props.error)
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

    const svalue = (this.props.shares * this.props.current).toFixed(2)

    return (
      <form id="sellstock">
        <h1>Sell {symbol}</h1>
        <h5>
          {this.props.shares} Shares - ${numberWithCommas(svalue)}
        </h5>
        <div id="line">
          <h2>Number of Shares</h2>
          <input
            name="shares"
            type="text"
            placeholder="0"
            max="9999"
            value={this.state.shares}
            onChange={this.handleChange}
            onKeyPress={event => {
              if (event.which === 13 /* Enter */) {
                event.preventDefault()
              }
            }}
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
          {this.state.error === 'Not Enough Shares' ||
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
    sellStock: stock => dispatch(sellStock(stock))
  }
}

export default connect(mapState, mapDispatch)(SellStock)

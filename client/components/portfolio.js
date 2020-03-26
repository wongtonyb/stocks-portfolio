import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPort, updateQty} from '../store/portfolio'
import {updateCash} from '../store/user'
// import {getUser} from '../store/user'
import {createTrans} from '../store/transaction'
import {StockHeaderPort} from './sub/stockheaderport'
import {Sell} from './sub/sell'

export class Portfolio extends Component {
  constructor() {
    super()
    this.state = {
      stock: false,
      iex: false,
      sold: false
    }
    this.showMore = this.showMore.bind(this)
    this.refresh = this.refresh.bind(this)
  }

  componentDidMount() {
    this.props.getPort(this.props.user.id)
  }

  showMore(stock, iex) {
    this.setState({
      stock: stock,
      iex: iex
    })
  }

  refresh(symbol, sharesleft) {
    if (sharesleft === 0) {
      this.setState({
        stock: false,
        iex: false,
        sold: true
      })
    } else {
      let stock, iex
      this.props.portfolio.forEach(s => {
        if (s.symbol === symbol) stock = s
      })
      iex = this.props.iex[symbol].quote
      this.setState({
        stock: stock,
        iex: iex
      })
    }
  }

  // eslint-disable-next-line complexity
  render() {
    let net = this.props.stockvalue
      ? (
          Number(this.props.user.cash) +
          this.props.stockvalue.reduce((a, cv) => a + Number(cv.value), 0)
        ).toFixed(2)
      : 0

    const numberWithCommas = x => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return (
      <div id="portfolio">
        <h1>
          {this.props.user.name}'s Portfolio (${numberWithCommas(net)})
        </h1>
        {this.state.sold && (
          <h3 id="sold" className="success">
            Transaction Completed
          </h3>
        )}
        <div id="main-p">
          {this.props.portfolio.length && Object.keys(this.props.iex).length ? (
            <div id="left-p">
              {this.props.portfolio.map(s => (
                <StockHeaderPort
                  key={s.id}
                  stock={s}
                  iex={this.props.iex[s.symbol].quote}
                  showMore={this.showMore}
                />
              ))}
            </div>
          ) : (
            <div />
          )}

          {this.state.stock && this.state.iex && <div id="border" />}
          {this.state.stock &&
            this.state.iex && (
              <div id="right-p">
                <Sell
                  ustock={this.state.stock}
                  iex={this.state.iex}
                  user={this.props.user}
                  createTrans={this.props.createTrans}
                  updateQty={this.props.updateQty}
                  updateCash={this.props.updateCash}
                  refresh={this.refresh}
                />
              </div>
            )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    portfolio: state.portfolio.port,
    iex: state.portfolio.iex,
    stockvalue:
      state.portfolio.port.length && Object.keys(state.portfolio.iex).length
        ? state.portfolio.port.map(s => {
            let curr = isNaN(
              state.portfolio.iex[s.symbol].quote.calculationPrice
            )
              ? state.portfolio.iex[s.symbol].quote.latestPrice
              : state.portfolio.iex[s.symbol].quote.calculationPrice
            let val = (s.qty * curr).toFixed(2)
            let sym = s.symbol
            return {symbol: sym, value: val}
          })
        : 0
  }
}

const mapDispatch = dispatch => {
  return {
    getPort: userid => dispatch(getPort(userid)),
    createTrans: stock => dispatch(createTrans(stock)),
    updateQty: stock => dispatch(updateQty(stock)),
    updateCash: user => dispatch(updateCash(user))
  }
}

export default connect(mapState, mapDispatch)(Portfolio)

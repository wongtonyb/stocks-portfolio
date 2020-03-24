import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPort} from '../store/portfolio'
import {StockHeaderPort} from './sub/stockheaderport'
import {Sell} from './sub/sell'

export class Portfolio extends Component {
  constructor() {
    super()
    this.state = {
      stock: false,
      iex: false
    }
    this.showMore = this.showMore.bind(this)
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
        <h1>Portfolio (${numberWithCommas(net)})</h1>
        <div id="main">
          <div id="left">
            {this.props.portfolio.length &&
              Object.keys(this.props.iex).length &&
              this.props.portfolio.map(s => (
                <StockHeaderPort
                  key={s.id}
                  stock={s}
                  iex={this.props.iex[s.symbol].quote}
                  showMore={this.showMore}
                />
              ))}
          </div>
          {this.state.stock && this.state.iex && <div id="border" />}
          {this.state.stock && this.state.iex && (
            <div id="right">
              <Sell
                ustock={this.state.stock}
                iex={this.state.iex}
                user={this.props.user}
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
    getPort: userid => dispatch(getPort(userid))
  }
}

export default connect(mapState, mapDispatch)(Portfolio)

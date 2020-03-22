import React from 'react'
import {connect} from 'react-redux'
import {buyStock} from '../../store'

export class BuyStock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {shares: ''}
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    this.setState({
      shares: e.target.value
    })
  }

  render() {
    const {symbol, cash, current, handleSubmit} = this.props

    let total = (current * this.state.shares).toFixed(2)

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
        <div id="line">
          <h2>Estimated Cost</h2>
          <h3>
            {isNaN(total)
              ? 'Enter a numeric value'
              : this.state.shares.includes('.')
              ? 'Enter a whole quantity'
              : total}
          </h3>
        </div>
        <button type="submit" onClick={handleSubmit}>
          BUY
        </button>
        <div id="error">Error Message</div>
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(e) {
      console.log(e)
      e.preventDefault()
      dispatch(buyStock())
    }
  }
}

export default connect(null, mapDispatch)(BuyStock)

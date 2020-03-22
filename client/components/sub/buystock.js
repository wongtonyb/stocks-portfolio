import React from 'react'
import {connect} from 'react-redux'
import {buyStock} from '../../store'

export class BuyStock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {shares: 0}
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    this.setState({
      shares: e.target.value
    })
  }

  render() {
    console.log(this.props)
    const {symbol, cash, handleChange, current, handleSubmit} = this.props

    return (
      <form id="buystock">
        <h1>Buy {symbol}</h1>
        <h5>${cash} Available</h5>
        <div id="line">
          <h2>Number of Shares</h2>
          <input
            name="shares"
            type="number"
            placeholder="0"
            onChange={handleChange}
          />
        </div>
        <div id="line">
          <h2>Market Price</h2>
          <h3>${current}</h3>
        </div>
        <div id="line">
          <h2>Estimated Cost</h2>
          <h3>${current * this.state.shares}</h3>
        </div>
        <button type="submit" onClick={handleSubmit}>
          BUY
        </button>
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

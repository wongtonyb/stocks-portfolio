import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getStock} from '../store'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {handleSubmit, name, symbol} = props

  return (
    <div>
      <h3>Welcome, {name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <form onSubmit={handleSubmit}>
        <input name="symbol" type="text" placeholder="i.e. AAPPL" />
        <button type="submit">Search</button>
      </form>
      <div>{symbol}</div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    name: state.user.name,
    symbol: state.stocks.symbol
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

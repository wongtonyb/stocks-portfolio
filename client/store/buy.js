import axios from 'axios'

//hide in production
const iexTestToken = 'Tpk_3a0c10e1680f4a7b9560dc8bd7290081'
const iexToken = 'pk_177c4d499fd54f218f09cdf365ac8a12'

// const iexTestToken = process.env.IEX_TEST_TOKEN
// const iexToken = process.env.IEX_TEST_TOKEN

//action types
const GET_STOCK = 'GET_STOCK'
const BUY_STOCK = 'BUY_STOCK'

//action creators
const gotStock = stock => ({type: GET_STOCK, stock})
const broughtStock = stock => ({type: BUY_STOCK, stock})

//thunk creators
export const getStock = symbol => async dispatch => {
  try {
    const res = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${iexTestToken}`
    )
    res.error = false
    dispatch(gotStock(res.data))
  } catch (err) {
    console.error(err)
    return dispatch(gotStock({error: err}))
  }
}

export const buyStock = stock => async dispatch => {
  try {
    const res = await axios.post('/api/transaction', stock)
    dispatch(broughtStock(res.data))
  } catch (err) {
    console.error(err)
  }
}

//initial state
const initialState = {error: false}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STOCK:
      return action.stock
    case BUY_STOCK:
      return action.stock
    default:
      return state
  }
}

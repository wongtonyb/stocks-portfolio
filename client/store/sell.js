import axios from 'axios'

//hide in production
const iexTestToken = 'Tpk_3a0c10e1680f4a7b9560dc8bd7290081'
const iexToken = 'pk_177c4d499fd54f218f09cdf365ac8a12'

// const iexTestToken = process.env.IEX_TEST_TOKEN
// const iexToken = process.env.IEX_TEST_TOKEN

//action types
const SELL_STOCK = 'SELL_STOCK'

//action creators
const soldStock = stock => ({type: SELL_STOCK, stock})

//thunk creators

export const sellStock = stock => async dispatch => {
  try {
    // const res = await axios.post('/api/transaction', stock)
    // dispatch(broughtStock(res.data))
    dispatch(console.log('redux hit'))
  } catch (err) {
    console.error(err)
    return dispatch(soldStock({error: err}))
  }
}

//initial state
const initialState = {error: false}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case SELL_STOCK:
      return action.stock
    default:
      return state
  }
}

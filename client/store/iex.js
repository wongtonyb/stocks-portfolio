import axios from 'axios'
// import {iexToken, iexTestToken} from '../../secrets'

//action types
const GET_STOCK = 'GET_STOCK'

//action creators
const gotStock = stock => ({type: GET_STOCK, stock})

//thunk creators
export const getStock = symbol => async dispatch => {
  try {
    const res = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.IEX_TEST_TOKEN}`
    )
    dispatch(gotStock(res.data))
  } catch (err) {
    console.error(err)
  }
}

//initial state
const initialState = {}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_STOCK:
      return action.stock
    default:
      return state
  }
}

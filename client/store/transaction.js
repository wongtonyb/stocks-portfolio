import axios from 'axios'

//action types
const GET_TRANS = 'GET_TRANS'
const SELL_STOCK = 'SELL_STOCK'

//action creators
const gotTrans = trans => ({type: GET_TRANS, trans})
const soldStock = stock => ({type: SELL_STOCK, stock})

//thunk creators
//get all trans for user
export const getTrans = id => async dispatch => {
  try {
    const res = await axios.get(`/api/transaction/${id}`)
    dispatch(gotTrans(res.data))
  } catch (err) {
    return dispatch(gotTrans({error: err}))
  }
}

//create new trans
export const createTrans = stock => async dispatch => {
  try {
    const res = await axios.put('/api/transaction', stock)
    dispatch(soldStock(res.data))
  } catch (err) {
    console.error(err)
    return dispatch(soldStock({error: err}))
  }
}

//initial state
const initialState = []

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TRANS:
      return action.trans
    default:
      return state
  }
}

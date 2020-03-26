import axios from 'axios'

//hide in production
const iexTestToken = 'Tpk_3a0c10e1680f4a7b9560dc8bd7290081'

// const iexTestToken = process.env.IEX_TEST_TOKEN
// const iexToken = process.env.IEX_TOKEN

//action types
const GET_PORT = 'GET_PORT'
const GET_IEX = 'GET_IEX'
const UPDATE_QTY = 'UPDATE_QTY'
const USTOCK_ID_SYMBOL = 'USTOCK_ID_SYMBOL'
const UPDATE_OR_CREATE = 'UPDATE_OR_CREATE'

//action creators
const gotPort = port => ({type: GET_PORT, port})
const gotIex = iex => ({type: GET_IEX, iex})
const updatedQty = ustock => ({type: UPDATE_QTY, ustock})
const ustockIdSymbol = ustock => ({type: USTOCK_ID_SYMBOL, ustock})
const updateOrCreate = ustock => ({type: UPDATE_OR_CREATE, ustock})

//thunk creators
//get portfolio and corresponding iex by userId
export const getPort = userid => async dispatch => {
  try {
    const res = await axios.get(`/api/ustocks/${userid}`)
    dispatch(gotPort(res.data))
    try {
      let symbols = res.data.map(stock => stock.symbol).join(',')
      let iex = await axios.get(
        `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${symbols}&types=quote&token=${iexTestToken}`
      )
      dispatch(gotIex(iex.data))
    } catch (err) {
      return dispatch(gotIex({error: err}))
    }
  } catch (err) {
    return dispatch(gotPort({error: err}))
  }
}

//get single ustock by userId/stockSymbol
export const getUstockByIdSymbol = (id, symbol) => async dispatch => {
  try {
    const res = await axios.get(`/api/ustocks/${id}/${symbol}`)
    dispatch(ustockIdSymbol(res.data))
  } catch (err) {
    return dispatch(ustockIdSymbol({error: err}))
  }
}

//update qty on sell
export const updateQty = ustock => async dispatch => {
  try {
    const res = await axios.post('/api/ustocks/sell', ustock)
    dispatch(getPort(res.data))
  } catch (err) {
    return dispatch(updatedQty({error: err}))
  }
}

//update qty or create ustock on buy
export const updateOrCreateUstock = ustock => async dispatch => {
  try {
    const res = await axios.post('/api/ustocks/buy', ustock)
    dispatch(getPort(res.data.userId))
  } catch (err) {
    return dispatch(updateOrCreate({error: err}))
  }
}

//initial state
const initialState = {port: [], iex: [], ustockIdSymbol: {}}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PORT:
      return {...state, port: action.port}
    case GET_IEX:
      return {...state, iex: action.iex}
    case USTOCK_ID_SYMBOL:
      return {...state, ustockIdSymbol: action.ustock}
    default:
      return state
  }
}

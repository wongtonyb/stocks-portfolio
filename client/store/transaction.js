import axios from 'axios'

//action types
const GET_TRANS = 'GET_TRANS'

//action creators
const gotTrans = trans => ({type: GET_TRANS, trans})

//thunk creators
export const getTrans = id => async dispatch => {
  try {
    const res = await axios.get(`/api/transaction/${id}`)
    dispatch(gotTrans(res.data))
  } catch (err) {
    return dispatch(gotTrans({error: err}))
  }
}

// export const getAll = () => async dispatch => {
//   const res = await axios.get(`/api/transaction/`)
//   dispatch(getTrans(res.data))
//   // console.log('after', res)
// }

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

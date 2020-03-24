import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import buy from './buy'
import transaction from './transaction'
import portfolio from './portfolio'
import sell from './sell'

const reducer = combineReducers({user, buy, transaction, portfolio, sell})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './buy'
export * from './transaction'
export * from './portfolio'
export * from './sell'

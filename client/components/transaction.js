import React from 'react'
import {connect} from 'react-redux'
import {getTrans} from '../store/transaction.js'

export class Transaction extends React.Component {
  componentDidMount() {
    this.props.getTrans(this.props.userId)
    console.log(this.props.trans)
  }

  render() {
    console.log(this.props.trans)

    return (
      <div id="transaction">
        <h1>{this.props.userName}'s Transaction</h1>
        <div id="header">
          <div className="long">Date</div>
          <div className="longx">Stock</div>
          <div className="shortx">Quantity</div>
          <div className="med">Price</div>
          <div className="med">Total</div>
          <div className="short">Action</div>
        </div>
        <div id="trans-container">
          {this.props.trans.map(t => (
            <div id="single" key={t.id}>
              <div className="long">{t.date}</div>
              <div className="longx">
                {t.symbol} | {t.companyName}
              </div>
              <div className="shortx">{t.qty}</div>
              <div className="med">{t.price}</div>
              <div className="med">{t.total}</div>
              <div className="short" id={t.type}>
                {t.type}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    userName: state.user.name,
    userId: state.user.id,
    trans: state.transaction
  }
}

const mapDispatch = dispatch => {
  return {
    getTrans: id => dispatch(getTrans(id))
  }
}

export default connect(mapState, mapDispatch)(Transaction)

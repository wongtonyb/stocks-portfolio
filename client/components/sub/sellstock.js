import React, {useState} from 'react'

export const SellStock = props => {
  //previous props
  const {symbol, companyName, cash, current, userId, shares} = props

  //react hooks
  const [input, setInput] = useState('')
  const [inputTotal, setInputTotal] = useState(0)
  const [error, setError] = useState(false)

  //handle functions for hooks
  const handleChange = e => {
    e.preventDefault()
    let sum = (current * e.target.value).toFixed(2)
    setInput(e.target.value)
    setInputTotal(sum)
  }

  const handleSell = e => {
    e.preventDefault()
    var today = new Date()
    var date =
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    var time =
      today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    var dateTime = date + ' ' + time
    //stock for transaction
    let tstock = {
      symbol: symbol,
      companyName: companyName,
      type: 'sell',
      price: current,
      qty: Number(input),
      total: Number(inputTotal),
      date: dateTime,
      userId: userId
    }
    //stock for portfolio
    let ustock = {
      symbol: symbol,
      companyName: companyName,
      userId: userId,
      qty: shares - Number(input)
    }
    //update user cash
    let user = {
      userId: userId,
      cash: Number(cash) + Number(inputTotal)
    }
    // error handling
    if (tstock.qty > Number(shares)) {
      setError('Not Enough Shares')
    } else if (tstock.qty < 1 || isNaN(tstock.qty) || input.includes('.')) {
      setError('Invalid Quantity')
    } else {
      // sellStock(tstock) - create transaction
      props.createTrans(tstock)
      // updatePortfolio(ustock) - update shares in ustock
      props.updateQty(ustock)
      // updateCash
      props.updateCash(user)
      //refresh user, ustocks qty, transactions.
      setError('Transaction Completed')
      setInput('')
      // props.refresh(symbol, shares - Number(input))
      props.refresh(symbol, 0)
    }
  }

  //helper functions
  const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const svalue = (shares * current).toFixed(2)

  return (
    <form id="sellstock">
      <h1>Sell {symbol}</h1>
      <h5>
        {shares} Shares - ${numberWithCommas(svalue)}
      </h5>
      <div id="line">
        <h2>Number of Shares</h2>
        <input
          name="shares"
          type="text"
          placeholder="0"
          max="9999"
          value={input}
          onChange={handleChange}
          onKeyPress={event => {
            if (event.which === 13 /* Enter */) {
              event.preventDefault()
            }
          }}
        />
      </div>
      <div id="line">
        <h2>Market Price</h2>
        <h3>${current}</h3>
      </div>
      <div id="last-line">
        <h2>Estimated Value</h2>
        <h3>
          {isNaN(inputTotal)
            ? 'Enter a numeric value'
            : input.includes('.')
            ? 'Enter a whole quantity'
            : `$${numberWithCommas(inputTotal)}`}
        </h3>
      </div>
      <div id="btn-line">
        {error === 'Not Enough Shares' || error === 'Invalid Quantity' ? (
          <div id="buy-notice" className="error">
            {error}
          </div>
        ) : // error ? (
        //   <div id="buy-notice" className="error">
        //     Transaction Failed
        //   </div>
        // ) :
        error === 'Transaction Completed' ? (
          <div id="buy-notice" className="success">
            {error}
          </div>
        ) : (
          <div id="buy-notice"></div>
        )}
        <button type="button" onClick={handleSell}>
          SELL
        </button>
      </div>
    </form>
  )
}

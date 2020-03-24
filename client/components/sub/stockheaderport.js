import React from 'react'

export const StockHeaderPort = props => {
  let {stock, iex, showMore} = props

  let current = isNaN(iex.calculationPrice)
    ? iex.latestPrice
    : iex.calculationPrice

  let value = (stock.qty * current).toFixed(2)

  let color = iex.change > 0 ? 'up' : iex.change < 0 ? 'down' : 'neutral'

  return (
    <div
      id="stock-header-port"
      className={color}
      onClick={() => showMore(stock, iex)}
    >
      <div id="one">
        <h1>
          {stock.symbol} - {stock.companyName}
        </h1>
        <h1>${current}</h1>
      </div>
      <div id="two">
        <h2>
          {stock.qty} Shares - ${value}
        </h2>
        <h2>{iex.change}%</h2>
      </div>
    </div>
  )
}

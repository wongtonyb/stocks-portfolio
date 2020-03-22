import React from 'react'

export const StockHeader = props => {
  const floatToPerc = n => {
    n *= 100
    n = n.toFixed(2)
    return n
  }

  let change = (props.current - props.open) / props.open
  change = floatToPerc(change)

  return (
    <div id="stock-header">
      <div id="one">
        <h1>
          {props.symbol} - {props.companyName}
        </h1>
      </div>
      <div id="two">
        <h1>${props.current}</h1>
        <h2>{change < 0 ? `-${Math.abs(change)}%` : `${Math.abs(change)}%`}</h2>
      </div>
    </div>
  )
}

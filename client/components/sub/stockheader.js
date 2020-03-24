import React from 'react'

export const StockHeader = props => {
  const floatToPerc = n => {
    n *= 100
    n = n.toFixed(2)
    return n
  }

  let change = (props.current - props.open) / props.open
  change = floatToPerc(change)

  console.log(change)
  return (
    <div id="stock-header" className={props.color}>
      <div id="one">
        <h1>
          {props.symbol} - {props.companyName}
        </h1>
      </div>
      <div id="two">
        <h1>${props.current}</h1>
        <h2>{change}</h2>
      </div>
    </div>
  )
}

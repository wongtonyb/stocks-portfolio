import React from 'react'

export const StockHeader = props => {
  return (
    <div id="stock-header" className={props.color}>
      <div id="one">
        <h1>
          {props.symbol} - {props.companyName}
        </h1>
      </div>
      <div id="two">
        <h1>${props.current}</h1>
        <h2>{props.change}%</h2>
      </div>
    </div>
  )
}

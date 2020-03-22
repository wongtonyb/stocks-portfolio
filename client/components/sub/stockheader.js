import React from 'react'

export const StockHeader = props => {
  return (
    <div id="stock-header">
      <div>
        <h1>{props.symbol}</h1>
        <h1>{props.companyName}</h1>
      </div>
      <div>
        <h1>${props.current}</h1>
        <h1>{(props.current - props.open) / props.open}</h1>
      </div>
    </div>
  )
}

import React from 'react'
import {StockHeader} from './stockheader'
import {StatsInfo} from './statsinfo'
import {SellStock} from './sellstock'

export const Sell = props => {
  const {ustock, iex, user} = props

  console.log(iex)

  let color = iex.change > 0 ? 'up' : iex.change < 0 ? 'down' : 'neutral'

  let current = isNaN(iex.calculationPrice)
    ? iex.latestPrice
    : iex.calculationPrice

  let high = iex.high || 'close'
  let low = iex.low || 'close'

  let open = iex.open || iex.previousClose

  let volume = iex.volume || iex.previousVolume

  return (
    <div id="sell-info">
      <StockHeader
        symbol={iex.symbol}
        companyName={iex.companyName}
        current={current}
        open={iex.open}
        color={color}
        change={iex.change}
      />
      <StatsInfo
        open={open}
        high={high}
        low={low}
        volume={volume}
        avgVol={iex.avgTotalVolume}
        marketCap={iex.marketCap}
      />
      <SellStock
        symbol={iex.symbol}
        companyName={iex.companyName}
        cash={user.cash}
        current={current}
        userId={user.id}
      />
    </div>
  )
}

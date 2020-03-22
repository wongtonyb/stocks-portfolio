import React from 'react'

export const StatsInfo = props => {
  function letterValue(labelValue) {
    // Nine Zeroes for Trillion
    return Math.abs(Number(labelValue)) >= 1.0e12
      ? (Math.abs(Number(labelValue)) / 1.0e12).toFixed(2) + 'T'
      : // Six Zeroes for Billions
      Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'B'
      : // Three Zeroes for Million
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'M'
      : Math.abs(Number(labelValue))
  }

  return (
    <div id="stats-info">
      <h1>Stats</h1>
      <div id="main">
        <div id="left">
          <div className="stat">
            <h3>OPEN</h3>
            <h2>{props.open}</h2>
          </div>
          <div className="stat">
            <h3>HIGH</h3>
            <h2>{props.high}</h2>
          </div>
          <div className="stat">
            <h3>LOW</h3>
            <h2>{props.low}</h2>
          </div>
        </div>
        <div id="right">
          <div className="stat">
            <h3>VOLUME</h3>
            <h2>{letterValue(props.volume)}</h2>
          </div>
          <div className="stat">
            <h3>AVG VOL</h3>
            <h2>{letterValue(props.avgVol)}</h2>
          </div>
          <div className="stat">
            <h3>MARKET CAP</h3>
            <h2>{letterValue(props.marketCap)}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

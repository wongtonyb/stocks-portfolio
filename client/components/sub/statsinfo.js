import React from 'react'

export const StatsInfo = props => {
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
            <h2>{props.volume}</h2>
          </div>
          <div className="stat">
            <h3>AVG VOL</h3>
            <h2>{props.avgVol}</h2>
          </div>
          <div className="stat">
            <h3>MARKET CAP</h3>
            <h2>{props.marketCap}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

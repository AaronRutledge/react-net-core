import React from 'react'

const QuoteList = (props) =>
  <dl>
    <dt>Market Cap</dt>
    <dd>{props.quote.quote.marketCap}</dd>
    <dt>Last Price</dt>
    <dd>{props.quote.quote.priceLast}</dd>
    <img src={props.quote.chart.dataUri}/>
  </dl>

export default QuoteList

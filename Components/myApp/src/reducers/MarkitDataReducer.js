import Types from '../actions/Types'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = {
    "symbol": "TSLA",
    "companyProfile": {
        "businessDescription": "",
        "officers": [{
            "firstName": "",
            "lastName": "",
            "position": ""
        }]
    },
    "dividends": {
        "amount": null,
        "exDate": "",
        "frequency": "",
        "payDate": "",
        "yield": null
    },
    "quote": {
        "chart": {
            "dataUri": "",
            "data": ""
        },
        "quote": {
            "asOf": "",
            "marketCap": null,
            "priceChange": null,
            "priceChangePercent": null,
            "priceChangeYTD": null,
            "priceChangePercentYTD": null,
            "priceDayHigh": null,
            "priceDayLow": null,
            "priceFiftyTwoWeekHigh": null,
            "priceFiftyTwoWeekLow": null,
            "priceLast": null,
            "priceOpen": null
        }
    }
}

const requestIndex = (state, action) =>
  Object.assign({}, state, {
    fetching: true,
    name: action.name,
    symbol: action.symbol
  })

const receiveIndex = (state, action) =>
  Object.assign({}, state, {
    fetching: false,
    error: null,
    wholeEnchilada: action.index,
    companyProfile: action.index.data.companyProfile,
    dividends: action.index.data.dividends,
    quote: action.index.data.quote
  })


const failure = (state, action) =>
  Object.assign({}, state, {
    fetching: false,
    error: true,
    message: action,
  })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.API_REQUEST_INDEX]: requestIndex,
  [Types.API_RECEIVE_INDEX]: receiveIndex,
  [Types.API_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)

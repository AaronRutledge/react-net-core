
import Types from './Types'
// /example/index/{symbol}
// /example/index/{symbol}/chart
// /example/lookup/{search}
// /example/quote/{symbol}

const requestIndex = (symbol) =>
  ({
    type: Types.API_REQUEST_INDEX,
    endPoint: `index/${symbol}`,
    params: {},
    ajaxType: "GET",
    onSuccess: receiveIndex
  })

const receiveIndex = response =>
  ({ type: Types.API_RECEIVE_INDEX,
    index: response
  })

const receiveApiFailure= (message) =>
  ({ type: Types.API_FAILURE,
  message})

export {
  requestIndex,
  receiveIndex,
  receiveApiFailure
}

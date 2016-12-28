import {
  take,
  call,
  put,
  select
} from 'redux-saga/effects'
import Types from '../actions/Types'
import {
  receiveApiFailure
} from '../actions/MarkitActions'

// This style of Saga is a common pattern.  It has a
// worker and a watcher.
//
// The watcher listens for the signal, and the worker
// does the job.

// We use a factory function will close over the scope of
// our watcher saga.  This ensures the API is passed in
// (hurray objects being composed).
export default (api) => {
  // ---------
  // The Worker
  // ----------
  // This is our worker.  It does the job.  In this case, we
  // get the qoute for the company
  function* worker(endPoint, parameters, successAction, ajaxType) {
    // Set response to true to return empty array if empty string
    //var response = {ok: true}
    // make the call to the api

    var apiType;
    switch (ajaxType) {
      case "POST":
        apiType = api.postData;
        break;
      case "PUT":
        apiType = api.putData;
        break;
      case "DELETE":
        apiType = api.deleteData;
        break;
      default:
        apiType = api.getData;
    }
    try {
      const response = yield call(apiType, endPoint, parameters);
      // success?
      if (response.ok) {
        //TODO: Need to check for a invalid token message returned here
        yield put(successAction(response.data))
      } else {
        yield put(receiveApiFailure("bad data"))
      }
    } catch (error) {
      yield put(receiveApiFailure("bad call "+error))
    }
  }

  // -----------
  // The Watcher
  // -----------
  // Make a watcher.  It's daemon.  It runs on startup and does
  // a few things:
  //
  // 1.  Goes into a loop to ensure it stays alive.
  // 2.  Listens for redux events
  // 3.  Unpacks the action.
  // 4.  Calls the worker (above) to do the job.
  function * watcher () {
    while (true) {
      const action = yield take(Types.API_REQUEST_INDEX)
      yield call(worker, action.endPoint, action.params, action.onSuccess, action.ajaxType)
    }
  }

  // Expose both functions.  Now, technically, we're only
  // needing to return the watcher.  If we return both, we
  // gain 2 important properties:
  //
  // 1.  We can test the worker directly without need to
  // mock the watcher taking.
  //
  // 2.  We can call the worker from other sagas which is
  // often required in some flow control cases.
  return {
    watcher,
    worker
  }
}

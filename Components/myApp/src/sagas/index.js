import endpoints from '../services/endpoints';

import { fork } from 'redux-saga/effects';
import markitDataSaga from './MarkitDataSaga';
import markitApi from '../services/MarkitApi';

const MarkitDataApi = markitApi.create(endpoints.MARKIT);

// start the daemons
export default function* root() {
  yield fork(markitDataSaga(MarkitDataApi).watcher);
}

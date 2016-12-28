// A list of all actions in the system.
import { createTypes } from 'reduxsauce';

export default createTypes(`
  API_REQUEST_INDEX
  API_RECEIVE_INDEX
  API_REQUEST_QUOTE
  API_RECEIVE_QUOTE
  API_REQUEST_CHART
  API_RECEIVE_CHART
  API_FAILURE
`);

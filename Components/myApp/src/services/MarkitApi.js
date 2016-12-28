// a library to wrap and simplify api calls
import apisauce from 'apisauce'

const create = (baseURL) => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {'Accept': 'application/json'},
    // 10 second timeout...
    timeout: 10000
  })

  const getData = (endPoint, parameters) => api.get(endPoint, parameters);
  const postData = (endPoint, parameters) => api.post(endPoint, parameters);
  const putData = (endPoint, parameters) => api.put(endPoint, parameters);
  const deleteData = (endPoint, parameters) => api.delete(endPoint, parameters);
  return {
    // a list of the API functions from step 2
    getData,
    postData,
    putData,
    deleteData
  }
}

// let's return back our create method as the default.
export default {
  create
}

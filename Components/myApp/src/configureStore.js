import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistStore, autoRehydrate, storages } from 'redux-persist';
import rootReducer from './reducers';
import sagas from './sagas/';

export default function configureStore(initialState) {
  let middleware = applyMiddleware();
  const sagaMiddleware = createSagaMiddleware();
  let enhancer;

  if (process.env.NODE_ENV !== 'production') {
    const middlewares = [];
    const logger = createLogger();

    middlewares.push(logger);
    middlewares.push(sagaMiddleware);

    const invariant = require('redux-immutable-state-invariant'); // eslint-disable-line global-require

    middlewares.push(invariant());
    middleware = applyMiddleware(...middlewares);

    enhancer = compose(
      autoRehydrate(),
      // Middleware we want to use in development
      middleware,
    );
  } else {
    middleware = applyMiddleware(sagaMiddleware);
    enhancer = compose(autoRehydrate(), middleware);
  }
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, initialState, composeEnhancers(enhancer));
  persistStore(store);
  // run sagas
  sagaMiddleware.run(sagas);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers').default) // eslint-disable-line global-require
    );
  }

  return store;
}
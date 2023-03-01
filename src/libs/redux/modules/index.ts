/**
 * Author : Ryan
 * Date : 2023-02-24
 * Desc : index
 */

import { CombinedState, combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { TMainReducer } from './main/reducers';
import main from './main';

interface IState {
  main: TMainReducer;
}

// Root Reducer
const rootReducer = (state: IState | undefined, action: any): CombinedState<IState> => {
  const combineReducer = combineReducers({
    main: main.reducer,
  });
  return combineReducer(state, action);
};

// Root Saga
function* rootSaga() {
  yield all([fork(main.saga)]);
}

export type RootState = ReturnType<typeof rootReducer>;

export default {
  rootReducer: rootReducer,
  rootSaga: rootSaga,
};

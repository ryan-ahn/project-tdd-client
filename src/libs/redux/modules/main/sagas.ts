/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : sagas
 */

import { fork, all, takeLatest, call, put } from 'redux-saga/effects';
import { PayloadAction } from 'typesafe-actions';
import queryString from 'query-string';
import * as actions from './actions';
import * as apis from './apis';
import * as types from './types';

function* getMessageListSaga(
  action: PayloadAction<'GET_MESSAGE_LIST_REQUEST', types.TGetMessageListReq>,
) {
  try {
    const result: types.TGetMessageListRes = yield call(apis.getMessageListApi, action.payload);
    yield put({
      type: actions.GET_MESSAGE_LIST_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.GET_MESSAGE_LIST_FAILURE,
      payload: e,
    });
  }
}
function* watchGetMessageList() {
  yield takeLatest(actions.GET_MESSAGE_LIST_REQUEST, getMessageListSaga);
}

function* getMessageCountSaga(
  action: PayloadAction<'GET_MESSAGE_COUNT_REQUEST', types.TGetMessageCountReq>,
) {
  try {
    const result: types.TGetMessageCountRes = yield call(apis.getMessageCountApi, action.payload);
    yield put({
      type: actions.GET_MESSAGE_COUNT_SUCCESS,
      payload: result,
    });
  } catch (e) {
    yield put({
      type: actions.GET_MESSAGE_COUNT_FAILURE,
      payload: e,
    });
  }
}
function* watchGetMessageCount() {
  yield takeLatest(actions.GET_MESSAGE_COUNT_REQUEST, getMessageCountSaga);
}

function* postMessageSaga(action: PayloadAction<'POST_MESSAGE_REQUEST', types.TPostMessageReq>) {
  try {
    const result: types.TPostMessageRes = yield call(apis.postMessageApi, action.payload);
    yield put({
      type: actions.POST_MESSAGE_SUCCESS,
      payload: result,
    });
    yield put({
      type: actions.GET_MESSAGE_LIST_REQUEST,
      payload: {
        filter: queryString.parse(window.location.search).filter
          ? queryString.parse(window.location.search).filter
          : '0',
        page: '1',
      },
    });
    yield put({
      type: actions.GET_MESSAGE_COUNT_REQUEST,
      payload: {
        filter: queryString.parse(window.location.search).filter
          ? queryString.parse(window.location.search).filter
          : '0',
      },
    });
  } catch (e) {
    yield put({
      type: actions.POST_MESSAGE_FAILURE,
      payload: e,
    });
  }
}
function* watchPostMessage() {
  yield takeLatest(actions.POST_MESSAGE_REQUEST, postMessageSaga);
}

function* putMessageSaga(action: PayloadAction<'PUT_MESSAGE_REQUEST', types.TPutMessageReq>) {
  const result: types.TPutMessageRes = yield call(apis.putMessageApi, action.payload);
  try {
    yield put({
      type: actions.PUT_MESSAGE_SUCCESS,
      payload: result,
    });
    yield put({
      type: actions.GET_MESSAGE_LIST_REQUEST,
      payload: {
        filter: queryString.parse(window.location.search).filter
          ? queryString.parse(window.location.search).filter
          : '0',
        page: '1',
      },
    });
  } catch (e) {
    yield put({
      type: actions.PUT_MESSAGE_FAILURE,
      payload: e,
    });
  }
}
function* watchPutMessage() {
  yield takeLatest(actions.PUT_MESSAGE_REQUEST, putMessageSaga);
}

function* putMessageStatusSaga(
  action: PayloadAction<'PUT_MESSAGE_STATUS_REQUEST', types.TPutMessageStatusReq>,
) {
  const result: types.TPutMessageStatusRes = yield call(apis.putMessageStatusApi, action.payload);
  try {
    yield put({
      type: actions.PUT_MESSAGE_STATUS_SUCCESS,
      payload: result,
    });
    yield put({
      type: actions.GET_MESSAGE_LIST_REQUEST,
      payload: {
        filter: queryString.parse(window.location.search).filter
          ? queryString.parse(window.location.search).filter
          : '0',
        page: '1',
      },
    });
    yield put({
      type: actions.GET_MESSAGE_COUNT_REQUEST,
      payload: {
        filter: queryString.parse(window.location.search).filter
          ? queryString.parse(window.location.search).filter
          : '0',
      },
    });
  } catch (e) {
    yield put({
      type: actions.PUT_MESSAGE_STATUS_FAILURE,
      payload: e,
    });
  }
}
function* watchPutMessageStatus() {
  yield takeLatest(actions.PUT_MESSAGE_STATUS_REQUEST, putMessageStatusSaga);
}

function* putMessageRefSaga(
  action: PayloadAction<'PUT_MESSAGE_REF_REQUEST', types.TPutMessageRefReq>,
) {
  const result: types.TPutMessageRefRes = yield call(apis.putMessageRefApi, action.payload);
  try {
    yield put({
      type: actions.PUT_MESSAGE_REF_SUCCESS,
      payload: result,
    });
    yield put({
      type: actions.GET_MESSAGE_LIST_REQUEST,
      payload: {
        filter: queryString.parse(window.location.search).filter
          ? queryString.parse(window.location.search).filter
          : '0',
        page: '1',
      },
    });
  } catch (e) {
    yield put({
      type: actions.PUT_MESSAGE_REF_FAILURE,
      payload: e,
    });
  }
}
function* watchPutMessageRef() {
  yield takeLatest(actions.PUT_MESSAGE_REF_REQUEST, putMessageRefSaga);
}

function* deleteMessageSaga(action: PayloadAction<'DELETE_MESSAGE_REQUEST', types.TPutMessageReq>) {
  const result: types.TPutMessageRes = yield call(apis.deleteMessageApi, action.payload);
  try {
    yield put({
      type: actions.DELETE_MESSAGE_SUCCESS,
      payload: result,
    });
    yield put({
      type: actions.GET_MESSAGE_LIST_REQUEST,
      payload: {
        filter: queryString.parse(window.location.search).filter
          ? queryString.parse(window.location.search).filter
          : '0',
        page: '1',
      },
    });
    yield put({
      type: actions.GET_MESSAGE_COUNT_REQUEST,
      payload: {
        filter: queryString.parse(window.location.search).filter
          ? queryString.parse(window.location.search).filter
          : '0',
      },
    });
  } catch (e) {
    yield put({
      type: actions.DELETE_MESSAGE_FAILURE,
      payload: e,
    });
  }
}
function* watchDeleteMessage() {
  yield takeLatest(actions.DELETE_MESSAGE_REQUEST, deleteMessageSaga);
}

export default function* mainSaga() {
  yield all([
    fork(watchGetMessageList),
    fork(watchPostMessage),
    fork(watchGetMessageCount),
    fork(watchPutMessage),
    fork(watchPutMessageStatus),
    fork(watchDeleteMessage),
    fork(watchPutMessageRef),
  ]);
}

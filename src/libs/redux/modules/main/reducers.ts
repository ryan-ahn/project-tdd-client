/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : reducers
 */

import { TMessageList } from '@libs/models/main';
import { createReducer, ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type MainActions = ActionType<typeof actions>;

export type TMainReducer = {
  messages: TMessageList | null;
  count: number;
  loading: boolean;
  error: string | null;
};

export const initialState = {
  messages: null,
  count: 0,
  loading: false,
  error: null,
};

const mainReducer = createReducer<TMainReducer, MainActions>(initialState, {
  [actions.GET_MESSAGE_LIST_REQUEST]: state => ({
    ...state,
    loading: true,
  }),
  [actions.GET_MESSAGE_LIST_SUCCESS]: (state, action) => ({
    ...state,
    messages: action.payload,
    loading: false,
  }),
  [actions.GET_MESSAGE_LIST_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.message,
  }),

  [actions.GET_MESSAGE_COUNT_REQUEST]: state => ({
    ...state,
    loading: true,
  }),
  [actions.GET_MESSAGE_COUNT_SUCCESS]: (state, action) => ({
    ...state,
    count: action.payload.count,
    loading: false,
  }),
  [actions.GET_MESSAGE_COUNT_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.message,
  }),

  [actions.POST_MESSAGE_REQUEST]: state => ({
    ...state,
    loading: true,
  }),
  [actions.POST_MESSAGE_SUCCESS]: state => ({
    ...state,
    loading: false,
  }),
  [actions.POST_MESSAGE_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.message,
  }),

  [actions.PUT_MESSAGE_REQUEST]: state => ({
    ...state,
    loading: true,
  }),
  [actions.PUT_MESSAGE_SUCCESS]: state => ({
    ...state,
    loading: false,
  }),
  [actions.PUT_MESSAGE_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.message,
  }),

  [actions.PUT_MESSAGE_STATUS_REQUEST]: state => ({
    ...state,
    loading: true,
  }),
  [actions.PUT_MESSAGE_STATUS_SUCCESS]: state => ({
    ...state,
    loading: false,
  }),
  [actions.PUT_MESSAGE_STATUS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.message,
  }),

  [actions.PUT_MESSAGE_REF_REQUEST]: state => ({
    ...state,
    loading: true,
  }),
  [actions.PUT_MESSAGE_REF_SUCCESS]: state => ({
    ...state,
    loading: false,
  }),
  [actions.PUT_MESSAGE_REF_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.message,
  }),

  [actions.DELETE_MESSAGE_REQUEST]: state => ({
    ...state,
    loading: true,
  }),
  [actions.DELETE_MESSAGE_SUCCESS]: state => ({
    ...state,
    loading: false,
  }),
  [actions.DELETE_MESSAGE_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.message,
  }),
});

export default mainReducer;

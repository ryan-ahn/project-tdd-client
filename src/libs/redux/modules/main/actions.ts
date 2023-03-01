/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : actions
 */

import { AxiosError } from 'axios';
import { createAsyncAction, EmptyAction } from 'typesafe-actions';
import * as types from './types';

const API_HOST = 'http://localhost:3000/api/';

export const GET_MESSAGE_LIST_URL = `${API_HOST}message/`;
export const GET_MESSAGE_LIST_REQUEST = 'GET_MESSAGE_LIST_REQUEST';
export const GET_MESSAGE_LIST_SUCCESS = 'GET_MESSAGE_LIST_SUCCESS';
export const GET_MESSAGE_LIST_FAILURE = 'GET_MESSAGE_LIST_FAILURE';
export const getMessageListAction = createAsyncAction(
  GET_MESSAGE_LIST_REQUEST,
  GET_MESSAGE_LIST_SUCCESS,
  GET_MESSAGE_LIST_FAILURE,
)<types.TGetMessageListReq, types.TGetMessageListRes, AxiosError>();

export const GET_MESSAGE_COUNT_URL = `${API_HOST}count/`;
export const GET_MESSAGE_COUNT_REQUEST = 'GET_MESSAGE_COUNT_REQUEST';
export const GET_MESSAGE_COUNT_SUCCESS = 'GET_MESSAGE_COUNT_SUCCESS';
export const GET_MESSAGE_COUNT_FAILURE = 'GET_MESSAGE_COUNT_FAILURE';
export const getMessageCountAction = createAsyncAction(
  GET_MESSAGE_COUNT_REQUEST,
  GET_MESSAGE_COUNT_SUCCESS,
  GET_MESSAGE_COUNT_FAILURE,
)<types.TGetMessageCountReq, types.TGetMessageCountRes, AxiosError>();

export const POST_MESSAGE_URL = `${API_HOST}message/`;
export const POST_MESSAGE_REQUEST = 'POST_MESSAGE_REQUEST';
export const POST_MESSAGE_SUCCESS = 'POST_MESSAGE_SUCCESS';
export const POST_MESSAGE_FAILURE = 'POST_MESSAGE_FAILURE';
export const postMessageAction = createAsyncAction(
  POST_MESSAGE_REQUEST,
  POST_MESSAGE_SUCCESS,
  POST_MESSAGE_FAILURE,
)<types.TPostMessageReq, types.TPostMessageRes, AxiosError>();

export const PUT_MESSAGE_URL = `${API_HOST}message/`;
export const PUT_MESSAGE_REQUEST = 'PUT_MESSAGE_REQUEST';
export const PUT_MESSAGE_SUCCESS = 'PUT_MESSAGE_SUCCESS';
export const PUT_MESSAGE_FAILURE = 'PUT_MESSAGE_FAILURE';
export const putMessageAction = createAsyncAction(
  PUT_MESSAGE_REQUEST,
  PUT_MESSAGE_SUCCESS,
  PUT_MESSAGE_FAILURE,
)<types.TPutMessageReq, types.TPutMessageRes, AxiosError>();

export const PUT_MESSAGE_STATUS_URL = `${API_HOST}message/status/`;
export const PUT_MESSAGE_STATUS_REQUEST = 'PUT_MESSAGE_STATUS_REQUEST';
export const PUT_MESSAGE_STATUS_SUCCESS = 'PUT_MESSAGE_STATUS_SUCCESS';
export const PUT_MESSAGE_STATUS_FAILURE = 'PUT_MESSAGE_STATUS_FAILURE';
export const putMessageStatusAction = createAsyncAction(
  PUT_MESSAGE_STATUS_REQUEST,
  PUT_MESSAGE_STATUS_SUCCESS,
  PUT_MESSAGE_STATUS_FAILURE,
)<types.TPutMessageStatusReq, types.TPutMessageStatusRes, AxiosError>();

export const PUT_MESSAGE_REF_URL = `${API_HOST}message/ref/`;
export const PUT_MESSAGE_REF_REQUEST = 'PUT_MESSAGE_REF_REQUEST';
export const PUT_MESSAGE_REF_SUCCESS = 'PUT_MESSAGE_REF_SUCCESS';
export const PUT_MESSAGE_REF_FAILURE = 'PUT_MESSAGE_REF_FAILURE';
export const putMessageRefAction = createAsyncAction(
  PUT_MESSAGE_REF_REQUEST,
  PUT_MESSAGE_REF_SUCCESS,
  PUT_MESSAGE_REF_FAILURE,
)<types.TPutMessageRefReq, types.TPutMessageRefRes, AxiosError>();

export const DELETE_MESSAGE_URL = `${API_HOST}message/`;
export const DELETE_MESSAGE_REQUEST = 'DELETE_MESSAGE_REQUEST';
export const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS';
export const DELETE_MESSAGE_FAILURE = 'DELETE_MESSAGE_FAILURE';
export const deleteMessageAction = createAsyncAction(
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAILURE,
)<types.TPutMessageReq, EmptyAction<any>, AxiosError>();

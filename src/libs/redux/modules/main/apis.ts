/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : apis
 */

import axios from 'axios';
import * as actions from './actions';
import * as types from './types';

export async function getMessageListApi(payload: types.TGetMessageListReq) {
  try {
    const response = await axios.get(
      `${actions.GET_MESSAGE_LIST_URL}?filter=${payload.filter}&page=${payload.page}`,
    );
    const result: types.TGetMessageListRes = response.data.messages;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}

export async function getMessageCountApi(payload: types.TGetMessageCountReq) {
  try {
    const response = await axios.get(`${actions.GET_MESSAGE_COUNT_URL}?filter=${payload.filter}`);
    const result: types.TGetMessageCountRes = response.data;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}

export async function postMessageApi(payload: types.TPostMessageReq) {
  try {
    const response = await axios.post(`${actions.POST_MESSAGE_URL}`, payload);
    const result: types.TPostMessageRes = response.data.messages;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}

export async function putMessageApi(payload: types.TPutMessageReq) {
  try {
    const response = await axios.put(`${actions.PUT_MESSAGE_URL}${payload.id}/`, payload.message);
    const result: any = response.data.messages;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}

export async function putMessageStatusApi(payload: types.TPutMessageStatusReq) {
  try {
    const response = await axios.put(`${actions.PUT_MESSAGE_STATUS_URL}${payload.id}/`);
    const result: any = response.data.messages;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}

export async function putMessageRefApi(payload: types.TPutMessageRefReq) {
  try {
    const response = await axios.put(`${actions.PUT_MESSAGE_REF_URL}${payload.id}/`, payload.ref);
    const result: any = response.data.messages;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}

export async function deleteMessageApi(payload: types.TPutMessageReq) {
  try {
    const response = await axios.delete(`${actions.DELETE_MESSAGE_URL}${payload.id}/`);
    const result: any = response.data.messages;
    return result;
  } catch (e) {
    throw new Error(e as any);
  }
}

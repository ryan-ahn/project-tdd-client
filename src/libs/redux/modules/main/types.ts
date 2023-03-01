/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : types
 */

import { TMessage, TMessageList } from '@libs/models/main';

export type TGetMessageListReq = {
  filter: string;
  page: string;
};

export type TGetMessageListRes = TMessageList;

export type TGetMessageCountReq = {
  filter: string;
};

export type TGetMessageCountRes = {
  count: number;
};

export type TPostMessageReq = {
  message: string;
};

export type TPostMessageRes = TMessageList;

export type TPutMessageReq = {
  id: number | string;
  message: string;
};

export type TPutMessageRes = {
  message: string;
};

export type TPutMessageStatusReq = {
  id: number | string;
};

export type TPutMessageStatusRes = {
  message: string;
};

export type TPutMessageRefReq = {
  id: number;
  ref: TMessage;
};

export type TPutMessageRefRes = {
  message: string;
};

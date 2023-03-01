/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : api model
 */

export type TStatus = boolean | 'delete';

export type TMessage = {
  id: number | string;
  message: string;
  created: string;
  modify: string;
  status: TStatus;
  reference: Array<TMessage>;
};

export type TMessageList = TMessage[];

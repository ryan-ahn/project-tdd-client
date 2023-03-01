/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : Text
 */
export interface IFilter {
  id: number;
  text: string;
}

const FILTER: IFilter[] = [
  { id: 0, text: 'All' },
  { id: 1, text: 'Active' },
  { id: 2, text: 'Completed' },
];

export const TEXT = {
  MAIN: {
    title: 'Marq-Todo✏️',
    addButton: 'Add Todo',
    inputPlaceholder: '할 일을 입력해 주세요',
    editButton: 'Edit',
    deleteButton: 'Delete',
    refButton: 'Ref',
    confirmButton: '확인',
    cancelButton: '취소',
    count: ' tasks',
    filter: FILTER,
  },
  COMMON: {
    nothing: '할 일이 없습니다.',
  },
};

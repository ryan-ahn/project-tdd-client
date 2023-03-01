/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : toDoList
 */

import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useCallback, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { TMessageList } from '@libs/models/main';
import ToDoItem from './ToDoItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@libs/redux/modules';
import LoadingSpinner from '@components/common/Spinner';
import { TEXT } from '@containers/text';
import { GET_MESSAGE_LIST_REQUEST } from '@libs/redux/modules/main/actions';

export default function ToDoList() {
  // State
  const { messages } = useSelector((state: RootState) => state.main);
  // Query
  const qs = queryString.parse(useLocation().search);
  // Hooks
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch({
      type: GET_MESSAGE_LIST_REQUEST,
      payload: { filter: qs.filter ? qs.filter : '0', page: qs.page ? qs.page : '1' },
    });
  }, [qs.filter, qs.page]);

  // render List
  const renderList = useCallback((data: TMessageList) => {
    if (data.length) {
      return data.map(item => <ToDoItem key={item.id} data={item} />);
    } else {
      return <NothingWrapper>{TEXT.COMMON.nothing}</NothingWrapper>;
    }
  }, []);

  if (messages !== null) {
    return <ListWrapper>{renderList(messages)}</ListWrapper>;
  } else {
    return (
      <LoadingWrapper>
        <LoadingSpinner />
      </LoadingWrapper>
    );
  }
}

const ListWrapper = styled.div`
  ${({ theme }) => theme.boxSet('100%', '100%', '0px')};
  padding: 20px 0;
`;

const LoadingWrapper = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  padding: 30px;
`;

const NothingWrapper = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  padding: 30px;
  ${({ theme }) => theme.fontSet(16, 100, 20)};
`;

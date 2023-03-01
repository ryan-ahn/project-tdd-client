/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : Main index
 */

import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import { TEXT } from '@containers/text';
import { RootState } from '@libs/redux/modules';
import { GET_MESSAGE_COUNT_REQUEST } from '@libs/redux/modules/main/actions';
import CommonTitle from '@components/common/Title';
import AddTodo from './AddTodo';
import Filter from './Filter';
import ToDoList from './ToDoList';
import Pagination from './Pagination';

export default function Main() {
  // State
  const { count } = useSelector((state: RootState) => state.main);
  // Query
  const qs = queryString.parse(useLocation().search);
  // Hooks
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch({ type: GET_MESSAGE_COUNT_REQUEST, payload: { filter: qs.filter ? qs.filter : '0' } });
  }, [qs.filter]);

  return (
    <Wrapper>
      <ContentArea>
        <TitleBlock>
          <CommonTitle title={TEXT.MAIN.title} titleSize={50} titleWeight={700} />
        </TitleBlock>
        <AddTodoBlock>
          <AddTodo />
        </AddTodoBlock>
        <FilterBlock>
          <Filter />
        </FilterBlock>
        <ListBlock>
          <ToDoList />
        </ListBlock>
        {count > 5 ? (
          <PageBlock>
            <Pagination />
          </PageBlock>
        ) : null}
      </ContentArea>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '100vh', '0px')};
`;

const ContentArea = styled.div`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'column')};
  ${({ theme }) => theme.boxSet('800px', '100%', '0px')};
  padding: 30px;
`;

const TitleBlock = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '100px', '0px')};
`;

const AddTodoBlock = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '80px', '0px')};
`;

const FilterBlock = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '50px', '0px')};
`;

const ListBlock = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
`;

const PageBlock = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '80px', '0px')};
`;

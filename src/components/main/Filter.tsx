/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : filter
 */

import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import styled, { css } from 'styled-components';
import { IFilter, TEXT } from '@containers/text';
import { RootState } from '@libs/redux/modules';

type TToggleAttribute = {
  attrActive: boolean;
};

export default function Filter() {
  // State
  const { count } = useSelector((state: RootState) => state.main);
  // Query
  const qs = queryString.parse(window.location.search);

  // render List
  const renderList = useCallback(
    (data: IFilter[]) => {
      return (
        <>
          {data.map(item => (
            <Link key={item.id} to={`/?filter=${item.id}&page=1`}>
              <ToDoStatusItem
                data-testid={item.id}
                attrActive={item.id === Number(qs.filter ? qs.filter : 0)}
              >
                {item.text}
              </ToDoStatusItem>
            </Link>
          ))}
        </>
      );
    },
    [qs],
  );

  return (
    <Wrapper>
      <TodoCountText>{count + TEXT.MAIN.count}</TodoCountText>
      <TodoStatusBox>{renderList(TEXT.MAIN.filter)}</TodoStatusBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '100%', '0px')};
`;

const TodoCountText = styled.p`
  ${({ theme }) => theme.fontSet(16, 700, 22)};
`;

const TodoStatusBox = styled.ul`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  gap: 5px;
`;

const ToDoStatusItem = styled.li<TToggleAttribute>`
  padding: 7px 15px;
  border-radius: 20px;
  ${({ theme }) => theme.fontSet(16, 700, 22)};
  ${({ theme }) => theme.colorSet('black', 'white')};
  ${props =>
    props.attrActive &&
    css`
      ${({ theme }) => theme.colorSet('black', '#fac0bb')};
    `}
`;

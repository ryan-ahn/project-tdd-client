/**
 * Author : Ryan
 * Date : 2023-02-27
 * Desc : Pagination
 */

import { useCallback, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import styled, { css } from 'styled-components';
import { RootState } from '@libs/redux/modules';

type TToggleAttribute = {
  attrActive: boolean;
};

export default function Pagination() {
  // State
  const { count } = useSelector((state: RootState) => state.main);
  const [pageArray, setPageArray] = useState<Array<number>>([]);
  // Query
  const qs = queryString.parse(window.location.search);

  useLayoutEffect(() => {
    if (count !== 0) {
      const pageSet = Array.from({ length: Math.ceil(count / 5) }, (_, i) => i + 1);
      setPageArray(pageSet);
    }
  }, [count]);

  // render List
  const renderPageList = useCallback(() => {
    return pageArray.map(page => (
      <Link key={page} to={`/?filter=${qs.filter}&page=${page}`}>
        <PageBox key={page} attrActive={page === Number(qs.page)}>
          {page}
        </PageBox>
      </Link>
    ));
  }, [qs.page, pageArray, count]);

  return <PageWrapper>{renderPageList()}</PageWrapper>;
}

const PageWrapper = styled.div`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  gap: 10px;
`;

const PageBox = styled.p<TToggleAttribute>`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('30px', '30px', '50%')};
  ${({ theme }) => theme.fontSet(16, 700, 25)};
  cursor: pointer;
  ${props =>
    props.attrActive &&
    css`
      ${({ theme }) => theme.colorSet('black', '#fac0bb')};
    `}
`;

/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : meta
 */

interface TMETA {
  MAIN: TPAGE_MATE;
}

interface TPAGE_MATE {
  title: string;
  description: string;
  keyword: string;
}

export const META: TMETA = {
  MAIN: {
    title: '투두리스트',
    description: '리액트로 TDD테스트를 해보자',
    keyword: 'Typescript, React, TDD, SAGA, MSW',
  },
};

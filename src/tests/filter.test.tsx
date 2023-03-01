/**
 * Author : Ryan
 * Date : 2023-02-28
 * Desc : 메인 filter 체크
 */

import { MemoryRouter as Router } from 'react-router-dom';
import { screen } from '@testing-library/dom';
import queryString from 'query-string';
import useRender from '@libs/utils/useRender';
import Filter from '@components/main/Filter';

interface IFilter {
  id: number;
  text: string;
}

describe('<Filter/>', () => {
  const initialFilter: IFilter[] = [
    { id: 0, text: 'All' },
    { id: 1, text: 'Active' },
    { id: 2, text: 'Completed' },
  ];
  const setup = () => {
    const utils = useRender(
      <Router>
        <Filter />
      </Router>,
    );
    const allButton = screen.getByTestId(initialFilter[0].id);
    const activeButton = screen.getByTestId(initialFilter[1].id);
    const completedButton = screen.getByTestId(initialFilter[2].id);
    const location = {
      ...window.location,
      search: `?filter=${initialFilter[0].id}`,
    };
    return {
      ...utils,
      allButton,
      activeButton,
      completedButton,
      location,
    };
  };

  it('has button', () => {
    const { allButton, activeButton, completedButton } = setup();
    expect(allButton).toBeInTheDocument();
    expect(allButton).toBeTruthy();
    expect(allButton).toHaveTextContent(initialFilter[0].text);
    expect(activeButton).toBeInTheDocument();
    expect(activeButton).toBeTruthy();
    expect(activeButton).toHaveTextContent(initialFilter[1].text);
    expect(completedButton).toBeInTheDocument();
    expect(completedButton).toBeTruthy();
    expect(completedButton).toHaveTextContent(initialFilter[2].text);
  });

  it('to equal params', () => {
    const { location } = setup();
    expect(queryString.parse(location.search).filter).toEqual(String(initialFilter[0].id));
  });
});

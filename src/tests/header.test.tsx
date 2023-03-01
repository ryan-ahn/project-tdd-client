/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : 메인 헤더 체크
 */

import { MemoryRouter as Router } from 'react-router-dom';
import { screen } from '@testing-library/dom';
import Main from '@components/main';
import { TEXT } from '@containers/text';
import useRender from '@libs/utils/useRender';

describe('<Main/>', () => {
  const setup = () => {
    const utils = useRender(
      <Router>
        <Main />
      </Router>,
    );
    const title = screen.getByTestId('testHeader');
    return {
      ...utils,
      title,
    };
  };

  it('has header', () => {
    const { title } = setup();
    expect(title).toBeInTheDocument();
    expect(title).toBeTruthy();
    expect(title).toHaveTextContent(TEXT.MAIN.title);
  });
});

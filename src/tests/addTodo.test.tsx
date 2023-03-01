/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : 메인 input 체크
 */

import { MemoryRouter as Router } from 'react-router-dom';
import { screen } from '@testing-library/dom';
import { fireEvent } from '@testing-library/react';
import { TEXT } from '@containers/text';
import useRender from '@libs/utils/useRender';
import AddTodo from '@components/main/AddTodo';

describe('<AddTodo/>', () => {
  const setup = () => {
    const utils = useRender(
      <Router>
        <AddTodo />
      </Router>,
    );
    const input = screen.getByTestId('inputTodo');
    const button = screen.getByTestId('addButton');
    return {
      ...utils,
      input,
      button,
    };
  };

  it('has input & button', () => {
    const { input, button } = setup();
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus();
    expect(input).toHaveAttribute('placeholder', TEXT.MAIN.inputPlaceholder);
    expect(button).toBeInTheDocument();
  });

  it('onChange', () => {
    const { input } = setup();
    fireEvent.change(input, {
      target: {
        value: 'message',
      },
    });
    expect(input).toHaveAttribute('value', 'message');
  });

  it('onClick', () => {
    const { input, button } = setup();
    fireEvent.click(button);
    expect(input).toHaveAttribute('value', '');
  });
});

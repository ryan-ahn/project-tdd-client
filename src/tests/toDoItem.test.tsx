/**
 * Author : Ryan
 * Date : 2023-02-28
 * Desc : 메인 to do list 체크
 */

import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import { TEXT } from '@containers/text';
import useRender from '@libs/utils/useRender';
import ToDoItem from '@components/main/ToDoItem';

configure({ adapter: new Adapter() });

interface TMessage {
  id: number | string;
  message: string;
  created: string;
  modify: string;
  status: TStatus;
  reference: Array<any>;
}
type TStatus = boolean | 'delete';

describe('<ToDoItem/>', () => {
  const initialData: TMessage = {
    id: 0,
    message: 'message test!',
    created: '2023-03-01T09:09:36.738Z',
    modify: '2023-03-01T09:09:36.738Z',
    status: true,
    reference: [],
  };
  const setup = (props: any) => {
    const initialProps = { data: initialData };
    const utils = useRender(
      <Router>
        <ToDoItem {...initialProps} {...props} />
      </Router>,
    );
    const editButton = screen.getByTestId('editButton');
    const deleteButton = screen.getByTestId('deleteButton');
    const refButton = screen.getByTestId('refButton');
    const h2 = screen.getByTestId('messageText');
    return {
      ...utils,
      editButton,
      deleteButton,
      refButton,
      h2,
    };
  };

  it('has button', () => {
    const { editButton, deleteButton, refButton } = setup({});
    expect(editButton).toBeInTheDocument();
    expect(editButton).toBeTruthy();
    expect(editButton).toHaveTextContent(TEXT.MAIN.editButton);
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toBeTruthy();
    expect(deleteButton).toHaveTextContent(TEXT.MAIN.deleteButton);
    expect(refButton).toBeInTheDocument();
    expect(refButton).toBeTruthy();
    expect(refButton).toHaveTextContent(TEXT.MAIN.refButton);
  });

  it('status is true', () => {
    const { h2 } = setup({ data: { ...initialData, status: true } });
    expect(h2).not.toHaveStyle('text-decoration: line-through;');
  });

  it('status is false', () => {
    const { h2 } = setup({ data: { ...initialData, status: false } });
    expect(h2).toHaveStyle('text-decoration: line-through;');
  });

  it('edit mode', async () => {
    const { editButton } = setup({});
    await act(async () => {
      userEvent.click(editButton);
      waitFor(() => expect(screen.getByTestId('confirmButton')).toBeInTheDocument());
      waitFor(() => expect(screen.getByTestId('confirmButton')).toBeTruthy());
      waitFor(() =>
        expect(screen.getByTestId('confirmButton')).toHaveTextContent(TEXT.MAIN.confirmButton),
      );
      waitFor(() => expect(screen.getByTestId('cancelButton')).toBeInTheDocument());
      waitFor(() => expect(screen.getByTestId('cancelButton')).toBeTruthy());
      waitFor(() =>
        expect(screen.getByTestId('cancelButton')).toHaveTextContent(TEXT.MAIN.cancelButton),
      );
      waitFor(() => expect(screen.getByTestId('messageInput')).toBeInTheDocument());
      waitFor(() => expect(screen.getByTestId('messageInput')).toHaveFocus());
    });
  });
});

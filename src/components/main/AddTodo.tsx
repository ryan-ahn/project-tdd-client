/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : addTodo
 */

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TEXT } from '@containers/text';
import { colors } from '@styles/colors';
import { POST_MESSAGE_REQUEST } from '@libs/redux/modules/main/actions';
import CommonButton from '@components/common/Button';

export default function AddTodo() {
  // State
  const [message, setMessage] = useState<string>('');
  // Ref
  const inputRef = useRef<HTMLInputElement>(null);
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickAddTodo = useCallback(() => {
    if (message) {
      dispatch({ type: POST_MESSAGE_REQUEST, payload: message });
      navigate('/?filter=0&page=1');
      setMessage('');
    } else {
      // '메세지 입력하세요' 모달 or 토스트 구현
    }
  }, [message]);

  const handleKeyUpAddTodo = useCallback(
    (e: { key: string }) => {
      if (message) {
        switch (e.key) {
          case 'Enter':
            if (message) {
              dispatch({ type: POST_MESSAGE_REQUEST, payload: message });
              navigate('/?filter=0&page=1');
              setMessage('');
            } else {
              // '메세지 입력하세요' 모달 or 토스트 구현
            }
            break;
          case 'Escape':
            (document.activeElement as HTMLElement).blur();
        }
      }
    },
    [message],
  );

  useLayoutEffect(() => {
    if (inputRef !== null && inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Wrapper>
      <TextInput
        data-testid="inputTodo"
        ref={inputRef}
        value={message}
        placeholder={TEXT.MAIN.inputPlaceholder}
        onKeyUp={handleKeyUpAddTodo}
        onChange={e => setMessage(e.target.value)}
      />
      <CommonButton
        dataTestId="addButton"
        text={TEXT.MAIN.addButton}
        textSize={18}
        textWeight={700}
        boxWidth={'120px'}
        boxHeight={'45px'}
        boxColor={colors.box_gray_eb}
        boxRadius={5}
        clickEvent={onClickAddTodo}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '100%', '0px')};
`;

const TextInput = styled.input`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  ${({ theme }) => theme.boxSet('calc(100% - 130px)', '45px', '0px')};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.input_yellow};
  padding: 10px 20px;
`;

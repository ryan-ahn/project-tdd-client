/**
 * Author : Ryan
 * Date : 2023-02-26
 * Desc : toDoItem
 */

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { TEXT } from '@containers/text';
import { colors } from '@styles/colors';
import { TMessage } from '@libs/models/main';
import { RootState } from '@libs/redux/modules';
import { validateDate } from '@libs/utils/validation';
import {
  DELETE_MESSAGE_REQUEST,
  PUT_MESSAGE_REF_REQUEST,
  PUT_MESSAGE_REQUEST,
  PUT_MESSAGE_STATUS_REQUEST,
} from '@libs/redux/modules/main/actions';
import CommonCheckbox from '@components/common/Checkbox';
import CommonButton from '@components/common/Button';

type TProps = {
  data: TMessage;
};

type TToggleAttribute = {
  attrActive: boolean;
};

type TExpendsToggleAttribute = {
  attrActive: boolean | 'delete';
};

type TButtonType = 'checkbox' | 'delete' | 'confirm';

export default function ToDoItem(data: TProps) {
  // State
  const { messages } = useSelector((state: RootState) => state.main);
  const [inputValue, setInputValue] = useState<string>(data.data.message);
  const [buttonToggle, setButtonToggle] = useState<boolean>(false);
  const [selectToggle, setSelectToggle] = useState<boolean>(false);
  // Ref
  const inputRef = useRef<HTMLInputElement>(null);
  // Hooks
  const dispatch = useDispatch();

  const handleButtonEvent = useCallback(
    (type: TButtonType) => {
      switch (type) {
        case 'checkbox':
          dispatch({
            type: PUT_MESSAGE_STATUS_REQUEST,
            payload: {
              id: data.data.id,
            },
          });
          break;
        case 'delete':
          dispatch({
            type: DELETE_MESSAGE_REQUEST,
            payload: {
              id: data.data.id,
            },
          });
          break;
        case 'confirm':
          dispatch({
            type: PUT_MESSAGE_REQUEST,
            payload: {
              id: data.data.id,
              message: inputValue,
            },
          });
          setButtonToggle(false);
          break;
      }
    },
    [data.data.id],
  );

  const handleKeyUpEvent = useCallback(
    (e: { key: string }) => {
      switch (e.key) {
        case 'Enter':
          setButtonToggle(false);
          dispatch({
            type: PUT_MESSAGE_REQUEST,
            payload: {
              id: data.data.id,
              message: inputValue,
            },
          });
          break;
        case 'Escape':
          setButtonToggle(false);
      }
    },
    [data.data.id, inputValue, buttonToggle],
  );

  const onClickPushRef = useCallback(
    (item: TMessage) => {
      dispatch({
        type: PUT_MESSAGE_REF_REQUEST,
        payload: { id: data.data.id, ref: item },
      });
      setSelectToggle(false);
    },
    [selectToggle, data.data],
  );

  // Render List
  const renderInputList = useCallback(() => {
    switch (buttonToggle) {
      case true:
        return (
          <MessageInput
            data-testid="messageInput"
            ref={inputRef}
            value={inputValue}
            onKeyUp={handleKeyUpEvent}
            onChange={e => setInputValue(e.target.value)}
          ></MessageInput>
        );
      case false:
        return (
          <MessageText data-testid="messageText" attrActive={data.data.status}>
            {inputValue}
          </MessageText>
        );
    }
  }, [data.data.status, inputValue, buttonToggle]);

  const renderButtonList = useCallback(() => {
    switch (buttonToggle) {
      case true:
        return (
          <>
            <CommonButton
              dataTestId="confirmButton"
              text={TEXT.MAIN.confirmButton}
              textSize={16}
              textWeight={700}
              boxWidth={'60px'}
              boxHeight={'35px'}
              boxRadius={5}
              boxColor={colors.box_pink}
              clickEvent={() => handleButtonEvent('confirm')}
            />
            <CommonButton
              dataTestId="cancelButton"
              text={TEXT.MAIN.cancelButton}
              textSize={16}
              textWeight={700}
              boxWidth={'60px'}
              boxHeight={'35px'}
              boxRadius={5}
              boxColor={colors.white}
              clickEvent={() => setButtonToggle(!buttonToggle)}
            />
          </>
        );
      case false:
        return (
          <>
            <CommonButton
              dataTestId="editButton"
              text={TEXT.MAIN.editButton}
              textSize={14}
              textWeight={700}
              boxWidth={'50px'}
              boxHeight={'35px'}
              boxRadius={5}
              boxColor={colors.white}
              clickEvent={() => setButtonToggle(!buttonToggle)}
            />
            <CommonButton
              dataTestId="deleteButton"
              text={TEXT.MAIN.deleteButton}
              textSize={14}
              textWeight={700}
              boxWidth={'50px'}
              boxHeight={'35px'}
              boxRadius={5}
              boxColor={colors.white}
              clickEvent={() => handleButtonEvent('delete')}
            />
            <CommonButton
              dataTestId="refButton"
              text={TEXT.MAIN.refButton}
              textSize={14}
              textWeight={700}
              boxWidth={'50px'}
              boxHeight={'35px'}
              boxRadius={5}
              boxColor={colors.white}
              clickEvent={() => setSelectToggle(!selectToggle)}
            />
            <SelectBox attrActive={selectToggle}>
              {messages &&
                messages.map(item => (
                  <p key={item.id} onClick={() => onClickPushRef(item)}>
                    {item.message}
                  </p>
                ))}
            </SelectBox>
          </>
        );
    }
  }, [buttonToggle, selectToggle]);

  useLayoutEffect(() => {
    if (inputRef !== null && inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [buttonToggle]);

  return (
    <Wrapper data-testid="wrapper">
      <MessageBlock>
        <CommonCheckbox
          id={data.data.id}
          status={data.data.status}
          width={18}
          height={18}
          clickEvent={() => handleButtonEvent('checkbox')}
        />
        <MessageBox>
          {renderInputList()}
          <DateBox>
            {`작성일: ${validateDate(data.data.created)}`}
            {data.data.modify ? ` (수정일: ${validateDate(data.data.modify)})` : null}
          </DateBox>
          <RefBox>
            {data.data.reference.map(item => (
              <p>{item.message}</p>
            ))}
          </RefBox>
        </MessageBox>
      </MessageBlock>
      <ButtonBlock>{renderButtonList()}</ButtonBlock>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.box_gray_f2};
`;

const MessageBlock = styled.div`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', 'auto', '0px')};
`;

const MessageBox = styled.div`
  ${({ theme }) => theme.flexSet('flex-start', 'flex-start', 'column')};
  ${({ theme }) => theme.boxSet('calc(100% - 40px)', 'auto', '3px')};
  margin-left: 10px;
  overflow: hidden;
`;

const DateBox = styled.p`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '20px', '0px')};
  ${({ theme }) => theme.fontSet(12, 100, 17)};
  text-overflow: ellipsis;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const RefBox = styled.div`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  flex-wrap: wrap;
  & > p {
    margin-right: 5px;
    padding: 3px 7px;
    border: 1px solid ${({ theme }) => theme.colors.box_pink};
    border-radius: 15px;
    ${({ theme }) => theme.colorSet('black', 'white')};
    ${({ theme }) => theme.fontSet(12, 100, 17)};
  }
`;

const MessageInput = styled.input`
  ${({ theme }) => theme.boxSet('100%', '25px', '3px')};
  padding: 0 5px;
  border: 1px solid ${({ theme }) => theme.colors.bax_gray_66};
  background-color: ${({ theme }) => theme.colors.white};
`;

const MessageText = styled.h2<TExpendsToggleAttribute>`
  ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
  ${({ theme }) => theme.boxSet('100%', '25px', '0px')};
  ${({ theme }) => theme.fontSet(16, 700, 25)};
  color: ${({ theme }) => theme.colors.deactive};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-decoration: line-through;
  ${props =>
    props.attrActive &&
    css`
      color: ${({ theme }) => theme.colors.black};
      text-decoration: none;
    `}
`;

const ButtonBlock = styled.div`
  position: relative;
  ${({ theme }) => theme.flexSet('space-between', 'center', 'row')};
  ${({ theme }) => theme.boxSet('auto', '100%', '0px')};
  gap: 10px;
  @media (max-width: 450px) {
    ${({ theme }) => theme.flexSet('center', 'center', 'column')};
  }
`;

const SelectBox = styled.div<TToggleAttribute>`
  position: absolute;
  bottom: -150px;
  left: 120px;
  padding: 0px 15px;
  border: 1px solid ${({ theme }) => theme.colors.box_gray_eb};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 1;
  & > p {
    ${({ theme }) => theme.flexSet('flex-start', 'center', 'row')};
    ${({ theme }) => theme.boxSet('150px', '30px', '0px')};
    border-bottom: 1px solid ${({ theme }) => theme.colors.box_gray_eb};
    ${({ theme }) => theme.fontSet(13, 400, 20)};
    cursor: pointer;
  }
  display: none;
  ${props =>
    props.attrActive &&
    css`
      display: block;
    `}
`;

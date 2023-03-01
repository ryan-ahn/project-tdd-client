/**
 * Author : Ryan
 * Date : 2023-02-24
 * Desc : checkbox
 */

import styled, { css } from 'styled-components';
import { TStatus } from '@libs/models/main';

type TProps = {
  id: number | string;
  status: TStatus;
  width: number;
  height: number;
  clickEvent: () => void;
};

type TToggleAttribute = {
  width: number;
  height: number;
  attrActive: TStatus;
};

export default function CommonCheckbox({ id, status, width, height, clickEvent }: TProps) {
  return <CheckBoxWrapper attrActive={status} width={width} height={height} onClick={clickEvent} />;
}

const CheckBoxWrapper = styled.div<TToggleAttribute>`
  ${({ theme }) => theme.flexSet('flex-start', 'center')};
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: 3px;
  border: 1.4px solid ${props => props.theme.colors.box_pink};
  background-color: ${props => props.theme.colors.box_pink};
  background-image: url('/static/check-white.svg');
  background-size: 70% 70%;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  ${props =>
    props.attrActive &&
    css`
      border: 1px solid ${props => props.theme.colors.border_gray};
      background-color: ${props => props.theme.colors.white};
    `}
`;

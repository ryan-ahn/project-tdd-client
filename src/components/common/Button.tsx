/**
 * Author : Ryan
 * Date : 2023-02-24
 * Desc : button
 */

import styled from 'styled-components';

interface TButtonText {
  textSize: number;
  textWeight: number;
}

interface TButtonBox {
  boxWidth: string;
  boxHeight: string;
  boxRadius: number;
  boxColor: string;
}

type TIntersection = TButtonText & TButtonBox;

interface TProps extends TIntersection {
  text: string;
  dataTestId: string;
  clickEvent: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function CommonButton({
  text,
  dataTestId,
  textSize,
  textWeight,
  boxWidth,
  boxHeight,
  boxRadius,
  boxColor,
  clickEvent,
}: TProps) {
  return (
    <ButtonBox
      data-testid={dataTestId}
      boxWidth={boxWidth}
      boxHeight={boxHeight}
      boxRadius={boxRadius}
      boxColor={boxColor}
      onClick={clickEvent}
    >
      <ButtonText textSize={textSize} textWeight={textWeight}>
        {text}
      </ButtonText>
    </ButtonBox>
  );
}

const ButtonBox = styled.button<TButtonBox>`
  width: ${props => props.boxWidth};
  height: ${props => props.boxHeight};
  border-radius: ${props => props.boxRadius}px;
  background-color: ${props => props.boxColor};
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const ButtonText = styled.p<TButtonText>`
  font-size: ${props => props.textSize}px;
  font-weight: ${props => props.textWeight};
`;

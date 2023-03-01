/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : title
 */

import styled from 'styled-components';

interface TTitle {
  titleSize: number;
  titleWeight: number;
}

interface TProps extends TTitle {
  title: string;
}

export default function CommonTitle({ title, titleSize, titleWeight }: TProps) {
  return (
    <TitleWrapper titleSize={titleSize} titleWeight={titleWeight}>
      <h1 data-testid="testHeader">{title}</h1>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div<TTitle>`
  ${({ theme }) => theme.flexSet('center', 'center', 'row')};
  & > h1 {
    font-size: ${props => props.titleSize}px;
    font-weight: ${props => props.titleWeight};
  }
`;

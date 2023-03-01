/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : useRender
 */

import JestWrapper from '@components/templates/JestWrapper';
import { render } from '@testing-library/react';

const useRender = (children: JSX.Element | JSX.Element[]) => {
  return render(<JestWrapper>{children}</JestWrapper>);
};

export default useRender;

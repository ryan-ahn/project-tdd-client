/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : JestWrapper
 */

import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import theme from '@styles/theme';
import { store } from '../../index';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function JestWrapper({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}

/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : style Type Set
 */

import 'styled-components';
import { minMedia, maxMedia } from './theme';
import { backgroundSet, flexSet, fontSet, boxSet, colorSet } from './mixin';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: typeof colors;
    flexSet: typeof flexSet;
    fontSet: typeof fontSet;
    minMedia: typeof minMedia;
    maxMedia: typeof maxMedia;
    backgroundSet: typeof backgroundSet;
    boxSet: typeof boxSet;
    colorSet: typeof colorSet;
  }
}

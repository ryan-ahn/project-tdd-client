/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : theme
 */

import baseStyled, { DefaultTheme, ThemedStyledInterface } from 'styled-components';
import { flexSet, fontSet, backgroundSet, colorSet, boxSet } from './mixin';
import { colors } from './colors';

export const minMedia = (width: number) => `
  @media (min-width:${width}px)
  `;
export const maxMedia = (width: number) => `
  @media (max-width:${width}px)
  `;

export const mixMedia = (smallWidth: number, largeWidth: number) => `
  @media (min-width:${smallWidth}px) and (max-width:${largeWidth}px)
`;

const myTheme: DefaultTheme = {
  colors,
  flexSet,
  fontSet,
  minMedia,
  maxMedia,
  backgroundSet,
  boxSet,
  colorSet,
};

export type Theme = typeof myTheme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;

export default myTheme;

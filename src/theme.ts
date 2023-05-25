import {DefaultTheme} from "styled-components";

export interface ITheme {
  type: "light" | "dark"
  colors: {
    bg: string,
    mainBackground: string
    font: string,
    color: string
  }
}

export const baseTheme: DefaultTheme = {
  type: 'dark',
  colors: {
    bg: '#232d41',
    font: '#cacdd2',
    mainBackground: '#232d41',
    color: "#fbbd49",
  },
}

export const lightTheme: DefaultTheme  = {
  ...baseTheme,
  type: "light",
  colors: {
    ...baseTheme.colors,
    mainBackground: '#ffffff',
    bg: '#E5E4E8',
    font: '#19191B',
  },
}






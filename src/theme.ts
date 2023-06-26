import {DefaultTheme} from "styled-components";

export interface ITheme {
  type: "light" | "dark"
  colors: {
    bg: string,
    mainBackground: string
    font: string,
    secondFont: string,
    color: string,
    topColor: string,
    shadow: string
  }
}

export const baseTheme: DefaultTheme = {
  type: 'dark',
  colors: {
    bg: '#2e384c',
    font: '#cacdd2',
    secondFont: '#7b828e',
    mainBackground: '#232d41',
    color: "#fbbd49",
    topColor: '#414c6a',
    shadow: '#1a2434'
  },
}

export const lightTheme: DefaultTheme  = {
  ...baseTheme,
  type: "light",
  colors: {
    ...baseTheme.colors,
    mainBackground: '#bab2de',
    bg: '#e8ecf5',
    font: '#4e465a',
    secondFont: '#7b828e',
    color: "#8a49fb",
    topColor: '#ffffff',
    shadow: '#bdc6d0',
  },
}






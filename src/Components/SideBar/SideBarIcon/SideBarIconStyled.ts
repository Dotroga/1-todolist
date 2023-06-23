import styled, { css } from "styled-components";

type PropsType = {
  visible: string | null;
  color: string | undefined;
  isOpenOptions: boolean
  active: boolean
};
export const StyledNavLink = styled.div<PropsType>`
  display: flex;
  align-items: center;
  gap: 15px;
  color: ${({theme})=>theme.colors.font};
  padding: 8px;
  border-radius: 8px;
  text-decoration: none;
  cursor: pointer;
  .number {
    display: ${({isOpenOptions, visible}) => !isOpenOptions && visible == "" ? 'flex' : 'none'};
    position: relative;
    margin-left: auto;
    margin-right: 10px;
  }
  .AdditionalOptions{
    margin-left: auto;
  }
  .AdditionalOptions, .threePoints {
    display: ${({isOpenOptions})=> isOpenOptions ? 'flex' : 'none'};
  }
  &:hover {
    .number {
      display: none;
    }
    .AdditionalOptions, .threePoints{
      display: ${({visible}) => visible == "" ? 'flex' : 'none'};
    }
  }
${({active}) => active && css`
  background-color: ${({theme})=>theme.colors.topColor};
  color: ${({theme})=>theme.colors.font};;
  box-shadow: 0 0 15px 1px ${({theme})=>theme.colors.shadow};
`}
  &:hover {
    background-color: ${({theme})=>theme.colors.topColor};
  }
  
  ${({ visible }) =>
    visible != "" &&
    css`
      .AdditionalOptions {
        display: none;
        transition: 0.3s;
        opacity: 0;
      }
      div {
        display: none;
        transition: 0.3s;
        opacity: 0;
      }
    `}

  img {
    width: 28px;
    transition: 0.3s;
  }

  div {
    transition: 0.3s;
  }

  style {
    display: inline-block;
    width: 28px;
    height: 28px;
    background-color: ${({ color }) => color};
    border-radius: 6px;
    transition: 0.3s;
  }
`;

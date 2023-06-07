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
  &:hover {
    .number {
      display: none;
    }
    .AdditionalOptions {
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
  .AdditionalOptions {
    display: ${({isOpenOptions})=> isOpenOptions ? 'flex' : 'none'};
    margin-left: auto;
    align-items: center;
    justify-content: center;
    width: 30px;
    color: #979ea6;
   
    .threePoints {
      display: ${({isOpenOptions})=> isOpenOptions ? 'flex' : 'none'};
      opacity: 0.5;
      transition: 0.3s;
      &:hover {
        opacity: 1;
        transform: scale(1.2);
      }
    }
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

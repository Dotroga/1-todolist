import styled, {css} from "styled-components";
import {NavLink} from "react-router-dom";

type PropsType = {
    visible: string | null,
    color: string
    hover?: string
    onMouseOver: any
    onMouseOut: any
}
export const StyledNavLink = styled(NavLink)<PropsType>`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #c1c4cd;
  padding: 8px;
  border-radius: 8px;
  text-decoration: none;

  &.active {
    color: #8181d0;
    font-weight: bold;
    background-color: #434e6b;
    box-shadow: 0 0 15px 1px #1a2434;
  }

  &:hover {
    background-color: #434e6b;

    img {
      transform: scale(1.1);
    }

    style {
      transform: scale(1.1);
    }
  }

  .AdditionalOptions {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    color: #979ea6;
    ${({hover}) => hover === 'true'
        ? css`span {
          display: none
        }`
        : css` div {
          display: none
        }`
    }
  }

  ${({visible}) => visible != '' && css`
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
    background-color: ${({color}) => color};
    border-radius: 6px;
    transition: 0.3s;
  }
`;
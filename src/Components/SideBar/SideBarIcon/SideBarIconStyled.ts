import styled, {css} from "styled-components";
import {NavLink} from "react-router-dom";

export const StyledNavLink = styled(NavLink)<{visible:string | null, color: string}>`
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
    img {transform: scale(1.1);}
    span {transform: scale(1.1);}
  }
  img {
    width: 28px;
    transition: 0.3s;
  }
  div {
    transition: 0.3s;
    ${({visible}) => visible != '' && css`
      display: none;
      transition: 0.3s;
      opacity: 0;
    `}
  }
  span {
    display: inline-block;
    width: 28px;
    height: 28px;
    background-color: ${({color})=>color};
    border-radius: 6px;
    transition: 0.3s;
  }
`;
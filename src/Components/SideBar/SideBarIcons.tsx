import React from 'react';
import styled, {css} from "styled-components";
import {NavLink} from "react-router-dom";

type SideBarIconsPropsType = {
  isOpen: boolean
  title: string
  color: string
  to: string
}

export const SideBarIcons: React.FC<SideBarIconsPropsType> = (props) => {
  const {isOpen, title, color, to} = props
  return<StyledNavLink to={to} isOpen={isOpen}>
    <ColorWorm  color={color}></ColorWorm>
      <div>{title}</div>
    </StyledNavLink>
};


const StyledNavLink = styled(NavLink)<{isOpen:boolean}>`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #c1c4cd;

  &.active {
    color: #8181d0;
    font-weight: bold;

    span {
      transition: 0.2s;
      box-shadow: 0 0 1px 1px #cccbcb;
      transform: scale(1.1);
    }
  }
  &:hover {
    color: #8181d0;
    font-weight: bold;
  }

  div {
    transition: 0.3s;
    ${({isOpen}) => !isOpen && css`
      display: none;
      transition: 0.3s;
      opacity: 0;
    `}
  }

`;
export const ColorWorm = styled.span<{color: string}>`
  display: inline-block;
  width: 28px;
  height: 28px;
  background-color: ${({color})=>color};
  border-radius: 6px;
`


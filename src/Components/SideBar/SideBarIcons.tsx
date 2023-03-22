import React from 'react';
import styled, {css} from "styled-components";
import {NavLink} from "react-router-dom";
import fourSquare from './../../Icons/fourSquare.png'

type SideBarIconsPropsType = {
  isOpen: boolean
  title: string
  color: string
  to: string
}

export const SideBarIcons: React.FC<SideBarIconsPropsType> = (props) => {
  const {isOpen, title, color, to} = props
  return<StyledNavLink to={to} isOpen={isOpen}>
    {title === 'All lists'
      ? <img src={fourSquare} alt="square"/>
      : <ColorWorm  color={color}></ColorWorm>}
      <div>{title}</div>
    </StyledNavLink>
};




const StyledNavLink = styled(NavLink)<{isOpen:boolean}>`
  display: flex;
  align-items: center;
  gap: 15px;
  color: #c1c4cd;
  padding: 10px;
  border-radius: 10px;

  &.active {
    color: #8181d0;
    font-weight: bold;
    background-color: #434e6b;
  }

  &:hover {
    background-color: #434e6b;
    img {
      transform: scale(1.1);
    }
    span {
      transform: scale(1.1);
    }
  }
  img {
    width: 28px;
    transition: 0.3s;
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
const ColorWorm = styled.span<{color: string}>`
  display: inline-block;
  width: 28px;
  height: 28px;
  background-color: ${({color})=>color};
  border-radius: 6px;
  transition: 0.3s;
`


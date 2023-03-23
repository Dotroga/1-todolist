import React from 'react';
import fourSquare from '../../../Icons/fourSquare.png'
import {StyledNavLink} from './SideBarIconStyled'

type SideBarIconsPropsType = {
  isOpen: boolean
  title: string
  color: string
  to: string
}

export const SideBarIcon: React.FC<SideBarIconsPropsType> = (props) => {
  const {isOpen, title, color, to} = props
  return<StyledNavLink to={to} isOpen={isOpen} color={color}>
    {title === 'All lists'
      ? <img src={fourSquare} alt="square"/>
      : <span></span>}
      <div>{title}</div>
    </StyledNavLink>
};




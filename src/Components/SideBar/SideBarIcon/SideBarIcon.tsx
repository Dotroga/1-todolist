import React, {memo} from 'react';
import fourSquare from '../../../Icons/fourSquare.png'
import {StyledNavLink} from './SideBarIconStyled'

type SideBarIconsPropsType = {
  isOpen: boolean
  title: string
  color: string
  to: string
  numberOfTasks?: number
}

export const SideBarIcon: React.FC<SideBarIconsPropsType> = memo((props) => {
  const {isOpen, title, color,to} = props
  return<StyledNavLink to={to} visible={isOpen ? '' : null} color={color}>
    {title === 'All lists'
      ? <img src={fourSquare} alt="square"/>
      : <span></span>}
      <div>{title}</div>

    </StyledNavLink>
});






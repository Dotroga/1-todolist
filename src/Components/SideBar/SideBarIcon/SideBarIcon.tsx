import React, {memo, useState} from 'react';
import fourSquare from '../../../Icons/fourSquare.png'
import {StyledNavLink} from './SideBarIconStyled'
import {AdditionalOptions} from "../../Super/AdditionalOptions/AdditionalOptions";

type SideBarIconsPropsType = {
  isOpen: boolean
  title: string
  color: string
  to: string
  numberOfTasks?: number
}

export const SideBarIcon: React.FC<SideBarIconsPropsType> = memo((props) => {
  const {isOpen, title, color, to, numberOfTasks} = props

  const [hover, setHover] = useState(false)
  const [isOpenOptions, setIsOpenOptions] = useState(false)
  const changeHover = (change: boolean) => {
    setHover(change)
  }

  return <StyledNavLink
      to={to}
      visible={isOpen ? '' : null}
      color={color}
      hover={hover.toString()}
      onMouseOut={()=>changeHover(false)}
      onMouseOver={()=>changeHover(true)}
  >
    {title === 'All lists'
      ? <img src={fourSquare} alt="square"/>
      : <style></style>
    }
      <div>{title}</div>
    {numberOfTasks !== undefined &&
        <div className='AdditionalOptions' >
          <AdditionalOptions isOpen={isOpenOptions} onClick={()=>setIsOpenOptions(!isOpenOptions)}/>
          {numberOfTasks > 0 && <span>{numberOfTasks}</span>}
        </div>}
    </StyledNavLink>
});






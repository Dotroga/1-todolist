import React, {memo, useState} from 'react';
import fourSquare from '../../../Icons/fourSquare.png'
import {StyledNavLink} from './SideBarIconStyled'
import {AdditionalOptions} from "../../Super/AdditionalOptions/AdditionalOptions";
import threePoints from "../../../Icons/threePoints.svg";

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
  const onHover = () => {
    setHover(true)
  }
  const outHover = () => {
    !isOpenOptions && setHover(false)
  }
  const opened = () => setIsOpenOptions(!isOpenOptions)
  const closed = (v: boolean) => {
    setIsOpenOptions(v)
    setHover(false)
  }

  return <StyledNavLink
      to={to}
      visible={isOpen ? '' : null}
      color={color}
      hover={hover.toString()}
      onMouseOut={outHover}
      onMouseOver={onHover}
  >
    {title === 'All lists'
      ? <img src={fourSquare} alt="square"/>
      : <style></style>
    }
      <div>{title}</div>
    {numberOfTasks !== undefined &&
        <div className='AdditionalOptions' >
          {hover &&
          <img src={threePoints} alt="" onClick={opened}/>}
          <AdditionalOptions isOpen={isOpenOptions} onClick={closed}/>
          {numberOfTasks > 0 && <span className='number'>{numberOfTasks}</span>}
        </div>}
    </StyledNavLink>
});






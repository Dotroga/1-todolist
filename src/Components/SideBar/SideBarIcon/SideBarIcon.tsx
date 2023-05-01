import React, {memo, useState} from 'react';
import fourSquare from '../../../Icons/fourSquare.png'
import {StyledNavLink} from './SideBarIconStyled'
import {ModalIconType, ModalWindow} from "../../Super/ModalWindow/ModalWindow";
import threePoints from "../../../Icons/threePoints.svg";
import edit from './../../../Icons/edit.svg'
import arrowDown from './../../../Icons/arrowDown.svg'
import arrowUp from './../../../Icons/arrowUp.svg'
import deleteUrn from './../../../Icons/deleteUrn.svg'

type SideBarIconsPropsType = {
  isOpen: boolean
  title: string
  color: string
  to: string
  numberOfTasks?: number
}

const arr: ModalIconType[]  = [
  {svg: edit,title: 'Edit'},
  {svg: arrowUp,title: 'Move up'},
  {svg: arrowDown,title: 'Move down'},
  {svg: deleteUrn,title: 'Delete'}
]

export const SideBarIcon: React.FC<SideBarIconsPropsType> = memo((props) => {
  const {isOpen, title, color, to, numberOfTasks} = props

  const [hover, setHover] = useState(false)
  const [isOpenOptions, setIsOpenOptions] = useState(false)
  const onHover = () => setHover(true)
  const outHover = () => !isOpenOptions && setHover(false)
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
          <img src={threePoints} className='threePoints' alt="" onClick={opened}/>}
          <ModalWindow
              isOpen={isOpenOptions}
              onCloses={closed}
              arr={arr}
            />
          {numberOfTasks > 0 && <span className='number'>{numberOfTasks}</span>}
        </div>}
    </StyledNavLink>
});






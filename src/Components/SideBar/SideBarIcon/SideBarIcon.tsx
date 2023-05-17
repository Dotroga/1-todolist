import React, {memo, useCallback, useState} from 'react';
import fourSquare from '../../../Icons/fourSquare.png'
import {StyledNavLink} from './SideBarIconStyled'
import {ModalWindow} from "../../Super/ModalWindow/ModalWindow";
import threePoints from "../../../Icons/threePoints.svg";


type SideBarIconsPropsType = {
  listId?: string
  isOpen: boolean
  title: string
  color: string
  to: string
  numberOfTasks?: number
  isLoading?: boolean
}

export const SideBarIcon: React.FC<SideBarIconsPropsType> = memo((props) => {
  const {listId, isOpen, title, color, to, numberOfTasks, isLoading} = props

  const [hover, setHover] = useState(false)
  const [isOpenOptions, setIsOpenOptions] = useState(false)
  const onHover = () => setHover(true)
  const outHover = () => !isOpenOptions && setHover(false)
  const opened =  useCallback (() => setIsOpenOptions(!isOpenOptions),[isOpenOptions])
  const closed = useCallback ((v: boolean) => {
    setIsOpenOptions(v)
    setHover(false)
  },[hover, isOpenOptions])

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
    {numberOfTasks  !== undefined &&
        <div className='AdditionalOptions' >
          {hover &&
          <img src={threePoints} className='threePoints' alt="" onClick={opened}/>}
          <ModalWindow
              title={title}
              color={color}
              listId={listId}
              isOpen={isOpenOptions}
              onCloses={closed}
              isLoading={isLoading}
            />
          {numberOfTasks > 0 && <span className='number'>{numberOfTasks}</span>}
        </div>}
    </StyledNavLink>
});






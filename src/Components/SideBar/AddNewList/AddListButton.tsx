import React, {memo} from 'react';
import plus from '../../../Icons/plus.svg'
import square from '../../../Icons/square.svg'
import styled, {css} from "styled-components";
import {toggleAddListFormAC} from "../../../redux/statusOffWindowsReducer";
import {useDispatch} from "react-redux";

type AddListButtonPropsType = {
  isOpen: boolean
    isVisibleALF: boolean
}
export const AddListButton: React.FC<AddListButtonPropsType> = memo(({isOpen,isVisibleALF}) => {
    const dispatch = useDispatch()
    const toggleAddListForm = () => dispatch(toggleAddListFormAC())
  return <Wrapper isVisibleALF={isVisibleALF} isOpen={isOpen}>
   <span>Lists</span>
    <div>
      <SvgPlus src={plus} alt="plus" onClick={toggleAddListForm} isVisibleALF={isVisibleALF}/>
      <SvgSquare src={square} alt="square" />
    </div>
  </Wrapper>
});


const Wrapper = styled.div<{isOpen: boolean, isVisibleALF:boolean}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    transition: all 0.2s ease-in;
    &:hover {
        transform: scale(1.1);
  }
}
  div, span{
   ${({isOpen}) => !isOpen && css`
     display: none;
   `};
    user-select: none;
  }
`

const SvgSquare = styled.img`
  width: 32px;
  cursor: pointer;
`

const SvgPlus = styled(SvgSquare)<{isVisibleALF:boolean}>`
  position: absolute;
  transition: all 0.2s ease-in;
  ${({isVisibleALF}) => isVisibleALF && css`
    transform: rotate(45deg);
  `};
  
`





import React, {memo, useState} from 'react';
import plus from '../../../Icons/plus.svg'
import square from '../../../Icons/square.svg'
import styled, {css} from "styled-components";
import {toggleAddListFormAC} from "../../../redux/statusOffWindowsReducer";
import {useDispatch} from "react-redux";
import {MaxQuantity} from "../../Super/MaxQuantity/MaxQuantity";

type AddListButtonPropsType = {
    isOpen: boolean
    isVisibleALF: boolean
    listsLength: number
}
export const AddListButton: React.FC<AddListButtonPropsType> = memo((props) => {
    const {isVisibleALF, listsLength} = props
    const [hovered, setHovered] = useState<boolean>(false)
    const dispatch = useDispatch()
    const toggleAddListForm = () => dispatch(toggleAddListFormAC())
    return <Wrapper
        {...props}
        hovered={hovered}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}

    >
        <p>Lists</p>
        <MaxQuantity maxNum={10} currentNum={listsLength}/>
        <SvgSquare>
            <SvgPlus src={plus} alt="plus" onClick={toggleAddListForm} isVisibleALF={isVisibleALF}/>
        </SvgSquare>
    </Wrapper>
});

type WrapperType = {
    isOpen: boolean
    isVisibleALF: boolean
    hovered: boolean
    listsLength: number
}

const Wrapper = styled.div<WrapperType>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0;
  height: 32px;
${({hovered, isVisibleALF, listsLength})=> (hovered || isVisibleALF) && (listsLength < 10)
        ? css` div {display: none;position: absolute;}`
        : css` style {display: none;}`
}
  div, span, p {
    ${({isOpen}) => !isOpen && css`display: none;`};
    user-select: none;
  }
`

const SvgSquare = styled.style`
  width: 28px;
  height: 28px;
  cursor: pointer;
  border-radius: 6px;
  background: #fbbd49;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in;
  &:hover {
    transform: scale(1.1);
  }
`

const SvgPlus = styled.img<{isVisibleALF:boolean}>`
  z-index: 2;
  width: 32px;
  cursor: pointer;
  transition: all 0.2s ease-in;
 
  ${({isVisibleALF}) => isVisibleALF && css`
    transform: rotate(45deg);
  `};
`





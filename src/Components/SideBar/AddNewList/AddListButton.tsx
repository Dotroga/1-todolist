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
export const AddListButton: React.FC<AddListButtonPropsType> = memo((
    {isOpen, isVisibleALF, listsLength}) => {

    const [hovered, setHovered] = useState<boolean>(false)
    const dispatch = useDispatch()
    const toggleAddListForm = () => dispatch(toggleAddListFormAC())
    console.log(hovered)
    return <Wrapper
        isVisibleALF={isVisibleALF}
        isOpen={isOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >
        <p>Lists</p>
        {!hovered && !isVisibleALF
            ? <MaxQuantity maxNum={10} currentNum={listsLength}/>
            : <span>
            <SvgPlus src={plus} alt="plus" onClick={toggleAddListForm} isVisibleALF={isVisibleALF}/>
            <SvgSquare src={square} alt="square"/>
            </span>
        }
    </Wrapper>
});


const Wrapper = styled.div<{ isOpen: boolean, isVisibleALF: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0;
  height: 32px;
  }
  span{
    display: flex;
    align-items: center;
    transition: all 0.2s ease-in;
    &:hover {
      transform: scale(1.1);
    }
  }
  div {
    position: relative;
  }
  div, span, p {
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





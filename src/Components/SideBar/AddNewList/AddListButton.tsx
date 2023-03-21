import React from 'react';
import plus from '../../../Icons/plus.svg'
import square from '../../../Icons/square.svg'
import styled, {css} from "styled-components";

type AddListButtonPropsType = {
  condition: boolean
  callback: () => void
  isOpen: boolean
}

export const AddListButton: React.FC<AddListButtonPropsType> = (props) => {
  const {condition,callback, isOpen} = props
  return <Wrapper condition={condition} isOpen={isOpen}>
    <div>Lists</div>
    <div>
      <SvgPlus src={plus} alt="plus" onClick={callback} condition={condition}/>
      <SvgSquare src={square} alt="square" condition={condition}/>
    </div>
  </Wrapper>

};

const Wrapper = styled.div<{isOpen: boolean, condition:boolean}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
   ${({isOpen}) => !isOpen && css`
     opacity: 0;
     z-index: -1;
   `};
    user-select: none;
  }
`

const SvgSquare = styled.img<{condition:boolean}>`
  width: 32px;
  cursor: pointer;
`

const SvgPlus = styled(SvgSquare)<{condition:boolean}>`
  position: absolute;
  transition: all 0.2s ease-in;
  ${({condition}) => condition && css`
    transform: rotate(45deg);
  `};
  
`





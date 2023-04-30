import React from 'react';
import plus from "../../../Icons/plus.svg";
import styled, {css} from "styled-components";

type AddTaskButtonType = {
    onClick: (change:boolean) => void
}

export const AddTaskButton = (props: AddTaskButtonType) => {
    return (
        <Wrapper onClick={()=>props.onClick(true)}>
            Add new task
            <Plus>
                <img src={plus} alt="plus"/>
            </Plus>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  opacity: 0.5;
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  transition: all 0.2s ease-in;
&:hover {
  opacity: 1;
  style {
    background: #fbbd49;
    opacity: 1;
  }
}
`
const Plus = styled.style`
  opacity: 0.3;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in;
  &:hover {
    transform: scale(1.1);
  }
  img {
    z-index: 2;
    width: 32px;
  }
`


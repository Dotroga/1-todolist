import React from "react";
import styled from "styled-components";

type AddTaskButtonType = {
  onClick: (change: boolean) => void;
};

export const AddTaskButton = (props: AddTaskButtonType) => {
  return (
    <Wrapper onClick={() => props.onClick(true)}>
      Add new task
      <Plus>
        <svg viewBox="-3.12 -3.12 30.24 30.24">
          <path d="M5 12H19"/>
          <path d="M12 5L12 19"/>
        </svg>
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
      background: ${({theme})=>theme.colors.color};
      opacity: 1;
    }
  }
`;
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
  svg{
    z-index: 2;
    width: 32px;
    cursor: pointer;
    transition: all 0.2s ease-in;
    fill: none;
    stroke: #fcfcfc;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

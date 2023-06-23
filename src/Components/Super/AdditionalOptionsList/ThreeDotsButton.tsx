import React from "react";
import styled, {css} from "styled-components";

type PropsType = {
  opened: () => void
  isOpen: boolean
};
export const ThreeDotsButton: React.FC<PropsType> = (props) => {
  return (
    <Button onClick={props.opened} isOpen={props.isOpen} className='threePoints'>
      <span></span>
      <span></span>
      <span></span>
    </Button>
  );
};

const Button = styled.button<{isOpen:boolean}>`
  display: flex;
  align-items: center;
  gap: 2px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  height: 26px;
  opacity: 0.4;
  transition: 0.3s;
  span {
    background-color: ${({theme})=>theme.colors.color};;
    border-radius: 50%;
    height: 6px;
    width: 6px;
  }
  ${({isOpen})=>isOpen && css`
    transform: scale(1.1);
    opacity: 1;
  `}
  &:hover {
    transform: scale(1.1);
    opacity: 1;
  }
`;

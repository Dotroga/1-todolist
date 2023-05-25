import React from "react";
import styled from "styled-components";

type PropsType = {
  onClick: () => void;
};
export const ThreeDotsButton: React.FC<PropsType> = (props) => {
  return (
    <Button className="ThreeDotsButton" onClick={props.onClick}>
      <span></span>
      <span></span>
      <span></span>
    </Button>
  );
};

const Button = styled.button`
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
    background-color: #ffcc00;
    border-radius: 50%;
    height: 6px;
    width: 6px;
  }
  &:hover {
    transform: scale(1.1);
    opacity: 1;
  }
`;

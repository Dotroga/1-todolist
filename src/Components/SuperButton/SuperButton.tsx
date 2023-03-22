import React from 'react';
import styled, {css} from "styled-components";

type SuperButtonPropsType = {
  title: string
  color?: string
  disabled?: boolean
  callBack: ()=>void
}

export const SuperButton: React.FC<SuperButtonPropsType> = (props) => {
  const {title, color, disabled, callBack} = props
  return <Button color={color!} onClick={callBack} disabled={disabled!}>
    {title}
  </Button>
};

type ButtonProps = {
  color: string
  disabled: boolean
}

const Button = styled.button<ButtonProps>`
  ${({disabled})=>!disabled && css`
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  `};
  opacity: ${({disabled})=>disabled && '0.6'};
  padding: 5px;
  color: white;
  background-color: ${({color})=>color ? color : '#fdbe49'};
  border-radius: 8px;
  border: none;
  transition: 0.2s;
`



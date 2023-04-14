import React, {memo} from 'react';
import styled, {css} from "styled-components";
import {Loader} from "../Loader/Loader";

type SuperButtonPropsType = {
  title: string
  loading?: boolean
  color?: string
  disabled?: boolean
  onClick: ()=>void
}

export const SuperButton: React.FC<SuperButtonPropsType> = memo((props) => {
  const {title, loading} = props
  return <Button {...props}>
    {loading && <Loader/>}
    {title}
  </Button>
});


const Button = styled.button< SuperButtonPropsType>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({disabled})=>!disabled && css`
    cursor: pointer;
    &:hover {filter: brightness(90%);}
    &:active {filter: brightness(110%);}
  `};
  opacity: ${({disabled})=>disabled && '0.6'};
  height: 37px;
  min-width: 60px;
  padding: 5px;
  color: ${({loading})=> loading ? '#fdbe49' :'white'};
  background-color: ${({color})=>color ? color : '#fdbe49'};
  border-radius: 8px;
  border: none;
  transition: 0.2s;
`



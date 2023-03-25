import React, {useState} from 'react';
import styled, {css} from "styled-components";
import arrow from './../../Icons/arrow.svg'
import {ArrColorType} from "../SideBar/AddNewList/AddListForm/AddListForm";


type PropsType = {
    arr: ArrColorType[]
    width?: string
}

export const Select: React.FC<PropsType> = (
    {arr, width= '240px'}) => {

    const [active, setActive] = useState<ArrColorType>(arr[0])
    const [visiblePopUp, setVisiblePopUp] = useState(false)
    const changeVisibility = () => setVisiblePopUp(!visiblePopUp)
    const selectingActive = (i: ArrColorType) => {
        setActive(i)
        setVisiblePopUp(false)
    }
    return <Wrapper width={width}>
        <Visible onClick={changeVisibility} visible={visiblePopUp} color={active.color}
                 onBlur={()=>setVisiblePopUp(false)}>
            <div>
                <span></span> {active.title}
            </div>
            <img src={arrow} alt="arrow"/>
        </Visible>
        {visiblePopUp &&
            <PopUp visible={visiblePopUp} >{arr.map((i, index)=>
                <Icon
                    key={index}
                    onClick={()=>selectingActive(i)}
                    color={i.color} >
                    <span></span>
                    {i.title}
                </Icon >)}
            </PopUp>}
    </Wrapper>
}
type SelectStyledType = {
    visible?: boolean
    color?: string
    width?: string
}
const Wrapper = styled.div<{width: string}>`
  position: absolute;
  width: ${({width})=>width};
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
`
const Visible = styled.div<SelectStyledType>`
  display: flex;
  justify-content: space-between;
  background-color: #414c6a;
  padding: 10px;
  border: 1px solid #fbbd49;
  color: white;
  ${({visible}) => visible
          ? css`
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;
            border-bottom: none;
          `
          : css`border-radius: 10px;`
  }
  div {
    display: flex;
    align-items: center;
  }
  span {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: 10px;
    border-radius: 5px;
    background-color: ${({color})=>color};
  }
  img {
    transition: 0.4s;
    width: 20px;
    transform: rotate(${({visible}) => visible ? `90deg` : `-90deg`});
  }
`
const PopUp = styled.div<SelectStyledType>`
  background-color: #414c6a;
  padding: 4px 0;
  border: 1px solid #fbbd49;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  color: white;
  
`
const Icon = styled.div<SelectStyledType>`
  display: flex;
  font-size: 16px;
  padding: 2px 10px;
  &:hover {
    background-color: #5a6687;
  }
  span{
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: 10px;
    border-radius: 5px;
    background-color: ${({color})=>color};
  } 
`
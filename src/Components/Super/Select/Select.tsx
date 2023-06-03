import React, { memo, useState } from "react";
import styled from "styled-components";
import { ColorType } from "redux/app.reducer";
import {SelectWrapper} from "Components/Super/Select/Select.styled";

type PropsType = {
  title: string;
  arr: ColorType[];
  item: ColorType | null;
  callBack: (color: ColorType) => void;
};

export const Select: React.FC<PropsType> = memo((props) => {
  console.log('select')
  const { title, arr, item, callBack} = props;
  const [visiblePopUp, setVisiblePopUp] = useState(false);
  const changeVisibility = () => setVisiblePopUp(!visiblePopUp);
  const selectingActive = (i: ColorType) => {
    callBack(i);
    setVisiblePopUp(false);
  };
  return (
    <SelectWrapper
      visible={visiblePopUp}
      color={item && item!.color}
      onBlur={() => setVisiblePopUp(false)}
      item={!!item || visiblePopUp}>
      <div className='visible' onClick={changeVisibility}>
        <div>
          {item && <Item item={item}/>}
          <div className='title'>{title}</div>
        </div>
        <div className='arrow-icon'>
          <span className="left-bar"></span>
          <span className="right-bar"></span>
        </div>
      </div>
      {visiblePopUp && (
        <div className='popup'>
          {arr.map((i, index) => (
            <Icon key={index} onClick={() => selectingActive(i)} color={i.color}>
              <span></span>
              {i.title}
            </Icon>
          ))}
        </div>
      )}
    </SelectWrapper>
  );
});

const Item = memo((props: any) => (
  <>
    <span></span>
    {props.item.title}
  </>
))



const Icon = memo(styled.div<{color: string}>`
  display: flex;
  font-size: 16px;
  padding: 2px 10px;
  &:hover {
    background-color: ${({theme})=>theme.colors.bg};
  }
  span {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: 10px;
    border-radius: 5px;
    background-color: ${({ color }) => color};
  }
`)

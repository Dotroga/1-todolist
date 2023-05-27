import React, { memo, useState } from "react";
import styled, { css } from "styled-components";
import arrow from "../../../Icons/arrow.svg";
import { ColorType } from "redux/statusOffWindowsReducer";

type PropsType = {
  title: string;
  arr: ColorType[];
  item: ColorType | null;
  callBack: (color: ColorType) => void;
  width?: string;
};

export const Select: React.FC<PropsType> = memo((props) => {
  const { title, arr, item, callBack, width = "244px" } = props;

  const [visiblePopUp, setVisiblePopUp] = useState(false);
  const changeVisibility = () => setVisiblePopUp(!visiblePopUp);
  const selectingActive = (i: ColorType) => {
    callBack(i);
    setVisiblePopUp(false);
  };
  return (
    <Wrapper width={width}>
      <Visible
        onClick={changeVisibility}
        visible={visiblePopUp}
        color={item && item!.color}
        onBlur={() => setVisiblePopUp(false)}
      >
        <div>
          {item && <Item item={item} />}
          <Title item={!!item || visiblePopUp}>{title}</Title>
        </div>
        {/*<img src={arrow} alt="arrow" />*/}
        <div className='arrow-icon'>
          <span className="left-bar"></span>
          <span className="right-bar"></span>
        </div>
      </Visible>
      {visiblePopUp && (
        <PopUp visible={visiblePopUp}>
          {arr.map((i, index) => (
            <Icon key={index} onClick={() => selectingActive(i)} color={i.color}>
              <span></span>
              {i.title}
            </Icon>
          ))}
        </PopUp>
      )}
    </Wrapper>
  );
});

const Item = (props: any) => (
  <>
    <span></span>
    {props.item.title}
  </>
);

type SelectStyledType = {
  visible?: boolean;
  color?: string;
  width?: string;
};
const Wrapper = styled.div<{ width: string }>`
  position: absolute;
  width: ${({ width }) => width};
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
`;
const Visible = styled.div<SelectStyledType>`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  color: ${({theme})=>theme.colors.font};
  border: 1px solid ${({theme})=>theme.colors.color};
  .arrow-icon {
    height: 22px;
    display: flex;
    align-items: center;
    position: relative;
    top: 8px;
    right: 20px;
    cursor: pointer;
  }
  .left-bar {
    position: absolute;
    background-color: transparent;
    transform: rotate(35deg);
    right: -15px;
    &:after {
      transition: 0.3s;
      content:"";
      background-color: ${({theme})=>theme.colors.color};
      border-radius: 2px;
      width: 12px;
      height: 2px;
      float: left;
    }
  }
  .right-bar {
    position: absolute;
    background-color: transparent;
    transform: rotate(-35deg);
    &:after {
      transition: 0.3s;
      content:"";
      background-color: ${({theme})=>theme.colors.color};
      border-radius: 2px;
      width: 12px;
      height: 2px;
      float: right;
    }
  }
  ${({ visible }) =>
    visible
      ? css`
          border-top-right-radius: 8px;
          border-top-left-radius: 8px;
          border-bottom: none;
              .left-bar:after {
                transform-origin: center center;
                transform: rotate(-70deg);
              }
              .right-bar:after {
                transform-origin: center center;
                transform: rotate(70deg);
              }
        `
      : css`
          border-radius: 8px;
        `}
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
    background-color: ${({ color }) => color};
  }
  img {
    transition: 0.4s;
    width: 20px;
    transform: rotate(${({ visible }) => (visible ? `90deg` : `-90deg`)});
  }
`;
const Title = styled.div<{ item: boolean }>`
  color: ${({theme})=>theme.colors.font};
  position: absolute;
  left: 5px;
  padding: 10px;
  pointer-events: none;
  font-size: 1em;
  transition: 0.5s;
  ${({ item }) =>
    item &&
    css`
      color: ${({theme})=>theme.colors.color};
      background-color: ${({theme})=>theme.colors.topColor};
      transform: translateX(10px) translateY(-20px);
      font-size: 0.9em;
      padding: 0 10px;
    `}
`;
const PopUp = styled.div<SelectStyledType>`
  background-color: ${({theme})=>theme.colors.topColor};
  padding: 4px 0;
  border: 1px solid ${({theme})=>theme.colors.color};
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  color: ${({theme})=>theme.colors.font};
`;
const Icon = styled.div<SelectStyledType>`
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
`;

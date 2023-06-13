import React, {memo, useRef, useState} from "react";
import styled from "styled-components";
import {SelectWrapper} from "Components/Super/Select/Select.styled";
import {useOutsideClick} from "utils/useOutsideClick";
import {ArrType} from "redux/app.reducer";


type SelectPropsType = {
  title: string;
  arr: ArrType[];
  item: ArrType | null
  callBack?: (item: ArrType) => void;
  icon: React.ComponentType<{color: string}>
};

export const Select: React.FC<SelectPropsType> = memo((props) => {
  const { title, arr, item, callBack, icon: IconComponent} = props;
  const ref = useRef<HTMLDivElement>(null);
  const [visiblePopUp, setVisiblePopUp] = useState(false);
  const changeVisibility = () => setVisiblePopUp(!visiblePopUp);

  useOutsideClick(ref, setVisiblePopUp, visiblePopUp);

  const selectingActive = (i: ArrType) => {
    callBack!(i);
    setVisiblePopUp(false);
  };

  return (
    <SelectWrapper ref={ref} visible={visiblePopUp}
      onBlur={() => setVisiblePopUp(false)}
      item={!!item || visiblePopUp}>
      <div className='visible' onClick={changeVisibility}>
        <Item item={item} icon={IconComponent}/>
        <div className='title'>{title}</div>
        <div className='arrow-icon'>
          <span className="left-bar"></span>
          <span className="right-bar"></span>
        </div>
      </div>
      {visiblePopUp &&
          <Items icon={IconComponent} arr={arr} callBack={selectingActive}/>
      }
    </SelectWrapper>
  );
});


const Items: React.FC<Omit<SelectPropsType, 'title' | 'item'>> = (props) => {
  const {icon: IconComponent, callBack, arr} = props
  return <div className='popup'>
    {arr.map((i, index) =>
      <div className='icon'>
        <Item key={index} item={i} icon={IconComponent} callBack={callBack}/>
      </div>
    )}
  </div>
}

const Item: React.FC<Omit<SelectPropsType, 'title' | 'arr'>> = (props) => {
  const {item, icon: IconComponent, callBack} = props
  return <Wrapper onClick={() => callBack!(item!)}>
    {item && <>
        <IconComponent color={item[0]}/>
        <div className='text'>{item[1]}</div>
    </>}
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  font-size: 16px;
  align-items: center;
  padding: 2px 10px;
  position: relative;
  white-space: nowrap;
`















import React, {memo, useRef, useState} from "react";
import styled from "styled-components";
import {SelectWrapper} from "Components/Super/Select/Select.styled";
import {useOutsideClick} from "utils/useOutsideClick";
import {ArrType} from "redux/app.reducer";


type SelectPropsType = {
  name: string;
  arr: ArrType[];
  value: ArrType | null
  onChange?: (item: ArrType) => void;
  icon: React.ComponentType<{color: string}>
};

export const Select: React.FC<SelectPropsType> = memo((props) => {
  const {name, arr, value, onChange, icon: IconComponent} = props;
  const ref = useRef<HTMLDivElement>(null);
  const [visiblePopUp, setVisiblePopUp] = useState(false);
  const changeVisibility = () => setVisiblePopUp(!visiblePopUp);

  useOutsideClick(ref, setVisiblePopUp, visiblePopUp);

  const selectingActive = (i: ArrType) => {
    onChange!(i);
    setVisiblePopUp(false);
  };

  return (
    <SelectWrapper className='select' ref={ref} visible={visiblePopUp}
      onBlur={() => setVisiblePopUp(false)}
      item={!!value || visiblePopUp}>
      <div className='visible' onClick={changeVisibility}>
        <Item value={value} icon={IconComponent}/>
        <div className='title'>{name}</div>
        <div className='arrow-icon'>
          <span className="left-bar"></span>
          <span className="right-bar"></span>
        </div>
      </div>
      {visiblePopUp &&
          <Items icon={IconComponent} arr={arr} onChange={selectingActive}/>
      }
    </SelectWrapper>
  );
});


const Items: React.FC<Omit<SelectPropsType, 'name' | 'value'>> = (props) => {
  const {icon: IconComponent, onChange, arr} = props
  return <div className='popup'>
    {arr.map((i, index) =>
      <div className='icon' key={index}>
        <Item  value={i} icon={IconComponent} onChange={onChange}/>
      </div>
    )}
  </div>
}

const Item: React.FC<Omit<SelectPropsType, 'name' | 'arr' >> = (props) => {
  const {value, icon: IconComponent, onChange} = props

  return <Wrapper onClick={() => {
    onChange!(value!)
  }}>
    {value && <>
        <IconComponent color={value[0]}/>
        <div className='text'>{value[1]}</div>
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















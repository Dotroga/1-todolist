import React from 'react';
import styled from "styled-components";

export type PropsType = {

}


export const AdditionalSetting = (props: PropsType) => {

  const noDate = () => {}

  return (
    <Wrapper>
      <div>
        <svg  viewBox="0 0 64 64" >
          <path fill="#3f72fd" d="M60,4H48c0-2.211-1.789-4-4-4s-4,1.789-4,4H24c0-2.211-1.789-4-4-4s-4,1.789-4,4H4C1.789,4,0,5.789,0,8v52 c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V8C64,5.789,62.211,4,60,4z M8,12h8c0,2.211,1.789,4,4,4s4-1.789,4-4h16 c0,2.211,1.789,4,4,4s4-1.789,4-4h8v8H8V12z"/>
        </svg>
        Today
      </div>
      <div>
        <svg  viewBox="0 0 64 64" >
          <path fill="#299238" d="M60,4H48c0-2.211-1.789-4-4-4s-4,1.789-4,4H24c0-2.211-1.789-4-4-4s-4,1.789-4,4H4C1.789,4,0,5.789,0,8v52 c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V8C64,5.789,62.211,4,60,4z M8,12h8c0,2.211,1.789,4,4,4s4-1.789,4-4h16 c0,2.211,1.789,4,4,4s4-1.789,4-4h8v8H8V12z"/>
        </svg>
        Tomorrow
      </div>
      <div onClick={noDate}>
        <svg viewBox="0 0 24 24" >
          <path id="Vector" d="M5.75 5.75L18.25 18.25M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke="#d93f35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </svg>
        No date
       </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  div {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 30px;
    gap: 10px;
    padding: 0 20px;
    margin: 3px 0;
    svg {
      width: 22px;
      fill: none;
    }
    &:hover {
      background-color: ${({theme}) => theme.colors.topColor};
    }
  }
`


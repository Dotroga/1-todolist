import React from 'react';
import styled from "styled-components";

export const PriorityIcon = (props:{color: string}) => {
  return (
    <SVG color={props.color} viewBox="0 0 32 32">
      <path d="M5,2v28c0,0.552-0.447,1-1,1s-1-0.448-1-1V2c0-0.552,0.447-1,1-1S5,1.448,5,2z M8,2 C6.895,2,6,2.895,6,4v12c0,1.105,0.895,2,2,2l0,0l0,0h8.95L14.768,2H8z M25.799,12.894c-0.246-0.492-0.246-1.297,0-1.789 l3.106-6.211C29.151,4.402,28.902,4,28.352,4H16.05l2.182,16h10.121c0.55,0,0.799-0.403,0.553-0.894L25.799,12.894z"/>
    </SVG>
  );
}

const SVG = styled.svg`
    fill: ${({color})=>color};
    width: 22px;
    height: 22px;
`

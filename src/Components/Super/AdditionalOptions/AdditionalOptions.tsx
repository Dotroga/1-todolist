import React from 'react';
import threePoints from './../../../Icons/threePoints.svg'
import styled from "styled-components";

type propsType = {
id: string
}

export const AdditionalOptions = () => {

    return (<Wrapper>
            <img src={threePoints} alt=""/>
            <div>Доп опции</div>
    </Wrapper>)
};
 const Wrapper = styled.div`
   display: flex;
   align-items: center;
 img {
   height: 23px;
   &:hover {
     transform: scale(1.4);
   }
 }
   div {
     position: absolute;
     left: 315px;
   }
 `


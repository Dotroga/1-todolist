import React from 'react';
import styled from "styled-components";

 export const AllListsIcon = () => {
  return (
    <Wrapper>
     <span></span>
     <span></span>
     <span></span>
     <span></span>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: grid;
  grid-template-areas: 
  "a b"
  "c d";
  gap: 2px;
  span {
    display: inline-block;
    content: '';
    width: 13px;
    height: 13px;
    border-radius: 4px;
    transition: .3s;
  }
   span:nth-child(1) {
     background-color: #3f72fd;
   }
   span:nth-child(2) {
     background-color: #b7256e;
   }
   span:nth-child(3) {
     background-color: #f8ce00;
   }
   span:nth-child(4) {
     background-color: #7dca48;
   }
 `


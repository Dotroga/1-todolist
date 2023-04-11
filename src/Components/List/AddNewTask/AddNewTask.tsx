import React from 'react';
import styled from "styled-components";
import {SuperInput} from "../../Super/SuperInput/SuperInput";

export const AddNewTask = () => {
    return (
        <Wrapper>
            <SuperInput callBack={()=>{}} text={'Task name'} title={''} error={''}/>
            <SuperInput callBack={()=>{}} text={'Description'} title={''} error={''}/>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding: 10px;
  border-radius: 6px;
  margin: 0 20px ;
  background-color: #424d6b;
  box-shadow: 0 0 15px 1px #1a2434;
`


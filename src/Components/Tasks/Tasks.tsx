import React from 'react';
import styled from "styled-components";

export const Tasks = () => {
    return (
        <Wrapper>
            Tasks list is empty
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #424d6b;
  box-shadow: 0 0 15px 1px #1a2434;
  border-radius: 10px;
  margin: 0 20px ;
`


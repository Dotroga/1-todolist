import React from 'react';

import styled from "styled-components";
import {ListType} from "../../redux/state";



export const List: React.FC<{ list: ListType }> = ({list}) => {
  return (
    <Wrapper>
        <ListTitle color={list.color!}>
            {list.title}
        </ListTitle>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    
`

const ListTitle = styled.div<{color: string}>`
color: ${({color})=>color};
`


import React from 'react';
import {ListsType} from "../../redux/state";
import {Section} from "../Section/Section";
import styled from "styled-components";

type ListType = {
  list: ListsType
}

export const List: React.FC<ListType> = ({list}) => {
  return (
    <Wrapper>
        <ListTitle color={list.color!}>
            {list.title}
        </ListTitle>

      <Section listId={list.id}/>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    
`

const ListTitle = styled.div<{color: string}>`
color: ${({color})=>color};
`


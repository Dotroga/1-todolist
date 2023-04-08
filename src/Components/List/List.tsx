import React, {useEffect} from 'react';

import styled from "styled-components";
import {ListType} from "../../redux/state";
import {setTaskTC} from "../../redux/taskReducer";
import {useAppDispatch} from "../../redux/store";
import {removeListTK} from "../../redux/listsReducer";
import {DeleteButton} from "../DeleteButton/DeleteButton";



export const List: React.FC<{ list: ListType }> = ({list}) => {
    const dispatch = useAppDispatch()
    useEffect(() => dispatch(setTaskTC(list.id)),[list])
    const deleteList = () => dispatch(removeListTK(list.id))
  return (
    <Wrapper>
        <ListTitle color={list.color!}>
            {list.title}
        </ListTitle>
        <DeleteButton callBack={deleteList}/>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    display: flex;
  align-items: center;
`

const ListTitle = styled.div<{color: string}>`
color: ${({color})=>color};
`


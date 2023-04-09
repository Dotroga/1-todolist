import React, {useEffect} from 'react';

import styled from "styled-components";
import {ListType} from "../../redux/state";
import {setTaskTC} from "../../redux/taskReducer";
import {useAppDispatch} from "../../redux/store";
import {removeListTK} from "../../redux/listsReducer";
import {DeleteButton} from "../DeleteButton/DeleteButton";
import {Tasks} from "../Tasks/Tasks";



export const List: React.FC<{ list: ListType }> = ({list}) => {
    const dispatch = useAppDispatch()
    useEffect(() => dispatch(setTaskTC(list.id)),[list])
    const deleteList = () => dispatch(removeListTK(list.id))
  return (
    <Wrapper>
        <ListTitle color={list.color!}>
            {list.title}
            <DeleteButton callBack={deleteList}/>
        </ListTitle>
        <Tasks/>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
 
`

const ListTitle = styled.div<{color: string}>`
  display: flex;
  align-items: center;
color: ${({color})=>color};
  font-size: 40px;
  margin: 10px 70px;
`


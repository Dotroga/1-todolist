import React from "react";
import styled from "styled-components";

import { Tasks } from "./Tasks/Tasks";
import { AddNewTask } from "./AddNewTask/AddNewTask";
import { useNavigate } from "react-router-dom";
import {useAppDispatch} from "../../../redux/store";
import {listsThunks, ListType} from "../../../redux/lists.reducer";
import {DeleteButton} from "../../Super/DeleteButton/DeleteButton";


export const List: React.FC<{ list: ListType }> = ({ list }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const deleteList = () => dispatch(listsThunks.removeList(list.id, navigate));
  return (
    <Wrapper>
      <ListTitle color={list.color!}>
        {list.title}
        <DeleteButton callBack={deleteList} />
      </ListTitle>
      <Tasks listId={list.id} />
      <AddNewTask listId={list.id} numberOfTasks={list.numberOfTasks} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ListTitle = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  color: ${({ color }) => color};
  font-size: 40px;
  margin: 0 70px;
`;

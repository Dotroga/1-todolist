import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "redux/store";
import { ListType, removeListTK } from "redux/listsReducer";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { Tasks } from "./Tasks/Tasks";
import { AddNewTask } from "./AddNewTask/AddNewTask";
import { useNavigate } from "react-router-dom";

export const List: React.FC<{ list: ListType }> = ({ list }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const deleteList = () => dispatch(removeListTK(list.id, navigate));
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

import React, {useState} from "react";
import styled from "styled-components";
import {ListType} from "redux/lists.reducer";
import { Tasks } from "./Tasks/Tasks";
import { AddNewTask } from "./AddNewTask/AddNewTask";

import {AdditionalOptionsLists} from "Components/Super/AdditionalOptions/AdditionalOptionsLists";
import {AddTaskButton} from "Components/Content/List/AddTaskButton/AddTaskButton";

export const List: React.FC<{ list: ListType , index: number}> = ({ list, index }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenAddFrom, setOpenAddFrom] = useState(false)
  const openAddFrom = () => setOpenAddFrom(true)
  const closeAddFrom = () => setOpenAddFrom(false)
  const changeOpened = () => setIsOpen(prevState => !prevState)
  return (
    <Wrapper>
      <ListTitle color={list.color!} isOpen={isOpen}>
        <div className='listTitle'>{list.title}</div>
        <AdditionalOptionsLists
          listId={list.id}
          opened={changeOpened}
          isOpen={isOpen}
          title={list.title}
          color={list.color!}
          index={index}
          onCloses={changeOpened}
          isLoading={undefined}
          />
      </ListTitle>
      <Tasks listId={list.id} />
      <AddTaskButton onClick={openAddFrom} />
      {isOpenAddFrom &&
        <AddNewTask onClose={closeAddFrom}
                    isOpen={isOpenAddFrom}
                    listId={list.id}
                    numberOfTasks={list.numberOfTasks} />
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ListTitle = styled.div<{ color: string, isOpen: boolean}>`
  display: flex;
  align-items: center;
  color: ${({ color }) => color};
  .listTitle {
    font-size: 40px;
    padding-left: 70px;
    padding-right: 20px;
  }
  
  .AdditionalOptions, .threePoints {
    z-index: 10;
    display: ${({isOpen})=> isOpen ? 'flex' : 'none'};
  }
  &:hover {
    .AdditionalOptions, .threePoints {
      display: flex;
    }
  }
`;

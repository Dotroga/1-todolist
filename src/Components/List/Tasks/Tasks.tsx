import React from 'react';
import styled from "styled-components";
import {useAppSelector} from "../../../redux/store";
import {TaskType} from "../../../api/todo-api";

type TaskPropsType = {
    listId: string
}

export const Tasks = (props:TaskPropsType) => {

    const tasks = useAppSelector<TaskType[]>(state => state.tasks[props.listId])

    return (
        <Wrapper>
            {tasks.length
            ? tasks.map((t)=><div>{t.title}</div>)
            : 'Tasks list is empty'
            }
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin: 20px 20px ;
`


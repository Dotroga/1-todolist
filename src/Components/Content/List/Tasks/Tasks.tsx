import React from "react";
import styled from "styled-components";
import { useAppSelector } from "redux/store";
import {Task} from "Components/Content/List/Tasks/Task/Task";
import {TaskAppType} from "api/taskAPI";

type TaskPropsType = {
  listId: string;
};

export const Tasks = (props: TaskPropsType) => {
  const tasks = useAppSelector<TaskAppType[]>((state) => state.tasks[props.listId]);
  return <Wrapper>
    {tasks.length
      ? tasks.map((t, i) =>
        <div key={t.id}>
          <Task id={t.id} task={t}/>
          {i !== tasks.length - 1 && <hr/>}
        </div>
     )
      : "Tasks list is empty"}
  </Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  border-radius: 10px;
  margin: 20px 20px;
  hr {
    margin: 0 30px;
    border: none;
    border-top: 1px solid #37445f;
  }
`;

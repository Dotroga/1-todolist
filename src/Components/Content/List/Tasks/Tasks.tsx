import React from "react";
import styled from "styled-components";
import {Task} from "./Task/Task";
import {TaskType} from "../../../../api/taskAPI";
import {useAppSelector} from "../../../../redux/store";


type TaskPropsType = {
  listId: string;
};

export const Tasks = (props: TaskPropsType) => {
  const tasks = useAppSelector<TaskType[]>((state) => state.tasks[props.listId]);
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

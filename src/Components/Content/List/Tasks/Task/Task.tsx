import React from 'react';
import {SuperCheckbox} from "Components/Super/SuperCheckbox/SuperCheckbox";
import styled from "styled-components";
import {TaskAppType} from "api/taskAPI";
import {useAppDispatch} from "redux/store";
import {taskThunk} from "redux/task.reducer";

type TaskPropsType = {
  id: string,
  task: TaskAppType
}

export const Task: React.FC<TaskPropsType> = (props) => {
  const {id, task} = props
  const dispatch = useAppDispatch()
  const editStatus = () => dispatch(taskThunk.editTaskStatus(task))
  console.log(task.status)
  return (
    <Wrapper>
      <SuperCheckbox checked={task.status === 2} onChange={editStatus} color={task.priority[0]}/>
      <div className='oneLine'>
        <p className='title'>{task.title}</p>
        <p className='description'>{task.description}</p>
        <div>date</div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;

  .title {
    font-size: 20px;
  }

  .description {
    font-style: oblique;
    font-size: 16px;
    color: rgba(111, 111, 111, 0.72);
  }
`


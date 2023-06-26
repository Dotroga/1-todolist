import React from 'react';
import {SuperCheckbox} from "Components/Super/SuperCheckbox/SuperCheckbox";
import styled from "styled-components";
import {TaskAppType} from "api/taskAPI";
import {useAppDispatch} from "redux/store";
import {taskThunk} from "redux/task.reducer";

type TaskPropsType = {
  task: TaskAppType
}

export const Task: React.FC<TaskPropsType> = (props) => {
  const {task} = props
  const dispatch = useAppDispatch()
  const editStatus = () => dispatch(taskThunk.editTaskStatus(task))

  return (
    <Wrapper>
      <SuperCheckbox checked={task.status === 2} onChange={editStatus} color={task.priority[0]}/>
      <div className='oneLine'>
        <p className='title'>{task.title}</p>
        <p className='description'>{task.description}</p>
        <div className='deadline'>{task.deadline?.date}</div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  .oneLine {
    width: 100%;
  }

  .title {
    font-size: 20px;
  }
  .description {
    font-style: oblique;
    font-size: 16px;
    color: ${({theme}) => theme.colors.secondFont};
    overflow-wrap: break-word;
  }
  
  .deadline {
    font-size: 15px;
    float: right;
    margin: 0 30px;
  }
`


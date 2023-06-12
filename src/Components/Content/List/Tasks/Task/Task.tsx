import React from 'react';

import styled from "styled-components";
import {TaskType} from "../../../../../api/taskAPI";
import {SuperCheckbox} from "../../../../Super/SuperCheckbox/SuperCheckbox";


type TaskPropsType = {
  id: string,
  task: TaskType
}

export const Task: React.FC<TaskPropsType> = (props) => {
  const {id, task} = props
  return (
    <Wrapper>
      <SuperCheckbox/>
      <div className='oneLine'>
        <p className='title'>{task.title}</p>
        <p className='description'>{task.description}</p>
        <div>date completed</div>
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


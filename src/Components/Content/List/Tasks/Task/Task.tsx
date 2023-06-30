import React, {useState} from 'react';
import {SuperCheckbox} from "Components/Super/SuperCheckbox/SuperCheckbox";
import styled from "styled-components";
import {TaskAppType} from "api/taskAPI";
import {useAppDispatch} from "redux/store";
import {taskThunk} from "redux/task.reducer";
import {AdditionalOptionsTask} from "Components/Super/AdditionalOptions/AdditionalOptionsTask";

type TaskPropsType = {
  task: TaskAppType
  index: number
}

export const Task: React.FC<TaskPropsType> = (props) => {
  const {task} = props
  const dispatch = useAppDispatch()
  const editStatus = () => dispatch(taskThunk.editTaskStatus(task))
  const [isOpenOptions, setOpenOptions] = useState(false)
  const opened = () => setOpenOptions(true)
  const closes = () => setOpenOptions(false)
  return (
    <Wrapper isOpenOptions={isOpenOptions}>
      <div className='task'>
        <SuperCheckbox checked={task.status === 2} onChange={editStatus} color={task.priority[0]}/>
        <div className='oneLine'>
          <p className='title'>{task.title}</p>
          <p className='description'>{task.description}</p>
        </div>
        <AdditionalOptionsTask
          {...props}
          isOpen={isOpenOptions}
          opened={opened}
          closes={closes}
        />
      </div>
      <div className='deadline'>{task.deadline?.date}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div<{isOpenOptions: boolean}>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  .deadline {
    font-size: 15px;
    margin-left: auto;
    float: right;
  }
  .task {
    min-height: 28px;
    display: flex;
    gap: 5px;
  }
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
  &:hover {
    .AdditionalOptions .threePoints{
      display: flex;
    }
  }
  .AdditionalOptions .threePoints {
    float: right;
    display: ${({isOpenOptions})=> isOpenOptions ? 'flex' : 'none'};
  }
  .modal {
    display: ${({isOpenOptions})=> isOpenOptions ? 'flex' : 'none'};
  }
`


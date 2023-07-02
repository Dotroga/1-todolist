import React, {useState} from 'react';
import {TaskAppType} from "api/taskAPI";
import {AddNewTask} from "Components/Content/List/AddNewTask/AddNewTask";
import {useAppDispatch, useAppSelector} from "redux/store";
import {selectTaskLength} from "redux/task.selector";
import {ThreeDotsButton} from "Components/Super/AdditionalOptions/ThreeDotsButton";
import {ModalWindow} from "Components/Super/AdditionalOptions/ModalWindow";
import {selectTasksIsLoading} from "redux/app.selectors";
import styled from "styled-components";
import {taskThunk} from "redux/task.reducer";


type PropsType = {
  task: TaskAppType
  index: number
  isOpen: boolean
  opened: () => void
  closes: () => void
}

export const AdditionalOptionsTask: React.FC<PropsType> = (props) => {
  const {task, index, isOpen, opened, closes} = props
  const {todoListId, id} = task
  const dispatch = useAppDispatch()
  const [isOpenEditTask, setEditTask] = useState(false)
  const isLoading = useAppSelector(selectTasksIsLoading)
  const length = useAppSelector(selectTaskLength(todoListId))
  const editing = () => {
    closes()
    setEditTask(true)
  }
  const remove = () => {
    closes()
    dispatch(taskThunk.removeTask({todoListId, id}))
  }
  const reorderDown = () => {
    dispatch(taskThunk.reorderTask({todoListId, id, index, change: 'down'}))
  }
  const reorderUp = () => {
    dispatch(taskThunk.reorderTask({todoListId, id, index, change: 'up'}))
  }
  return (
    <Wrapper className='AdditionalOptions' isOpen={isOpen}>
      <ThreeDotsButton opened={opened} isOpen={isOpen}/>
      <ModalWindow
        isOpen={isOpen}
        close={closes}
        index={index}
        length={length}
        isLoading={isLoading}
        editing={editing}
        remove={remove}
        reorderDown={reorderDown}
        reorderUp={reorderUp}
      />
      {isOpenEditTask &&
        <AddNewTask
            isOpen={isOpenEditTask}
            task={task}
            listId={todoListId}
            numberOfTasks={length}
            onClose={()=>setEditTask(false)}/>
      }
    </Wrapper>
  );
};

const Wrapper = styled.div<{isOpen: boolean}>`
  display: flex;
  align-items: center;
  position: relative;
  .modal {
    z-index: 99;
    right: 40px;
    position: absolute;
  }
`


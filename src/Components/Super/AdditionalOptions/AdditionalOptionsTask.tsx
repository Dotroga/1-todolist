import React, {useState} from 'react';
import {TaskAppType} from "api/taskAPI";
import {AddNewTask} from "Components/Content/List/AddNewTask/AddNewTask";
import {useAppSelector} from "redux/store";
import {selectTaskLength} from "redux/task.selector";
import {ThreeDotsButton} from "Components/Super/AdditionalOptions/ThreeDotsButton";
import {ModalWindow} from "Components/Super/AdditionalOptions/ModalWindow";


type PropsType = {
  task: TaskAppType
}

export const AdditionalOptionsTask: React.FC<PropsType> = (props) => {
  const  {task} = props
  const [isOpen, setOpen] = useState(false)
  const [isOpenEditTask, setEditTask] = useState(false)
  const opened = () => setOpen(true)
  const length = useAppSelector(selectTaskLength(task.todoListId))
  return (
    <div>
      <ThreeDotsButton opened={opened} isOpen={isOpen}/>
      {/*<ModalWindow*/}
      {/*  isOpen={isOpen}*/}
      {/*  close={onCloses}*/}
      {/*  index={index}*/}
      {/*  length={length}*/}
      {/*  isLoading={isLoading}*/}
      {/*  editing={editing}*/}
      {/*  remove={remove}*/}
      {/*  reorderDown={reorderDown}*/}
      {/*  reorderUp={reorderUp}*/}
      {/*/>*/}
      {isOpenEditTask &&
        <AddNewTask
            isOpen={isOpenEditTask}
            task={task}
            listId={task.todoListId}
            numberOfTasks={length}
            onClose={()=>setEditTask(false)}/>
      }
    </div>
  );
};


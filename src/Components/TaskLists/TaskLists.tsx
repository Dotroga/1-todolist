import React, {ChangeEvent, useState} from 'react';
import NameAndRename from "../NameAndRename/NameAndRename";
import {TaskType} from "../../bll/state";
import './TaskList.css'
import DeleteButton from "../DeleteButton/DeleteButton";



type TaskPropsType = {
  task: TaskType
  removeTask:  any
  changeTask: any
  renameTask: any
}

const Task: React.FC<TaskPropsType>= (
  {task,
    removeTask,
    changeTask,
    renameTask
  }) => {
  const [onMouse, setOnMouse] = useState(false)
      const removeTaskHandler = () => removeTask(task.id)
      const changeTaskHandler = (e: ChangeEvent<HTMLInputElement>) =>
        changeTask(task.id, e.currentTarget.checked)
      const renameTaskHandler = (title: string) => renameTask(task.id, title)
      return (
        <div className='task'
             key={task.id}
             onMouseEnter={()=>setOnMouse(true)}
             onMouseLeave={()=>setOnMouse(false)}
        >
          <input type="checkbox" checked={task.isDone} onChange={changeTaskHandler}/>
          <div className='text'>
            <NameAndRename name={task.title} callBack={renameTaskHandler}/>
            <div className='date'>{task.date}</div>
          </div>
          {onMouse && <DeleteButton callBack={removeTaskHandler}/> }
        </div>)
};

export default Task;
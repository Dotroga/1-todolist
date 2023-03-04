import React, {ChangeEvent} from 'react';
import NameAndRename from "../NameAndRename/NameAndRename";
import {TaskType} from "../../state";
import './TaskList.css'



type TaskListsPropsType = {
  tasks: TaskType[]
  removeTask:  any
  changeTask: any
  renameTask: any
}

const TaskLists: React.FC<TaskListsPropsType>= (
  {tasks,
    removeTask,
    changeTask,
    renameTask
  }) => {
  let tasksList = tasks.length
    ? tasks.map((task) => {
      const removeTaskHandler = () => removeTask(task.id)
      const changeTaskHandler = (e: ChangeEvent<HTMLInputElement>) =>
        changeTask(task.id, e.currentTarget.checked)
      const renameTaskHandler = (title: string) => renameTask(task.id, title)
      return (
        <div className='task'  key={task.id} >

          <input type="checkbox" checked={task.isDone} onChange={changeTaskHandler}/>
          <div className='text'>
            <NameAndRename name={task.title} callBack={renameTaskHandler}/>
            <div className='date'>{task.date}</div>
          </div>
          <button className='delete' onClick={removeTaskHandler}>x</button>
        </div>)})
    : <span>Your tasks list is empty</span>
  return (
    <div >
      {tasksList}
    </div>
  );
};

export default TaskLists;
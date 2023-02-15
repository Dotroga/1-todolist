import React, {ChangeEvent} from 'react';
import {changeTaskStatusAC, removeTaskAC, renameTaskAC} from "../../reducers/taskReducer";
import NameAndRename from "../NameAndRename/NameAndRename";
import {TasksType} from "../../TodoList";


type TaskListsPropsType = {
  tasks: TasksType
  listId: string
  removeTask:  any
  changeTask: any
  renameTask: any
}

const TaskLists: React.FC<TaskListsPropsType>= (
  {
    tasks,
    listId,
    removeTask,
    changeTask,
    renameTask
  }) => {
  let tasksList = tasks[listId].length
    ? tasks[listId].map((task: any) => {
      const removeTaskHandler = () => removeTask(task.id)
      const changeTaskHandler = (e: ChangeEvent<HTMLInputElement>) =>
        changeTask(task.id, e.currentTarget.checked)
      const renameTaskHandler = ( title: string) => renameTask(task.id, title)
      return (
        <li key={task.id} >
          <input type="checkbox" checked={task.isDone} onChange={changeTaskHandler}/>
          <NameAndRename
            // className={ task.isDone ? 'task-done' : ''}
            name={task.title}
            callBack={renameTaskHandler}/>
          <button onClick={removeTaskHandler}>x</button>
        </li>)})
    : <span>Your tasks list is empty</span>
  return (
    <div>
      {tasksList}
    </div>
  );
};

export default TaskLists;
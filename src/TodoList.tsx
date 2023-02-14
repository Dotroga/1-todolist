import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './TodoList.css'
import {FilterValueType, todolistId1, todolistId2} from "./App";
import {SuperInput} from "./Components/SuperInput/SuperInput";
import NameAndRename from "./Components/NameAndRename/NameAndRename";
import {v1} from "uuid";

type TodoListPropsType = {
  listId: string
  title: string
  removeTaskList: (listId: string) => void
  removeTask: (listId: string, taskId: string) => void
  changeFilter: (listId: string, filter: FilterValueType) => void
  addTask: (listId: string, title: string) => void
  changeTaskStatus: (listId: string, taskId: string, isDone: boolean) => void
  renameTask: (listId: string, taskId:string, title: string) => void
  renameTaskList: (listId: string, title: string) => void
}

const TodoList: React.FC<TodoListPropsType> = (
  {
    listId,
    title,
    removeTaskList,
    removeTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    renameTask,
    renameTaskList,
  }) => {

  const [state, setState] = useState({
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Books", isDone: true},
      {id: v1(), title: "Food", isDone: false}
    ]
  })

  let tasksList = state[listId].length
    ? state[listId].map((task: any) => {
      const removeTaskHandler = () => removeTask(listId, task.id)
      const changeTaskS = (e: ChangeEvent<HTMLInputElement>) =>
        changeTaskStatus(listId, task.id, e.currentTarget.checked)
      const renameTaskHandler = (title: string) => renameTask(listId, task.id, title)

      return (
        <li key={task.id} >
          <input type="checkbox" checked={task.isDone} onChange={changeTaskS}/>
          <NameAndRename
            // className={ task.isDone ? 'task-done' : ''}
            name={task.title}
            callBack={renameTaskHandler}/>
          <button onClick={removeTaskHandler}>x</button>
        </li>)})
    : <span>Your tasks list is empty</span>


  const handlerCreator = (filter: FilterValueType) => () => changeFilter(listId,filter)
  const addNewTask = (title: string) => addTask(listId, title)
  const renameTaskListHandler = (title: string) => renameTaskList(listId, title)
  const removeTaskListHandler = () => removeTaskList(listId)
  return (
    <div className='todoList'>
      <button className='closeButton' onClick={removeTaskListHandler}>x</button>
      <NameAndRename name={title} callBack={renameTaskListHandler}/>
      <div>
        <SuperInput callBack={addNewTask}/>
      </div>
      <div>
        <button
          onClick={handlerCreator('All')}
          // className={filter === 'All' ? 'activeButton' : ''}
        >All
        </button>
        <button
          onClick={handlerCreator("Active")}
          // className={filter === 'Active' ? 'activeButton' : ''}
        >Active
        </button>
        <button
          onClick={handlerCreator("Completed")}
          // className={filter === 'Completed' ? 'activeButton' : ''}
        >Completed
        </button>
      </div>
      {tasksList}
    </div>);
}

export default TodoList;

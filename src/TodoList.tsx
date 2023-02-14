import React, {ChangeEvent, KeyboardEvent, useReducer, useState} from 'react';
import './TodoList.css'
import {FilterValueType, todolistId1, todolistId2} from "./App";
import {SuperInput} from "./Components/SuperInput/SuperInput";
import NameAndRename from "./Components/NameAndRename/NameAndRename";
import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, renameTaskAC, tasksReducer} from "./reducers/taskReducer";

type TodoListPropsType = {
  listId: string
  title: string
  removeTaskList: (listId: string) => void
  changeFilter: (listId: string, filter: FilterValueType) => void
  renameTaskList: (listId: string, title: string) => void
}

const TodoList: React.FC<TodoListPropsType> = (
  {
    listId,
    title,
    removeTaskList,
    changeFilter,
    renameTaskList,
  }) => {

  const[tasks, tasksDispatch] = useReducer(tasksReducer,{
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
      {id: v1(), title: "Books", isDone: true},
      {id: v1(), title: "Food", isDone: false}
    ]})
  const addTask = (title: string) => tasksDispatch(addTaskAC(listId,title))

  let tasksList = tasks[listId].length
    ? tasks[listId].map((task: any) => {
      const removeTask = () => tasksDispatch(removeTaskAC(listId, task.id))
      const changeTask = (e: ChangeEvent<HTMLInputElement>) =>
        tasksDispatch(changeTaskStatusAC(listId, task.id, e.currentTarget.checked))
      const renameTask = (title: string) =>
        tasksDispatch(renameTaskAC(listId, task.id, title))

      return (
        <li key={task.id} >
          <input type="checkbox" checked={task.isDone} onChange={changeTask}/>
          <NameAndRename
            // className={ task.isDone ? 'task-done' : ''}
            name={task.title}
            callBack={renameTask}/>
          <button onClick={removeTask}>x</button>
        </li>)})
    : <span>Your tasks list is empty</span>


  const handlerCreator = (filter: FilterValueType) => () => changeFilter(listId,filter)
  const renameTaskListHandler = (title: string) => renameTaskList(listId, title)
  const removeTaskListHandler = () => removeTaskList(listId)

  return (
    <div className='todoList'>
      <button className='closeButton' onClick={removeTaskListHandler}>x</button>
      <NameAndRename name={title} callBack={renameTaskListHandler}/>
      <div>
        <SuperInput callBack={addTask}/>
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

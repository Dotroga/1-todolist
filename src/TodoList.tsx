import React, {ChangeEvent, KeyboardEvent, useReducer, useState} from 'react';
import './TodoList.css'
import {FilterValueType, todolistId1, todolistId2} from "./App";
import {SuperInput} from "./Components/SuperInput/SuperInput";
import NameAndRename from "./Components/NameAndRename/NameAndRename";
import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, renameTaskAC, tasksReducer} from "./reducers/taskReducer";
import TaskLists from "./Components/TaskLists/TaskLists";

export type TaskType = { id: string, title: string, isDone: boolean }
export type TasksType = {
  [key: string]: TaskType[]
}

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
  const removeTask = (id: string) => tasksDispatch(removeTaskAC(listId, id))
  const changeTask = (id: string, isDone: boolean) =>
    tasksDispatch(changeTaskStatusAC(listId, id, isDone))
  const renameTask = (id: string, title: string) =>
    tasksDispatch(renameTaskAC(listId, id, title))
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
      <TaskLists
        tasks={tasks}
        listId={listId}
        removeTask={removeTask}
        changeTask={changeTask}
        renameTask={renameTask}
      />
    </div>);
}

export default TodoList;

import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';
import './TodoList.css'
import {FilterValueType} from "./App";

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (filter: FilterValueType)=>void
  addTask: (title: string) => void
}
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

function TodoList(props: TodoListPropsType) {
  const [title, setTitle] = useState<string>('')

  let tasksList = props.tasks.length
    ? props.tasks.map((task:TaskType) => {
      const removeTask = () => props.removeTask(task.id)
      return (
        <li key={task.id}>
          <input type="checkbox" checked={task.isDone}/>
          <span>{task.title}</span>
          <button onClick={removeTask}>x</button>
        </li>
      )
    })
    : <span>Your tasks list is empty</span>

  const addTask = () => {
    props.addTask(title)
    setTitle('')
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()
  const handlerCreator = (filter: FilterValueType) => () => props.changeFilter(filter) //функция возвращает функцию, возвращает калбэк

  return (
      <div className='todoList'>
        <h3>{props.title}</h3>
        <div>
          <input
            type='text'
            value={title}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}/>
          <button onClick={()=>addTask()}>+</button>
        </div>
        <div>
          <button onClick={handlerCreator(null)}>All</button>
          <button onClick={handlerCreator(false)}>Active</button>
          <button onClick={handlerCreator(true)}>Completed</button>
        </div>
        {tasksList}
      </div>);
}

export default TodoList;

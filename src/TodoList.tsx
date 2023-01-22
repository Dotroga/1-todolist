import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './TodoList.css'
import {FilterValueType} from "./App";

type TodoListPropsType = {
  title: string
  tasks: TaskType[]
  filter: string
  removeTask: (taskId: string) => void
  changeFilter: (filter: FilterValueType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

const TodoList: React.FC<TodoListPropsType> = (
  {
    title,
    tasks,
    removeTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    filter,
  }) => {

  const [titleTask, setTitleTask] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  let tasksList = tasks.length
    ? tasks.map((task: TaskType) => {
      const removeTaskHandler = () => removeTask(task.id)
      const changeTaskS = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked)
      }

      return (
        <li key={task.id} >
          <input type="checkbox" checked={task.isDone} onChange={changeTaskS}/>
          <span className={ task.isDone ? 'task-done' : ''}>  {task.title}</span>
          <button onClick={removeTaskHandler}>x</button>
        </li>
      )
    })
    : <span>Your tasks list is empty</span>

  const addTaskHandler = () => {
    const trimmedTitle = titleTask.trim()
    if (trimmedTitle !== '') {
      addTask(trimmedTitle)
    } else {
      setError(true)
    }

    setTitleTask('')}
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error &&  setError(false)
    setTitleTask(e.currentTarget.value)}
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()
  const handlerCreator = (filter: FilterValueType) => () => changeFilter(filter) //функция возвращает функцию, возвращает калбэк

  return (
    <div className='todoList'>
      <h3>{title}</h3>
      <div>
        <input
          className={error ? 'input-error' : ''}
          type='text'
          value={titleTask}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}/>
        <button onClick={addTaskHandler}>+</button>
        {error && <p style={{margin: '0', color:'red'}}>Введите текст!</p>}
      </div>
      <div>
        <button
          onClick={handlerCreator('All')}
          className={filter === 'All' ? 'activeButton' : ''}>All
        </button>
        <button
          onClick={handlerCreator("Active")}
          className={filter === 'Active' ? 'activeButton' : ''}>Active
        </button>
        <button
          onClick={handlerCreator("Completed")}
          className={filter === 'Completed' ? 'activeButton' : ''}>Completed
        </button>
      </div>
      {tasksList}
    </div>);
}

export default TodoList;

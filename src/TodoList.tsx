import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './TodoList.css'
import {FilterValueType} from "./App";

type TodoListPropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (taskId: string) => void
  changeFilter: (filter: FilterValueType) => void
  addTask: (title: string) => void
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
  }) => {

  const [titleTask, setTitleTask] = useState<string>('')

  let tasksList = tasks.length
    ? tasks.map((task: TaskType) => {
      const removeTaskHandler = () => removeTask(task.id)
      return (
        <li key={task.id}>
          <input type="checkbox" checked={task.isDone}/>
          <span>{task.title}</span>
          <button onClick={removeTaskHandler}>x</button>
        </li>
      )
    })
    : <span>Your tasks list is empty</span>

  const addTaskHandler = () => {
    addTask(titleTask)
    setTitleTask('')
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitleTask(e.currentTarget.value)
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()
  const handlerCreator = (filter: FilterValueType) => () => changeFilter(filter) //функция возвращает функцию, возвращает калбэк

  return (
    <div className='todoList'>
      <h3>{title}</h3>
      <div>
        <input
          type='text'
          value={titleTask}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}/>
        <button onClick={addTaskHandler}>+</button>
      </div>
      <div>
        <button onClick={handlerCreator('All')}>All</button>
        <button onClick={handlerCreator("Active")}>Active</button>
        <button onClick={handlerCreator("Completed")}>Completed</button>
      </div>
      {tasksList}
    </div>);
}

export default TodoList;

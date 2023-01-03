import React from 'react';
import './TodoList.css'
import {findAllByDisplayValue} from "@testing-library/react";
type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
}
export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

function TodoList(props: TodoListPropsType) {
  let tasksList = props.tasks.length
    ? props.tasks.map((task:TaskType) => {
      return (
        <li>
          <input type="checkbox" checked={task.isDone}/>
          <span>{task.title}</span>
        </li>
      )
    })
    : <span>Your taskslist is empty</span>

  return (
      <div className='todoList'>
        <h3>{props.title}</h3>
        <div>
          <input/>
          <button>+</button>
        </div>
        {tasksList}
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>);
}

export default TodoList;

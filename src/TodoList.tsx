import React from 'react';
import './TodoList.css'

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: number) => void
  changeFilter: any


}
export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

function TodoList(props: TodoListPropsType) {

  let tasksList = props.tasks.length
    ? props.tasks.map((task:TaskType) => {
      const removeTask = () => props.removeTask(task.id)
      return (
        <li>
          <input type="checkbox" checked={task.isDone}/>
          <span>{task.title}</span>
          <button onClick={removeTask}>x</button>
        </li>
      )
    })
    : <span>Your tasks list is empty</span>

  return (
      <div className='todoList'>
        <h3>{props.title}</h3>
        <div>
          <input/>
          <button>+</button>
        </div>
        {tasksList}
        <div>
          <button onClick={()=>props.changeFilter(null)}>All</button>
          <button onClick={()=>props.changeFilter(false)}>Active</button>
          <button onClick={()=>props.changeFilter(true)}>Completed</button>
        </div>
      </div>);
}

export default TodoList;

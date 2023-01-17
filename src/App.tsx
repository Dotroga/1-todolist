import React, {useEffect, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {TaskType} from './TodoList'
import {v1} from "uuid";


export type FilterValueType = boolean | null


function App() {
  const todoListTitle_1: string = 'What to learn'
  // const todoListTitle_2: string = 'What to bay'

  // const task_2: Array<TaskType> = [
  //   {id: 4, title: 'Book', isDone: true},
  //   {id: 5, title: 'Brake discs', isDone: false},
  //   {id: 6, title: 'Food', isDone: true}
  // ]
  const [tasks, setTask] = useState([
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'CSS - HTML', isDone: true},
    {id: v1(), title: 'React', isDone: false}
  ])

  const [filter,setFilter] = useState<FilterValueType>(null)

  const getFilteredTaskForRender = (tasks: Array<TaskType>, filter:FilterValueType):Array<TaskType> => {
     return filter == null
       ? tasks
       : tasks.filter((task) => task.isDone === filter)
  }

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    }
    setTask([...tasks, newTask])

  }

  const removeTask = (taskId:string) => {
    setTask(tasks.filter((task)=> task.id !== taskId))
  }
  useEffect(()=>{
  },[tasks])

  const changeFilter = (filter:FilterValueType ) => {
    setFilter(filter)
  }

  const filteredTaskForRender = getFilteredTaskForRender(tasks, filter)

  return (
    <div className="App">
      <TodoList
        title={todoListTitle_1}
        tasks={filteredTaskForRender}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
      />
      {/*<TodoList title={todoListTitle_2} tasks={task_2}/>*/}
    </div>
  );
}

export default App;

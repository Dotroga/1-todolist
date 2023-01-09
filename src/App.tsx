import React, {useEffect, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {TaskType} from './TodoList'

type FilterValueType = boolean | null

function App() {
  const todoListTitle_1: string = 'What to learn'
  // const todoListTitle_2: string = 'What to bay'

  // const task_2: Array<TaskType> = [
  //   {id: 4, title: 'Book', isDone: true},
  //   {id: 5, title: 'Brake discs', isDone: false},
  //   {id: 6, title: 'Food', isDone: true}
  // ]
  const [tasks, setTask] = useState([
    {id: 1, title: 'JS', isDone: true},
    {id: 2, title: 'CSS - HTML', isDone: true},
    {id: 3, title: 'React', isDone: false}
  ])

  const removeTask = (taskId:number) => {
    setTask(tasks.filter((task)=> task.id !== taskId))
  }
  useEffect(()=>{
  },[tasks])

  const changeFilter = (filter:FilterValueType ) => {
    setFilter(filter)
  }

  const [filter,setFilter] = useState<FilterValueType>(null)
  const getFilteredTaskForRender = (tasks: Array<TaskType>, filter:FilterValueType):Array<TaskType> => {
     return filter == null
       ? tasks
       : tasks.filter((task) => task.isDone === filter)
  }

  const filteredTaskForRender = getFilteredTaskForRender(tasks, filter)
  return (
    <div className="App">
      <TodoList
        title={todoListTitle_1}
        tasks={filteredTaskForRender}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
      {/*<TodoList title={todoListTitle_2} tasks={task_2}/>*/}
    </div>
  );
}

export default App;

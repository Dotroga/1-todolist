import React, {useEffect, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {TaskType} from './TodoList'
import {v1} from "uuid";


export type FilterValueType = 'All' | 'Active' | 'Completed'

function App() {
  const todoListTitle_1: string = 'What to learn'
  const tasks1: TaskType[] = [
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'CSS - HTML', isDone: true},
    {id: v1(), title: 'TS', isDone: false},
    {id: v1(), title: 'Redux', isDone: false},
    {id: v1(), title: 'React', isDone: true}
  ]
  const [tasks, setTask] = useState<TaskType[]>(tasks1)

  const [filter, setFilter] = useState<FilterValueType>('All')

  const getFilteredTaskForRender = (tasks: TaskType[], filter: FilterValueType): TaskType[] => {
    let filterTasks = tasks
    if (filter === 'Active') {
      filterTasks = tasks.filter(t=>!t.isDone)
    } else if (filter === 'Completed' ) {
      filterTasks = tasks.filter(t=>t.isDone)
    }
    return filterTasks
  }

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    }
    setTask([...tasks, newTask])
  }

  const removeTask = (taskId: string) => {
    setTask(tasks.filter((task) => task.id !== taskId))
  }

  useEffect(() => {
  }, [tasks])

  const changeFilter = (filter: FilterValueType) => {
    setFilter(filter)
  }

  const filteredTaskForRender = getFilteredTaskForRender(tasks, filter)
  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    setTask(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
  }

  return (
    <div className="App">
      <TodoList
        title={todoListTitle_1}
        tasks={filteredTaskForRender}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
        filter={filter}
      />
      {/*<TodoList title={todoListTitle_2} tasks={task_2}/>*/}
    </div>
  );
}

export default App;



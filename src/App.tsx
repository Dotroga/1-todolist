import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import {TaskType} from './TodoList'

function App() {
  const todoListTitle_1: string = 'What to learn'
  const todoListTitle_2: string = 'What to bay'
  const task_1: Array<TaskType> = [
    {id: 1, title: 'JS', isDone: true},
    {id: 2, title: 'CSS - HTML', isDone: true},
    {id: 3, title: 'React', isDone: false}
  ]
  const task_2: Array<TaskType> = [
    {id: 4, title: 'Book', isDone: true},
    {id: 5, title: 'Brake discs', isDone: false},
    {id: 6, title: 'Food', isDone: true}
  ]

  return (
    <div className="App">
      <TodoList title={todoListTitle_1} tasks={task_1}/>
      <TodoList title={todoListTitle_2} tasks={task_2}/>
    </div>
  );
}

export default App;

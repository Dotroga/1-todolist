import React from 'react';
import {FilterType, ListsType, TaskType,} from "./App";
import {SuperInput} from "./Components/SuperInput/SuperInput";
import NameAndRename from "./Components/NameAndRename/NameAndRename";
import TaskLists from "./Components/TaskLists/TaskLists";
import './TodoList.css'
import FilterButton from "./Components/FilterButton/FilterButton";



type TodoListPropsType = {
  list: ListsType
  tasks: TaskType[]
  addTask: (listId: string, title: string)=> void
  removeTask: (listId: string, id: string)=> void
  changeTask: (listId: string, id: string, isDone: boolean)=> void
  renameTask: (listId: string,id: string, title: string)=> void
  removeTaskList: (listId: string) => void
  changeFilter: (listId: string, filter: FilterType) => void
  renameTaskList: (listId: string, title: string) => void
}

const TodoList: React.FC<TodoListPropsType> = (
  {
    list,
    tasks,
    addTask,
    removeTask,
    changeTask,
    renameTask,
    removeTaskList,
    changeFilter,
    renameTaskList,
  }) => {

  const addTaskHandler = (title: string) => addTask(list.id, title)
  const removeTaskHandler = (id: string) => removeTask(list.id, id)
  const changeTaskHandler = (id: string, isDone: boolean) => changeTask(list.id, id, isDone)
  const renameTaskHandler = (id: string, title: string) => renameTask(list.id, id, title)
  const changeFilterHandler = (filter: FilterType) => changeFilter(list.id, filter)

  const renameTaskListHandler = (title: string) => renameTaskList(list.id, title)
  const removeTaskListHandler = () => removeTaskList(list.id)

  return (
    <div className='todoList'>
      <button className='closeButton' onClick={removeTaskListHandler}>x</button>
      <NameAndRename name={list.title} callBack={renameTaskListHandler}/>
      <SuperInput callBack={addTaskHandler}/>
      <FilterButton filterList={list.filter} callback={changeFilterHandler} />
      <TaskLists
        tasks={tasks}
        removeTask={removeTaskHandler}
        changeTask={changeTaskHandler}
        renameTask={renameTaskHandler}
      />
    </div>);
}

export default TodoList;

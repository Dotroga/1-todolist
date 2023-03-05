import React, {useState} from 'react';
import {FilterType, ListsType, TaskType,} from "../../state";
import SuperInput from "../SuperInput/SuperInput";
import NameAndRename from "../NameAndRename/NameAndRename";
import TaskLists from "../TaskLists/TaskLists";
import './TodoList.css'
import FilterButton from "../FilterButton/FilterButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import filter from './../../Icons/filter.svg'




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

  const [onFilter, setOnFilter] = useState(false)

  const addTaskHandler = (title: string) => addTask(list.id, title)
  const removeTaskHandler = (id: string) => removeTask(list.id, id)
  const changeTaskHandler = (id: string, isDone: boolean) => changeTask(list.id, id, isDone)
  const renameTaskHandler = (id: string, title: string) => renameTask(list.id, id, title)
  const changeFilterHandler = (filter: FilterType) => changeFilter(list.id, filter)

  const renameTaskListHandler = (title: string) => renameTaskList(list.id, title)
  const removeTaskListHandler = () => removeTaskList(list.id)

  return (
    <div className='todoList'>
      <div className='TitleList'>
        <NameAndRename name={list.title} callBack={renameTaskListHandler}/>
        <DeleteButton callBack={removeTaskListHandler}/>
      </div>
      <div className='AddContainer'>
        <SuperInput callBack={addTaskHandler} title='Add task'/>
        <img
          className='filter'
          src={filter}
          alt="filter"
          onClick={()=>setOnFilter(!onFilter)}/>
      </div>
      <FilterButton
        filterList={list.filter}
        callback={changeFilterHandler}
        onFilter={onFilter}
      />
      {tasks.length
        ? tasks.map((task=>{
        return (<TaskLists
          key={task.id}
          task={task}
          removeTask={removeTaskHandler}
          changeTask={changeTaskHandler}
          renameTask={renameTaskHandler}
        />)
      }))
      : <span>Task list is empty</span>}

    </div>);
}

export default TodoList;

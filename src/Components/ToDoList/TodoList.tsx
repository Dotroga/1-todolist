import React, {useState} from 'react';
import {FilterType, ListsType, TaskType,} from "../../state";
import SuperInput from "../SuperInput/SuperInput";
import NameAndRename from "../NameAndRename/NameAndRename";
import TaskLists from "../TaskLists/TaskLists";
import './TodoList.css'
import FilterButton from "../FilterButton/FilterButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import filterIcons from './../../Icons/filter.svg'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, renameTaskAC} from "../../store/taskReducer";
import {changeFilterAC, removeListAC, renameListAC} from "../../store/listsReducer";

type TodoListPropsType = {
  list: ListsType
}

const TodoList: React.FC<TodoListPropsType> = ({list}) => {

  const {id, title, filter} = list

  const [onFilter, setOnFilter] = useState(false)

  let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[list.id])

  const dispatch = useDispatch()

  const addTask = (title: string) => dispatch(addTaskAC(id, title))
  const removeTask = (taskId: string) => dispatch(removeTaskAC(id, taskId))
  const changeTask = (taskId: string, isDone: boolean) => dispatch(changeTaskStatusAC(id, taskId, isDone))
  const renameTask = (taskId: string, title: string) => dispatch(renameTaskAC(id, taskId, title))
  const renameTaskList = (title: string) => dispatch(renameListAC(id, title))
  const removeTaskList = () => dispatch(removeListAC(id))
  const changeFilter = (filter: FilterType) => dispatch(changeFilterAC(id, filter))

  const tasksFilter = filter === 'Active'
    ? tasks.filter(t=>!t.isDone)
    : filter === 'Completed'
      ? tasks.filter(t=>t.isDone)
      : tasks

  return (
    <div className='todoList'>
      <div className='TitleList'>
        <NameAndRename name={title} callBack={renameTaskList}/>
        <DeleteButton callBack={removeTaskList}/>
      </div>
      <div className='AddContainer'>
        <SuperInput callBack={addTask} title='Add task'/>
        <img
          className='filter'
          src={filterIcons}
          alt="filter"
          onClick={()=>setOnFilter(!onFilter)}/>
      </div>
      <FilterButton
        filterList={list.filter}
        callback={changeFilter}
        onFilter={onFilter}
      />
      {tasksFilter.length
        ? tasksFilter.map((task=>{
        return (<TaskLists
          key={task.id}
          task={task}
          removeTask={removeTask}
          changeTask={changeTask}
          renameTask={renameTask}
        />)
      }))
      : <span>Task list is empty</span>}
    </div>);
}

export default TodoList;

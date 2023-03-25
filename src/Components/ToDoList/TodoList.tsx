import React, {useCallback, useState} from 'react';
import {FilterType, ListsType, TaskType,} from "../../bll/state";
import {SuperInput} from "../SuperInput/SuperInput";
import NameAndRename from "../NameAndRename/NameAndRename";
import Task from "../TaskLists/TaskLists";
import './TodoList.css'
import DeleteButton from "../DeleteButton/DeleteButton";
import filterIcons from './../../Icons/filter.svg'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, renameTaskAC} from "../../bll/taskReducer";
import {removeListAC, renameListAC} from "../../bll/listsReducer";

type TodoListPropsType = {
  list: ListsType
}

const TodoList: React.FC<TodoListPropsType> = ({list}) => {

  const {id, title} = list

  const [onFilter, setOnFilter] = useState(false)

  let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[list.id])

  const dispatch = useDispatch()

  const addTask = useCallback((title: string) =>
    dispatch(addTaskAC(id, title)),[dispatch, id])
  const removeTask = (taskId: string) => dispatch(removeTaskAC(id, taskId))
  const changeTask = (taskId: string, isDone: boolean) => dispatch(changeTaskStatusAC(id, taskId, isDone))
  const renameTask = (taskId: string, title: string) => dispatch(renameTaskAC(id, taskId, title))
  const renameTaskList = (title: string) => dispatch(renameListAC(id, title))
  const removeTaskList = () => dispatch(removeListAC(id))



  return (
    <div className='todoList'>
      <div className='TitleList'>
        <NameAndRename name={title} callBack={renameTaskList}/>
        <DeleteButton callBack={removeTaskList}/>
      </div>
      <div className='AddContainer'>
        {/*<SuperInput callBack={addTask} title='Add task'/>*/}
        <img
          className='filter'
          src={filterIcons}
          alt="filter"
          onClick={()=>setOnFilter(!onFilter)}/>
      </div>
      {tasks ? tasks.map((task=>{
        return (<Task
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

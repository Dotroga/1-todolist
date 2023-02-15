import React from 'react';
import {FilterValueType, TasksType, todolistId1, todolistId2} from "./App";
import {SuperInput} from "./Components/SuperInput/SuperInput";
import NameAndRename from "./Components/NameAndRename/NameAndRename";
import TaskLists from "./Components/TaskLists/TaskLists";
import './TodoList.css'



type TodoListPropsType = {
  tasks: TasksType
  listId: string
  title: string
  addTask: (listId: string, title: string)=> void
  removeTask: (listId: string, id: string)=> void
  changeTask: (listId: string, id: string, isDone: boolean)=> void
  renameTask: (listId: string,id: string, title: string)=> void
  removeTaskList: (listId: string) => void
  changeFilter: (listId: string, filter: FilterValueType) => void
  renameTaskList: (listId: string, title: string) => void
}

const TodoList: React.FC<TodoListPropsType> = (
  {
    tasks,
    listId,
    title,
    addTask,
    removeTask,
    changeTask,
    renameTask,
    removeTaskList,
    changeFilter,
    renameTaskList,
  }) => {

  const addTaskHandler = (title: string) => addTask(listId, title)
  const removeTaskHandler = (id: string) => removeTask(listId, id)
  const changeTaskHandler = (id: string, isDone: boolean) => changeTask(listId, id, isDone)
  const renameTaskHandler = (id: string, title: string) => renameTask(listId, id, title)


  const handlerCreator = (filter: FilterValueType) => () => changeFilter(listId,filter)
  const renameTaskListHandler = (title: string) => renameTaskList(listId, title)
  const removeTaskListHandler = () => removeTaskList(listId)

  return (
    <div className='todoList'>
      <button className='closeButton' onClick={removeTaskListHandler}>x</button>
      <NameAndRename name={title} callBack={renameTaskListHandler}/>
      <div>
        <SuperInput callBack={addTaskHandler}/>
      </div>
      <div>
        <button
          onClick={handlerCreator('All')}
          // className={filter === 'All' ? 'activeButton' : ''}
        >All
        </button>
        <button
          onClick={handlerCreator("Active")}
          // className={filter === 'Active' ? 'activeButton' : ''}
        >Active
        </button>
        <button
          onClick={handlerCreator("Completed")}
          // className={filter === 'Completed' ? 'activeButton' : ''}
        >Completed
        </button>
      </div>
      <TaskLists
        tasks={tasks}
        listId={listId}
        removeTask={removeTaskHandler}
        changeTask={changeTaskHandler}
        renameTask={renameTaskHandler}
      />
    </div>);
}

export default TodoList;

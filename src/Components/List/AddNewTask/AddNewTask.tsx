import React, {useState} from 'react';
import styled from "styled-components";
import {SuperButton} from "../../Super/SuperButton/SuperButton";
import {addTaskTK} from "../../../redux/taskReducer";
import {useAppDispatch} from "../../../redux/store";
import {SuperInput} from "../../Super/SuperInput/SuperInput";

type AddNewTaskType = {
    listId: string
    setVisible: (change:boolean) => void
}

export const AddNewTask = (props: AddNewTaskType) => {
    const dispatch = useAppDispatch()
    const {listId, setVisible} = props
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const changeVisible = ()=> setVisible(false)
    const addTask = () => dispatch(addTaskTK(listId, title))
    return (
        <Wrapper>
            <SuperInput onChange={()=>{}} value={title} name={'Task name'} error={''}/>
            <SuperInput onChange={()=>{}} value={description} name={'Description'} error={''}/>
           <div className='button-container'>
               <SuperButton title='Cancel' onClick={changeVisible}/>
               <SuperButton title='Add Task' onClick={addTask}/>
           </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  padding: 10px;
  border-radius: 6px;
  background-color: #424d6b;
  box-shadow: 0 0 15px 1px #1a2434;
  .button-container {
    justify-content: end;
    display: flex;
    gap: 10px;
  }
`


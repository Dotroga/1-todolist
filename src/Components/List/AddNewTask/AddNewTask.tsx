import React, {useState} from 'react';
import styled from "styled-components";
import {SuperButton} from "../../Super/SuperButton/SuperButton";
import {addTaskTK} from "../../../redux/taskReducer";
import {useAppDispatch} from "../../../redux/store";
import {SuperInput} from "../../Super/SuperInput/SuperInput";
import {useFormik} from "formik";
import {AddTaskButton} from "../AddTaskButton/AddTaskButton";

type AddNewTaskType = {
    listId: string
}

export const AddNewTask = (props: AddNewTaskType ) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleForm = () => {
        setIsOpen(!isOpen)
    }
    const formik = useFormik({
        initialValues: {
            taskName: '',
            description: '',
            visibleForm: false
        },
        validate: (values) => {
        },
        onSubmit: values => {
            dispatch(addTaskTK(props.listId, values.taskName))
            formik.resetForm()
        }
    })
    const dispatch = useAppDispatch()
    // const [description, setDescription] = useState<string>('')
    // const changeVisible = ()=> setVisible(false)
    // const addTask = () => dispatch(addTaskTK(listId, title))
    return (
        <form onSubmit={formik.handleSubmit}>
            {!isOpen
                ? <AddTaskButton onClick={toggleForm}/>
                : <Wrapper>
                    <SuperInput
                        {...formik.getFieldProps('taskName')}
                        error={''}
                    />
                    <SuperInput
                        {...formik.getFieldProps('description')}
                        error={''}
                    />
                    <div className='button-container'>
                        <SuperButton
                            title='Cancel'
                            onClick={toggleForm}/>
                        <SuperButton title='Add Task'  type='submit'/>
                    </div>
                </Wrapper>
            }
        </form>
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


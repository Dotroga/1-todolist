import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {taskThunk} from "../../../../redux/task.reducer";
import {useAppDispatch} from "../../../../redux/store";
import {useOutsideClick} from "../../../../utils/useOutsideClick";
import {useFormik} from "formik";
import {Priority} from "../../../Super/Priority/Priority";
import {SuperButton} from "../../../Super/SuperButton/SuperButton";
import {AddTaskButton} from "../AddTaskButton/AddTaskButton";
import {SuperInput} from "../../../Super/SuperInput/SuperInput";


type AddNewTaskType = {
  listId: string;
  numberOfTasks: number
};

type FormType = {
  taskName: string
  description: string
}

export const AddNewTask = (props: AddNewTaskType) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const openForm = () => setIsOpen(true)
  const closeForm = () => {
    setIsOpen(false);
    formik.resetForm();
  };
  useOutsideClick(ref, setIsOpen, isOpen);
  const formik = useFormik({
    initialValues: {
      taskName: "",
      description: "",
      visibleForm: false,
    },
    validate: (values) => {
      let errors: Partial<FormType> = {}
      if (!values.taskName) errors.taskName = "Task name required"
      return errors;
    },
    onSubmit: (values) => {
      const task = {
        title: values.taskName,
        description: values.description
      }
      dispatch(taskThunk.addTask({listId: props.listId, task, num:props.numberOfTasks}));
      formik.resetForm();
      closeForm()
    },
  });
  useEffect(()=>{return ()=> closeForm()},[props.listId])
  return (
    <form onSubmit={formik.handleSubmit}>
        <AddTaskButton onClick={openForm} />
      {isOpen && (
        <Wrapper isOpen={isOpen} >
          <div ref={ref} className='addTask'>
            <SuperInput
              {...formik.getFieldProps("taskName")}
              error={formik.touched.taskName && formik.errors.taskName && formik.errors.taskName} />
            <SuperInput {...formik.getFieldProps("description")} error={""} required={false}/>
            <div className="button-container">
              <Priority item={null}/>
              <SuperButton title="Cancel" onClick={closeForm} />
              <SuperButton title="Add Task" type="submit" />
            </div>
          </div>
        </Wrapper>
      )}
    </form>
  );
};

const Wrapper = styled.div<{isOpen: boolean}>`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.48);
  z-index: 2;

  .addTask {
    margin: 100px;
    display: flex;
    padding: 10px;
    border-radius: 6px;
    transition: 0.3s;
    gap: 10px;
    flex-direction: column;
    width: 700px;
    z-index: 3;
    background-color: ${({theme}) => theme.colors.topColor};
  }

  .button-container {
    justify-content: end;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

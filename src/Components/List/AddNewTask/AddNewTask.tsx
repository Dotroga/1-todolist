import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { SuperButton } from "../../Super/SuperButton/SuperButton";
import { addTaskTK } from "redux/taskReducer";
import { useAppDispatch } from "redux/store";
import { SuperInput } from "../../Super/SuperInput/SuperInput";
import { useFormik } from "formik";
import { AddTaskButton } from "../AddTaskButton/AddTaskButton";

type AddNewTaskType = {
  listId: string;
  numberOfTasks: number | undefined;
};

type FormType = {
  taskName: string
  description: string
}

export const AddNewTask = (props: AddNewTaskType) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const openForm = () => setIsOpen(true)
  const closeForm = () => {
    setIsOpen(false);
    formik.resetForm();
  };
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
      dispatch(addTaskTK(props.listId, values.taskName, props.numberOfTasks));
      formik.resetForm();
    },
  });
  useEffect(()=>{
    return ()=> closeForm()
  },[props.listId])
  return (
    <form onSubmit={formik.handleSubmit}>
      {!isOpen ? (
        <AddTaskButton onClick={openForm} />
      ) : (
        <Wrapper>
          <SuperInput
            {...formik.getFieldProps("taskName")}
            error={formik.touched.taskName && formik.errors.taskName && formik.errors.taskName} />
          <SuperInput {...formik.getFieldProps("description")} error={""} required={false}/>
          <div className="button-container">
            <SuperButton title="Cancel" onClick={closeForm} />
            <SuperButton title="Add Task" type="submit" />
          </div>
        </Wrapper>
      )}
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
`;

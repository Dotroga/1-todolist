import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "redux/store";
import {useFormik} from "formik";
import {taskThunk} from "redux/task.reducer";
import {useOutsideClick} from "utils/useOutsideClick";
import {SuperButton} from "Components/Super/SuperButton/SuperButton";
import {SuperInput} from "Components/Super/SuperInput/SuperInput";
import {ArrType} from "redux/app.reducer";
import {Select} from "Components/Super/Select/Select";
import {selectPrioritiesArr, selectTasksIsLoading} from "redux/app.selectors";
import {PriorityIcon} from "Components/Content/List/AddNewTask/PriorityIcon";
import {DateTask} from "Components/Content/List/AddNewTask/DateTask";
import {TaskAppType} from "api/taskAPI";
import {handleServerNetworkError} from "utils/errorUtils";

type AddNewTaskPropsType = {
  listId: string
  numberOfTasks: number
  task?: TaskAppType
  onClose: () => void
  isOpen: boolean
};

type FormType = {
  taskName: string
  description: string
  priority: ArrType | null,
  deadline: Date | undefined
  visibleForm: boolean
}

export const AddNewTask = (props: AddNewTaskPropsType) => {
  const {listId, numberOfTasks, task, isOpen,  onClose} = props
  const {title, deadline, description, priority} = task ?? {}
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const prioritiesArr = useAppSelector(selectPrioritiesArr)
  const loading = useAppSelector(selectTasksIsLoading)
  const formik = useFormik({
    initialValues:  {
      taskName: title ?? "",
      description: description ?? "",
      priority: priority ?? null,
      deadline: deadline && new Date(deadline.timestamp)
    } as FormType,
    validate: (values) => {
      let errors: Partial<FormType> = {}
      if (!values.taskName) errors.taskName = "Task name required"
      return errors;
    },
    onSubmit: async (values) => {
      const newTask = {
        title: values.taskName,
        description: values.description,
        priority: values.priority ? values.priority[2] : 0,
        deadline: values.deadline && values.deadline.toISOString()
      }
      try {
        debugger
        task
          ? await dispatch(taskThunk.editTask({task, newTask}))
          : await dispatch(taskThunk.addTask({listId, task: newTask, num: numberOfTasks}))
        closeForm()
      }  catch (e) {
        handleServerNetworkError(e, dispatch)
    }
    },
  });
  const {values, errors, setFieldValue, resetForm, getFieldProps} = formik

  const closeForm =  () => {
    resetForm();
    onClose()
  };
  const disabled = task ? task.loading : loading

  useOutsideClick(ref, closeForm, isOpen);
  useEffect(()=>{return () => closeForm()},[listId])

  return (
    <form onSubmit={formik.handleSubmit}>
      {isOpen && (
        <Wrapper isOpen={isOpen} >
          <div ref={ref} className='addTask'>
            <SuperInput
              {...getFieldProps("taskName")}
              error={formik.touched.taskName && errors.taskName && errors.taskName}
            />
            <SuperInput {...getFieldProps("description")} error={""} required={false}/>
            <div className="container">
              <div className="options">
                <DateTask
                  value={values.deadline}
                  onChange={(value: Date) => setFieldValue('deadline', value)}
                />
                <Select arr={prioritiesArr} icon={PriorityIcon} name="Priority"
                        onChange={(value: ArrType) => setFieldValue('priority', value)}
                        value={values.priority}
                />
              </div>
              <div className="buttons">
                <SuperButton title="Cancel" type="reset" onClick={closeForm} disabled={disabled}/>
                <SuperButton
                  title={task ? 'Save' : 'Add Task'}
                  type="submit"
                  disabled={disabled}
                  loading={disabled ? 'loading' : 'normal'}
                />
              </div>
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
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  };
  .options {
    display: flex;
    flex-direction: row;
    gap: 10px;
    .select {
      width: 180px;
    }
  }

  .buttons {
    justify-content: end;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

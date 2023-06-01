import React, { ChangeEvent, memo, useCallback } from "react";
import styled from "styled-components";
import { SuperButton } from "../../../Super/SuperButton/SuperButton";
import { Select } from "../../../Super/Select/Select";
import { addListTK, editingListTK } from "redux/listsReducer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/store";
import {
  changeColor,
  changeTitleNewList,
  ColorType,
  setError, toggleAddListForm,
} from "redux/appReducer";
import { MaxQuantity } from "../../../Super/MaxQuantity/MaxQuantity";
import { SuperInput } from "../../../Super/SuperInput/SuperInput";

type AddNewListType = {
  isOpen: boolean;
  listsLength: number;
};

export const AddListForm: React.FC<AddNewListType> = memo(({ isOpen, listsLength }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isVisibleALF = useAppSelector<boolean>((state) => state.app.isVisibleALF);
  const addListForm = useAppSelector((state) => state.app.addListForm);
  const arrColor = useAppSelector<ColorType[]>((state) => state.app.arrColor);
  const isLoading = useAppSelector((state) => state.app.addListForm.isLoading);

  const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const text = e.currentTarget.value;
      dispatch(changeTitleNewList(text));
      dispatch(setError(false));
    }, []);

  const changeColorHandler = useCallback((color: ColorType) => {
    dispatch(changeColor(color.color));
  }, []);

  const addList = useCallback(() => {
    const color = addListForm.color ? addListForm.color.color : arrColor[3].color;
    addListForm.mode
      ? dispatch(addListTK(addListForm.title, navigate, color))
      : dispatch(editingListTK(addListForm.listId!, addListForm.title, color, navigate));
  }, [addListForm.title, addListForm.color]);

  const toggleAddListFormHandler = useCallback(() => {
    dispatch(toggleAddListForm(false));
  }, []);

  return (
    <Wrapper isVisibleAL={isVisibleALF} isOpen={isOpen}>
      <SuperInput onChange={changeTitle} name={"Title"} value={addListForm.title} error={addListForm.error!}/>
      <Select title="Color" arr={arrColor} item={addListForm.color} callBack={changeColorHandler}/>
      <div className='buttonContainer'>
        <MaxQuantity maxNum={10} currentNum={listsLength}/>
        <SuperButton title="Cancel" onClick={toggleAddListFormHandler}/>
        <SuperButton
          title={addListForm.mode ? "Add" : "Save"}
          loading={isLoading ? isLoading : undefined}
          onClick={addList}
          disabled={isLoading}
        />
      </div>
    </Wrapper>
  );
});

type WrapperPropsType = { isVisibleAL: boolean; isOpen: boolean };

const Wrapper = styled.div<WrapperPropsType>`
  gap: 10px;
  flex-direction: column;
  padding: 8px;
  background-color: ${({theme})=>theme.colors.topColor};
  box-shadow: 0 0 15px 1px ${({theme})=>theme.colors.shadow};
  border-radius: 10px;
  transition: 0.3s;
  display: ${({ isVisibleAL, isOpen }) => (isVisibleAL && isOpen ? "flex" : "none")};
  .buttonContainer {
    display: flex;
    align-items: center;
    div {margin: auto;}
    justify-content: end;
    gap: 10px;
  }
`;


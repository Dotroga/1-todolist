import React, { ChangeEvent, memo, useCallback } from "react";
import styled from "styled-components";
import { SuperButton } from "../../../Super/SuperButton/SuperButton";
import { Select } from "../../../Super/Select/Select";
import { addListTK, editingListTK } from "redux/listsReducer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/store";
import {
  AddListFormType,
  changeColorAC,
  changeTitleNewListAC,
  ColorType,
  setErrorAC,
  toggleAddListFormAC,
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
  const addListForm = useAppSelector<AddListFormType>((state) => state.app.addListForm);
  const arrColor = useAppSelector<ColorType[]>((state) => state.app.arrColor);
  const isLoading = useAppSelector((state) => state.app.addListForm.isLoading);

  const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const text = e.currentTarget.value;
      dispatch(changeTitleNewListAC(text));
      dispatch(setErrorAC(false));
    }, []);

  const changeColor = useCallback((color: ColorType) => {
    dispatch(changeColorAC(color.color));
  }, []);

  const addList = useCallback(() => {
    const color = addListForm.color ? addListForm.color.color : arrColor[3].color;
    addListForm.mode
      ? dispatch(addListTK(addListForm.title, navigate, color))
      : dispatch(editingListTK(addListForm.listId!, addListForm.title, color, navigate));
  }, [addListForm.title, addListForm.color]);

  const toggleAddListForm = useCallback(() => {
    dispatch(toggleAddListFormAC(false));
  }, []);

  return (
    <Wrapper isVisibleAL={isVisibleALF} isOpen={isOpen}>
      <SuperInput onChange={changeTitle} name={"Title"} value={addListForm.title} error={addListForm.error!}/>
      <Select title="Color" arr={arrColor} item={addListForm.color} callBack={changeColor}/>
      <div className='buttonContainer'>
        <MaxQuantity maxNum={10} currentNum={listsLength}/>
        <SuperButton title="Cancel" onClick={toggleAddListForm}/>
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


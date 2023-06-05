import React, { ChangeEvent, memo, useCallback } from "react";
import styled from "styled-components";
import { SuperButton } from "../../../Super/SuperButton/SuperButton";
import { Select } from "../../../Super/Select/Select";
import {listsThunks} from "redux/lists.reducer";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/store";
import { MaxQuantity } from "../../../Super/MaxQuantity/MaxQuantity";
import { SuperInput } from "../../../Super/SuperInput/SuperInput";
import {
  selectAddListForm,
  selectArrColor,
  selectIsCollapsedSB,
  selectIsLoading,
  selectIsVisibleALF
} from "redux/app.selectors";
import {selectListsLength} from "redux/lists.selectors";
import {appActions, ColorType} from "redux/app.reducer";


export const AddListForm: React.FC = memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isVisibleALF = useAppSelector(selectIsVisibleALF);
  const addListForm = useAppSelector(selectAddListForm);
  const arrColor = useAppSelector(selectArrColor);
  const isLoading = useAppSelector(selectIsLoading);
  const isCollapsedSB = useAppSelector(selectIsCollapsedSB);
  const length = useAppSelector(selectListsLength)

  const changeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const text = e.currentTarget.value;
      dispatch(appActions.changeTitleNewList(text));
      dispatch(appActions.setError(false));
    }, []);

  const changeColorHandler = useCallback((color: ColorType) => {
    dispatch(appActions.changeColor(color.color));
  }, []);

  const addList = useCallback(() => {
    addListForm.mode
      ? dispatch(listsThunks.addList({navigate}))
      : dispatch(listsThunks.editingList({listId: addListForm.listId!, navigate}));
  }, [addListForm.title, addListForm.color]);

  const toggleAddListFormHandler = useCallback(() => {
    dispatch(appActions.toggleAddListForm(false));
  }, []);

  return (
    <Wrapper isVisibleAL={isVisibleALF} isOpen={isCollapsedSB}>
      <SuperInput onChange={changeTitle} name={"Title"} value={addListForm.title} error={addListForm.error!}/>
      <Select title="Color" arr={arrColor} item={addListForm.color} callBack={changeColorHandler}/>
      <div className='buttonContainer'>
        <MaxQuantity maxNum={10} currentNum={length}/>
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


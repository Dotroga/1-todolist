import React, {memo, useCallback} from 'react';
import styled from "styled-components";
import {SuperInput} from "../../../Super/SuperInput/SuperInput";
import {SuperButton} from "../../../Super/SuperButton/SuperButton";
import {Select} from "../../../Select/Select";
import {addListTK} from "../../../../redux/listsReducer";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../redux/store";
import {
    addListFormType,
    changeColorAC,
    changeTitleNewListAC, ColorType, setErrorAC, toggleAddListFormAC
} from "../../../../redux/statusOffWindowsReducer";
import {MaxQuantity} from "../../../Super/MaxQuantity/MaxQuantity";

type AddNewListType = {
    isOpen: boolean
    isVisibleALF: boolean
    listsLength: number
}

export const AddListForm: React.FC<AddNewListType> = memo((
    {isOpen, isVisibleALF, listsLength}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const addListForm = useAppSelector<addListFormType>(state => state.StatusOffWindows.addListForm)
    const arrColor = useAppSelector<ColorType[]>(state => state.StatusOffWindows.arrColor)

    const changeTitle = useCallback((text: string) => {
        dispatch(changeTitleNewListAC(text))
        dispatch(setErrorAC(false))
    },[addListForm.title])
    const changeColor = useCallback((color: ColorType)=>{
        dispatch(changeColorAC(color))
    },[addListForm.color])
    const addList = useCallback(() => {
        const color = addListForm.color ? addListForm.color.color : arrColor[3].color
        dispatch(addListTK(addListForm.title, navigate, color))
    },[addListForm])
    const toggleAddListForm = useCallback(() => {
        dispatch(toggleAddListFormAC())
    },[isVisibleALF])

  return (
    <Wrapper isVisibleAL={isVisibleALF} isOpen={isOpen}>
      <SuperInput
          callBack={changeTitle}
          title={addListForm.title}
          text={'Title'}
          error={addListForm.error!}/>
        <SelectWrapper>
            <Select title='Color' arr={arrColor} item={addListForm.color} callBack={changeColor}/>
        </SelectWrapper>
        <ButtonWrapper>
            <MaxQuantity maxNum={10} currentNum={listsLength}/>
            <SuperButton title='Cancel' callBack={toggleAddListForm}/>
            <SuperButton title='Add' callBack={addList}/>
        </ButtonWrapper>
    </Wrapper>
  );
});

type WrapperPropsType = { isVisibleAL: boolean, isOpen: boolean }

const Wrapper = styled.div<WrapperPropsType>`
  gap: 10px;
  flex-direction: column;
  padding: 8px;
  background-color: #424d6b;
  box-shadow: 0 0 15px 1px #1a2434;
  border-radius: 10px;
  display: ${({isVisibleAL, isOpen}) => isVisibleAL && isOpen ? 'flex' : 'none'};
`
const SelectWrapper = styled.div`
  height: 43px;
`
const ButtonWrapper = styled.div`
  display: flex;\
  align-items: center;
  div {margin: auto;}
  justify-content: end;
  gap: 10px;
`


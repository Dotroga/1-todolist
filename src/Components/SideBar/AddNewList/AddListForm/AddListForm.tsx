import React, {memo, useCallback} from 'react';
import styled from "styled-components";
import {SuperInput} from "../../../Super/SuperInput/SuperInput";
import {SuperButton} from "../../../Super/SuperButton/SuperButton";
import {Select} from "../../../Select/Select";
import {addNewListAC} from "../../../../redux/listsReducer";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../../redux/store";
import {
    addListFormType,
    changeColorAC,
    changeTitleNewListAC, ColorType, setErrorAC,
    toggleAddListFormAC
} from "../../../../redux/statusOffWindowsReducer";

type AddNewListType = {
    isOpen: boolean,
    isVisibleALF: boolean
}

export const AddListForm: React.FC<AddNewListType> = memo(({isOpen,isVisibleALF}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const addListForm = useAppSelector<addListFormType>(state => state.StatusOffWindows.addListForm)
    const arrColor = useAppSelector<ColorType[]>(state => state.StatusOffWindows.arrColor)

    const changeTitle = useCallback((text: string) => {
        dispatch(changeTitleNewListAC(text))
    },[addListForm.title])

    const changeColor = useCallback((color: ColorType)=>{
        dispatch(changeColorAC(color))
    },[addListForm.color])

    const addList = useCallback(() => {
        const  newTitle = addListForm.title.trim();
        if (newTitle !== "") {
            dispatch(addNewListAC(newTitle, addListForm.color.color))
            navigate(`/${newTitle}`)
            dispatch(toggleAddListFormAC())
        } else {
            dispatch(setErrorAC())
        }
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
      <Color>Color</Color>
        <SelectWrapper>
            <Select arr={arrColor} color={addListForm.color} callBack={changeColor }/>
        </SelectWrapper>
        <ButtonWrapper>
            <SuperButton title='Cancel' callBack={toggleAddListForm}/>
            <SuperButton title='Add' callBack={addList}/>
        </ButtonWrapper>
    </Wrapper>
  );
});

type WrapperPropsType = { isVisibleAL: boolean, isOpen: boolean }

const Wrapper = styled.div<WrapperPropsType>`
  padding: 10px;
  background-color: #424d6b;
  box-shadow: 0 0 15px 1px #1a2434;
  border-radius: 10px;
  display: ${({isVisibleAL, isOpen}) => isVisibleAL && isOpen ? 'block' : 'none'};
`
const SelectWrapper = styled.div`
  height: 55px;
`
const Color = styled.div`
  margin: 5px;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 14px;
`


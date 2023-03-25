import React, {useState} from 'react';
// import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {SuperInput} from "../../../SuperInput/SuperInput";
import {SuperButton} from "../../../SuperButton/SuperButton";
import {Select} from "../../../Select/Select";
import {string} from "prop-types";
import {addNewListAC} from "../../../../bll/listsReducer";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

type AddNewListType  = {
  condition: boolean
  callback: () => void
  isOpen: boolean
}

export type ArrColorType = { color: any, title: string }

export const arr: ArrColorType[] = [
    {color: '#b7256e', title: 'Berry Red'},
    {color: '#d93f35', title: 'Red'},
    {color: '#fd9833', title: 'Orange'},
    {color: '#f8ce00', title: 'Yellow'},
    {color: '#aeb73b', title: 'Olive Green'},
    {color: '#7dca48', title: 'Lime Green'},
    {color: '#299338', title: 'Green'},
    {color: '#69cabb', title: 'Mint Green'},
    {color: '#158eac', title: 'Teal'},
    {color: '#14a9f3', title: 'Sky Blue'},
    {color: '#95c1e9', title: 'Light Blue'},
    {color: '#3f72fd', title: 'Blue'},
    {color: '#874cfd', title: 'Grape'},
    {color: '#ae38e9', title: 'Violet'},
    {color: '#e995e9', title: 'Lavender'},
    {color: '#de5093', title: 'Magenta'},
    {color: '#fd8c84', title: 'Salmon'},
    {color: '#7f7f7f', title: 'Charcoal'},
    {color: '#b7b7b7', title: 'Grey'},
    {color: '#caab92', title: 'Taupe'}
]

export const AddListForm: React.FC<AddNewListType> = (props) => {
    const {condition, callback, isOpen} = props

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [color, setColor] = useState<ArrColorType>(arr[0])

    const changeTitle = (text: string) => {
        error && setError(null)
        setTitle(text)
    }

    const addList = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            dispatch(addNewListAC(newTitle, color.color))
            navigate(`/${newTitle}`)
            setTitle('')
        } else {
            setError("Title is required");
        }
    }

  //
  // const changeTitleNewList = (e: ChangeEvent<HTMLInputElement>) => {
  //   setTitleNewList(e.currentTarget.value)
  // }
  return (
    <Wrapper condition={condition} isOpen={isOpen}>
      <SuperInput
          callBack={changeTitle}
          title={title}
          text={'Title'}
          error={error!}/>
      <Color>Color</Color>
        <SelectWrapper>
            <Select arr={arr} color={color} callBack={setColor}/>
        </SelectWrapper>
        <ButtonWrapper>
            <SuperButton title='Cancel' callBack={()=>{}}/>
            <SuperButton title='Add' callBack={addList}/>
        </ButtonWrapper>
    </Wrapper>
  );
};

type WrapperPropsType = { condition: boolean, isOpen: boolean }

const Wrapper = styled.div<WrapperPropsType>`
  padding: 10px;
  background-color: #424d6b;
  box-shadow: 0 0 15px 1px #1a2434;
  border-radius: 10px;
  display: ${({condition, isOpen}) => condition && isOpen ? 'block' : 'none'};
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


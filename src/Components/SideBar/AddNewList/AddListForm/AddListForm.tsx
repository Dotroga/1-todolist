import React from 'react';
// import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {SuperInput} from "../../../SuperInput/SuperInput";
import {SuperButton} from "../../../SuperButton/SuperButton";
import {Select} from "../../../Select/Select";

type AddNewListType = {
  condition: boolean
  callback: () => void
  isOpen: boolean
}
const arr = [
    'Berry Red',
    'Red',
    'Orange',
    'Yellow',
    'Olive Green',
    'Lime Green',
    'Green',
    'Mint Green',
    'Teal',
    'Sky Blue',
    'Light Blue',
    'Blue',
    'Grape',
    'Violet',
    'Lavender',
    'Magenta',
    'Salmon',
    'Charcoal',
    'Grey',
    'Taupe',]

export const AddListForm : React.FC<AddNewListType> = (props) => {
  const {condition, callback, isOpen} = props
  // const navigate = useNavigate()

  // const [titleNewList, setTitleNewList] = useState('')
  // const addList = () => {
  //   dispatch(addNewListAC(titleNewList))
  //   navigate(`/${titleNewList}`)
  //   setTitleNewList('')
  // }
  //
  // const changeTitleNewList = (e: ChangeEvent<HTMLInputElement>) => {
  //   setTitleNewList(e.currentTarget.value)
  // }
  return (
    <Wrapper condition={condition} isOpen={isOpen}>
      <SuperInput callBack={()=>{}} title='List title'/>
      <Color>Color</Color>
        <SelectWrapper>
            <Select arr={arr}/>
        </SelectWrapper>
        <ButtonWrapper>
            <SuperButton title='Cancel' callBack={()=>{}}/>
            <SuperButton title='Add' callBack={()=>{}}/>
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


import React from 'react';
// import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {SuperInput} from "../../../SuperInput/SuperInput";
import {SuperButton} from "../../../SuperButton/SuperButton";

type AddNewListType = {
  condition: boolean
  callback: () => void
  isOpen: boolean
}

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
      <SuperInput callBack={()=>{}} title='Add List'/>
      <div>Color</div>
      <SuperButton title='Cancel' callBack={()=>{}}/>
      <SuperButton title='Add' callBack={()=>{}}/>
    </Wrapper>
  );
};

type WrapperPropsType = {condition: boolean, isOpen: boolean}

const Wrapper = styled.div<WrapperPropsType>`
  padding: 10px;
  background-color: #424d6b;
  box-shadow: 0 0 15px 1px #1a2434;
  border-radius: 10px;
  display: ${({condition, isOpen}) => condition && isOpen ? 'block' : 'none'};
`


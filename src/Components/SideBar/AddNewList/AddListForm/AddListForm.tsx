import React from 'react';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

type AddNewListType = {
  condition: boolean
  callback: () => void
  isOpen: boolean
}

export const AddListForm : React.FC<AddNewListType> = (props) => {
  const {condition, callback, isOpen} = props
  const navigate = useNavigate()

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
        Add new list
      <div>
        <input type="text"/>
      </div>
    </Wrapper>
  );
};

type WrapperPropsType = {condition: boolean, isOpen: boolean}

const Wrapper = styled.div<WrapperPropsType>`
  background-color: #ffffff;
  border-radius: 10px;
  display: ${({condition, isOpen}) => condition && isOpen ? 'block' : 'none'};
`


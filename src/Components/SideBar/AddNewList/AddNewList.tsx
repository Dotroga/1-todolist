import React from 'react';
import {AddListButton} from "./AddListButton";
import {AddListForm} from "./AddListForm/AddListForm";

type AddNewListPropsType = {
  condition: boolean
  callback: () => void
  isOpen: boolean
}

export const AddNewList: React.FC<AddNewListPropsType> = (props) => {
  return (
    <div>
      <AddListButton {...props}/>
      <AddListForm {...props}/>
      </div>
  )
};


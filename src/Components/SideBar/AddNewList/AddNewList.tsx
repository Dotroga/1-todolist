import React, {memo} from 'react';
import {AddListButton} from "./AddListButton";
import {AddListForm} from "./AddListForm/AddListForm";

type AddNewListPropsType = {
  condition: boolean
  callback: () => void
  isOpen: boolean
}

export const AddNewList: React.FC<AddNewListPropsType> = memo((props) => {
  return (
    <div>
      <AddListButton {...props}/>
      <AddListForm {...props}/>
      </div>
  )
});


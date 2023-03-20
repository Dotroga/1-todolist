import React, {useEffect, useRef} from 'react';
import s from './AddNewList.module.css'
import {useNavigate} from "react-router-dom";

type AddNewListType = {
  visible: boolean
  callBack: () => void
}

export const AddNewList: React.FC<AddNewListType> = ({visible, callBack}) => {
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
    <div className={s.AddNewList}>
        Add new list
        <button onClick={()=>callBack()}>X</button>
    </div>
  );
};


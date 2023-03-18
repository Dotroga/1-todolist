import React, {ChangeEvent, useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {ListsType} from "../../bll/state";
import s from './SideBar.module.css'
import {addNewListAC} from "../../bll/listsReducer";

export const SideBar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const lists = useSelector<AppRootStateType, ListsType[]>(state => state.lists)
  const toggle = () => setIsOpen(!isOpen)
  const [titleNewList, setTitleNewList] = useState('')


  const addList = () => {
    dispatch(addNewListAC(titleNewList))
    navigate(`/${titleNewList}`)
    setTitleNewList('')
  }


  const changeTitleNewList = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleNewList(e.currentTarget.value)
  }

  return (
    <div style={{width: isOpen ? '300px' : '40px'}} className={s.Sidebar}>
      <button onClick={toggle}> toggle </button>
      <div>
        <NavLink className={navData=>navData.isActive ? s.active : s.item} to={'/'}>
          <div className={s.ItemIcon}>X</div>
          <div className={s.ItemText} style={{display: isOpen ? 'block' : 'none'}}>All tasks</div>
        </NavLink>
      </div>
      <div>Today</div>
      <div>Upcoming</div>
      <div>
        <div>lists</div>
        <input type="text"  value={titleNewList} onChange={changeTitleNewList}/>
        <button onClick={addList}> + </button>
      </div>
      {lists.map((l,i)=>
        <NavLink className={navData=>navData.isActive ? s.active : s.item} key={i} to={`/${l.title}`}>
          <div className={s.ItemIcon}>{i}</div>
          <div className={s.ItemText} style={{display: isOpen ? 'block' : 'none'}}>{l.title}</div>
        </NavLink>
      )}
    </div>
  );
};


import React, {ChangeEvent, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {ListsType} from "../../bll/state";
import s from './SideBar.module.css'


import {AddNewList} from "../List/AddNewList/AddNewList";
import {MenuBurger} from "./MenuBurger/menuBurger";
import styled from "styled-components";

export const SideBar = () => {

  const dispatch = useDispatch()


  const [isOpen, setIsOpen] = useState<boolean>(false)
  const lists = useSelector<AppRootStateType, ListsType[]>(state => state.lists)
  const toggle = () => {
    setIsOpen(!isOpen)
    setVisibleAddListForm(false)
  }
  const [visibleAddListForm, setVisibleAddListForm] = useState(true)
  const changeAddListForm = () => {
    setVisibleAddListForm(!visibleAddListForm)
  }



  return (
    <div style={{width: isOpen ? '300px' : '40px'}} className={s.Sidebar}>
       <MenuBurger isOpen={isOpen} toggle={toggle} />
      <div>
        <NavLink className={navData=>navData.isActive ? s.active : s.item} to={'/'}>
          <div className={s.ItemIcon}>X</div>
          <div className={s.ItemText} style={{display: isOpen ? 'block' : 'none'}}>All tasks</div>
        </NavLink>
        <span>lists</span>
        <button onClick={changeAddListForm} >+</button>
        {visibleAddListForm && <AddNewList visible={visibleAddListForm} callBack={changeAddListForm }/>}
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



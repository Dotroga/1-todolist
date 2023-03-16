import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {ListsType} from "../../bll/state";
import s from './SideBar.module.css'

export const SideBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const lists = useSelector<AppRootStateType, ListsType[]>(state => state.lists)
  const toggle = () => setIsOpen(!isOpen)
  return (
    <div style={{width: isOpen ? '300px' : '40px'}} className={s.Sidebar}>
      <button onClick={toggle}> toggle </button>
      <div>
        <NavLink className={navData=>navData.isActive ? s.active : s.item} to={'/'}>
          <div className={s.ItemIcon}>X</div>
          <div className={s.ItemText} style={{display: isOpen ? 'block' : 'none'}}>All</div>
        </NavLink>
      </div>
      {lists.map((l,i)=>
        <NavLink className={navData=>navData.isActive ? s.active : s.item} key={i} to={`/${l.title.split(" ").join("")}`}>
          <div className={s.ItemIcon}>{i}</div>
          <div className={s.ItemText} style={{display: isOpen ? 'block' : 'none'}}>{l.title}</div>
        </NavLink>
      )}
    </div>
  );
};


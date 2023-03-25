import React, {useState} from 'react';
import {useAppSelector} from "../../bll/store";
import {ListsType} from "../../bll/state";
import {MenuBurger} from "./MenuBurger";
import {AddNewList} from "./AddNewList/AddNewList";
import styled, {css} from "styled-components";
import {SideBarIcon} from "./SideBarIcon/SideBarIcon";

export const SideBar = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [visibleAddListForm, setVisibleAddListForm] = useState(true)

    const lists = useAppSelector<ListsType[]>(state => state.lists)

    const toggle = () => {
        setIsOpen(!isOpen)
        setVisibleAddListForm(false)
    }

    const changeAddListForm = () => setVisibleAddListForm(!visibleAddListForm)

    return <SideBarContainer isOpen={isOpen}>
        <MenuBurger isOpen={isOpen} toggle={toggle}/>
        <SideBarIcon isOpen={isOpen} title='All lists' color='red' to={'/'}/>
        <AddNewList condition={visibleAddListForm} callback={changeAddListForm} isOpen={isOpen}/>
        {lists.map((l, i) =>
            <SideBarIcon key={i} isOpen={isOpen} title={l.title} color={l.color} to={`/${l.title}`}/>)}
    </SideBarContainer>
};

type SideBarContainerPropsType = {
    isOpen: boolean
}

const SideBarContainer = styled.div<SideBarContainerPropsType>`
  display: flex;
  width: ${({isOpen}) => isOpen ? '260px' : '43px'};
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  gap: 5px;
  transition: 0.15s;
  border-radius: 15px;
  background-color: rgb(46, 56, 78);
  color: #989fa7;
  box-shadow: 0 0 15px 1px #1a2434;
  ${({isOpen}) => !isOpen && css`
    align-items: center;
  `}
`



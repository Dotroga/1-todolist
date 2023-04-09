import React, {memo} from 'react';
import {useAppSelector} from "../../redux/store";
import {ListType} from "../../redux/state";
import {MenuBurger} from "./MenuBurger";
import styled, {css} from "styled-components";
import {SideBarIcon} from "./SideBarIcon/SideBarIcon";
import {AddListButton} from "./AddNewList/AddListButton";
import {AddListForm} from "./AddNewList/AddListForm/AddListForm";


export const SideBar = memo(() => {

    const isCollapsedSB = useAppSelector<boolean>(state => state.StatusOffWindows.isCollapsedSB)
    const isVisibleALF = useAppSelector<boolean>(state => state.StatusOffWindows.isVisibleALF)
    const lists = useAppSelector<ListType[]>(state => state.lists)

    return <SideBarContainer isOpen={isCollapsedSB}>
        <MenuBurger/>
        <SideBarIcon isOpen={isCollapsedSB} title='All lists' color='red' to={'/'}/>
        <AddNewList>
            <AddListButton isOpen={isCollapsedSB} isVisibleALF={isVisibleALF}/>
            <AddListForm isOpen={isCollapsedSB} isVisibleALF={isVisibleALF}/>
        </AddNewList>
        {lists.map((l, i) =>
            <SideBarIcon key={i} isOpen={isCollapsedSB} title={l.title} color={l.color} to={`/${l.title}`}/>)}
    </SideBarContainer>
});

type SideBarContainerPropsType = {
    isOpen: boolean
}

const SideBarContainer = styled.div<SideBarContainerPropsType>`
  display: flex;
  width: ${({isOpen}) => isOpen ? '260px' : '43px'};
  min-width:${({isOpen}) => isOpen ? '260px' : '43px'};
  flex-direction: column;
  margin: 40px 0 40px 40px;
  padding: 10px;
  gap: 3px;
  transition: 0.15s;
  border-radius: 15px;
  background-color: rgb(46, 56, 78);
  color: #989fa7;
  box-shadow: 0 0 15px 1px #1a2434;
  ${({isOpen}) => !isOpen && css`
    align-items: center;
  `}
`
const AddNewList = styled.div`
`



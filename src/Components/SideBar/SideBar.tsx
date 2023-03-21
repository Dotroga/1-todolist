import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {ListsType} from "../../bll/state";
import {MenuBurger} from "./MenuBurger";
import {AddNewList} from "./AddNewList/AddNewList";
import styled, {css} from "styled-components";
import {SideBarIcons} from "./SideBarIcons";


export const SideBar = () => {

  // const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [visibleAddListForm, setVisibleAddListForm] = useState(true)

  const lists = useSelector<AppRootStateType, ListsType[]>(state => state.lists)
  const toggle = () => {
    setIsOpen(!isOpen)
    setVisibleAddListForm(false)}

  const changeAddListForm = () => setVisibleAddListForm(!visibleAddListForm)

  return <SideBarContainer isOpen={isOpen} >
    <MenuBurger isOpen={isOpen} toggle={toggle}/>
    <SideBarIcons isOpen={isOpen} title='All lists' color='red' to={'/'}/>
    <AddNewList condition={visibleAddListForm} callback={changeAddListForm} isOpen={isOpen}/>
    {lists.map((l, i) =>
      <SideBarIcons key={i} isOpen={isOpen} title={l.title} color='red' to={`/${l.title}`}/>)}
  </SideBarContainer>
};

type SideBarContainerPropsType = {
  isOpen: boolean
}

const SideBarContainer = styled.div<SideBarContainerPropsType>`
  display: flex;
  width: ${({isOpen}) => isOpen ? '260px' : '20px'};
  flex-direction: column;
  height: 90vh;
  padding: 20px;
  gap: 20px;
  transition: 0.15s;
  background-color: rgb(255, 255, 255);
  color: #989fa7;
  border-radius: 20px;
  ${({isOpen})=> !isOpen && css`
    align-items: center;
  `}
`



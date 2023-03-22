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
  width: ${({isOpen}) => isOpen ? '260px' : '43px'};
  flex-direction: column;
  height: 90vh;
  padding: 10px;
  gap: 5px;
  transition: 0.15s;
  border-radius: 15px;
  background-color: rgb(46, 56, 78);
  color: #989fa7;
  ${({isOpen}) => !isOpen && css`
    align-items: center;
  `}
`



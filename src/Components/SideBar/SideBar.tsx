import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { MenuBurger } from "./MenuBurger";
import styled, {css} from "styled-components";
import { SideBarIcon } from "./SideBarIcon/SideBarIcon";
import { AddListButton } from "./AddNewList/AddListButton";
import { AddListForm } from "./AddNewList/AddListForm/AddListForm";
import { fetchDataTC, ListType } from "redux/listsReducer";
import { LogOut } from "./LogOut";
import {baseTheme, lightTheme} from "theme";
import {changeTheme} from "redux/statusOffWindowsReducer";
import {SwitchThemeButton} from "Components/SideBar/SwitchThemeButton";


export const SideBar = memo(() => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDataTC()).then((r) => r);
  }, []);
  const isCollapsedSB = useAppSelector<boolean>((state) => state.StatusOffWindows.isCollapsedSB);
  const isVisibleALF = useAppSelector<boolean>((state) => state.StatusOffWindows.isVisibleALF);
  const lists = useAppSelector<ListType[]>((state) => state.lists);
  const theme = useAppSelector((state)=> state.StatusOffWindows.theme)

  const themeHandler = () => {
    theme.type === 'dark'
      ? dispatch(changeTheme(lightTheme))
      : dispatch(changeTheme(baseTheme))
  }

  const allItem = lists.map((l, i) => {
    return (
      <SideBarIcon
        key={i}
        listId={l.id}
        isLoading={l.isLoading}
        isOpen={isCollapsedSB}
        numberOfTasks={l.numberOfTasks}
        title={l.title}
        color={l.color}
        to={`/${l.title}`}
      />
    );
  });

  return (
    <SideBarContainer isOpen={isCollapsedSB}>
      <MenuBurger />
      <SideBarIcon isOpen={isCollapsedSB} title="All lists" color="red" to={"/"} />
      <AddNewList>
        <AddListButton isOpen={isCollapsedSB} isVisibleALF={isVisibleALF} listsLength={lists.length} />
        <AddListForm isOpen={isCollapsedSB} isVisibleALF={isVisibleALF} listsLength={lists.length} />
      </AddNewList>
      {allItem}
      <footer>
        <SwitchThemeButton onClick={themeHandler}/>
        <LogOut isCollapsedSB={isCollapsedSB} />
      </footer>
    </SideBarContainer>
  );
});

type SideBarContainerPropsType = {
  isOpen: boolean;
};

const SideBarContainer = styled.div<SideBarContainerPropsType>`
  display: flex;
  width: ${({ isOpen }) => (isOpen ? "260px" : "43px")};
  min-width: ${({ isOpen }) => (isOpen ? "260px" : "43px")};
  flex-direction: column;
  margin: 40px 0 40px 40px;
  padding: 10px;
  gap: 3px;
  transition: 0.15s;
  border-radius: 8px;
  background-color: ${({theme})=>theme.colors.bg};
  color: ${({theme})=>theme.colors.font};
  box-shadow: 0 0 15px 1px ${({theme})=>theme.colors.shadow};
  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-direction: column;
    margin-top: auto;
  }
  ${({ isOpen }) =>
    !isOpen &&
    css`
      align-items: center;
    `}
`;
const AddNewList = styled.div``;

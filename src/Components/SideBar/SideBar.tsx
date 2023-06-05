import React, { memo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/store";
import { MenuBurger } from "./MenuBurger";
import styled, {css} from "styled-components";
import { SideBarIcon } from "./SideBarIcon/SideBarIcon";
import { AddListButton } from "./AddNewList/AddListButton";
import { AddListForm } from "./AddNewList/AddListForm/AddListForm";
import { LogOut } from "./LogOut";
import {SwitchThemeButton} from "Components/SideBar/SwitchThemeButton";
import {selectIsCollapsedSB} from "redux/app.selectors";
import {SideBarLists} from "Components/SideBar/SideBarLists/SideBarlists";
import {listsThunks} from "redux/lists.reducer";

export const SideBar = memo(() => {
  const dispatch = useAppDispatch();
  useEffect(() => {
   dispatch(listsThunks.fetchData());
  }, [])
  const isCollapsedSB = useAppSelector(selectIsCollapsedSB);
  return (
    <SideBarContainer isOpen={isCollapsedSB}>
      <MenuBurger />
      <SideBarIcon/>
      <AddNewList>
        <AddListButton />
        <AddListForm />
      </AddNewList>
      <SideBarLists/>
      <footer>
        <SwitchThemeButton />
        <LogOut/>
      </footer>
    </SideBarContainer>
  );
});

const SideBarContainer = styled.div<{ isOpen: boolean }>`
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

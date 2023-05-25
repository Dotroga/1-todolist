import React, { memo } from "react";
import menuBurger from "../../Icons/menuBurger.svg";
import arrow from "../../Icons/arrow.svg";
import styled from "styled-components";
import { useAppSelector } from "redux/store";
import { useDispatch } from "react-redux";
import { toggleSideBarAC } from "redux/statusOffWindowsReducer";

export const MenuBurger = memo(() => {
  const CollapsedSB = useAppSelector<boolean>((state) => state.StatusOffWindows.isCollapsedSB);
  const dispatch = useDispatch();
  const toggleSideBar = () => dispatch(toggleSideBarAC());

  return (
    <Wrapper>
      <MenuBurgerImg src={CollapsedSB ? arrow : menuBurger} onClick={toggleSideBar} alt="menu" />
    </Wrapper>
  );
});

const MenuBurgerImg = styled.img`
  width: 40px;
  cursor: pointer;
  user-select: none;
  transition: 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
`;

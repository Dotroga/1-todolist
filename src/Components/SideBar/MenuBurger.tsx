import React, {memo} from "react";
import menuBurger from "../../Icons/menuBurger.svg";
import arrow from "../../Icons/arrow.svg";
import styled, {css} from "styled-components";
import {useAppSelector} from "redux/store";
import {useDispatch} from "react-redux";
import {toggleSideBarAC} from "redux/statusOffWindowsReducer";

export const MenuBurger = memo(() => {
  const CollapsedSB = useAppSelector<boolean>((state) => state.StatusOffWindows.isCollapsedSB);
  const dispatch = useDispatch();
  const toggleSideBar = () => dispatch(toggleSideBarAC());

  return (
    <Wrapper onClick={toggleSideBar} isOpen={CollapsedSB}>
      <span></span>
      <span></span>
      <span></span>
    </Wrapper>
  );
});


const Wrapper = styled.div<{ isOpen: boolean }>`
  width: 35px;
  min-height: 30px;
  position: relative;
  margin: 10px;
  cursor: pointer;
  display: flex;
 
  span {
    background-color: ${({theme}) => theme.colors.color};
    position: absolute;
    border-radius: 2px;
  }

  span:nth-child(1) {
    width: 100%;
    height: 4px;
    display: block;
    top: 0;
    left: 0;
  }

  span:nth-child(2) {
    width: 100%;
    height: 4px;
    display: block;
    top: 13px;
    left: 0;
  }

  span:nth-child(3) {
    width: 100%;
    height: 4px;
    display: block;
    bottom: 0;
    left: 0;
  }

  ${({isOpen}) => isOpen
          ? css`
            transform: rotate(90deg);
            width: 35px;
            height: 30px;
            span:nth-child(1) {
              left: 3px;
              top: 12px;
              width: 30px;
              transition: .3s cubic-bezier(.8, .5, .2, 1.4);
              transform: rotate(90deg);
              transition-delay: 150ms;
            }

            span:nth-child(2) {
              left: 2px;
              top: 20px;
              width: 20px;
              transition: .3s cubic-bezier(.8, .5, .2, 1.4);
              transform: rotate(45deg);
              transition-delay: 50ms;
            }

            span:nth-child(3) {
              left: 14px;
              top: 20px;
              width: 20px;
              transition: .3s cubic-bezier(.8, .5, .2, 1.4);
              transform: rotate(-45deg);
              transition-delay: 100ms;
            }
          `
          : css`
            :hover span:nth-child(1) {
              width: 100%;
              height: 4px;
              display: block;
              top: -2px;
              left: 0px;
              transition: .3s cubic-bezier(.8, .5, .2, 1.4);
            }

            :hover span:nth-child(2) {
              width: 100%;
              height: 4px;
              display: block;
              top: 13px;
              left: 0px;
              transition: .4s cubic-bezier(.8, .5, .2, 1.4);
            }

            :hover span:nth-child(3) {
              width: 100%;
              height: 4px;
              display: block;
              bottom: -2px;
              left: 0px;
              transition: .3s cubic-bezier(.8, .5, .2, 1.4);
            }
          `}
  :hover {
    scale: 1.1;
  }
`;

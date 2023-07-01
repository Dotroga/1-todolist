import React, {memo} from "react";
import styled, {css} from "styled-components";
import {useAppSelector} from "redux/store";
import {useDispatch} from "react-redux";

import {selectCollapsedSB} from "redux/app.selectors";
import {appActions} from "redux/app.reducer";

export const MenuBurger = memo(() => {
  const dispatch = useDispatch();
  const collapsedSB = useAppSelector(selectCollapsedSB)
  const toggle = () => dispatch(appActions.toggleSideBar(!collapsedSB));
  return (
    <Wrapper onClick={toggle} isOpen={collapsedSB}>
      <span></span>
      <span></span>
      <span></span>
    </Wrapper>
  );
});


const Wrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  width: 35px;
  min-height: 30px;
  position: relative;
  margin: 10px 4px 10px auto;
  cursor: pointer;
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
              transition: 0.4s cubic-bezier(.8, .5, .2, 1.4);
              transform: rotate(90deg);
              transition-delay: 150ms;
            }

            span:nth-child(2) {
              left: 2px;
              top: 20px;
              width: 20px;
              transition: .4s cubic-bezier(.8, .5, .2, 1.4);
              transform: rotate(45deg);
              transition-delay: 50ms;
            }

            span:nth-child(3) {
              left: 14px;
              top: 20px;
              width: 20px;
              transition: .4s cubic-bezier(.8, .5, .2, 1.4);
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
              left: 0;
              transition: .4s cubic-bezier(.8, .5, .2, 1.4);
            }

            :hover span:nth-child(2) {
              width: 100%;
              height: 4px;
              display: block;
              top: 13px;
              left: 0;
              transition: .4s cubic-bezier(.8, .5, .2, 1.4);
            }

            :hover span:nth-child(3) {
              width: 100%;
              height: 4px;
              display: block;
              bottom: -2px;
              left: 0;
              transition: .4s cubic-bezier(.8, .5, .2, 1.4);
            }
          `}
  :hover {
    scale: 1.1;
  }
`;

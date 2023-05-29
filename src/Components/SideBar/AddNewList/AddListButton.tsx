import React, {memo, useCallback, useState} from "react";
import plus from "../../../Icons/plus.svg";
import styled, { css } from "styled-components";
import { toggleAddListFormAC } from "redux/statusOffWindowsReducer";
import { useDispatch } from "react-redux";
import { MaxQuantity } from "../../Super/MaxQuantity/MaxQuantity";
import {useAppSelector} from "redux/store";


export const AddListButton = memo((props:{listsLength: number}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const isVisibleSB = useAppSelector<boolean>((state) => state.StatusOffWindows.isCollapsedSB);
  const isVisibleALF = useAppSelector<boolean>((state) => state.StatusOffWindows.isVisibleALF);
  const dispatch = useDispatch();

  const toggleAddListForm = useCallback(() => {
    dispatch(toggleAddListFormAC(!isVisibleALF));
  },[isVisibleALF])

  return (
    <Wrapper {...props}
             isVisibleSB={isVisibleSB}
             hovered={hovered}
             onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}
             isVisibleALF={isVisibleALF}
    >
      <p>Lists</p>
      <MaxQuantity maxNum={10} currentNum={props.listsLength} />
      <SvgSquare>
        <SvgPlus src={plus} alt="plus" onClick={toggleAddListForm} isVisibleALF={isVisibleALF} />
      </SvgSquare>
    </Wrapper>
  );
});

type WrapperType = {
  isVisibleSB: boolean;
  isVisibleALF: boolean;
  hovered: boolean;
  listsLength: number;
};

const Wrapper = styled.div<WrapperType>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0;
  height: 32px;
  ${({ hovered, isVisibleALF, listsLength }) =>
    (hovered || isVisibleALF) && listsLength < 10
      ? css`
          div {
            display: none;
            position: absolute;
          }
        `
      : css`
          style {
            display: none;
          }
        `}
  div, span, p {
    ${({ isVisibleSB }) =>
      !isVisibleSB &&
      css`
        display: none;
      `};
    user-select: none;
  }
`;

const SvgSquare = styled.style`
  width: 28px;
  height: 28px;
  cursor: pointer;
  border-radius: 6px;
  background: ${({theme})=>theme.colors.color};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in;
  &:hover {
    transform: scale(1.1);
  }
`;

const SvgPlus = styled.img<{ isVisibleALF: boolean }>`
  z-index: 2;
  width: 32px;
  cursor: pointer;
  transition: all 0.2s ease-in;

  ${({ isVisibleALF }) =>
    isVisibleALF &&
    css`
      transform: rotate(45deg);
    `};
`;

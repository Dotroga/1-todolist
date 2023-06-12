import React, {memo, useCallback, useState} from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { MaxQuantity } from "../../Super/MaxQuantity/MaxQuantity";
import {selectIsCollapsedSB, selectIsVisibleALF} from "../../../redux/app.selectors";
import {useAppSelector} from "../../../redux/store";
import {appActions} from "../../../redux/app.reducer";
import {selectListsLength} from "../../../redux/lists.selectors";



export const AddListButton = memo(() => {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);

  const isVisibleSB = useAppSelector(selectIsCollapsedSB);
  const isVisibleALF = useAppSelector(selectIsVisibleALF);
  const length = useAppSelector(selectListsLength)

  const toggle = useCallback(() =>
    dispatch(appActions.toggleAddListForm(!isVisibleALF)),[isVisibleALF])

  return (
    <Wrapper length={length}
             isVisibleSB={isVisibleSB}
             hovered={hovered}
             onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}
             isVisibleALF={isVisibleALF}
    >
      <p>Lists</p>
      <MaxQuantity maxNum={10} currentNum={length} />
      <Square isVisibleALF={isVisibleALF} onClick={toggle}>
        <svg viewBox="-3.12 -3.12 30.24 30.24">
          <path d="M5 12H19"/>
          <path d="M12 5L12 19"/>
        </svg>
      </Square>
    </Wrapper>
  );
});

type WrapperType = {
  isVisibleSB: boolean;
  isVisibleALF: boolean;
  hovered: boolean;
  length: number;
};

const Wrapper = styled.div<WrapperType>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0;
  height: 32px;
  ${({ hovered, isVisibleALF, length }) =>
          (hovered || isVisibleALF) && length < 10
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

const Square = styled.style<{isVisibleALF: boolean}>`
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
  svg {
    z-index: 2;
    width: 32px;
    cursor: pointer;
    transition: all 0.2s ease-in;
    fill: none;
    stroke: #fcfcfc;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    ${({isVisibleALF}) => isVisibleALF && css`transform: rotate(45deg);`};
  }
`;


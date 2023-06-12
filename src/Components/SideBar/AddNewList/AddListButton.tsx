import React, {memo, useCallback, useState} from "react";
import plus from "../../../Icons/plus.svg";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { MaxQuantity } from "../../Super/MaxQuantity/MaxQuantity";
import {useAppSelector} from "redux/store";
import {selectListsLength} from "redux/lists.selectors";
import {selectIsCollapsedSB, selectIsVisibleALF} from "redux/app.selectors";
import {appActions} from "redux/app.reducer";


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
      <SvgSquare>
        <SvgPlus src={plus} alt="plus" onClick={toggle} isVisibleALF={isVisibleALF} />
      </SvgSquare>
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
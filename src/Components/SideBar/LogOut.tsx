import React from "react";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "redux/store";
import {selectIsCollapsedSB} from "redux/app.selectors";
import {authThunks} from "redux/auth/auth.reducer";

export const LogOut: React.FC = () => {

  const dispatch = useAppDispatch();
  const isCollapsedSB = useAppSelector(selectIsCollapsedSB)
  const logOutHandler = () => dispatch(authThunks.logOut())

  return (
    <Wrapper onClick={logOutHandler}>
      <svg viewBox="0 0 24 24">
        <path
          d="M16 17L21 12M21 12L16 7M21 12H9M9 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H9"/>
      </svg>
      {isCollapsedSB && <span>Log Out</span>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px;
  svg {
    width: 34px;
    transition: 0.3s;
    fill: none;
    stroke: ${({theme}) => theme.colors.color};
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  span {
    opacity: 0.3;
    transition: 0.3s;
  }
  &:hover {
    span {
      opacity: 1;
    }
    svg {
      transform: scale(1.1);
    }
`;

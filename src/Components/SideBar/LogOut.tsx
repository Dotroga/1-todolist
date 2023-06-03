import React from "react";
import logOut from "./../../Icons/logOut.svg";
import logOutViolet from "./../../Icons/logOutViolet.svg";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "redux/store";
import { logOutTC } from "redux/auth.reducer";
import {selectIsCollapsedSB, selectTheme} from "redux/app.selectors";

export const LogOut: React.FC = () => {

  const dispatch = useAppDispatch();
  const isCollapsedSB = useAppSelector(selectIsCollapsedSB)
  const theme = useAppSelector(selectTheme)

  const logOutHandler = () => dispatch(logOutTC())

  return (
    <Wrapper onClick={logOutHandler}>
      <img src={theme.type === 'dark' ? logOut : logOutViolet} alt="" />
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
  span {
    opacity: 0.3;
    transition: 0.3s;
  }
  img {
    width: 34px;
    transition: 0.3s;
  }
  &:hover {
    span {
      opacity: 1;
    }
    img {
      transform: scale(1.1);
    }
  }
`;

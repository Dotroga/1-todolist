import React from "react";
import logOut from "./../../Icons/logOut.svg";
import styled from "styled-components";
import { useAppDispatch } from "redux/store";
import { logOutTC } from "redux/authReducer";

type PropType = {
  isCollapsedSB: boolean;
};

export const LogOut: React.FC<PropType> = ({ isCollapsedSB }) => {
  const dispatch = useAppDispatch();
  const logOutHandler = () => {
    dispatch(logOutTC());
  };
  return (
    <Wrapper onClick={logOutHandler}>
      <img src={logOut} alt="" />
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

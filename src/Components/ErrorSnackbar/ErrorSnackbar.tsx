import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "redux/store";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import {appActions} from "redux/app.reducer";
export const ErrorSnackbar = memo(() => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const error = useAppSelector((state) => state.app.errorSnackbar)

  useEffect(() => {
    let id: NodeJS.Timeout | undefined;
    if (error) {
      setShow(true);
      id = setTimeout(() => {
        closeSnackbar();
      }, 3000);
    }
    return () => clearTimeout(id);
  }, [error]);
  const closeSnackbar = () => {
    setShow(false);
    dispatch(appActions.setErrorSnackbar({ error: null}));
  };
  return (
    <Wrapper show={show}>
      <p>{error}</p>
      <DeleteButton callBack={closeSnackbar} />
    </Wrapper>
  );
});

const Wrapper = styled.div<{ show: boolean }>`
  opacity: ${({ show }) => (!show ? 0 : 1)};
  pointer-events: ${({ show }) => (!show ? "none" : "auto")};
  transition: 0.3s;
  display: flex;
  align-items: center;
  background-color: #aa2929;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 20px 2px #1a2434;
  position: absolute;
  bottom: 60px;
  right: 60px;
`;

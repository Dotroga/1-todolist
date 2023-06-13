import React from 'react';
import styled from "styled-components";
import {useAppDispatch} from "redux/store";
import {appActions} from "redux/app.reducer";

export const SwitchThemeButton = () => {
  const dispatch = useAppDispatch();
  const themeHandler = () => dispatch(appActions.changeTheme())
  return (
    <Switch>
      <input type="checkbox" onClick={themeHandler}/>
      <span></span>
    </Switch>
  );
};

const Switch = styled.label`
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3em;
  height: 1.7em;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    --background: ${({theme}) => theme.colors.topColor};
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--background);
    transition: 0.5s;
    border-radius: 30px;
  }

  span:before {
    position: absolute;
    content: "";
    height: 1.2em;
    width: 1.2em;
    border-radius: 50%;
    left: 10%;
    bottom: 15%;
    box-shadow: inset 8px -4px 0px 0px ${({theme}) => theme.colors.color};
    background: var(--background);
    transition: 0.5s;
  }

  input:checked + span {
    background-color: ${({theme}) => theme.colors.topColor};
  }

  input:checked + span:before {
    transform: translatex(100%);
    box-shadow: inset 15px -4px 0px 15px ${({theme}) => theme.colors.color};
  }
`


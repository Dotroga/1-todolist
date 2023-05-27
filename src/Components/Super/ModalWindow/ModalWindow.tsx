import React, { memo, useEffect, useRef } from "react";
import styled from "styled-components";
import edit from "../../../Icons/edit.svg";
import arrowUp from "../../../Icons/arrowUp.svg";
import arrowDown from "../../../Icons/arrowDown.svg";
import deleteUrn from "../../../Icons/deleteUrn.svg";
import editViolet from "../../../Icons/editViolet.svg";
import arrowUpViolet from "../../../Icons/arrowUpViolet.svg";
import arrowDownViolet from "../../../Icons/arrowDownViolet.svg";
import deleteUrnViolet from "../../../Icons/deleteUrnViolet.svg";
import { removeListTK } from "redux/listsReducer";
import {useAppDispatch, useAppSelector} from "redux/store";
import {
  changeColorAC,
  changeModeAddListAC,
  changeTitleNewListAC,
  toggleAddListFormAC,
} from "redux/statusOffWindowsReducer";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";

type PropsType = {
  listId?: string | undefined;
  title: string;
  color: string;
  isOpen: boolean;
  onCloses: (v: boolean) => void;
  isLoading: boolean | undefined;
};

export const ModalWindow: React.FC<PropsType> = memo((props) => {
  const { listId, title, color, isOpen, onCloses, isLoading } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useAppSelector((state)=>state.StatusOffWindows.theme.type)
  const ref = useRef<HTMLDivElement>(null);
  const useOutsideClick = (ref: React.RefObject<HTMLDivElement>, handler: (v: boolean) => void, attached = true) => {
    useEffect(() => {
      if (!attached) return;
      const handleClick = (e: MouseEvent) => {
        if (!ref.current) return;
        if (!ref.current.contains(e.target as Node)) {
          setTimeout(() => {
            handler(false);
          });
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    }, [ref, handler, attached]);
  };
  useOutsideClick(ref, onCloses, isOpen);

  const editingModeList = () => {
    dispatch(toggleAddListFormAC(true));
    dispatch(changeTitleNewListAC(title));
    dispatch(changeColorAC(color));
    dispatch(changeModeAddListAC(listId!, false));
    onCloses(false);
  };
  const removeList = () => {
    dispatch(removeListTK(listId!, navigate));
    onCloses(false);
  };

  return (
    <Wrapper ref={ref}>
      <div className={`options ${isOpen ? "active" : "inActive"}`}>
        <button onClick={editingModeList} disabled={isLoading!}>
          <img src={theme === 'dark' ? edit : editViolet} alt="" />
          <p>Edit</p>
        </button>
        <button disabled={isLoading!}>
          <img src={theme === 'dark' ? arrowUp : arrowUpViolet} alt="" />
          <p>Move up</p>
        </button>
        <button disabled={isLoading!}>
          <img src={theme === 'dark' ? arrowDown : arrowDownViolet} alt="" />
          <p>Move down</p>
        </button>
        <button onClick={removeList} disabled={isLoading!}>
          <img src={theme === 'dark' ? deleteUrn : deleteUrnViolet} alt="" />
          <p>Delete</p>
        </button>
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: absolute;
  z-index: 99;
  margin-left: 13em;
  .options {
    background-color: ${({theme})=>theme.colors.bg};
    box-shadow: 0 0 15px 1px ${({theme})=>theme.colors.shadow};
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    gap: 2px;
    padding: 6px;
    top: -5px;
    button {
      border: none;
      display: flex;
      background: none;
      color: ${({theme})=>theme.colors.font};
      align-items: center;
      gap: 5px;
      padding: 4px;
      border-radius: 6px;
      cursor: pointer;
      &:hover {
        background-color: ${({theme})=>theme.colors.topColor};
      }
      img {
        width: 24px;
      }
    }
  }
  .options.inActive {
    opacity: 0;
    visibility: visible;
    transform: translateX(30px);
    transition: 0.4s;
  }
`;

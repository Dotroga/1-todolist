import React, { memo,useRef } from "react";
import styled from "styled-components";
import edit from "../../../Icons/edit.svg";
import arrowUp from "../../../Icons/arrowUp.svg";
import arrowDown from "../../../Icons/arrowDown.svg";
import deleteUrn from "../../../Icons/deleteUrn.svg";
import editViolet from "../../../Icons/editViolet.svg";
import arrowUpViolet from "../../../Icons/arrowUpViolet.svg";
import arrowDownViolet from "../../../Icons/arrowDownViolet.svg";
import deleteUrnViolet from "../../../Icons/deleteUrnViolet.svg";
import {listsThunks} from "redux/lists.reducer";
import {useAppDispatch, useAppSelector} from "redux/store";
import { useNavigate } from "react-router-dom";
import {appActions} from "redux/app.reducer";
import {useOutsideClick} from "utils/useOutsideClick";

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
  const theme = useAppSelector((state)=>state.app.theme.type)
  const lists = useAppSelector((state)=>state.lists)
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, onCloses, isOpen);

  const editingModeList = () => {
    dispatch(appActions.toggleAddListForm(true));
    dispatch(appActions.changeTitleNewList(title));
    dispatch(appActions.changeColor(color));
    dispatch(appActions.changeModeAddList({listId: listId!, mode:false}));
    onCloses(false);
  };
  const removeList = () => {
    dispatch(listsThunks.removeList(listId!, navigate));
    onCloses(false);
  };
  const reorderList = () => {
   dispatch(listsThunks.reorderList(listId!, lists, 'up'))
  };
  const reorderDownList = () => {
    dispatch(listsThunks.reorderList(listId!, lists, 'down'))
  };

  return (
    <Wrapper ref={ref}>
      <div className={`options ${isOpen ? "active" : "inActive"}`}>
        <button onClick={editingModeList} disabled={isLoading!}>
          <img src={theme === 'dark' ? edit : editViolet} alt="" />
          <p>Edit</p>
        </button>
        <button onClick={reorderList} disabled={isLoading!}>
          <img src={theme === 'dark' ? arrowUp : arrowUpViolet} alt="" />
          <p>Move up</p>
        </button>
        <button onClick={reorderDownList}  disabled={isLoading!}>
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

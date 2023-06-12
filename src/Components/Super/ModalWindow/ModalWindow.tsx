import React, { memo,useRef } from "react";
import styled from "styled-components";
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
          <svg viewBox="0 0 24 24" >
              <path d="M3.99512 17.2072V19.5C3.99512 19.7761 4.21897 20 4.49512 20H6.79289C6.9255 20 7.05268 19.9473 7.14645 19.8536L16.5942 10.4058L13.5935 7.40518L4.14163 16.8535C4.04782 16.9473 3.99512 17.0745 3.99512 17.2072Z"/>
            <path d="M14.8322 6.16693L17.8327 9.16734L19.2929 7.7071C19.6834 7.31658 19.6834 6.68341 19.2929 6.29289L17.707 4.70697C17.3165 4.3165 16.6834 4.31644 16.2929 4.70684L14.8322 6.16693Z"/>
          </svg>
          <p>Edit</p>
        </button>
        <button onClick={reorderList} disabled={isLoading!}>
          <svg viewBox="0 0 24 24" transform="rotate(0)">
            <path
              d="M4 2C3.44772 2 3 2.44772 3 3C3 3.55228 3.44772 4 4 4H20C20.5523 4 21 3.55228 21 3C21 2.44772 20.5523 2 20 2H4Z"/>
            <path
              d="M6.29289 13.7071C6.68342 14.0976 7.31658 14.0976 7.70711 13.7071L11 10.4142L11 21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21L13 10.4142L16.2929 13.7071C16.6834 14.0976 17.3166 14.0976 17.7071 13.7071C18.0976 13.3166 18.0976 12.6834 17.7071 12.2929L12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L6.29289 12.2929C5.90237 12.6834 5.90237 13.3166 6.29289 13.7071Z"/>
          </svg>
          <p>Move up</p>
        </button>
        <button onClick={reorderDownList} disabled={isLoading!}>
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M7.70711 10.2929L11 13.5858L11 3C11 2.44771 11.4477 2 12 2C12.5523 2 13 2.44771 13 3L13 13.5858L16.2929 10.2929C16.6834 9.90237 17.3166 9.90237 17.7071 10.2929C18.0976 10.6834 18.0976 11.3166 17.7071 11.7071L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L6.29289 11.7071C5.90237 11.3166 5.90237 10.6834 6.29289 10.2929C6.68342 9.90237 7.31658 9.90237 7.70711 10.2929Z"/>
            <path
              d="M4 22C3.44772 22 3 21.5523 3 21C3 20.4477 3.44772 20 4 20H20C20.5523 20 21 20.4477 21 21C21 21.5523 20.5523 22 20 22H4Z"/>
          </svg>
          <p>Move down</p>
        </button>
        <button onClick={removeList} disabled={isLoading!}>
          <svg viewBox="0 0 24 24">
              <path d="M17,4V5H15V4H9V5H7V4A2,2,0,0,1,9,2h6A2,2,0,0,1,17,4Z"/>
              <path d="M20,6H4A1,1,0,0,0,4,8H5V20a2,2,0,0,0,2,2H17a2,2,0,0,0,2-2V8h1a1,1,0,0,0,0-2Z"/>
          </svg>
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
      svg {
        width: 24px;
        fill: ${({theme})=>theme.colors.color};
        stroke-linecap: round;
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

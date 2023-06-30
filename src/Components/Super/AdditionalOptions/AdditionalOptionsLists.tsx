import React from 'react';
import styled from "styled-components";
import {ThreeDotsButton} from "Components/Super/AdditionalOptions/ThreeDotsButton";
import {ModalWindow} from "Components/Super/AdditionalOptions/ModalWindow";
import {appActions} from "redux/app.reducer";
import {listsThunks} from "redux/lists.reducer";
import {useAppDispatch, useAppSelector} from "redux/store";
import {useNavigate} from "react-router-dom";
import {selectLists, selectListsLength} from "redux/lists.selectors";

type  PropsType = {
  opened: () => void
  isOpen: boolean
  listId: string
  title: string;
  color: string;
  index: number
  onCloses: () => void;
  isLoading: boolean | undefined;
}

export const AdditionalOptionsLists:React.FC<PropsType> = (props) => {
  const {opened, listId, title, color, isOpen, onCloses, isLoading, index} = props
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const lists = useAppSelector(selectLists)
  const length = useAppSelector(selectListsLength)
  const editing = () => {
    dispatch(appActions.toggleAddListForm(true));
    dispatch(appActions.changeTitleNewList(title));
    dispatch(appActions.changeColor(color));
    dispatch(appActions.changeModeAddList({listId: listId!, mode:false}));
    onCloses();
  };
  const remove = () => {
    dispatch(listsThunks.removeList(listId!, navigate));
    onCloses();
  };
  const reorderUp = () => {
    dispatch(listsThunks.reorderList(listId!, lists, 'up'))
  };
  const reorderDown = () => {
    dispatch(listsThunks.reorderList(listId!, lists, 'down'))
  };
  return (
    <Wrapper className='AdditionalOptions'  isOpen={isOpen}>
        <ThreeDotsButton opened={opened} isOpen={isOpen}/>
        <ModalWindow
          isOpen={isOpen}
          close={onCloses}
          index={index}
          length={length}
          isLoading={isLoading}
          editing={editing}
          remove={remove}
          reorderDown={reorderDown}
          reorderUp={reorderUp}
        />
    </Wrapper>
  );
};
const Wrapper = styled.div<{isOpen: boolean}>`
  display: none;
    align-items: center;
    justify-content: center;
    width: 30px;
    color: #979ea6;

  .threePoints {
    display: ${({isOpen})=> isOpen ? 'flex' : 'none'};
    opacity: 0.5;
    transition: 0.3s;
    &:hover {
      opacity: 1;
      transform: scale(1.2);
    }
  }
`


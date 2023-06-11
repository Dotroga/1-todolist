import React, { memo, useCallback, useState } from "react";
import fourSquare from "../../../Icons/fourSquare.png";
import { StyledNavLink } from "./SideBarIconStyled";
import { ModalWindow } from "../../Super/ModalWindow/ModalWindow";
import { ThreeDotsButton } from "../../Super/ThreeDotsButton/ThreeDotsButton";
import {useAppSelector} from "redux/store";
import {useLocation, useNavigate} from "react-router-dom";


type SideBarIconsPropsType = {
  listId?: string;
  title?: string;
  color?: string;
  numberOfTasks?: number;
  isLoading?: boolean;
};

export const SideBarIcon: React.FC<SideBarIconsPropsType> = memo((props) => {
  const { listId,  title, color, numberOfTasks, isLoading } = props;
  const navigate = useNavigate()
  const location = useLocation();
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const isOpen = useAppSelector<boolean>((state) => state.app.isCollapsedSB);
  const opened = useCallback(() => setIsOpenOptions(!isOpenOptions),[])
  const closed = useCallback((v: boolean) => {
    setIsOpenOptions(v);
  },[])
  const activeList = decodeURIComponent(location.pathname)

  const navigateTo = useCallback(() => {
    const to = !title ?  '/' : `/${title}`
    activeList !== to && navigate(to)
  },[activeList])

  return (
    <StyledNavLink
      onClick={navigateTo}
      isOpenOptions={isOpenOptions}
      visible={isOpen ? "" : null}
      color={color}
      active={activeList === `/${title}`}
    >
      {!title ? <img src={fourSquare} alt="square" /> : <style></style>}
      <div>{title ? title : 'All lists'}</div>
      {numberOfTasks! > 0 && <span className="number">{numberOfTasks}</span>}
      {title && (
        <div className="AdditionalOptions">
          <ThreeDotsButton onClick={opened} isOpen={isOpenOptions}/>
          <ModalWindow
            title={title}
            color={color!}
            listId={listId}
            isOpen={isOpenOptions}
            onCloses={closed}
            isLoading={isLoading}
          />
        </div>
      )}
    </StyledNavLink>
  );
});

import React, { memo, useCallback, useState } from "react";
import fourSquare from "../../../Icons/fourSquare.png";
import { StyledNavLink } from "./SideBarIconStyled";
import { ModalWindow } from "../../Super/ModalWindow/ModalWindow";
import { ThreeDotsButton } from "../../Super/ThreeDotsButton/ThreeDotsButton";
import {useAppSelector} from "redux/store";
import {useLocation, useNavigate} from "react-router-dom";

type SideBarIconsPropsType = {
  listId?: string;
  title: string;
  color: string;
  numberOfTasks?: number;
  isLoading?: boolean;
};

export const SideBarIcon: React.FC<SideBarIconsPropsType> = memo((props) => {
  const { listId,  title, color, numberOfTasks, isLoading } = props;
  const navigate = useNavigate()
  const location = useLocation();
  const [hover, setHover] = useState(false);
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const isOpen = useAppSelector<boolean>((state) => state.StatusOffWindows.isCollapsedSB);
  const onHover = useCallback(() => setHover(true),[hover])
  const outHover = useCallback(() => !isOpenOptions && setHover(false),[isOpenOptions])
  const opened = () => setIsOpenOptions(!isOpenOptions)
  const closed = (v: boolean) => {
      setIsOpenOptions(v);
      setHover(false);
    }


  const navigateTo = () => {
    const to = title === "All lists" ? '/' : '/' + title
    decodeURIComponent(location.pathname) !== to && navigate(to)
  }
  console.log(isOpenOptions)
  return (
    <StyledNavLink
      onClick={navigateTo}
      visible={isOpen ? "" : null}
      color={color}
      hover={hover.toString()}
      onMouseOut={outHover}
      onMouseOver={onHover}
    >
      {title === "All lists" ? <img src={fourSquare} alt="square" /> : <style></style>}
      <div>{title}</div>
      {title !== "All lists" && (
        <div className="AdditionalOptions">
          {hover && <ThreeDotsButton onClick={opened} isOpen={isOpenOptions}/>}
          <ModalWindow
            title={title}
            color={color}
            listId={listId}
            isOpen={isOpenOptions}
            onCloses={closed}
            isLoading={isLoading}
          />
          {numberOfTasks! > 0 && <span className="number">{numberOfTasks}</span>}
        </div>
      )}
    </StyledNavLink>
  );
});

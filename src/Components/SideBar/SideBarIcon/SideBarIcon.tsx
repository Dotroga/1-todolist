import React, { memo, useCallback, useState } from "react";
import { StyledNavLink } from "./SideBarIconStyled";
import {useAppSelector} from "redux/store";
import {useLocation, useNavigate} from "react-router-dom";
import {AllListsIcon} from "Components/SideBar/AllListsIcon";
import {AdditionalOptionsLists} from "Components/Super/AdditionalOptions/AdditionalOptionsLists";

type SideBarIconsPropsType = {
  listId?: string;
  title?: string;
  color?: string;
  index?: number
  numberOfTasks?: number;
  isLoading?: boolean;
};

export const SideBarIcon: React.FC<SideBarIconsPropsType> = memo((props) => {
  const {listId, title, color, numberOfTasks, isLoading, index} = props;
  const navigate = useNavigate()
  const location = useLocation();
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const isOpen = useAppSelector<boolean>((state) => state.app.isCollapsedSB);
  const opened = useCallback(() => setIsOpenOptions(!isOpenOptions), [])
  const closed = useCallback(() => setIsOpenOptions(false), [])
  const activeList = decodeURIComponent(location.pathname)

  const navigateTo = useCallback(() => {
    const to = !title ? '/' : `/${title}`
    activeList !== to && navigate(to)
  }, [activeList])

  return (
    <StyledNavLink
      onClick={navigateTo}
      isOpenOptions={isOpenOptions}
      visible={isOpen ? "" : null}
      color={color}
      active={activeList === `/${title ? title : ''}`}
    >
      {!title ? <AllListsIcon/> : <style></style>}
      <div>{title ? title : 'All lists'}</div>
      {numberOfTasks! > 0 && <span className="number">{numberOfTasks}</span>}
      {title && (<AdditionalOptionsLists
          title={title}
          opened={opened}
          color={color!}
          index={index!}
          listId={listId!}
          isOpen={isOpenOptions}
          onCloses={closed}
          isLoading={isLoading}
        />
      )}
    </StyledNavLink>
  );
});

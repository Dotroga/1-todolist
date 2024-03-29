import React, {memo, useCallback} from 'react';
import {useAppSelector} from "redux/store";
import {selectLists} from "redux/lists.selectors";
import {SideBarIcon} from "Components/SideBar/SideBarIcon/SideBarIcon";

export const SideBarLists = memo(() => {

  const lists = useAppSelector(selectLists);

  return <> {lists.map(useCallback((l,i) =>
    <SideBarIcon
      key={l.id}
      index={i}
      listId={l.id}
      isLoading={l.isLoading}
      numberOfTasks={l.numberOfTasks}
      title={l.title}
      color={l.color}
    />, [lists])
  )}
  </>
})


import React, {memo, useCallback} from 'react';
import {SideBarIcon} from "../SideBarIcon/SideBarIcon";
import {useAppSelector} from "../../../redux/store";
import {selectLists} from "../../../redux/lists.selectors";


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


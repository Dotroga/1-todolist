import React from 'react';
import {ListsType} from "../../bll/state";

type ListType = {
  list: ListsType
}

export const List: React.FC<ListType> = ({list}) => {
  return (
    <div>
      {list.title}
    </div>
  );
};


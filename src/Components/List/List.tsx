import React from 'react';
import {ListsType} from "../../bll/state";
import {Section} from "../Section/Section";

type ListType = {
  list: ListsType
}

export const List: React.FC<ListType> = ({list}) => {
  return (
    <div>
      {list.title}
      <Section listId={list.id}/>
    </div>
  );
};


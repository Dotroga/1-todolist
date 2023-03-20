import React from 'react';
import {useAppSelector} from "../../bll/store";
import {sectionType} from "../../bll/state";

type SectionType = {
  listId: string
}

export const Section: React.FC<SectionType> = ({listId}) => {
  const section = useAppSelector((state):sectionType[]=>
    state.sections[listId])
  return (
    <div>
      {section.map(s=><div>{s.title}</div>)}
    </div>
  );
};


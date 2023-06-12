import React from 'react';
import styled from "styled-components";
import {ArrType} from "../../../redux/app.reducer";
import {selectPrioritiesArr} from "../../../redux/app.selectors";
import {PriorityIcon} from "./PriorityIcon";
import {Select} from "../Select/Select";
import {useAppSelector} from "../../../redux/store";

type PriorityPropsType = {
  item: ArrType | null
}

export const Priority:React.FC<PriorityPropsType> = (props) => {
  const {item} = props
  const prioritiesArr = useAppSelector(selectPrioritiesArr)
  return <Wrapper>
    <Select title='Priority' arr={prioritiesArr} item={item} icon={PriorityIcon}/>
  </Wrapper>
};

const Wrapper = styled.div`
  width: 170px;
`


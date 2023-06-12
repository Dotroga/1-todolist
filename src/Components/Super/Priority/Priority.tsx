import React from 'react';
import {Select} from "Components/Super/Select/Select";
import {selectPrioritiesArr} from "redux/app.selectors";
import {useAppSelector} from "redux/store";
import {PriorityIcon} from "Components/Super/Priority/PriorityIcon";
import {ArrType} from "redux/app.reducer";
import styled from "styled-components";

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


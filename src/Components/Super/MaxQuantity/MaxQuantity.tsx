import React, {memo} from "react";
import styled from "styled-components";

type MaxQuantityPropsType = {
  maxNum: number;
  currentNum: number;
};

export const MaxQuantity = memo((props: MaxQuantityPropsType) => {
  const { maxNum, currentNum } = props;
  return <Wrapper>{`${currentNum} / ${maxNum}`}</Wrapper>;
})

const Wrapper = styled.div`
  color: ${({theme}) => theme.colors.secondFont};
`;

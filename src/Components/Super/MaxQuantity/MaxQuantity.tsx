import React from "react";
import styled from "styled-components";

type MaxQuantityPropsType = {
  maxNum: number;
  currentNum: number;
};

export const MaxQuantity = (props: MaxQuantityPropsType) => {
  const { maxNum, currentNum } = props;
  return <Wrapper>{`${currentNum} / ${maxNum}`}</Wrapper>;
};

const Wrapper = styled.div``;

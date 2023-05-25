import React from "react";
import cross from "./../../Icons/delete.svg";
import styled from "styled-components";

export const DeleteButton = (props: { callBack: () => void }) => {
  return <Delete className="delete" onClick={() => props.callBack()} src={cross} alt="x" />;
};

const Delete = styled.img`
  cursor: pointer;
  width: 30px;
`;

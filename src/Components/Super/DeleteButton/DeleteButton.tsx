import React from "react";
import styled from "styled-components";

export const DeleteButton = (props: { callBack: () => void }) => {
  return <Delete className="delete" onClick={() => props.callBack()}>
    <svg width="34px" height="34px" viewBox="-1.92 -1.92 27.84 27.84" fill="none">
      <path d="M19 5L5 19M5 5L9.5 9.5M12 12L19 19" />
    </svg>
    </Delete>;
};

const Delete = styled.div`
  cursor: pointer;

  svg {
    stroke: #000000;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

import React from 'react';
import styled from "styled-components";

export const PlusIcon = () => {
  return (
    <Wrapper>
      <svg viewBox="0 0 16 16" className='square'>
        <path d="M3.25 1A2.25 2.25 0 001 3.25v9.5A2.25 2.25 0 003.25 15h9.5A2.25 2.25 0 0015 12.75v-9.5A2.25 2.25 0 0012.75 1h-9.5z"/>
      </svg>
      <svg viewBox="0 0 24 24" className='plus'>
        <path d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z" />
      </svg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    width: 32px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 0;
    position: absolute;
  }
  .square {
    fill: none;
  }
  .plus {
    fill: rgba(255, 255, 255, 0.41);
    width: 30px;
  }
  &:hover {
    .square {
      fill: ${({theme}) => theme.colors.color};
    }
    .plus {
      fill: white;
    }
  }

`


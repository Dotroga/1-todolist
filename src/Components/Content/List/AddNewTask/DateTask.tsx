import React, {useState} from 'react';
import {Calendar} from "Components/Super/Calendar/Calendar";
import styled, {css} from "styled-components";

type PropsType = {
  value: Date | undefined
  onChange: (value: Date) => void
}

export const DateTask:React.FC<PropsType> = ({value, onChange}) => {
  const [isOpen, setIsOpen] = useState(false)
  const opened = () => setIsOpen(!isOpen)
  const handler = (date: Date) => {
    onChange(date)
    setIsOpen(false)
  }
  return (
    <Wrapper
      blackout={value instanceof Date}
      isOpen={isOpen}
    >
      {isOpen && <div>
          <Calendar
              selectedDate={value instanceof Date ? value : new Date()}
              selectDate={handler}
          />
      </div>}
      <span onClick={opened}>
        {value instanceof Date ? value.toLocaleDateString() : 'Date'}
      </span>
    </Wrapper>
  );
};

const Wrapper = styled.div<{blackout: boolean, isOpen: boolean}>`
  position: relative;
  span {
    display: flex;
    cursor: pointer;
    color: ${({theme, blackout}) => blackout ? theme.colors.font : '#697594'};
    width: 230px;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({theme}) => theme.colors.color};
    ${({isOpen}) =>
            isOpen
                    ? css`
                      border-bottom-right-radius: 8px;
                      border-bottom-left-radius: 8px;
                      border-top: none;
                      height: 43px;
                    `
                    : css`
                      border-radius: 8px;
                     height: 42px;
                    `}
  }
`


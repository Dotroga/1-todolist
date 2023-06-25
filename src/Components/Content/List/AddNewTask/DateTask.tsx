import React, {useState} from 'react';
import {Calendar} from "Components/Super/Calendar/Calendar";
import styled, {css} from "styled-components";

export const DateTask = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDay] = useState<Date | string>('Date')
  const opened = () => setIsOpen(!isOpen)
  const onChange = (date: Date) => {
    setSelectedDay(date)
    setIsOpen(false)
  }
  return (
    <Wrapper
      blackout={selectedDate instanceof Date}
      isOpen={isOpen}
    >
      {isOpen && <Calendar
          selectedDate={selectedDate instanceof Date ? selectedDate : new Date()}
          selectDate={onChange}
      />}
      <span onClick={opened}>
        {selectedDate instanceof Date ? selectedDate.toLocaleDateString() : selectedDate}
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


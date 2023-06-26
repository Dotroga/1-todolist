import React from 'react';
import {CalendarProps} from "./Calendar";
import styled from "styled-components";


type CalendarHeaderProps = CalendarProps &  {
  functions: any
  state: any
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = (props) => {
  const {functions, state, selectedDate: date, firstWeekDayNumber = 2} = {...props}

  return (
    <Wrapper>
      <svg className='arrowLeft' viewBox="0 0 5 10"
           onClick={() => functions.onClickArrow('left')}>
        <path d="M4.8003 9.11849C4.53403 9.38475 4.10233 9.38475 3.83606 9.11849L0.1997 5.48212C-0.0665664 5.21586 -0.0665664 4.78415 0.1997 4.51789L3.83606 0.881524C4.10233 0.615257 4.53403 0.615257 4.8003 0.881524C5.06657 1.14779 5.06657 1.57949 4.8003 1.84576L1.64605 5.00001L4.8003 8.15425C5.06657 8.42052 5.06657 8.85222 4.8003 9.11849Z" />
      </svg>
      {state.mode === 'days' && (
        <div onClick={() => functions.setMode('months')}>
          {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
        </div>
      )}
      {state.mode === 'months' && (
        <div onClick={() => functions.setMode('years')}>
          {state.selectedYear}
        </div>
      )}
      {state.mode === 'years' && (
        <div>
          {state.selectedYearsInterval[0]} -{' '}
          {state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}
        </div>
      )}
      <svg className='arrowRight' viewBox="0 0 5 10"
           onClick={() => functions.onClickArrow('right')}>
        <path d="M4.8003 9.11849C4.53403 9.38475 4.10233 9.38475 3.83606 9.11849L0.1997 5.48212C-0.0665664 5.21586 -0.0665664 4.78415 0.1997 4.51789L3.83606 0.881524C4.10233 0.615257 4.53403 0.615257 4.8003 0.881524C5.06657 1.14779 5.06657 1.57949 4.8003 1.84576L1.64605 5.00001L4.8003 8.15425C5.06657 8.42052 5.06657 8.85222 4.8003 9.11849Z"/>
      </svg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    position: relative;
    border-radius: 5px 5px 0 0;
    background-color: var(--background-color-calendar-header);
    color: var(--color-text);
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 10px -1px rgba(0, 0, 0, 0.2);
  .arrowLeft {
    width: 10px;
    height: 20px;
    cursor: pointer;
    fill: ${({theme})=>theme.colors.color};
  }

  .arrowRight {
    width: 10px;
    height: 20px;
    cursor: pointer;
    fill: ${({theme})=>theme.colors.color};
    transform: rotate(-180deg);
  }
  
`


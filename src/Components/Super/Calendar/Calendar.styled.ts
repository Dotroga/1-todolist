import styled from "styled-components";

export const CalendarWrapper = styled.div`
  transform-origin: bottom;
  bottom: 0;
  width: 230px;
  height: 268px;
  text-transform: capitalize;
  border: ${({theme}) => theme.colors.color};
  background-color: ${({theme}) => theme.colors.bg};
  transform: translateY(-43px);
  position: absolute;
  border: 1px solid ${({theme}) => theme.colors.color};
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  z-index: 3;

  .calendar__body {
    border-radius: 0 0 5px 5px;
    padding: 5px;
  }

  .calendar__week__names {
    height: 20px;
    font-weight: 600;
    font-size: 8px;
    color: var(--color-additional);
    text-align: center;
    align-items: center;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 1px 1px;
  }

  .calendar__days {
    font-size: 10px;
    font-weight: 400;
    color: var(--color-text);
    text-align: center;
    display: grid;
    align-items: center;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 1fr;
    gap: 1px 1px;
  }

  .calendar__day {
    border-radius: 5px;
    padding: 5.5px 0;
    cursor: pointer;
  }

  .calendar__day:hover {
    background-color: ${({theme}) => theme.colors.topColor};
  }

  .calendar__additional__day {
    padding: 5.5px;
    font-weight: 300;
    cursor: pointer;
    color: #687493;
  }

  .calendar__pick__item {
    padding: 9px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 5px;
  }

  .calendar__pick__item:hover {
    background-color: darkgoldenrod;
  }

  .calendar__today__item {
    background-color: ${({theme}) => theme.colors.topColor};
  }

  .calendar__selected__item {
    color: rebeccapurple;
    background-color: ${({theme}) => theme.colors.color};
  }

  .calendar__selected__item:hover {
    background-color: ${({theme}) => theme.colors.color};
  }

  .calendar__pick__items__container {
    font-weight: 400;
    color: var(--color-text);
    text-align: center;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 1px 1px;
    font-size: 12px;
  }

  .calendar__unchoosable__year {
    font-weight: 300;
    padding: 9px 16px;
    color: var(--color-placeholder);
  }
`
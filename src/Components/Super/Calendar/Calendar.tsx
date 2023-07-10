import React from 'react';
import {useCalendar} from "./useCalendar";
import {checkDateIsEqual, checkIsToday} from "./utils";
import {CalendarWrapper} from "./Calendar.styled";
import {CalendarHeader} from "./CalendarHeader";
import {AdditionalSetting} from "Components/Super/Calendar/AdditionalSetting";

export type CalendarProps = {
  locale?: string
  selectedDate: Date
  selectDate: (date: Date | undefined) => void
  firstWeekDayNumber?: number
}

export const Calendar: React.FC<CalendarProps> = (props) => {
  const {locale, selectedDate: date, selectDate, firstWeekDayNumber = 2} = {...props}

  const { functions, state } = useCalendar({
    locale, selectedDate: date, firstWeekDayNumber});
  const today = new Date().getTime()
  return (
    <CalendarWrapper >
      <AdditionalSetting selectDate={selectDate}/>
      <CalendarHeader {...props} functions={functions} state={state} />
      <div className='calendar__body'>
        {state.mode === 'days' && (
          <>
            <div className='calendar__week__names'>
              {state.weekDaysNames.map((weekDaysName) => (
                <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
              ))}
            </div>
            <div className='calendar__days'>
              {state.calendarDays.map((day) => {
                const isToday = checkIsToday(day.date);
                const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date);
                const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
                return (
                  <button
                    disabled={day.timestamp <= today - 86400000}
                    key={`${day.dayNumber}-${day.monthIndex}`}
                    aria-hidden
                    onClick={() => {
                      functions.setSelectedDay(day);
                      selectDate(day.date);
                    }}
                    className={[
                      'calendar__day',
                      isToday ? 'calendar__today__item' : '',
                      isSelectedDay ? 'calendar__selected__item' : '',
                      isAdditionalDay ? 'calendar__additional__day' : ''
                    ].join(' ')}
                  >
                    {day.dayNumber}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {state.mode === 'months' && (
          <div className='calendar__pick__items__container'>
            {state.monthesNames.map((monthesName) => {
              const isCurrentMonth =
                new Date().getMonth() === monthesName.monthIndex &&
                state.selectedYear === new Date().getFullYear();
              const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex;

              return (
                <div
                  key={monthesName.month}
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedMonthByIndex(monthesName.monthIndex);
                    functions.setMode('days');
                  }}
                  className={[
                    'calendar__pick__item',
                    isSelectedMonth ? 'calendar__selected__item' : '',
                    isCurrentMonth ? 'calendar__today__item' : ''
                  ].join(' ')}
                >
                  {monthesName.monthShort}
                </div>
              );
            })}
          </div>
        )}

        {state.mode === 'years' && (
          <div className='calendar__pick__items__container'>
            <div className='calendar__unchoosable__year'>{state.selectedYearsInterval[0] - 1}</div>
            {state.selectedYearsInterval.map((year) => {
              const isCurrentYear = new Date().getFullYear() === year;
              const isSelectedYear = year === state.selectedYear;

              return (
                <div
                  key={year}
                  aria-hidden
                  onClick={() => {
                    functions.setSelectedYear(year);
                    functions.setMode('months');
                  }}
                  className={[
                    'calendar__pick__item',
                    isCurrentYear ? 'calendar__today__item' : '',
                    isSelectedYear ? 'calendar__selected__item' : ''
                  ].join(' ')}
                >
                  {year}
                </div>
              );
            })}
            <div className='calendar__unchoosable__year'>
              {state.selectedYearsInterval[state.selectedYearsInterval.length - 1] + 1}
            </div>
          </div>
        )}
      </div>
    </CalendarWrapper>
  );
};

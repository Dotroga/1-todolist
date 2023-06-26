import {ComponentMeta, Story} from "@storybook/react";
import {Calendar} from "./Calendar";
import React from "react";

export default {
  title: 'Calendar',
  component: Calendar,
} as ComponentMeta<typeof Calendar>

export const CalendarOne: Story = (args) => {
  const [selectedDate, setSelectedDay] = React.useState(new Date())
  console.log(selectedDate)

  return <Calendar
    selectedDate={selectedDate}
    selectDate={(date) => setSelectedDay(date)}
  />
}

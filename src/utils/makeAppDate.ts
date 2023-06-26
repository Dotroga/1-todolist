import {createDate} from "Components/Super/Calendar/utils";

export const makeAppDate = (date: string | undefined) => {
  if (date) {
    const d = createDate({date: new  Date(date)})
    return `${d.dayNumber} ${d.month} ${d.year} ${d.day}`
  }
}

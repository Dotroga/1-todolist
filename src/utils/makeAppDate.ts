import {createDate} from "Components/Super/Calendar/utils";
import {AppDate} from "api/taskAPI";

export const makeAppDate = (date: string | undefined): AppDate | undefined => {
  if (date) {
    const d = createDate({date: new  Date(date)})
    return {
      date: `${d.day} ${d.dayNumber} ${d.month}`,
      timestamp: d.timestamp
    }
  }
}

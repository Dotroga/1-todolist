import {v1} from "uuid";

export const newState = {
  chapter: {
    tasks: [
      {
        id: v1(),
        title: 'learn in a week',
        description: 'all js and react',
        priority: '3.2.1',
        dateAdded: {
          date: {month: 'March', day: '15', dayOfWeek: 'Wednesday'},
          time: '22:03'
        },
        termExecution: {
          date: {month: 'March', day: '15', dayOfWeek: 'Wednesday'},
          time: '22:03'
        },
    }
    ]
  }
}


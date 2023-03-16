import {v1} from "uuid";
 const idSubsection =  '1234'
export const newState = {
  tasks: {
    [idSubsection]: [
      {id: v1(),
        title: 'learn in a week',
        description: 'all js and react',
        priority: '3.2.1',
        dateAdded: {
          date: {month: 'March', day: '15', dayOfWeek: 'Wednesday'},
          time: '22:03'
        },
        termExecution: {
          date: {month: 'March', day: '22', dayOfWeek: 'Wednesday'},
          time: '22:03'
        },
      }
      ]
  },
  subsection: {
    ['idSection']: {
      id: '123',
      title: 'Подраздел',
      color: '#8241d2',
    }
  },
  section: [
    {
      id: '1234',
      title: 'section',
      path: '/sgsag',
      color: '#c70505',
    }
  ]
}


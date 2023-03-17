import {addNewListACType} from "./listsReducer";

type sectionType = {id: string, title: string, color: string}
type sectionsType = {[key: string]: sectionType[]}

const sections: sectionsType = {
  ['1']: [
    {id: '1', title: '1', color: '#8241d2'},
    {id: '2', title: '2', color: '#8241d2'}
  ],
  ['2']: [
    {id: '123', title: '3', color: '#8241d2'}
  ]
}

export const sectionsReducer = (state: sectionsType = sections, action: Actions):sectionsType  => {
  switch (action.type) {
   case 'ADD-LIST': return {...state, [action.id]:[{id: '1', title: '', color: ''}]}
    default: return state
  }
}

type Actions = addNewListACType


import {addNewListACType} from "./listsReducer";
import {sections, sectionsType} from "./state";



export const sectionsReducer = (state: sectionsType = sections, action: Actions):sectionsType  => {
  switch (action.type) {
   case 'ADD-LIST': return {...state, [action.id]:[{id: '1', title: '', color: ''}]}
    default: return state
  }
}

type Actions = addNewListACType


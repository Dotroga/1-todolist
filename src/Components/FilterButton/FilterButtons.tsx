import React from 'react';
import {FilterType} from "../../bll/state";
import './FilterButton.css'
import {changeFilterAC} from "../../bll/listsReducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../bll/store";


type FilterButtonPropsType = {
  todoListId: string
}


export const FilterButtons: React.FC<FilterButtonPropsType> = (
  { todoListId}) => {

  const active = useAppSelector(state=> state.lists.find((l)=>l.id === todoListId)!.filter)
  const dispatch = useDispatch()

  const changeFilter = (filter: FilterType) => dispatch(changeFilterAC(todoListId, filter))

  const filters: FilterType[] = ['All' , 'Active' , 'Completed']
  const filterButton = filters.map(f=>{
    return (<div
        key={f.length}
        className={f === active ? 'activeButton' : 'button'}
        onClick={()=>changeFilter(f)}
      >{f}</div>)
  })
  return <div className='buttons'>
    {filterButton}
  </div>
  ;
};


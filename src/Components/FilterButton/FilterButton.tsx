import React from 'react';
import {FilterType} from "../../state";
import './FilterButton.css'


type FilterButtonPropsType = {
  filterList: FilterType
  callback: (filter: FilterType)=>void
}

const FilterButton: React.FC<FilterButtonPropsType> = (
  {filterList, callback}) => {

  const filters: FilterType[] = ['All' , 'Active' , 'Completed']

  const filterButton = filters.map(f=>{

    return (
      <button
        key={f.length}
        className={f === filterList ? 'activeButton' : 'button'}
        onClick={()=>callback(f)}
      >{f}</button>
    )
  })

  return <div className='buttons'>
    {filterButton}
  </div>
  ;
};

export default FilterButton;
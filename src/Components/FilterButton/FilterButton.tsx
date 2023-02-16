import React from 'react';
import {FilterType} from "../../App";
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
        className={f === filterList ? 'activeButton' : ''}
        onClick={()=>callback(f)}
      >{f}</button>
    )
  })

  return <div>
    {filterButton}
  </div>
  ;
};

export default FilterButton;
import React from 'react';
import {FilterType} from "../../state";
import './FilterButton.css'


type FilterButtonPropsType = {
  filterList: FilterType
  callback: (filter: FilterType)=>void
  onFilter: boolean
}

const FilterButton: React.FC<FilterButtonPropsType> = (
  {filterList, callback, onFilter}) => {

  const filters: FilterType[] = ['All' , 'Active' , 'Completed']
  const filterButton = filters.map(f=>{
    return (<div
        key={f.length}
        className={f === filterList ? 'activeButton' : 'button'}
        onClick={()=>callback(f)}
      >{f}</div>)
  })
  return <div className='buttons'>
    {onFilter && filterButton}
  </div>
  ;
};

export default FilterButton;
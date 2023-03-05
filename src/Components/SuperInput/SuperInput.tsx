import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './SuperInput.css'


type PropsType={
  callBack:(title: string)=>void
  title: string
}
const SuperInput: React.FC<PropsType> = ({callBack, title}) => {
  const [value, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const addTask = () => {
    let newTitle = value.trim();
   if (newTitle !== "") {
     callBack(newTitle)
     setTitle("")
   } else {
      setError("Title is required");
    }
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null); e.key==='Enter' && addTask()
  }
  return (
    <div  className='inputBox'>
      <input
        value={value}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        type='text'
        required={true}
      />
      <span>{error ? error : title}</span>
    </div>
  );
};

export default SuperInput
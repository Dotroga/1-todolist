import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {WrapperInput} from "./SuperInputStyled";


type PropsType={
  callBack:(title: string)=>void
  title: string
  color?: string
}
export const SuperInput: React.FC<PropsType>  = memo(  (props) => {
  const {callBack, title, color} = props
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
    error && setError(null); e.key==='Enter' && addTask()
  }
  return (
    <WrapperInput color={color!} error={error}>
      <input
        value={value}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        type='text'
        required={true}
      />
      <span>{error ? error : title}</span>
    </WrapperInput>
  );
});


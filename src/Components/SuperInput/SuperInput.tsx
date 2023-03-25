import React, {ChangeEvent, memo} from 'react';
import {WrapperInput} from "./SuperInputStyled";


type PropsType = {
    callBack: (text: string) => void
    text: string
    title: string
    color?: string
    error: string
}
export const SuperInput: React.FC<PropsType>  = memo(  (props) => {
  const {callBack,text, title, color, error} = props


  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    callBack(e.currentTarget.value)
  }

  // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
  //   error && setError(null); e.key==='Enter' && addTask()
  // }
  return (
    <WrapperInput color={color!} error={error}>
      <input
        value={title}
        onChange={onChangeHandler}
        // onKeyPress={onKeyPressHandler}
        type='text'
        required={true}
      />
      <span>{error ? error : text}</span>
    </WrapperInput>
  );
});


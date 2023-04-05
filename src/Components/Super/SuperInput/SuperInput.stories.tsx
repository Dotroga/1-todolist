import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {SuperInput} from "./SuperInput";
import {WrapperInput} from "./SuperInputStyled";

export default {
  title: 'Components/SuperInput',
  component: SuperInput,
  argTypes: {
    callBack: {description: 'Send text'}
  },
  args: {
    title: 'Напиши тут текст...',
    callBack: action('Send text'),
    color: 'white'
  }
} as ComponentMeta<typeof SuperInput>


const Template: ComponentStory<typeof SuperInput> = (args) => <SuperInput{...args}/>
const Template1: ComponentStory<typeof SuperInput> = (args) => {
  const {callBack, title, color} = args
  const [value, setTitle] = useState("")
  const [error, setError] = useState<string | null>("Title is required")

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
}
export const Primary = Template.bind({})
export const Error = Template1.bind({})
export const DarkMode = Template.bind({})

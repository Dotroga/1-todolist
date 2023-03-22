import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {SuperInput} from "./SuperInput";

export default {
  title: 'Components/SuperInput',
  component: SuperInput,
  argTypes: {
    callBack: {description: 'Send text'}
  }
} as ComponentMeta<typeof SuperInput>


const Template: ComponentStory<typeof SuperInput> = (args) => <SuperInput{...args}/>

export const Primary = Template.bind({})
Primary.args = {
  title: 'Добавить',
  callBack: action('Send text'),
  color: 'white'
}

export const DarKMode = Template.bind({})
DarKMode.args = {
  title: 'Отмена',
  callBack: action('Send text'),
}
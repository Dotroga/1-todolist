import React from 'react';
import {SuperButton} from "./SuperButton";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
  title: 'Components/SuperButton',     // Название компонента
  component: SuperButton,              // Сам компонент
  argTypes: {
    callBack: {description: 'Button clicked'}
  }
} as ComponentMeta<typeof SuperButton>

// Шаблон нашей компаненты
const Template: ComponentStory<typeof SuperButton> = (args) => <SuperButton {...args}/>

export const Primary = Template.bind({})
Primary.args = {
  title: 'Добавить',
  callBack: action('Button clicked')
}
export const Disabled = Template.bind({})
Disabled .args = {
  title: 'Задизебленна',
  callBack: action('Button clicked'),
  disabled: true
}
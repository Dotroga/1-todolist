import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {SuperButton} from "../SuperButton/SuperButton";
import {Select} from "./Select";

export default {
    title: 'Components/Select',
    component: Select,
    argTypes: {},
    args: {}
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => <Select {...args}/>

export const Primary = Template.bind({})
Primary.args = {
    arr: [
        'Berry Red',
        'Red',
        'Orange',
        'Yellow',
        'Olive Green',
        'Lime Green',
        'Green',
        'Mint Green',
        'Teal',
        'Sky Blue',
        'Light Blue',
        'Blue',
        'Grape',
        'Violet',
        'Lavender',
        'Magenta',
        'Salmon',
        'Charcoal',
        'Grey',
        'Taupe',]
}


import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";

import {Select} from "./Select";


export default {
    title: 'Components/Select',
    component: Select,
    argTypes: {},
    args: {arr: [
            {color: '#b7256e', title: 'Berry Red'},
            {color: '#d93f35', title: 'Red'},
            {color: '#fd9833', title: 'Orange'},
            {color: '#f8ce00', title: 'Yellow'},
            {color: '#aeb73b', title: 'Olive Green'},
            {color: '#7dca48', title: 'Lime Green'},
            {color: '#299338', title: 'Green'},
            {color: '#69cabb', title: 'Mint Green'},
            {color: '#158eac', title: 'Teal'},
            {color: '#14a9f3', title: 'Sky Blue'},
            {color: '#95c1e9', title: 'Light Blue'},
            {color: '#3f72fd', title: 'Blue'},
            {color: '#874cfd', title: 'Grape'},
            {color: '#ae38e9', title: 'Violet'},
            {color: '#e995e9', title: 'Lavender'},
            {color: '#de5093', title: 'Magenta'},
            {color: '#fd8c84', title: 'Salmon'},
            {color: '#7f7f7f', title: 'Charcoal'},
            {color: '#b7b7b7', title: 'Grey'},
            {color: '#caab92', title: 'Taupe'}
        ]}
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => <Select {...args}/>

export const Primary = Template.bind({})



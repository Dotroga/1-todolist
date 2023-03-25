import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {SuperButton} from "../SuperButton/SuperButton";
import {Select} from "./Select";
import {arr} from "../SideBar/AddNewList/AddListForm/AddListForm";

export default {
    title: 'Components/Select',
    component: Select,
    argTypes: {},
    args: {arr}
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => <Select {...args}/>

export const Primary = Template.bind({})




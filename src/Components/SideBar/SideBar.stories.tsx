import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {SideBar} from "./SideBar";
import {RouterAndReduxProviderDecorator} from "../../HOKForStories";

export default {
  title: 'Components/SideBar',
  component: SideBar,
  decorators: [RouterAndReduxProviderDecorator]
} as ComponentMeta<typeof SideBar>

const Template: ComponentStory<typeof SideBar> = (args) => <SideBar/>

export const Primary = Template.bind({})
Primary.args = {

}
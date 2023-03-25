import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {SideBar} from "./SideBar";
import {RouterAndReduxProviderDecorator} from "../../../.storybook/HOKForStories";

export default {
  title: 'Components/SideBar',
  component: SideBar,
  decorators: [RouterAndReduxProviderDecorator]
} as ComponentMeta<typeof SideBar>

const Template: ComponentStory<typeof SideBar> = () => <SideBar/>

export const Primary = Template.bind({})
Primary.args = {

}
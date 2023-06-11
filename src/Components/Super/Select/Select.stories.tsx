import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Select } from "./Select";
import {ArrType} from "redux/app.reducer";

export default {
  title: "Components/Select",
  component: Select,
  argTypes: {},
  args: {
    arr: [
      ["#b7256e", "Berry Red" ],
      ["#d93f35", "Red" ],
      ["#fd9833", "Orange" ],
      ["#f8ce00", "Yellow" ],
      ["#aeb73b", "Olive Green" ],
      ["#7dca48", "Lime Green" ],
      ["#299338", "Green" ],
      ["#69cabb", "Mint Green" ],
      ["#158eac", "Teal" ],
      ["#14a9f3", "Sky Blue" ],
      ["#95c1e9", "Light Blue" ],
      ["#3f72fd", "Blue" ],
      ["#874cfd", "Grape" ],
      ["#ae38e9", "Violet" ],
      ["#e995e9", "Lavender" ],
      ["#de5093", "Magenta" ],
      ["#fd8c84", "Salmon" ],
      ["#7f7f7f", "Charcoal" ],
      ["#b7b7b7", "Grey" ],
      ["#caab92", "Taupe" ],
    ] as ArrType[],
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});

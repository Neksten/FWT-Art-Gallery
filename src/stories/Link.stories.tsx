import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter as Router } from "react-router-dom";

import { MyLink } from "@ui/MyLink";

const meta: Meta<typeof MyLink> = {
  component: MyLink,
};

export default meta;
type Story = StoryObj<typeof MyLink>;

export const Light: Story = {
  render: () => (
    <Router>
      <MyLink to="">Normal link</MyLink>
    </Router>
  ),
};

export const Dark: Story = {
  render: () => (
    <Router>
      <MyLink to="" theme="dark">
        Normal link
      </MyLink>
    </Router>
  ),
};

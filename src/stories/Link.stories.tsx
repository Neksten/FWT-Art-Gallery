import type { Meta, StoryObj } from "@storybook/react";

import MyLink from "@ui/MyLink/MyLink";

const meta: Meta<typeof MyLink> = {
  component: MyLink,
};

export default meta;
type Story = StoryObj<typeof MyLink>;

export const Light: Story = {
  render: () => <MyLink>Normal link</MyLink>,
};

export const Dark: Story = {
  render: () => <MyLink theme="dark">Normal link</MyLink>,
};

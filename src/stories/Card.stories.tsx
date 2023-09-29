import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "@/ui/Card";

const meta: Meta<typeof Card> = {
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Light: Story = {
  render: () => (
    <Card title="Jean-Honore Fragonard" years="1732 - 1806" imgUrl="../1.jpg" />
  ),
};

export const Dark: Story = {
  render: () => (
    <Card
      title="Jean-Honore Fragonard"
      years="1732 - 1806"
      imgUrl="../1.jpg"
      theme="dark"
    />
  ),
};

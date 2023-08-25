import type { Meta, StoryObj } from "@storybook/react";

import Button from "../ui/Button/Button";
import { ReactComponent as Plus } from "../assets/plus.svg";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const FilledLight: Story = {
  render: () => (
    <Button variant="filled" theme="light">
      Button text
    </Button>
  ),
};

export const FilledDark: Story = {
  render: () => (
    <Button variant="filled" theme="dark">
      Button text
    </Button>
  ),
};

export const OutlinedLight: Story = {
  render: () => (
    <Button startIcon={<Plus />} variant="outlined" theme="light">
      Button text
    </Button>
  ),
};

export const OutlinedDark: Story = {
  render: () => (
    <Button startIcon={<Plus />} variant="outlined" theme="dark">
      Button text
    </Button>
  ),
};

export const FilledLightDisabled: Story = {
  render: () => (
    <Button disabled variant="filled" theme="light">
      Button text
    </Button>
  ),
};

export const FilledDarkDisabled: Story = {
  render: () => (
    <Button disabled variant="filled" theme="dark">
      Button text
    </Button>
  ),
};

export const OutlinedLightDisabled: Story = {
  render: () => (
    <Button disabled startIcon={<Plus />} variant="outlined" theme="light">
      Button text
    </Button>
  ),
};

export const OutlinedDarkDisabled: Story = {
  render: () => (
    <Button disabled startIcon={<Plus />} variant="outlined" theme="dark">
      Button text
    </Button>
  ),
};

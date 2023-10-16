import type { Meta, StoryObj } from "@storybook/react";

import { IconButton } from "@/ui/IconButton";
import { ReactComponent as Delete } from "@/assets/icons/delete.svg";
import { ReactComponent as Moon } from "@/assets/icons/moon.svg";
import { ReactComponent as Sun } from "@/assets/icons/sun.svg";
import { ReactComponent as ArrowUp } from "@/assets/icons/arrow-up.svg";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const DeleteLight: Story = {
  render: () => (
    <IconButton>
      <Delete />
    </IconButton>
  ),
};

export const DeleteDark: Story = {
  render: () => (
    <IconButton theme="dark">
      <Delete />
    </IconButton>
  ),
};

export const DeleteLightDisabled: Story = {
  render: () => (
    <IconButton disabled>
      <Delete />
    </IconButton>
  ),
};

export const DeleteDarkDisabled: Story = {
  render: () => (
    <IconButton theme="dark" disabled>
      <Delete />
    </IconButton>
  ),
};

export const ThemeLight: Story = {
  render: () => (
    <IconButton variant="theme">
      <Moon />
    </IconButton>
  ),
};

export const ThemeDark: Story = {
  render: () => (
    <IconButton theme="dark" variant="theme">
      <Sun />
    </IconButton>
  ),
};

export const ArrowLight: Story = {
  render: () => (
    <IconButton variant="arrow">
      <ArrowUp />
    </IconButton>
  ),
};

export const ArrowDark: Story = {
  render: () => (
    <IconButton theme="dark" variant="arrow">
      <ArrowUp />
    </IconButton>
  ),
};

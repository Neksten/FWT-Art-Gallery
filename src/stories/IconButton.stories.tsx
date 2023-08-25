import type { Meta, StoryObj } from "@storybook/react";

import IconButton from "../ui/IconButton/IconButton";
import { ReactComponent as Delete } from "../assets/delete.svg";
import { ReactComponent as Moon } from "../assets/moon.svg";
import { ReactComponent as Sun } from "../assets/sun.svg";
import { ReactComponent as ArrowUp } from "../assets/arrow-up.svg";

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
    <IconButton fullBorderRadius variant="theme">
      <Moon />
    </IconButton>
  ),
};

export const ThemeDark: Story = {
  render: () => (
    <IconButton theme="dark" fullBorderRadius variant="theme">
      <Sun />
    </IconButton>
  ),
};

export const ArrowLight: Story = {
  render: () => (
    <IconButton fullBorderRadius variant="arrow">
      <ArrowUp />
    </IconButton>
  ),
};

export const ArrowDark: Story = {
  render: () => (
    <IconButton theme="dark" fullBorderRadius variant="arrow">
      <ArrowUp />
    </IconButton>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";

import IconButton from "../ui/IconButton/IconButton";
import { Delete } from "../assets/Delete";
import { Moon } from "../assets/Moon";
import { Sun } from "../assets/Sun";

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
    <IconButton fullBorderRadius>
      <Moon />
    </IconButton>
  ),
};

export const ThemeDark: Story = {
  render: () => (
    <IconButton theme="dark" fullBorderRadius>
      <Sun />
    </IconButton>
  ),
};

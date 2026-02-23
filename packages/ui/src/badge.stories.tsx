import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Badge",
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Badge",
    variant: "outline",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive Badge",
    variant: "destructive",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 justify-center items-center">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  ),
};

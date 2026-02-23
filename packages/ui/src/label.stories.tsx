import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";
import { Input } from "./input";

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor="input">Label</Label>
      <Input id="input" placeholder="Type here..." />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor="input" className="text-red-500">
        Label (with error)
      </Label>
      <Input
        id="input"
        placeholder="Invalid input"
        className="border-red-500"
      />
      <p className="text-sm text-red-500">This field is required</p>
    </div>
  ),
};

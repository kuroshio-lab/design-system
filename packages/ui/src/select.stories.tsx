import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./select";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select an option..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="validated">Validated</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
    );
  },
};

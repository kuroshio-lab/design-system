import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "edit", "delete", "addingObs", "actions", "signOut", "glass", "glassDanger"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: { control: { type: "boolean" } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Click me",
    variant: "default",
    size: "default",
  },
};

export const Edit: Story = {
  args: {
    children: "Edit",
    variant: "edit",
  },
};

export const Delete: Story = {
  args: {
    children: "Delete",
    variant: "delete",
  },
};

export const AddingObs: Story = {
  args: {
    children: "Add Observation",
    variant: "addingObs",
  },
};

export const Actions: Story = {
  args: {
    children: "Actions",
    variant: "actions",
  },
};

export const SignOut: Story = {
  args: {
    children: "Sign Out",
    variant: "signOut",
  },
};

export const Glass: Story = {
  args: {
    children: "Glass Button",
    variant: "glass",
  },
  decorators: [
    (Story) => (
      <div style={{ background: "#003A63", padding: "2rem", borderRadius: "12px" }}>
        <Story />
      </div>
    ),
  ],
};

export const GlassDanger: Story = {
  args: {
    children: "Sign Out",
    variant: "glassDanger",
  },
  decorators: [
    (Story) => (
      <div style={{ background: "#003A63", padding: "2rem", borderRadius: "12px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Small: Story = {
  args: {
    children: "Small",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large",
    size: "lg",
  },
};

export const Icon: Story = {
  args: {
    children: "→",
    size: "icon",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="edit">Edit</Button>
          <Button variant="delete">Delete</Button>
          <Button variant="addingObs">Add Obs</Button>
          <Button variant="actions">Actions</Button>
          <Button variant="signOut">Sign Out</Button>
          <div style={{ background: "#003A63", padding: "4px 8px", borderRadius: "8px" }}>
            <Button variant="glass">Glass</Button>
          </div>
          <div style={{ background: "#003A63", padding: "4px 8px", borderRadius: "8px" }}>
            <Button variant="glassDanger">Glass Danger</Button>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Sizes</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">→</Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">States</h3>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled</Button>
          <Button variant="edit" disabled>
            Disabled (Edit)
          </Button>
        </div>
      </div>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardHeader, CardContent, CardFooter } from "./card";
import { Button } from "./button";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <h2 className="text-lg font-semibold">Card Title</h2>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          This is the card content. You can add any content here.
        </p>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Submit</Button>
      </CardFooter>
    </Card>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Card className="w-64 p-4">
      <h3 className="font-semibold">Simple Card</h3>
      <p className="text-sm text-gray-600 mt-2">
        Minimal card content without structure.
      </p>
    </Card>
  ),
};

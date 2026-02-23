import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Loader from "./Loader";
import { Button } from "@kuroshio-lab/ui";

const meta: Meta<typeof Loader> = {
  title: "Components/Loader",
  component: Loader,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    isLoading: true,
  },
};

export const Inactive: Story = {
  args: {
    isLoading: false,
  },
};

export const CustomLoader: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);
    return (
      <>
        <Button onClick={() => setIsLoading(!isLoading)}>Toggle Loader</Button>
        <Loader
          isLoading={isLoading}
          LoaderComponent={() => (
            <div className="text-white text-center">
              <div className="text-6xl mb-4">🌊</div>
              <p className="text-xl">Loading marine data...</p>
            </div>
          )}
        />
      </>
    );
  },
};

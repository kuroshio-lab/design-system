import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SpeciesSearch from "./SpeciesSearch";

const meta: Meta<typeof SpeciesSearch> = {
  title: "Components/SpeciesSearch",
  component: SpeciesSearch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockSpeciesData = [
  { speciesName: "Acropora tenuis", commonName: "Fragile Branching Coral" },
  { speciesName: "Acropora millepora", commonName: "Branching Coral" },
  { speciesName: "Porites cylindrica", commonName: "Finger Coral" },
  { speciesName: "Montipora digitata", commonName: "Thin Finger Coral" },
  { speciesName: "Goniastrea retiformis", commonName: "Reticulated Coral" },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<{
      speciesName: string;
      commonName: string;
    } | null>(null);
    const handleSearch = async (query: string) => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockSpeciesData.filter(
        (species) =>
          species.speciesName.toLowerCase().includes(query.toLowerCase()) ||
          species.commonName.toLowerCase().includes(query.toLowerCase()),
      );
    };
    return (
      <div className="w-full max-w-sm">
        <SpeciesSearch
          value={selected}
          onChange={setSelected}
          onSearch={handleSearch}
          placeholder="Search species..."
        />
        {selected && (
          <p className="mt-4 text-sm text-gray-600">
            Selected: {selected.commonName} ({selected.speciesName})
          </p>
        )}
      </div>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [selected, setSelected] = useState<{
      speciesName: string;
      commonName: string;
    } | null>(null);
    return (
      <div className="w-full max-w-sm">
        <SpeciesSearch
          value={selected}
          onChange={setSelected}
          placeholder="Search species..."
          error={true}
        />
        <p className="mt-2 text-sm text-red-500">Species is required</p>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled search",
  },
};

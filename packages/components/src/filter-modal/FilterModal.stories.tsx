import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import FilterModal, { type ActiveFilters } from "./FilterModal";
import { Button } from "@kuroshio-lab/ui";

const meta: Meta<typeof FilterModal> = {
  title: "Components/FilterModal",
  component: FilterModal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// -- Mock data --

const MOCK_SPECIES = [
  { speciesName: "Rhincodon typus", commonName: "Whale Shark" },
  { speciesName: "Chelonia mydas", commonName: "Green Sea Turtle" },
  { speciesName: "Acropora tenuis", commonName: "Fragile Branching Coral" },
  { speciesName: "Tridacna gigas", commonName: "Giant Clam" },
  { speciesName: "Manta birostris", commonName: "Oceanic Manta Ray" },
];

const mockSearch = async (query: string) => {
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_SPECIES.filter(
    (s) =>
      s.speciesName.toLowerCase().includes(query.toLowerCase()) ||
      s.commonName.toLowerCase().includes(query.toLowerCase()),
  );
};

const emptyFilters = {
  speciesName: null,
  commonName: null,
  minDate: null,
  maxDate: null,
};

// -- Stories --

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<ActiveFilters>(emptyFilters);

    return (
      <div className="p-8 flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">
          No active filters. Type 2+ characters in the species field to see
          mock results.
        </p>
        <Button variant="glass" onClick={() => setIsOpen(true)}>
          Open Filter Modal
        </Button>
        {filters.speciesName && (
          <p className="text-xs text-muted-foreground">
            Active filter: <strong>{filters.speciesName}</strong>
          </p>
        )}
        <FilterModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onApplyFilters={(f) => {
            setFilters(f);
            console.log("Filters applied:", f);
          }}
          initialFilters={filters}
          onSearch={mockSearch}
        />
      </div>
    );
  },
};

export const WithActiveFilters: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<ActiveFilters>({
      speciesName: "Rhincodon typus",
      commonName: "Whale Shark",
      minDate: "2024-01-01",
      maxDate: "2024-12-31",
    });

    return (
      <div className="p-8 flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Modal opens pre-filled with existing active filters.
        </p>
        <Button variant="glass" onClick={() => setIsOpen(true)}>
          Open Filter Modal
        </Button>
        <FilterModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onApplyFilters={(f) => {
            setFilters(f);
            console.log("Filters applied:", f);
          }}
          initialFilters={filters}
          onSearch={mockSearch}
        />
      </div>
    );
  },
};

export const DateRangeOnly: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<ActiveFilters>({
      speciesName: null,
      commonName: null,
      minDate: "2024-06-01",
      maxDate: "2024-08-31",
    });

    return (
      <div className="p-8 flex flex-col items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Pre-filled with date range only — species field is empty.
        </p>
        <Button variant="glass" onClick={() => setIsOpen(true)}>
          Open Filter Modal
        </Button>
        <FilterModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onApplyFilters={(f) => {
            setFilters(f);
            console.log("Filters applied:", f);
          }}
          initialFilters={filters}
          onSearch={mockSearch}
        />
      </div>
    );
  },
};

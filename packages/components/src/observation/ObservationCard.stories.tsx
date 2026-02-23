import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ObservationCard, Observation } from "./ObservationCard";

const meta: Meta<typeof ObservationCard> = {
  title: "Components/ObservationCard",
  component: ObservationCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockObservation: Observation = {
  id: 1,
  speciesName: "Acropora tenuis",
  commonName: "Fragile Branching Coral",
  locationName: "Kerama Islands",
  location: {
    type: "Point",
    coordinates: [127.2456, 26.1678],
  },
  observationDatetime: "2024-02-15T10:30:00Z",
  depthMin: 5,
  depthMax: 8,
  bathymetry: 12,
  temperature: 24.5,
  visibility: 15,
  notes: "Healthy colony with good polyp extension",
  sex: "unknown",
  source: "user",
  validated: "validated",
  username: "marinebiologist",
};

const pendingObservation: Observation = {
  ...mockObservation,
  id: 2,
  validated: "pending",
};

const rejectedObservation: Observation = {
  ...mockObservation,
  id: 3,
  validated: "rejected",
};

const machineObservation: Observation = {
  ...mockObservation,
  id: 4,
  source: "machine",
  machineObservation: "0.95",
};

const withImageObservation: Observation = {
  ...mockObservation,
  id: 5,
  image:
    "https://images.unsplash.com/photo-1583212192562-40535ce68794?w=400&h=300&fit=crop",
};

const minimalObservation: Observation = {
  id: 6,
  speciesName: "Unknown Coral",
  locationName: "Unknown Location",
  location: {
    type: "Point",
    coordinates: [127.0, 26.0],
  },
  observationDatetime: "2024-02-15T10:30:00Z",
  source: "user",
};

export const Validated: Story = {
  render: () => {
    const [selected, setSelected] = useState<Observation | null>(null);
    return (
      <ObservationCard
        observation={mockObservation}
        onSelectObservation={setSelected}
        onDeleteObservation={() => {}}
        onEditObservationClick={() => {}}
      />
    );
  },
};

export const Pending: Story = {
  render: () => (
    <ObservationCard
      observation={pendingObservation}
      onSelectObservation={() => {}}
      onDeleteObservation={() => {}}
      onEditObservationClick={() => {}}
    />
  ),
};

export const Rejected: Story = {
  render: () => (
    <ObservationCard
      observation={rejectedObservation}
      onSelectObservation={() => {}}
      onDeleteObservation={() => {}}
      onEditObservationClick={() => {}}
    />
  ),
};

export const MachineSourced: Story = {
  render: () => (
    <ObservationCard
      observation={machineObservation}
      onSelectObservation={() => {}}
      onDeleteObservation={() => {}}
      onEditObservationClick={() => {}}
    />
  ),
};

export const WithImage: Story = {
  render: () => (
    <ObservationCard
      observation={withImageObservation}
      onSelectObservation={() => {}}
      onDeleteObservation={() => {}}
      onEditObservationClick={() => {}}
    />
  ),
};

export const MinimalData: Story = {
  render: () => (
    <ObservationCard
      observation={minimalObservation}
      onSelectObservation={() => {}}
      onDeleteObservation={() => {}}
      onEditObservationClick={() => {}}
    />
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { MiniObservationCard } from "./MiniObservationCard";
import type { Observation } from "./ObservationCard";

const meta: Meta<typeof MiniObservationCard> = {
  title: "Components/MiniObservationCard",
  component: MiniObservationCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const validatedObservation: Observation = {
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
  source: "user",
  validated: "validated",
};

const pendingObservation: Observation = {
  ...validatedObservation,
  id: 2,
  validated: "pending",
};

const withImageObservation: Observation = {
  ...validatedObservation,
  id: 3,
  image:
    "https://images.unsplash.com/photo-1583212192562-40535ce68794?w=400&h=300&fit=crop",
};

export const UserValidated: Story = {
  args: {
    observation: validatedObservation,
  },
};

export const UserPending: Story = {
  args: {
    observation: pendingObservation,
  },
};

export const WithImage: Story = {
  args: {
    observation: withImageObservation,
  },
};

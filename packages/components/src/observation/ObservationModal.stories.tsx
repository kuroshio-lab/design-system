import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ObservationModal from "./ObservationModal";
import type { Observation } from "./ObservationCard";
import { Button } from "@kuroshio-lab/ui";

const meta: Meta<typeof ObservationModal> = {
  title: "Components/ObservationModal",
  component: ObservationModal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// -- Mock data --

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
  notes: "Healthy colony with good polyp extension. Found at the reef edge.",
  sex: "unknown",
  source: "user",
  validated: "validated",
  username: "marinebiologist",
};

// -- Mock submit handlers --

const mockSubmit = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Submitted:", data);
};

const slowMockSubmit = async (data: any) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log("Submitted:", data);
};

const failingMockSubmit = async (_data: any) => {
  await new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Server error")), 1000),
  );
};

// -- Mock SpeciesSearchComponent --

const MOCK_SPECIES = [
  { speciesName: "Acropora tenuis", commonName: "Fragile Branching Coral" },
  { speciesName: "Acropora digitifera", commonName: "Finger Coral" },
  { speciesName: "Porites lobata", commonName: "Lobe Coral" },
  { speciesName: "Tridacna gigas", commonName: "Giant Clam" },
  { speciesName: "Chelonia mydas", commonName: "Green Sea Turtle" },
];

function MockSpeciesSearch({
  value,
  onChange,
  onBlur,
  disabled,
  placeholder,
  error,
}: any) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    Array<{ speciesName: string; commonName: string }>
  >([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (q: string) => {
    setQuery(q);
    if (q.length > 1) {
      setResults(
        MOCK_SPECIES.filter(
          (s) =>
            s.speciesName.toLowerCase().includes(q.toLowerCase()) ||
            s.commonName.toLowerCase().includes(q.toLowerCase()),
        ),
      );
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  return (
    <div className="relative">
      <input
        className={`w-full border rounded-md px-3 py-2 text-sm bg-background ${
          error ? "border-red-500" : "border-input"
        }`}
        placeholder={placeholder || "Search species..."}
        value={value ? value.speciesName : query}
        onChange={(e) => handleSearch(e.target.value)}
        onBlur={() => {
          onBlur?.();
          setShowResults(false);
        }}
        disabled={disabled}
      />
      {showResults && results.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg">
          {results.map((s) => (
            <li
              key={s.speciesName}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onMouseDown={() => {
                onChange(s);
                setShowResults(false);
                setQuery("");
              }}
            >
              <span className="font-medium">{s.speciesName}</span>
              <span className="text-gray-500 ml-2">{s.commonName}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// -- Stories --

export const AddMode: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="p-8 flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">
          No SpeciesSearchComponent provided — the species field will be
          disabled.
        </p>
        <Button variant="addingObs" onClick={() => setIsOpen(true)}>
          + Add Observation
        </Button>
        <ObservationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onObservationUpserted={() => console.log("Observation created!")}
          mode="add"
          onSubmit={mockSubmit}
        />
      </div>
    );
  },
};

export const AddModeWithSpeciesSearch: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="p-8 flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Type at least 2 characters in the species field to see mock results.
        </p>
        <Button variant="addingObs" onClick={() => setIsOpen(true)}>
          + Add Observation
        </Button>
        <ObservationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onObservationUpserted={() => console.log("Observation created!")}
          mode="add"
          onSubmit={mockSubmit}
          SpeciesSearchComponent={MockSpeciesSearch}
        />
      </div>
    );
  },
};

export const EditMode: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="p-8 flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Form is pre-filled with the existing observation data.
        </p>
        <Button variant="edit" onClick={() => setIsOpen(true)}>
          Edit Observation
        </Button>
        <ObservationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onObservationUpserted={() => console.log("Observation updated!")}
          mode="edit"
          observation={mockObservation}
          onSubmit={mockSubmit}
          SpeciesSearchComponent={MockSpeciesSearch}
        />
      </div>
    );
  },
};

export const LoadingState: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="p-8 flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Submit the form to see the loading state (3s simulated delay).
        </p>
        <Button variant="addingObs" onClick={() => setIsOpen(true)}>
          + Add Observation (Slow Submit)
        </Button>
        <ObservationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onObservationUpserted={() => console.log("Done!")}
          mode="add"
          onSubmit={slowMockSubmit}
          SpeciesSearchComponent={MockSpeciesSearch}
        />
      </div>
    );
  },
};

export const ErrorState: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="p-8 flex flex-col items-center gap-2">
        <p className="text-sm text-muted-foreground">
          Submit the form to see the error state (simulated server failure).
        </p>
        <Button variant="addingObs" onClick={() => setIsOpen(true)}>
          + Add Observation (Failing Submit)
        </Button>
        <ObservationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onObservationUpserted={() => {}}
          mode="add"
          onSubmit={failingMockSubmit}
          SpeciesSearchComponent={MockSpeciesSearch}
        />
      </div>
    );
  },
};

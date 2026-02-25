// packages/components/src/observation/ObservationModal.tsx
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { z } from "zod";
import {
  useForm,
  FieldPath,
  ControllerRenderProps,
  Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField as ShadcnFormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@kuroshio-lab/ui";
import type { Observation } from "./ObservationCard";

// These will be provided by the consuming app
export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  optional?: boolean;
  options?: Array<{ value: string; label: string }>;
}

interface ObservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onObservationUpserted: () => void;
  mode: "add" | "edit";
  observation?: Observation | null;
  onSpeciesSearch?: (
    query: string,
  ) => Promise<Array<{ speciesName: string; commonName: string }>>;
  onSubmit?: (data: any) => Promise<void>;
  SpeciesSearchComponent?: React.ComponentType<any>;
  useUserHook?: () => any;
}

const observationFormSchema = z.object({
  speciesName: z.string().min(1, "Species is required"),
  commonName: z.string().nullable().optional(),
  locationName: z.string().min(1, "Location name is required"),
  latitude: z.preprocess((val) => Number(val), z.number().min(-90).max(90)),
  longitude: z.preprocess((val) => Number(val), z.number().min(-180).max(180)),
  observationDatetime: z
    .string()
    .min(1, "Observation date and time is required"),
  depthMin: z
    .preprocess(
      (val) => (val === "" ? null : Number(val)),
      z.number().nullable(),
    )
    .optional(),
  depthMax: z
    .preprocess(
      (val) => (val === "" ? null : Number(val)),
      z.number().nullable(),
    )
    .optional(),
  bathymetry: z
    .preprocess(
      (val) => (val === "" ? null : Number(val)),
      z.number().nullable(),
    )
    .optional(),
  temperature: z
    .preprocess(
      (val) => (val === "" ? null : Number(val)),
      z.number().nullable(),
    )
    .optional(),
  visibility: z
    .preprocess(
      (val) => (val === "" ? null : Number(val)),
      z.number().nullable(),
    )
    .optional(),
  notes: z.string().nullable().optional(),
  sex: z.enum(["male", "female", "unknown"]).nullable().optional(),
});

type ObservationFormData = z.infer<typeof observationFormSchema>;

const observationFormFields: FormField[] = [
  {
    name: "locationName",
    label: "Location Name",
    type: "text",
    optional: true,
  },
  {
    name: "latitude",
    label: "Latitude",
    type: "number",
    placeholder: "e.g., 34.05",
  },
  {
    name: "longitude",
    label: "Longitude",
    type: "number",
    placeholder: "e.g., -118.25",
  },
  {
    name: "observationDatetime",
    label: "Observation Date/Time",
    type: "datetime-local",
  },
  {
    name: "depthMin",
    label: "Minimum Depth (m)",
    type: "number",
    optional: true,
  },
  {
    name: "depthMax",
    label: "Maximum Depth (m)",
    type: "number",
    optional: true,
  },
  {
    name: "bathymetry",
    label: "Bathymetry (m)",
    type: "number",
    optional: true,
  },
  {
    name: "temperature",
    label: "Temperature (°C)",
    type: "number",
    optional: true,
  },
  {
    name: "visibility",
    label: "Visibility (m)",
    type: "number",
    optional: true,
  },
  { name: "notes", label: "Notes", type: "textarea", optional: true },
  {
    name: "sex",
    label: "Sex",
    type: "select",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "unknown", label: "Unknown" },
    ],
    optional: true,
  },
];

function renderFieldControl(
  field: FormField,
  formField: ControllerRenderProps<
    ObservationFormData,
    FieldPath<ObservationFormData>
  >,
  loading: boolean,
) {
  switch (field.type) {
    case "select":
      return (
        <Select
          onValueChange={formField.onChange}
          defaultValue={
            formField.value !== null && formField.value !== undefined
              ? String(formField.value)
              : undefined
          }
          disabled={loading}
        >
          <SelectTrigger className="border-white/10 bg-white/5 text-white">
            <SelectValue
              placeholder={field.placeholder || `Select a ${field.label}`}
            />
          </SelectTrigger>
          <SelectContent
            position="popper"
            className="z-[9999] border-white/10 !bg-brand-primary-900/95"
          >
            {field.options?.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-white focus:bg-white/10"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "textarea":
      return (
        <Textarea
          placeholder={field.placeholder}
          value={
            formField.value !== null && formField.value !== undefined
              ? String(formField.value)
              : undefined
          }
          onChange={formField.onChange}
          onBlur={formField.onBlur}
          disabled={loading}
          className="border-white/10 bg-white/5 text-white placeholder:text-brand-primary-100/30"
        />
      );
    default:
      return (
        <Input
          type={field.type}
          placeholder={field.placeholder}
          value={
            formField.value !== null && formField.value !== undefined
              ? String(formField.value)
              : undefined
          }
          onChange={formField.onChange}
          onBlur={formField.onBlur}
          disabled={loading}
          className="border-white/10 bg-white/5 text-white placeholder:text-brand-primary-100/30"
        />
      );
  }
}

export default function ObservationModal({
  isOpen,
  onClose,
  onObservationUpserted,
  mode,
  observation,
  onSpeciesSearch,
  onSubmit: propOnSubmit,
  SpeciesSearchComponent,
  useUserHook,
}: ObservationModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<{
    speciesName: string;
    commonName: string;
  } | null>(null);

  const defaultFormValues: ObservationFormData = {
    speciesName: "",
    commonName: undefined,
    locationName: "",
    latitude: 0,
    longitude: 0,
    observationDatetime: new Date().toISOString().substring(0, 16),
    depthMin: undefined,
    depthMax: undefined,
    bathymetry: undefined,
    temperature: undefined,
    visibility: undefined,
    notes: undefined,
    sex: "unknown" as const,
  };

  const form = useForm<ObservationFormData>({
    resolver: zodResolver(
      observationFormSchema,
    ) as Resolver<ObservationFormData>,
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (mode === "edit" && observation) {
      const species = {
        speciesName: observation.speciesName,
        commonName: observation.commonName || "",
      };
      setSelectedSpecies(species);
      const values: ObservationFormData = {
        speciesName: observation.speciesName,
        commonName: observation.commonName ?? undefined,
        locationName: observation.locationName,
        latitude: observation.location.coordinates[1],
        longitude: observation.location.coordinates[0],
        observationDatetime: observation.observationDatetime
          ? new Date(observation.observationDatetime)
              .toISOString()
              .substring(0, 16)
          : "",
        depthMin: observation.depthMin ?? undefined,
        depthMax: observation.depthMax ?? undefined,
        bathymetry: observation.bathymetry ?? undefined,
        temperature: observation.temperature ?? undefined,
        visibility: observation.visibility ?? undefined,
        notes: observation.notes ?? undefined,
        sex: (observation.sex ?? "unknown") as
          | "male"
          | "female"
          | "unknown"
          | undefined,
      };
      form.reset(values);
    } else {
      setSelectedSpecies(null);
      form.reset(defaultFormValues);
    }
  }, [mode, observation, isOpen, form]);

  const onSubmit = async (data: z.infer<typeof observationFormSchema>) => {
    if (propOnSubmit) {
      setLoading(true);
      try {
        await propOnSubmit(data);
        onObservationUpserted();
        onClose();
      } catch (err) {
        setError(`Failed to ${mode} observation. Please try again.`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInvalid = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        const firstInvalid = scrollRef.current.querySelector(
          "[aria-invalid='true']",
        );
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          scrollRef.current.scrollTop = 0;
        }
      }
    }, 0);
  };

  const dialogTitle =
    mode === "add" ? "Add New Observation" : "Edit Observation";
  const dialogDescription =
    mode === "add"
      ? "Fill in the details for your new marine species observation."
      : "Make changes to your observation here. Click save when you're done.";
  const submitButtonText =
    mode === "add" ? "Create Observation" : "Save Changes";

  if (!isOpen || typeof document === "undefined") return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 mx-4 w-full max-w-md">
        <div className="flex max-h-[90vh] flex-col overflow-hidden rounded-2xl border border-white/10 bg-brand-primary-900/95 shadow-2xl">
          {/* Accent bar */}
          <div className="h-0.5 w-full shrink-0 bg-gradient-to-r from-brand-primary-500 via-brand-primary-200 to-brand-primary-500" />

          {/* Header */}
          <div className="shrink-0 p-6 pb-4">
            <h2 className="text-lg font-bold text-white">{dialogTitle}</h2>
            <p className="mt-1 text-xs text-brand-primary-100/50">
              {dialogDescription}
            </p>
          </div>

          {/* Scrollable content */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto">
            <div className="px-6 pb-6">
              {(mode === "add" || (mode === "edit" && observation)) && (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit, handleInvalid)}
                    className="space-y-4"
                  >
                    <ShadcnFormField
                      control={form.control}
                      name="speciesName"
                      render={({ field: formField }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium text-brand-primary-300/60">
                            Species *
                          </FormLabel>
                          <FormControl>
                            {SpeciesSearchComponent ? (
                              <SpeciesSearchComponent
                                value={selectedSpecies}
                                onChange={(species: any) => {
                                  setSelectedSpecies(species);
                                  if (species) {
                                    form.setValue(
                                      "speciesName",
                                      species.speciesName,
                                    );
                                    form.setValue(
                                      "commonName",
                                      species.commonName || null,
                                    );
                                  } else {
                                    form.setValue("speciesName", "");
                                    form.setValue("commonName", null);
                                  }
                                }}
                                onBlur={formField.onBlur}
                                disabled={loading}
                                placeholder="Search for species by scientific or common name..."
                                error={!!form.formState.errors.speciesName}
                              />
                            ) : (
                              <Input
                                placeholder="Species search component not provided"
                                disabled
                                className="border-white/10 bg-white/5 text-white"
                              />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {observationFormFields.map((field: FormField) => (
                      <ShadcnFormField
                        key={field.name}
                        control={form.control}
                        name={field.name as FieldPath<ObservationFormData>}
                        render={({ field: formField }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-medium text-brand-primary-300/60">
                              {field.label}
                              {!field.optional && " *"}
                            </FormLabel>
                            <FormControl>
                              {renderFieldControl(field, formField, loading)}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                    {error && (
                      <p className="text-center text-sm text-red-400">
                        {error}
                      </p>
                    )}
                    <div className="flex gap-3 pt-2">
                      <Button
                        variant="glassDanger"
                        className="h-9 flex-1"
                        type="button"
                        onClick={onClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="glass"
                        className="h-9 flex-1 ring-1 ring-brand-primary-400/30"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Processing..." : submitButtonText}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

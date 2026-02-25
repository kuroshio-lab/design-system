// packages/components/src/filter-modal/FilterModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button } from "@kuroshio-lab/ui";
import { SpeciesSearch, type SpeciesSearchResult } from "../species";

export interface ActiveFilters {
  speciesName: string | null;
  commonName: string | null;
  minDate: string | null;
  maxDate: string | null;
}

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: ActiveFilters) => void;
  initialFilters: ActiveFilters;
  /** App-provided search function wired to the species API. */
  onSearch: (query: string) => Promise<SpeciesSearchResult[]>;
}

export default function FilterModal({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters,
  onSearch,
}: FilterModalProps) {
  const [selectedSpecies, setSelectedSpecies] =
    useState<SpeciesSearchResult | null>(
      initialFilters.speciesName
        ? {
            speciesName: initialFilters.speciesName,
            commonName: initialFilters.commonName || "",
          }
        : null,
    );
  const [minDate, setMinDate] = useState(initialFilters.minDate ?? "");
  const [maxDate, setMaxDate] = useState(initialFilters.maxDate ?? "");

  // Sync local state when the modal opens or external filters change
  useEffect(() => {
    setSelectedSpecies(
      initialFilters.speciesName
        ? {
            speciesName: initialFilters.speciesName,
            commonName: initialFilters.commonName || "",
          }
        : null,
    );
    setMinDate(initialFilters.minDate ?? "");
    setMaxDate(initialFilters.maxDate ?? "");
  }, [isOpen, initialFilters]);

  if (!isOpen || typeof document === "undefined") return null;

  const handleApply = () => {
    onApplyFilters({
      speciesName: selectedSpecies?.speciesName ?? null,
      commonName: selectedSpecies?.commonName ?? null,
      minDate: minDate || null,
      maxDate: maxDate || null,
    });
    onClose();
  };

  const handleClear = () => {
    setSelectedSpecies(null);
    setMinDate("");
    setMaxDate("");
    onApplyFilters({
      speciesName: null,
      commonName: null,
      minDate: null,
      maxDate: null,
    });
    onClose();
  };

  const hasValues =
    selectedSpecies !== null || minDate !== "" || maxDate !== "";

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[2000] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 mx-4 w-full max-w-sm">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-brand-primary-900/95 shadow-2xl">
          {/* Accent bar */}
          <div className="h-0.5 w-full bg-gradient-to-r from-brand-primary-500 via-brand-primary-200 to-brand-primary-500" />

          <div className="p-6">
            {/* Icon */}
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-brand-primary-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="mb-1 text-center text-lg font-bold text-white">
              Filter Observations
            </h2>
            <p className="mb-5 text-center text-xs text-brand-primary-100/50">
              Apply filters to refine the observations on the map.
            </p>

            {/* Fields */}
            <div className="space-y-3">
              {/* Species — wrapped for dark input override */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-brand-primary-300/60">
                  Species
                </label>
                <SpeciesSearch
                  value={selectedSpecies}
                  onChange={setSelectedSpecies}
                  onSearch={onSearch}
                  placeholder="Search for species..."
                />
              </div>

              {/* Date range */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-brand-primary-300/60">
                    From date
                  </label>
                  <input
                    type="date"
                    value={minDate}
                    onChange={(e) => setMinDate(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary-400/30 [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-brand-primary-300/60">
                    Until date
                  </label>
                  <input
                    type="date"
                    value={maxDate}
                    onChange={(e) => setMaxDate(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-primary-400/30 [color-scheme:dark]"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex gap-3">
              <Button
                variant="glassDanger"
                className="h-9 flex-1"
                onClick={onClose}
              >
                Cancel
              </Button>
              {hasValues && (
                <Button
                  variant="glassDanger"
                  className="h-9 px-3 text-semantic-warning-400/80 ring-1 ring-semantic-warning-500/30"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              )}
              <Button
                variant="glass"
                className="h-9 flex-1 ring-1 ring-brand-primary-400/30"
                onClick={handleApply}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

// packages/components/src/export-confirm-modal/ExportConfirmModal.tsx
"use client";

import React from "react";
import ReactDOM from "react-dom";
import { Button } from "@kuroshio-lab/ui";

interface ActiveFilters {
  speciesName: string | null;
  commonName: string | null;
  minDate: string | null;
  maxDate: string | null;
}

export interface ExportConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  /** Total number of personal observations for this user (all filters aside). */
  observationCount?: number;
  /** Currently active filters — shown as badges and affects the download scope. */
  filters: ActiveFilters;
}

function FilterBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5">
      <span className="shrink-0 text-xs text-brand-primary-300/60">
        {label}
      </span>
      <span className="truncate text-xs font-medium text-brand-primary-100">
        {value}
      </span>
    </div>
  );
}

export default function ExportConfirmModal({
  isOpen,
  onConfirm,
  onClose,
  observationCount,
  filters,
}: ExportConfirmModalProps) {
  if (!isOpen || typeof document === "undefined") return null;

  const activeFilterEntries = [
    filters.speciesName
      ? { label: "Species", value: filters.speciesName }
      : null,
    filters.commonName
      ? { label: "Common name", value: filters.commonName }
      : null,
    filters.minDate ? { label: "From", value: filters.minDate } : null,
    filters.maxDate ? { label: "Until", value: filters.maxDate } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const hasFilters = activeFilterEntries.length > 0;
  const countKnown = observationCount !== undefined;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

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
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="mb-1 text-center text-lg font-bold text-white">
              Export Observations
            </h2>

            {/* Scope disclaimer */}
            <p className="mb-5 text-center text-xs text-brand-primary-100/50">
              Only your personally logged observations —{" "}
              <span className="text-brand-primary-300/70">not</span> curated
              OBIS/GBIF data visible on the map
            </p>

            {/* Count card */}
            <div className="mb-4 flex justify-center">
              <div className="rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-center">
                {countKnown ? (
                  <>
                    <p className="text-4xl font-bold tabular-nums text-white">
                      {observationCount}
                    </p>
                    <p className="mt-1 text-xs text-brand-primary-100/50">
                      personal observation{observationCount !== 1 ? "s" : ""}{" "}
                      {hasFilters ? "total" : "will be exported"}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mx-auto mb-1 h-8 w-16 animate-pulse rounded bg-white/10" />
                    <p className="text-xs text-brand-primary-100/50">
                      loading…
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Filters section */}
            {hasFilters && (
              <div className="mb-4 rounded-xl border border-semantic-warning-500/20 bg-semantic-warning-500/5 p-3">
                <div className="mb-2 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-semantic-warning-500" />
                  <p className="text-xs font-medium uppercase tracking-wider text-semantic-warning-400/80">
                    Filters applied — export will be narrowed
                  </p>
                </div>
                <div className="space-y-1.5">
                  {activeFilterEntries.map((f) => (
                    <FilterBadge
                      key={f.label}
                      label={f.label}
                      value={f.value}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* File format note */}
            <div className="mb-5 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 shrink-0 text-brand-primary-300/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-xs text-brand-primary-100/40">
                GeoJSON · marine_observations_export.json
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="glassDanger" className="h-9 flex-1" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="glass"
                className="h-9 flex-1 ring-1 ring-brand-primary-400/30"
                onClick={handleConfirm}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

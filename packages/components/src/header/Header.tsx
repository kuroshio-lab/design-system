// packages/components/src/header/Header.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@kuroshio-lab/ui";
import { cn } from "@kuroshio-lab/styles";

interface HeaderProps {
  onApplyFilters: (filters: {
    speciesName: string | null;
    commonName: string | null;
    minDate: string | null;
    maxDate: string | null;
  }) => void;
  initialFilters: {
    speciesName: string | null;
    commonName: string | null;
    minDate: string | null;
    maxDate: string | null;
  };
  user?: any;
  loading?: boolean;
  onLogout?: () => Promise<void>;
  FilterModalComponent?: React.ComponentType<any>;
  UserRoleBadgeComponent?: React.ComponentType<any>;
}

export default function Header({
  onApplyFilters,
  initialFilters,
  user,
  loading = false,
  onLogout,
  FilterModalComponent,
  UserRoleBadgeComponent,
}: HeaderProps) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-28 w-full bg-brand-primary-900" />;
  }

  const handleApplyFiltersAndCloseModal = (filters: {
    speciesName: string | null;
    commonName: string | null;
    minDate: string | null;
    maxDate: string | null;
  }) => {
    onApplyFilters(filters);
    setIsFilterModalOpen(false);
  };

  const hasActiveFilters =
    initialFilters.speciesName !== null ||
    initialFilters.commonName !== null ||
    initialFilters.minDate !== null ||
    initialFilters.maxDate !== null;

  const handleClearFilters = () => {
    onApplyFilters({
      speciesName: null,
      commonName: null,
      minDate: null,
      maxDate: null,
    });
  };

  return (
    <header className="w-full relative z-30 shrink-0 overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-brand-primary-900 kerama-depth -z-0" />

      <nav className="relative z-10 border-b border-white/10 backdrop-blur-md">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-28 items-center justify-between gap-8">
            {/* LEFT SECTION: Branding & Identity */}
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-brand-primary-300 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm shadow-2xl">
                  <Image
                    src="/kuroshio-logo.svg"
                    alt="Kuroshio-Lab Logo"
                    width={32}
                    height={32}
                    className="h-8 w-8 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-bold tracking-tight leading-none">
                  <span className="bg-gradient-to-r from-white via-brand-primary-100 to-brand-primary-300 bg-clip-text text-transparent">
                    Kuroshio-Lab
                  </span>
                  <span className="ml-2 text-lg font-light text-brand-primary-100/60">
                    Marine Species Observation Tracker
                  </span>
                </h1>

                <p className="text-xs font-medium text-brand-primary-300/80 mt-1.5 max-w-md line-clamp-1">
                  Empower divers, biologists, and hobbyists...
                </p>

                {/* User Status */}
                {user && !loading && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-2 bg-black/20 px-2 py-0.5 rounded-full border border-white/5">
                      <div
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          "bg-semantic-success-500 animate-pulse shadow-[0_0_5px_theme(colors.semantic.success-500)]",
                        )}
                      />
                      <span className="text-[9px] uppercase tracking-wider text-brand-primary-100 font-bold">
                        Operator: {user.username}
                      </span>
                    </div>
                  </div>
                )}

                {loading && (
                  <div className="flex items-center gap-2 mt-2 bg-black/20 w-fit px-2 py-0.5 rounded-full border border-white/5">
                    <div className="h-1.5 w-1.5 rounded-full bg-neutral-gray-500 animate-pulse" />
                    <span className="text-[9px] uppercase tracking-tighter text-white/40">
                      Syncing System...
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SECTION: Unified glass command bar */}
            <div className="flex items-center p-1 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xl shadow-inner">
              {/* Role badge — inline, inherits container glass */}
              {user && !loading && UserRoleBadgeComponent && (
                <>
                  <UserRoleBadgeComponent user={user} variant="inline" />
                  <div className="w-px h-5 bg-white/10 mx-0.5" />
                </>
              )}

              {/* Filters */}
              <div className="relative">
                {hasActiveFilters && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearFilters();
                    }}
                    className="absolute -top-1.5 -left-1.5 z-10 h-4 w-4 rounded-full bg-semantic-warning-500 text-white text-[10px] flex items-center justify-center hover:bg-semantic-error-500 transition-colors shadow-sm font-bold leading-none"
                    title="Clear filters"
                  >
                    ×
                  </button>
                )}
                <Button
                  onClick={() => setIsFilterModalOpen(true)}
                  variant="glass"
                  className={cn(
                    "gap-2 px-3 h-9",
                    hasActiveFilters && "ring-1 ring-semantic-warning-500/60",
                  )}
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
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  <span className="font-medium">Filters</span>
                  {hasActiveFilters && (
                    <span className="h-1.5 w-1.5 rounded-full bg-semantic-warning-500 animate-pulse" />
                  )}
                </Button>
              </div>

              <div className="w-px h-5 bg-white/10 mx-0.5" />

              {/* Export */}
              <Button
                // eslint-disable-next-line no-alert
                onClick={() => alert("Export functionality ready soon.")}
                variant="glass"
                className="gap-2 px-3 h-9"
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
                <span className="font-medium">Export</span>
              </Button>

              {/* Sign Out — inside the bar, danger tint on hover */}
              {user && onLogout && (
                <>
                  <div className="w-px h-5 bg-white/10 mx-0.5" />
                  <Button
                    onClick={onLogout}
                    variant="glassDanger"
                    className="gap-2 px-3 h-9"
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="font-medium">Sign Out</span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Reusable Filter Modal */}
      {FilterModalComponent && (
        <FilterModalComponent
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApplyFilters={handleApplyFiltersAndCloseModal}
          initialFilters={initialFilters}
        />
      )}
    </header>
  );
}

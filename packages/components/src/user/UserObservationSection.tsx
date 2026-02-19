// packages/components/src/user/UserObservationSection.tsx
"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@kuroshio-lab/styles";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
  Button,
} from "@kuroshio-lab/ui";
import { useUser } from "./UserProvider";
import type { Observation } from "../observation/ObservationCard";

interface UserObservationSectionProps {
  className?: string;
  filterSpeciesName: string | null;
  filterCommonName: string | null;
  filterMinDate: string | null;
  filterMaxDate: string | null;
  ObservationModalComponent?: React.ComponentType<any>;
  ObservationCardComponent?: React.ComponentType<any>;
  ObservationFilterAndSortComponent?: React.ComponentType<any>;
  LoaderComponent?: React.ComponentType<any>;
  MapComponent?: React.ComponentType<any>;
  onFetchObservations?: () => Promise<Observation[]>;
  onDeleteObservation?: (id: number) => Promise<void>;
  onUpdateObservation?: (id: number, data: any) => Promise<void>;
  onCreateObservation?: (data: any) => Promise<void>;
}

function UserObservationSection({
  className,
  filterSpeciesName,
  filterCommonName,
  filterMinDate,
  filterMaxDate,
  ObservationModalComponent,
  ObservationCardComponent,
  ObservationFilterAndSortComponent,
  LoaderComponent,
  MapComponent,
  onFetchObservations,
  onDeleteObservation,
  onUpdateObservation,
  onCreateObservation,
}: UserObservationSectionProps) {
  const { user, loading: isUserLoading } = useUser();
  const [observations, setObservations] = useState<Observation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedObservation, setSelectedObservation] =
    useState<Observation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [zoomTrigger, setZoomTrigger] = useState(0);
  const [mapRefreshTrigger, setMapRefreshTrigger] = useState(0);
  const [displayObservations, setDisplayObservations] = useState<Observation[]>(
    [],
  );

  const loadObservations = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      setObservations([]);
      setDisplayObservations([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      let userObservations: Observation[] = [];
      if (onFetchObservations) {
        userObservations = await onFetchObservations();
      }
      setObservations(userObservations);
      setDisplayObservations(userObservations);
    } catch (err) {
      const errorMessage = "Failed to load observations.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [user, onFetchObservations]);

  const handleFilteredObservationsChange = useCallback(
    (filteredList: Observation[]) => {
      setDisplayObservations(filteredList);
    },
    [],
  );

  const handleSelectObservation = useCallback((observation: Observation) => {
    if (observation.validated !== "rejected") {
      setSelectedObservation(observation);
      setZoomTrigger((prev) => prev + 1);
    } else {
      // eslint-disable-next-line no-console
      console.log("Rejected observations cannot be selected for zooming.");
    }
  }, []);

  const handleDeleteObservation = useCallback(
    async (observationId: number) => {
      if (!user) {
        // eslint-disable-next-line no-console
        console.warn("User not logged in. Cannot delete observation.");
        return;
      }
      try {
        if (onDeleteObservation) {
          await onDeleteObservation(observationId);
        }
        await loadObservations();
        if (selectedObservation && selectedObservation.id === observationId) {
          setSelectedObservation(null);
        }
        setMapRefreshTrigger((prev) => prev + 1);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to delete observation:", err);
        setError("Failed to delete observation.");
      }
    },
    [user, loadObservations, selectedObservation],
  );

  const handleEditObservationClick = useCallback((observation: Observation) => {
    setSelectedObservation(observation);
    setModalMode("edit");
    setIsModalOpen(true);
  }, []);

  const handleAddObservationClick = () => {
    setSelectedObservation(null);
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleObservationUpserted = () => {
    loadObservations();
    setMapRefreshTrigger((prev) => prev + 1);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isUserLoading) {
      loadObservations();
    }
  }, [loadObservations, isUserLoading]);

  if (isUserLoading) {
    return (
      <section id="user-observations" className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Your Observations</h2>
        {LoaderComponent ? (
          <LoaderComponent />
        ) : (
          <p className="text-center mt-4">Loading user data...</p>
        )}
      </section>
    );
  }

  if (!user) {
    return (
      <section id="user-observations" className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Your Observations</h2>
        <p>Please log in to view your observations.</p>
      </section>
    );
  }

  const renderObservationListContent = () => {
    if (isLoading) {
      return LoaderComponent ? (
        <LoaderComponent />
      ) : (
        <p className="p-4">Loading...</p>
      );
    }
    if (error) {
      return <div className="text-red-500 p-4">{error}</div>;
    }
    if (displayObservations.length === 0) {
      return (
        <p className="p-4">No observations found. Start by adding a new one!</p>
      );
    }
    return displayObservations.map(
      (observation: Observation, index: number) => {
        if (!ObservationCardComponent) return null;
        return (
          <ObservationCardComponent
            key={observation.id}
            observation={observation}
            onSelectObservation={handleSelectObservation}
            onDeleteObservation={handleDeleteObservation}
            onEditObservationClick={handleEditObservationClick}
            className={index < displayObservations.length - 1 ? "mb-2" : ""}
          />
        );
      },
    );
  };

  return (
    <div
      className={cn(
        "border rounded-lg bg-white p-2 grid grid-cols-1 md:grid-cols-3 w-full h-full overflow-hidden",
        className,
      )}
    >
      <div className="md:col-span-2 h-full">
        <div
          style={{ position: "relative" }}
          className="h-full bg-white rounded-lg overflow-hidden"
        >
          {MapComponent && (
            <MapComponent
              selectedObservation={selectedObservation}
              zIndex={isModalOpen ? 0 : 1}
              zoomTrigger={zoomTrigger}
              mapRefreshTrigger={mapRefreshTrigger}
              filterSpeciesName={filterSpeciesName}
              filterCommonName={filterCommonName}
              filterMinDate={filterMinDate}
              filterMaxDate={filterMaxDate}
            />
          )}
          <div
            className="absolute top-4 right-4 z-[1000] p-2 pointer-events-auto"
            style={{ display: "flex", gap: 8 }}
          >
            <Button variant="addingObs" onClick={handleAddObservationClick}>
              Add Observation
            </Button>
          </div>
        </div>
      </div>
      <div className="md:col-span-1 h-full flex flex-col overflow-hidden">
        <Card className="rounded-none shadow-none border-none flex-grow flex flex-col overflow-hidden">
          <CardHeader className="pr-0">
            <CardTitle className="flex justify-between items-center">
              Observations ({displayObservations.length})
              {ObservationFilterAndSortComponent && (
                <ObservationFilterAndSortComponent
                  observations={observations}
                  onFilteredObservationsChange={
                    handleFilteredObservationsChange
                  }
                />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden pr-0">
            <ScrollArea className="h-full pr-4">
              {renderObservationListContent()}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      {ObservationModalComponent && (
        <ObservationModalComponent
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onObservationUpserted={handleObservationUpserted}
          mode={modalMode}
          observation={modalMode === "edit" ? selectedObservation : null}
          onSubmit={
            modalMode === "edit" ? onUpdateObservation : onCreateObservation
          }
        />
      )}
    </div>
  );
}

export default UserObservationSection;

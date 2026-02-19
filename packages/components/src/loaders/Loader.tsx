// packages/components/src/loaders/Loader.tsx
"use client";

import React from "react";

interface LoaderProps {
  isLoading: boolean;
  LoaderComponent?: React.ComponentType<any>;
}

function Loader({ isLoading, LoaderComponent }: LoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-800 bg-opacity-50">
      {LoaderComponent ? (
        <LoaderComponent />
      ) : (
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4" />
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default Loader;

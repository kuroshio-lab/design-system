// packages/components/src/loaders/GlobalLoader.tsx
"use client";

import React from "react";
import Loader from "./Loader";

interface GlobalLoaderProps {
  useLoadingHook?: () => { isLoading: boolean };
  isLoading?: boolean;
  LoaderComponent?: React.ComponentType<any>;
}

function GlobalLoader({
  useLoadingHook,
  isLoading = false,
  LoaderComponent,
}: GlobalLoaderProps) {
  let loading = isLoading;

  if (useLoadingHook) {
    const { isLoading: hookLoading } = useLoadingHook();
    loading = hookLoading;
  }

  return <Loader isLoading={loading} LoaderComponent={LoaderComponent} />;
}

export default GlobalLoader;

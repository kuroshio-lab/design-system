import React, { Suspense } from "react";

type DynamicOptions = { loading?: () => React.ReactNode; ssr?: boolean };

export default function dynamic(
  loader: () => Promise<{ default: React.ComponentType<any> }>,
  options?: DynamicOptions,
): React.ComponentType<any> {
  const Component = React.lazy(loader);

  return (props: any) => (
    <Suspense fallback={options?.loading?.() || <div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
}

"use client";

import { useEffect, useState } from "react";

const HydrationZustand = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait till Next.js rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return <>{isHydrated ? <div>{children}</div> : null}</>;
};

export default HydrationZustand;

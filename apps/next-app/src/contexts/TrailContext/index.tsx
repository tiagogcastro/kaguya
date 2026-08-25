import { createContext, useState } from "react";

import { TrailData } from "@/services/kaguya/types";

type TrailContextData = {
  trail: TrailData | null;
  setTrailData: React.Dispatch<React.SetStateAction<TrailData | null>>;
};

interface TrailProviderProps {
  children: React.ReactNode;
}

export const TrailContext = createContext({} as TrailContextData);

export function TrailProvider({ children }: TrailProviderProps) {
  const [trail, setTrailData] = useState<TrailData | null>(
    null
  );

  return (
    <TrailContext.Provider
      value={{
        trail,
        setTrailData,
      }}
    >
      {children}
    </TrailContext.Provider>
  );
}

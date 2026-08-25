import { TrailContext } from "contexts/TrailContext";
import { useContext } from "react";

export function useTrail() {
  return useContext(TrailContext);
}

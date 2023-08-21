// useMapReady.js

import { useEffect } from "react";

export const useMapReady = (ymaps, setIsMapLoaded) => {
  useEffect(() => {
    if (!ymaps) {
      return;
    }
    ymaps.ready().then(() => {
      setIsMapLoaded(true);
    });
  }, [ymaps]);
};

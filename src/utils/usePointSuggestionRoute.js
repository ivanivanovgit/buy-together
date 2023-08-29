// usePointSuggestionRoute.js
import { useEffect } from "react";

const usePointSuggestionRoute = (ymaps, pointRef, setSelectedAddress) => {
  useEffect(() => {
    if (!ymaps || !pointRef) {
      return;
    }

    const suggestView = new ymaps.SuggestView(pointRef);

    suggestView.events.add("select", (e) => {
      setSelectedAddress(e.get("item").value);
    });
  }, [ymaps, pointRef, setSelectedAddress]);
};

export default usePointSuggestionRoute;

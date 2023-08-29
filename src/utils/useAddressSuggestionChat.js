// useAddressSuggestionChat.js

import { useEffect } from "react";

export const useAddressSuggestionChat = (
  ymaps,
  searchInputRef,
  selectedAddress,
  setselectedAddress,
  searchAddress
) => {
  useEffect(() => {
    if (!ymaps || !searchInputRef) {
      return;
    }

    const suggestView = new ymaps.SuggestView(searchInputRef);

    suggestView.events.add("select", (e) => {
      setselectedAddress(e.get("item").value);

      if (typeof searchAddress === "function") {
        searchAddress(selectedAddress);
      }
    });
  }, [ymaps, searchInputRef]);
};

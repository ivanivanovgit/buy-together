// useSearchButtonClickChat.js

import { useEffect } from "react";

export const useSearchButtonClickChat = (
  searchButtonClick,
  searchAddress,
  ymaps
) => {
  useEffect(() => {
    if (searchButtonClick) {
      searchAddress(searchButtonClick);
    }
  }, [searchButtonClick, ymaps]);
};

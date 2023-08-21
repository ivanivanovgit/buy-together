// useSelectedAddressChat

import { useEffect } from "react";
import { setSearchInput } from "../redux/slices/chatSlices/chatMapSlice";

export const useSelectedAddressChat = (selectedAddress, dispatch, ymaps) => {
  useEffect(() => {
    if (selectedAddress) {
      dispatch(setSearchInput(selectedAddress)); // Устанавливаем значение поля ввода адреса
    }
  }, [selectedAddress, ymaps]);
};

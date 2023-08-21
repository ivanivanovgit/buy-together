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

    // Создаем SuggestView для поля ввода адреса
    const suggestView = new ymaps.SuggestView(searchInputRef);

    // Обрабатываем выбор подсказки
    suggestView.events.add("select", (e) => {
      // Получаем выбранный адрес
      setselectedAddress(e.get("item").value);

      // Вызываем функцию searchAddress, которая обрабатывает поиск адреса на карте
      if (typeof searchAddress === "function") {
        searchAddress(selectedAddress);
      }
    });
  }, [ymaps, searchInputRef]);
};

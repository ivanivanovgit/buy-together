// usePointSuggestionRoute.js
import { useEffect } from "react";

const usePointSuggestionRoute = (ymaps, pointRef, setSelectedAddress) => {
  useEffect(() => {
    if (!ymaps || !pointRef) {
      return;
    }

    // Создаем SuggestView для поля ввода адреса
    const suggestView = new ymaps.SuggestView(pointRef);

    // Обрабатываем выбор подсказки
    suggestView.events.add("select", (e) => {
      // Получаем выбранный адрес
      setSelectedAddress(e.get("item").value);
    });
  }, [ymaps, pointRef, setSelectedAddress]);
};

export default usePointSuggestionRoute;

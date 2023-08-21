// useFetchShareMarker.js

import { useEffect } from "react";
import { setOpenAlert } from "../redux/slices/chatSlices/chatMapSlice";
export const useFetchShareMarker = (
  shareMarkerId,
  ymaps,
  myMapRef,
  isMapLoaded,
  clustererRef,
  getShareMarker,
  dispatch
) => {
  useEffect(() => {
    if (!ymaps || !myMapRef.current || !isMapLoaded) {
      return;
    }

    if (shareMarkerId) {
      getShareMarker(shareMarkerId)
        .then((marker) => {
          if (marker) {
            if (myMapRef.current && marker && marker.lat && marker.lng) {
              myMapRef.current.setCenter([marker.lat, marker.lng]);
              myMapRef.current.setZoom(21);
              // Проверяем, существует ли clustererRef.current перед поиском маркера
              if (clustererRef.current) {
                // Получаем все маркеры из кластера
                let allMarkers = clustererRef.current.getGeoObjects();

                // Ищем маркер по ID
                let markerToOpen = allMarkers.find(
                  (m) => m.properties.get("id") === marker.id
                );

                // Открываем балун маркера
                if (markerToOpen) {
                  markerToOpen.balloon.open();
                }
              }
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching marker: ", error);
          dispatch(setOpenAlert(true));
        });
    }
  }, [shareMarkerId, ymaps, myMapRef.current, isMapLoaded]);
};

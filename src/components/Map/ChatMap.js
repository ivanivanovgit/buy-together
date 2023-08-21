// ChatMap.js
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAddress,
  setSelectedTheme,
  setShowAllMarkers,
  setMarkersMesage,
  setIsAddingMarker,
} from "../../redux/slices/chatSlices/chatMapSlice";
import { useRouter } from "next/router";
import { useYMaps } from "@pbe/react-yandex-maps";
import { Constants } from "../../CONSTANTS";
import {
  addMarkerToDatabase,
  fetchMarkersByTheme,
  getMarkersFromDatabase,
  removeMarkerFromDB,
  checkDuplicateMarker,
  checkDuplicateMarkerCoords,
  getShareMarker,
} from "../../utils/endPointsHandlers";

import {
  getPlacemarkOptions,
  balloonContentTemplate,
  buildFunction,
  clearFunction,
  shareMarker,
} from "../../utils/placemarkOptions";

import { useSelectedAddressChat } from "../../utils/useSelectedAddressChat";
import { useSearchButtonClickChat } from "../../utils/useSearchButtonClickChat";
import { useAddressSuggestionChat } from "../../utils/useAddressSuggestionChat";
import { useShareMarker } from "../../utils/useShareMarker";
import { useMapReady } from "../../utils/useMapReady";
import { useFetchShareMarker } from "../../utils/useFetchShareMarker";
import { getShareCoordsZoom } from "../../utils/getShareCoordsZoom";
import { createPlacemark } from "../../utils/createPlacemark";
import { getAddress } from "../../utils/getAddress";

function ChatMap({ mapStyle, searchInputRef }) {
  const dispatch = useDispatch();
  const inputText = useSelector((state) => state.chatMap.inputText);
  const createMarker = useSelector((state) => state.chatMap.createMarker);
  const selectedTheme = useSelector((state) => state.chatMap.selectedTheme);
  const searchButtonClick = useSelector(
    (state) => state.chatMap.searchButtonClick
  );
  const showAllMarkers = useSelector((state) => state.chatMap.showAllMarkers);
  // useState
  const [selectedAddress, setselectedAddress] = useState("");
  const [checkIsDuplicateCoords, setCheckIsDuplicateCoords] = useState(0);
  const [shareMarkerId, setShareMarkerId] = useState(null);
  const [shareMarkerTheme, setShareMarkerTheme] = useState(null);
  // useRef
  const mapRef = useRef(null);
  const myMapRef = useRef(null);
  const myPlacemarkRef = useRef(null);
  const currentCoords = useRef(null);
  const clustererRef = useRef(null);
  const checkIsDuplicateCoordsRef = useRef(null);
  const timeoutIdRef = useRef(null);

  const router = useRouter();

  const ymaps = useYMaps();

  let MyIconContentLayout;

  if (ymaps) {
    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div style="min-width: 10rem; text-align: left;">$[properties.iconCaption]</div>'
    );
  }

  // Обновляем адрес
  const onAddressChange = (newAddress) => {
    dispatch(setAddress(newAddress));
  };

  //  Функция для поиска адреса
  const searchAddress = async (address) => {
    if (!ymaps || !myMapRef.current || !address) {
      return;
    }

    const searchResults = await ymaps.geocode(address);
    const firstResult = searchResults.geoObjects.get(0);

    if (firstResult) {
      const coords = firstResult.geometry.getCoordinates();
      currentCoords.current = coords;

      if (myPlacemarkRef.current) {
        myPlacemarkRef.current.geometry.setCoordinates(coords);
      } else {
        myPlacemarkRef.current = createPlacemark(
          ymaps,
          coords,
          MyIconContentLayout
        );
        myMapRef.current.geoObjects.add(myPlacemarkRef.current);
      }

      getAddress(
        ymaps,
        coords,
        myPlacemarkRef.current,
        onAddressChange,
        selectedAddress,
        dispatch
      );

      onAddressChange(address);
      // Центрирование карты на найденных координатах
      myMapRef.current.setCenter(coords, myMapRef.current.getZoom(), {
        duration: 500,
      });
    }
  };

  //  для подсказок адреса
  useAddressSuggestionChat(
    ymaps,
    searchInputRef,
    selectedAddress,
    setselectedAddress,
    searchAddress
  );

  /////////  для установки значения адреса подсказок в  поле ввода адреса
  useSelectedAddressChat(selectedAddress, dispatch, ymaps);

  ///////// для поиска адреса по координатам
  useSearchButtonClickChat(searchButtonClick, searchAddress, ymaps);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // для получения и установки id и theme из query
  useShareMarker(router, setShareMarkerId, setShareMarkerTheme);

  //  для проверки загружена карта или нет
  useMapReady(ymaps, setIsMapLoaded);

  //  для открытия соответствующего балуна маркера
  useFetchShareMarker(
    shareMarkerId,
    ymaps,
    myMapRef,
    isMapLoaded,
    clustererRef,
    getShareMarker,
    dispatch
  );

  ///////// useEffect для добавления перетаскиваемого маркера и инициализации карты
  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      dispatch(setMarkersMesage("Карта загружается..."));

      timeoutIdRef.current = setTimeout(() => {
        dispatch(
          setMarkersMesage(
            "API Яндекс Карт недоступен.  Попробуйте сменить сеть  или  отключить VPN."
          )
        );
      }, 4000);

      return;
    }
    dispatch(setMarkersMesage(""));

    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = null;

    let coords = Constants.coordDefault;
    let zoom = Constants.zoomDefault;

    getShareCoordsZoom(
      shareMarkerId,
      shareMarkerTheme,
      getShareMarker,
      coords,
      zoom,
      Constants.zoomMax
    );

    const myMap = new ymaps.Map(mapRef.current, {
      center: coords,
      zoom: zoom,
    });

    myMapRef.current = myMap;

    const searchControl = myMapRef.current.controls.get("searchControl");
    searchControl.options.set("noPlacemark", "true");

    // Создаем кластер
    clustererRef.current = new ymaps.Clusterer({
      preset: "islands#orangeClusterIcons",
    });

    // Добавляем кластер на карту
    myMapRef.current.geoObjects.add(clustererRef.current);

    // Слушаем клик на карте.
    myMapRef.current.events.add("click", function (e) {
      let coords = e.get("coords");
      currentCoords.current = coords;

      if (myPlacemarkRef.current) {
        myPlacemarkRef.current.geometry.setCoordinates(coords);
      } else {
        myPlacemarkRef.current = createPlacemark(
          ymaps,
          coords,
          MyIconContentLayout
        );
        myMapRef.current.geoObjects.add(myPlacemarkRef.current);
      }

      getAddress(
        ymaps,
        coords,
        myPlacemarkRef.current,
        onAddressChange,
        selectedAddress,
        dispatch
      );
    });

    return () => {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;

      if (myMapRef.current) {
        myMapRef.current.destroy();
      }
    };
    ///////
  }, [ymaps]);

  /////////  useEffect для извлечения маркеров на карту согласно выбранной теме
  useEffect(() => {
    if (!ymaps || !myMapRef.current || !isMapLoaded || !selectedTheme) {
      return;
    }

    // Проверяем, существует ли clustererRef.current перед удалением маркеров
    if (clustererRef.current) {
      // Удаляем все маркеры из кластера
      clustererRef.current.removeAll();
    }

    ////
    // Получаем маркеры из базы данных
    fetchMarkersByTheme(selectedTheme).then((markers) => {
      markers.map((marker) => {
        const markerId = marker.id;
        const coords = [marker.lat, marker.lng];
        const theme = marker.theme;
        const message = marker.message_markers;

        //////
        // Создаем макет балуна с кнопкой "Удалить маркер"
        const MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
          balloonContentTemplate,
          {
            build: buildFunction,
            clear: clearFunction,
            onButtonClick: async function () {
              try {
                await removeMarkerFromDB(markerId);
                clustererRef.current.remove(addPlacemark);
              } catch (error) {
                console.error("Error deleting marker: ", error);
              }
            },
            onCloseButtonClick: function () {
              addPlacemark.balloon.close();
            },
            onShareButtonClick: function () {
              shareMarker(addPlacemark, getShareMarker, dispatch);
            },
          }
        );

        const addPlacemark = new ymaps.Placemark(
          coords,
          {
            id: markerId,
            balloonContent: message,
            groupTheme: theme,
          },
          getPlacemarkOptions(MyBalloonContentLayout, ymaps)
        );

        clustererRef.current.add(addPlacemark);

        // Добавляем кластер на карту
        myMapRef.current.geoObjects.add(clustererRef.current);

        /////
      });
    });
    ////
  }, [
    selectedTheme,
    checkIsDuplicateCoords,
    ymaps,
    myMapRef.current,
    isMapLoaded,
  ]);

  //  useEffect для  добавления нового маркера по кнопке Добавить маркер
  useEffect(() => {
    if (
      createMarker === 0 ||
      !myMapRef.current ||
      !ymaps ||
      !currentCoords.current
    ) {
      return;
    }

    dispatch(setMarkersMesage("Идет добавление маркера, подождите..."));

    setTimeout(() => {
      dispatch(setMarkersMesage(""));
    }, 3000);

    // Проверка на дубликат
    checkDuplicateMarker(
      currentCoords.current[0],
      currentCoords.current[1],
      inputText
    )
      .then((isDuplicate) => {
        if (isDuplicate) {
          // Вывод сообщения пользователю
          dispatch(
            setMarkersMesage(
              "Маркер с этими координатами и сообщением уже существует"
            )
          );
          setTimeout(() => {
            dispatch(setMarkersMesage(""));
          }, 3000);
          return;
        }

        // Смещаем немного координаты маркера, чтобы он не совпадал с другими маркерами
        checkDuplicateMarkerCoords(
          currentCoords.current[0],
          currentCoords.current[1]
        ).then((isDuplicateCoords) => {
          //////////////////////////////
          if (isDuplicateCoords) {
            // Вывод сообщения пользователю
            dispatch(
              setMarkersMesage(
                "Маркер с этими координатами уже существует, добавляем с небольшим смещением"
              )
            );

            const offset = Constants.offset;
            currentCoords.current[0] += offset;
            currentCoords.current[1] += offset;

            checkIsDuplicateCoordsRef.current += 1;
            /* setCheckIsDuplicateCoords((prev) => prev + 1); */

            setTimeout(() => {
              dispatch(setMarkersMesage(""));
            }, 3000);
          }

          // Если дубликат не обнаружен, добавляем новый маркер
          addMarkerToDatabase(
            currentCoords.current[0],
            currentCoords.current[1],
            selectedTheme,
            inputText
          ).then(({ id: markerId }) => {
            dispatch(setIsAddingMarker(true));
            const MyBalloonContentLayout =
              ymaps.templateLayoutFactory.createClass(balloonContentTemplate, {
                build: buildFunction,
                clear: clearFunction,
                onButtonClick: async function () {
                  try {
                    await removeMarkerFromDB(markerId);
                    clustererRef.current.remove(addPlacemark);
                  } catch (error) {
                    console.error("Error deleting marker: ", error);
                  }
                },
                onCloseButtonClick: function () {
                  addPlacemark.balloon.close();
                },
                onShareButtonClick: function () {
                  shareMarker(addPlacemark, getShareMarker, dispatch);
                },
              });

            const addPlacemark = new ymaps.Placemark(
              currentCoords.current,
              {
                id: markerId,
                balloonContent: inputText,
                groupTheme: selectedTheme,
              },
              getPlacemarkOptions(MyBalloonContentLayout, ymaps)
            );

            clustererRef.current.add(addPlacemark);
            setCheckIsDuplicateCoords(checkIsDuplicateCoordsRef.current);

            dispatch(setIsAddingMarker(false));
            ///////
          });
          //////////////////////////
        });
        ////
      })
      .catch((error) => {
        console.error("Error while checking for duplicate marker: ", error);
      });
  }, [createMarker, ymaps]);

  //////// useEffect для извлечения всех маркеров на карту
  useEffect(() => {
    if (showAllMarkers) {
      if (!ymaps) {
        return;
      }
      // Проверяем, существует ли clustererRef.current перед удалением маркеров
      if (clustererRef.current) {
        // Удаляем все маркеры из кластера
        clustererRef.current.removeAll();
      }

      getMarkersFromDatabase().then((markers) => {
        markers.map((marker) => {
          const markerId = marker.id;
          const coords = [marker.lat, marker.lng];
          const theme = marker.theme;
          const message = marker.message_markers;

          //////
          // Создаем макет балуна с кнопкой "Удалить маркер"
          const MyBalloonContentLayout =
            ymaps.templateLayoutFactory.createClass(balloonContentTemplate, {
              build: buildFunction,
              clear: clearFunction,
              onButtonClick: async function () {
                try {
                  await removeMarkerFromDB(markerId);
                  clustererRef.current.remove(addPlacemark);
                } catch (error) {
                  console.error("Error deleting marker: ", error);
                }
              },
              onCloseButtonClick: function () {
                addPlacemark.balloon.close();
              },
              onShareButtonClick: function () {
                shareMarker(addPlacemark, getShareMarker, dispatch);
              },
            });

          const addPlacemark = new ymaps.Placemark(
            coords,
            {
              id: markerId,
              balloonContent: message,
              groupTheme: theme,
            },
            getPlacemarkOptions(MyBalloonContentLayout, ymaps)
          );

          clustererRef.current.add(addPlacemark);

          // Добавляем кластер на карту
          myMapRef.current.geoObjects.add(clustererRef.current);

          /////
        });
        ////
        dispatch(setShowAllMarkers(false));
        dispatch(setSelectedTheme(""));
      });
    }
  }, [showAllMarkers]);

  return <div ref={mapRef} className={mapStyle} />;
}

export default ChatMap;

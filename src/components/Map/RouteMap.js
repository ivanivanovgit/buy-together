// RouteMap.js

import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Constants } from "../../CONSTANTS";
import {
  setErrorMessage,
  setSubmitMessage,
} from "../../redux/slices/routeSlices/messageSlice";
import { useYMaps } from "@pbe/react-yandex-maps";
import {
  getRoutes,
  addRoute,
  deleteRoute,
} from "../../utils/endPointsHandlers";

import {
  getPlacemarkOptions,
  balloonContentTemplateRoute,
  buildFunctionRoute,
  clearFunctionRoute,
} from "../../utils/placemarkOptions";

import useSetPointRoute from "../../utils/useSetPointRoute";
import usePointSuggestionRoute from "../../utils/usePointSuggestionRoute";

function RouteMap({
  mapStyle,
  setFirstPoint,
  setSecondPoint,
  firstPointRef,
  secondPointRef,
  setMessageFirstPoint,
}) {
  const ymaps = useYMaps();
  const mapRef = useRef(null);
  const myMapRef = useRef(null);
  const timeoutIdRef = useRef(null);
  const [selectedFirstAddress, setSelectedFirstAddress] = useState("");
  const [selectedSecondAddress, setSelectedSecondAddress] = useState("");

  const dispatch = useDispatch();
  const countMapRoute = useSelector((state) => state.routeCount.countMapRoute);

  ///////// useEffect для инициализации карты
  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      dispatch(setSubmitMessage("Карта загружается..."));

      timeoutIdRef.current = setTimeout(() => {
        dispatch(
          setSubmitMessage(
            "API Яндекс Карт недоступен.  Попробуйте сменить сеть  или  отключить VPN."
          )
        );
      }, 4000);

      return;
    }

    dispatch(setSubmitMessage(""));

    ymaps.ready(() => {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;

      const myMap = new ymaps.Map(mapRef.current, {
        center: Constants.coordDefault,
        zoom: Constants.zoomDefault,
      });

      myMapRef.current = myMap;

      const searchControl = myMap.controls.get("searchControl");
      searchControl.options.set("noPlacemark", "true");

      getRoutes().then((routes) => {
        routes?.forEach((route) => {
          const routeId = route.id;
          const firstCoords = [route.first_latitude, route.first_longitude];
          const secondCoords = [route.second_latitude, route.second_longitude];
          const routeMessage = route.route_message;

          const multiRoute = new ymaps.multiRouter.MultiRoute(
            {
              referencePoints: [firstCoords, secondCoords],
              params: { routingMode: "auto", results: 1 },
            },
            {
              // Отключаем видимость маркеров пути
              wayPointVisible: false,
            }
          );

          myMapRef.current.geoObjects.add(multiRoute);

          // Создаем макет балуна с кнопкой "Удалить маркер"
          const MyBalloonContentLayout =
            ymaps.templateLayoutFactory.createClass(
              balloonContentTemplateRoute,
              {
                build: buildFunctionRoute,
                clear: clearFunctionRoute,
                onButtonClick: async function () {
                  try {
                    await deleteRoute(routeId);
                    myMapRef.current.geoObjects.remove(firstPlacemark);
                    myMapRef.current.geoObjects.remove(secondPlacemark);
                    myMapRef.current.geoObjects.remove(multiRoute);
                  } catch (error) {
                    console.error("Error deleting route: ", error);
                  }
                },
                onCloseButtonClick: function () {
                  firstPlacemark.balloon.close();
                  secondPlacemark.balloon.close();
                },
              }
            );
          ///////

          // создаем Placemark для первой и второй точки маршрута
          const firstPlacemark = new ymaps.Placemark(
            firstCoords,
            {
              balloonContent: routeMessage,
            },
            getPlacemarkOptions(MyBalloonContentLayout, ymaps)
          );
          const secondPlacemark = new ymaps.Placemark(
            secondCoords,
            {
              balloonContent: routeMessage,
            },
            getPlacemarkOptions(MyBalloonContentLayout, ymaps)
          );

          // добавляем Placemark на карту
          myMapRef.current.geoObjects.add(firstPlacemark);
          myMapRef.current.geoObjects.add(secondPlacemark);
        });
      });
      ///
      return () => {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;

        if (myMapRef.current) {
          myMapRef.current.destroy();
        }
      };
    });

    ///////
  }, [ymaps]);

  //useEffect для добавления маршрута
  useEffect(() => {
    if (countMapRoute === 0 || !myMapRef.current || !ymaps) {
      return;
    }

    ymaps.ready(() => {
      Promise.all([
        ymaps.geocode(setFirstPoint.value),
        ymaps.geocode(setSecondPoint.value),
      ])
        .then((results) => {
          const firstGeoObject = results[0].geoObjects.get(0);
          const secondGeoObject = results[1].geoObjects.get(0);

          if (!firstGeoObject) {
            dispatch(
              setErrorMessage(
                `Адрес "${setFirstPoint.value}" не найден. Проверьте правильность введенного адреса.`
              )
            );

            setTimeout(() => {
              dispatch(setErrorMessage(""));
            }, 3000); // сбрасываем сообщение после 3 секунд

            return;
          }
          if (!secondGeoObject) {
            dispatch(
              setErrorMessage(
                `Адрес "${setSecondPoint.value}" не найден. Проверьте правильность введенного адреса.`
              )
            );

            setTimeout(() => {
              dispatch(setErrorMessage(""));
            }, 3000); // сбрасываем сообщение после 3 секунд

            return;
          }
          // Сбрасываем сообщение об ошибке, если маршрут успешно обработан
          dispatch(setErrorMessage(""));

          const firstCoords = firstGeoObject.geometry.getCoordinates();
          const secondCoords = secondGeoObject.geometry.getCoordinates();

          if (
            !Array.isArray(firstCoords) ||
            firstCoords.length !== 2 ||
            !Array.isArray(secondCoords) ||
            secondCoords.length !== 2
          ) {
            dispatch(
              setErrorMessage("Произошла ошибка при геокодировании адресов: ")
            );

            setTimeout(() => {
              dispatch(setErrorMessage(""));
            }, 3000); // сбрасываем сообщение после 3 секунд

            return;
          }

          // Добавляем маршрут в базу данных
          addRoute({
            first_latitude: firstCoords[0],
            first_longitude: firstCoords[1],
            second_latitude: secondCoords[0],
            second_longitude: secondCoords[1],
            message: setMessageFirstPoint.value,
          })
            .then((result) => {
              ///

              if (typeof result === "string") {
                // Это сообщение об ошибке
                dispatch(setErrorMessage(result));
                setTimeout(() => {
                  dispatch(setErrorMessage(""));
                }, 3000);
                return;
              }

              const routeId = result.id;

              const multiRoute = new ymaps.multiRouter.MultiRoute(
                {
                  referencePoints: [firstCoords, secondCoords],
                  params: {
                    routingMode: "auto",
                    results: 1, // Отображаем только один маршрут
                  },
                },
                {
                  // Отключаем видимость маркеров пути
                  wayPointVisible: false,
                }
              );
              /*  multiRouteRef.current = multiRoute; */
              myMapRef.current.geoObjects.add(multiRoute);

              // Создаем макет балуна с кнопкой "Удалить маркер"
              const MyBalloonContentLayout =
                ymaps.templateLayoutFactory.createClass(
                  balloonContentTemplateRoute,
                  {
                    build: buildFunctionRoute,
                    clear: clearFunctionRoute,
                    onButtonClick: async function () {
                      try {
                        await deleteRoute(routeId);
                        myMapRef.current.geoObjects.remove(firstPlacemark);
                        myMapRef.current.geoObjects.remove(secondPlacemark);
                        myMapRef.current.geoObjects.remove(multiRoute);
                      } catch (error) {
                        console.error("Error deleting route: ", error);
                      }
                    },
                    onCloseButtonClick: function () {
                      firstPlacemark.balloon.close();
                      secondPlacemark.balloon.close();
                    },
                  }
                );
              ///////

              const firstPlacemark = new ymaps.Placemark(
                firstCoords,
                {
                  balloonContent: setMessageFirstPoint.value,
                },
                getPlacemarkOptions(MyBalloonContentLayout, ymaps)
              );

              const secondPlacemark = new ymaps.Placemark(
                secondCoords,
                {
                  balloonContent: setMessageFirstPoint.value,
                },
                getPlacemarkOptions(MyBalloonContentLayout, ymaps)
              );

              myMapRef.current.geoObjects.add(firstPlacemark);
              myMapRef.current.geoObjects.add(secondPlacemark);
              dispatch(setSubmitMessage("Маршрут успешно добавлен"));
              setTimeout(() => {
                dispatch(setSubmitMessage(""));
              }, 3000); // сбрасываем сообщение после 3 секунд

              // Центр карты по координатам первой точки
              myMapRef.current.setCenter(firstCoords);
              /////
            })
            .catch((error) => {
              // Обработка ошибок при добавлении маршрута в базу данных
              console.error("Error adding route: ", error);
            });
          /// добавляем маршрут в базу данных
        })
        .catch((error) => {
          // Обработка ошибок при геокодировании
          dispatch(
            setErrorMessage(
              "Произошла ошибка при геокодировании адресов: " + error
            )
          );

          setTimeout(() => {
            dispatch(setErrorMessage(""));
          }, 3000); // сбрасываем сообщение после 3 секунд
          /////
        });
    });
  }, [countMapRoute, ymaps]);

  // для подсказок адреса firstPoint
  usePointSuggestionRoute(ymaps, firstPointRef, setSelectedFirstAddress);

  /////////  для установки значения адреса подсказок в  поле ввода адреса firstPoint
  useSetPointRoute(selectedFirstAddress, setFirstPoint, ymaps);

  // для подсказок адреса secondPoint
  usePointSuggestionRoute(ymaps, secondPointRef, setSelectedSecondAddress);

  /////////  для установки значения адреса подсказок в  поле ввода адреса secondPoint
  useSetPointRoute(selectedSecondAddress, setSecondPoint, ymaps);

  ////////////
  return <div ref={mapRef} className={mapStyle} />;
}

export default RouteMap;

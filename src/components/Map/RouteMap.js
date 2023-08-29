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

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      dispatch(setSubmitMessage("The map is loading..."));

      timeoutIdRef.current = setTimeout(() => {
        dispatch(
          setSubmitMessage(
            "Yandex Maps API is unavailable. Try switching the network or disabling VPN."
          )
        );
      }, 5000);

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
              wayPointVisible: false,
            }
          );

          myMapRef.current.geoObjects.add(multiRoute);

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
                `The address "${setFirstPoint.value}" was not found. Check the accuracy of the entered address.`
              )
            );

            setTimeout(() => {
              dispatch(setErrorMessage(""));
            }, 3000);

            return;
          }
          if (!secondGeoObject) {
            dispatch(
              setErrorMessage(
                `The address "${setSecondPoint.value}" was not found. Check the accuracy of the entered address.`
              )
            );

            setTimeout(() => {
              dispatch(setErrorMessage(""));
            }, 3000);

            return;
          }

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
              setErrorMessage("An error occurred during address geocoding: ")
            );

            setTimeout(() => {
              dispatch(setErrorMessage(""));
            }, 3000);

            return;
          }

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
                    results: 1,
                  },
                },
                {
                  wayPointVisible: false,
                }
              );
              /*  multiRouteRef.current = multiRoute; */
              myMapRef.current.geoObjects.add(multiRoute);

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
              dispatch(
                setSubmitMessage("The route has been successfully added.")
              );
              setTimeout(() => {
                dispatch(setSubmitMessage(""));
              }, 3000);

              myMapRef.current.setCenter(firstCoords);
              /////
            })
            .catch((error) => {
              console.error("Error adding route: ", error);
            });
        })
        .catch((error) => {
          dispatch(
            setErrorMessage(
              "An error occurred during address geocoding: " + error
            )
          );

          setTimeout(() => {
            dispatch(setErrorMessage(""));
          }, 3000);
          /////
        });
    });
  }, [countMapRoute, ymaps]);

  usePointSuggestionRoute(ymaps, firstPointRef, setSelectedFirstAddress);

  useSetPointRoute(selectedFirstAddress, setFirstPoint, ymaps);

  usePointSuggestionRoute(ymaps, secondPointRef, setSelectedSecondAddress);

  useSetPointRoute(selectedSecondAddress, setSecondPoint, ymaps);

  ////////////
  return <div ref={mapRef} className={mapStyle} />;
}

export default RouteMap;

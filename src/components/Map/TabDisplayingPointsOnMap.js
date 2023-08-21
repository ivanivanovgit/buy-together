// TabDisplayingPointsOnMap.js
import { useRef, useEffect, useState } from "react";
import { useYMaps } from "@pbe/react-yandex-maps";
import { Constants } from "../../CONSTANTS";

const createTabDisplayingPointsOnMap = (idTabMap) => {
  /* const idTab = tabMapName; ////// number of tab */

  function TabDisplayingPointsOnMap({ markers, st }) {
    const mapRef = useRef(null);
    const timeoutIdRef = useRef(null);
    const [mapLoadError, setMapLoadError] = useState(false);
    const ymaps = useYMaps();

    useEffect(() => {
      if (!ymaps || !mapRef.current || markers.length == 0) {
        timeoutIdRef.current = setTimeout(() => {
          setMapLoadError(true);
        }, 4000);

        return;
      }

      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
      setMapLoadError(false);

      const myMap = new ymaps.Map(mapRef.current, {
        center: markers[0].coords,
        zoom: Constants.zoomMin,
      });

      const searchControl = myMap.controls.get("searchControl");
      searchControl.options.set("noPlacemark", "true");
      ////
      const clusterer = new ymaps.Clusterer({
        preset: "islands#lightBlueClusterIcons",
      });
      ////

      const filteredMarkers = markers.filter(
        (marker) => marker.idTab === idTabMap
      );

      filteredMarkers.forEach(({ coords, ...markerOptions }) => {
        const marker = new ymaps.Placemark(coords, markerOptions, {
          /// balloon settings
          balloonLayout: "default#imageWithContent",
          balloonAutoPan: true,
          balloonPanelMaxMapArea: 0,
          hideIconOnBalloonOpen: false,
          balloonOffset: [18, -90],

          balloonContentLayout: ymaps.templateLayoutFactory.createClass(
            '<div class="custom-balloon">' +
              "$[properties.balloonContent]" +
              '<div class="custom-balloon__close">&times;</div>' +
              "</div>",
            {
              build: function () {
                this.constructor.superclass.build.call(this);
                this._$element = this.getParentElement().querySelector(
                  ".custom-balloon__close"
                );
                this._$element.addEventListener(
                  "click",
                  this.onCloseClick.bind(this),
                  { once: true }
                );
              },
              onCloseClick: function (e) {
                e.preventDefault();
                this.events.fire("userclose");
              },
            }
          ),
          /// icon settings
          iconLayout: "default#image",
          iconImageHref: "images/marker.png",
          iconImageSize: [30, 43],
          iconImageOffset: [-18, -43],
          iconContentLayout: ymaps.templateLayoutFactory.createClass(
            "<div>$[properties.iconContent]</div>"
          ),
          ///
        });
        // Добавляем коллекцию меток в кластеризатор
        clusterer.add(marker);
        ///
        /*  myMap.geoObjects.add(marker); */
      });

      ////
      myMap.geoObjects.add(clusterer);
      ///
      if (idTabMap === 2) {
        ///
        // Создание маркера Росторф
        let rostrofPlacemark = new ymaps.Placemark(
          [55.42326, 34.82749],
          {
            balloonContent:
              'Росторф - торфяной карьер с лицензией. Торф - 500 р./куб. м,  подходит для озеленения, дачников, садоводов. Тел: 8-930-988-22-75 <br></br> <a href="https://www.rostorf.com">www.rostorf.com</a>', // текст балуна при клике на маркер
          },
          {
            /// balloon settings
            balloonLayout: "default#imageWithContent",
            balloonAutoPan: true,
            balloonPanelMaxMapArea: 0,
            hideIconOnBalloonOpen: false,
            balloonOffset: [18, -120],

            balloonContentLayout: ymaps.templateLayoutFactory.createClass(
              '<div class="custom-balloon">' +
                "$[properties.balloonContent]" +
                '<div class="custom-balloon__close">&times;</div>' +
                "</div>",
              {
                build: function () {
                  this.constructor.superclass.build.call(this);
                  this._$element = this.getParentElement().querySelector(
                    ".custom-balloon__close"
                  );
                  this._$element.addEventListener(
                    "click",
                    this.onCloseClick.bind(this),
                    { once: true }
                  );
                },
                onCloseClick: function (e) {
                  e.preventDefault();
                  this.events.fire("userclose");
                },
              }
            ),
            /// icon settings
            iconLayout: "default#image",
            iconImageHref: "images/rtMarker.png",
            iconImageSize: [30, 43],
            iconImageOffset: [-18, -43],
            iconContentLayout: ymaps.templateLayoutFactory.createClass(
              "<div>$[properties.iconContent]</div>"
            ),
            ///
          }
        );

        // Добавление маркера на карту
        myMap.geoObjects.add(rostrofPlacemark);
        ///
        // Создание маркера Росторф для грунтов
        let rostrofPlacemark2 = new ymaps.Placemark(
          [55.32911300332484, 36.14180775380938],
          {
            balloonContent:
              'Филиал Росторфа предоставляет универсальную просеянную плодородную смесь в рассрочку для питомников, садовых центров, агрохолдингов. Тел: 8-916-200-21-07 <br></br> <a href="https://www.rostorf.com">www.rostorf.com</a>', // текст балуна при клике на маркер
          },
          {
            /// balloon settings
            balloonLayout: "default#imageWithContent",
            balloonAutoPan: true,
            balloonPanelMaxMapArea: 0,
            hideIconOnBalloonOpen: false,
            balloonOffset: [18, -120],

            balloonContentLayout: ymaps.templateLayoutFactory.createClass(
              '<div class="custom-balloon">' +
                "$[properties.balloonContent]" +
                '<div class="custom-balloon__close">&times;</div>' +
                "</div>",
              {
                build: function () {
                  this.constructor.superclass.build.call(this);
                  this._$element = this.getParentElement().querySelector(
                    ".custom-balloon__close"
                  );
                  this._$element.addEventListener(
                    "click",
                    this.onCloseClick.bind(this),
                    { once: true }
                  );
                },
                onCloseClick: function (e) {
                  e.preventDefault();
                  this.events.fire("userclose");
                },
              }
            ),
            /// icon settings
            iconLayout: "default#image",
            iconImageHref: "images/rtMarker.png",
            iconImageSize: [30, 43],
            iconImageOffset: [-18, -43],
            iconContentLayout: ymaps.templateLayoutFactory.createClass(
              "<div>$[properties.iconContent]</div>"
            ),
            ///
          }
        );

        // Добавление маркера на карту
        myMap.geoObjects.add(rostrofPlacemark2);
        ///
      }
      ///
    }, [ymaps, markers]);

    return (
      <div>
        <div ref={mapRef} className={st} />
        {mapLoadError && (
          <div>
            API Яндекс Карт недоступен. Попробуйте сменить сеть или отключить
            VPN.
          </div>
        )}
      </div>
    );
  }

  return TabDisplayingPointsOnMap;
};

const TabDisplayingPointsOnMap = ({ markers, st, activeTab }) => {
  let TabMap = null;

  for (let i = 1; i <= activeTab; i++) {
    TabMap = createTabDisplayingPointsOnMap(i);
  }

  return <TabMap markers={markers} st={st} />;
};

export default TabDisplayingPointsOnMap;

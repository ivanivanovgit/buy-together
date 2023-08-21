// MapRoute.js
import { YMaps } from "@pbe/react-yandex-maps";
import RouteMap from "./RouteMap";

export default function MapRoute({
  mapStyle,
  setFirstPoint,
  setSecondPoint,
  firstPointRef,
  secondPointRef,
  setMessageFirstPoint,
}) {
  return (
    <YMaps
      query={{
        apikey: process.env.apiYanKey,
        lang: "ru_RU",
        load: "package.full",
      }}
    >
      <RouteMap
        mapStyle={mapStyle}
        setFirstPoint={setFirstPoint}
        setSecondPoint={setSecondPoint}
        firstPointRef={firstPointRef}
        secondPointRef={secondPointRef}
        setMessageFirstPoint={setMessageFirstPoint}
      />
    </YMaps>
  );
}

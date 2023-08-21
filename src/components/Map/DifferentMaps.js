// DifferentMaps.js
import { YMaps } from "@pbe/react-yandex-maps";
import TabDisplayingPointsOnMap from "./TabDisplayingPointsOnMap";

function DifferentMaps({ markers, st, idTab }) {
  return (
    <YMaps
      query={{
        apikey: process.env.apiYanKey,
        lang: "ru_RU",
        load: "package.full",
      }}
    >
      <TabDisplayingPointsOnMap markers={markers} st={st} activeTab={idTab} />
    </YMaps>
  );
}

export default DifferentMaps;

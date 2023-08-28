// MapChat.js

import ChatMap from "./ChatMap";
import { YMaps } from "@pbe/react-yandex-maps";

export default function MapChat({ mapStyle, searchInputRef }) {
  return (
    <YMaps
      query={{
        apikey: process.env.apiYanKey,
        lang: "en_US",
        load: "package.full",
      }}
    >
      <ChatMap mapStyle={mapStyle} searchInputRef={searchInputRef} />
    </YMaps>
  );
}

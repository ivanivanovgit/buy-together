// chat-on-the-map.jsx
import Head from "next/head";
import { useTheme, useMediaQuery } from "@mui/material";
import MapChat from "../src/components/Map/MapChat";
import HorizontChatMap from "../src/components/Auxiliary/HorizontChatMap";
import VerticalChatMap from "../src/components/Auxiliary/VerticalChatMap";
const Chatnakarte = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const HorOrVer = (mapStyle) => {
    const mapChat = <MapChat mapStyle={mapStyle} />;
    return mapChat;
  };

  return (
    <>
      <Head>
        <title>Chat on the map, online map with chat, map chat</title>
        <meta
          name="description"
          content="Chat on the map: this is the main tab of the service, where you can exchange messages by placing them on the map."
        />
      </Head>
      {isMatch ? (
        <VerticalChatMap mapChat={HorOrVer("mapStyleVerticalMapChat")} />
      ) : (
        <HorizontChatMap mapChat={HorOrVer("mapStyleHorizontMapChat")} />
      )}
    </>
  );
};

export default Chatnakarte;

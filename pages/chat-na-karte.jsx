// chat-na-karte.jsx
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
        <title>Чат на карте, карты онлайн с чатом, map чат</title>
        <meta
          name="description"
          content="Чат на карте: это основная вкладка сервиса, на ней можно обмениваться сообщениями, размещая их на карте. Таким образом, удобно объединяться для совместных покупок (покупок вскладчину)"
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

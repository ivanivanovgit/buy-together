// telegram.jsx
import Head from "next/head";
import { useTheme, useMediaQuery } from "@mui/material";
import HorizontTelegram from "../src/components/Auxiliary/HorizontTelegram";
import VerticalTelegram from "../src/components/Auxiliary/VerticalTelegram";

const Help = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Head>
        <title>List of telegram channels for chat on the map</title>
        <meta
          name="description"
          content="List of telegram channels for chat on the map"
        />
      </Head>
      {isMatch ? <VerticalTelegram /> : <HorizontTelegram />}
    </>
  );
};

export default Help;

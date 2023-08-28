// index.jsx
import Head from "next/head";
import { useTheme, useMediaQuery } from "@mui/material";
import HorizontHome from "../src/components/Auxiliary/HorizontHome";
import VerticalHome from "../src/components/Auxiliary/VerticalHome";

export default function Home() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Head>
        <title>Chat on the map</title>
        <meta
          name="description"
          content="Using the 'Chat on the map' service, you can leave a message on the map and share it with other people."
        />
      </Head>
      {isMatch ? <VerticalHome /> : <HorizontHome />}
    </>
  );
}

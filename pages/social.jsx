// social.jsx
import Head from "next/head";
import { useTheme, useMediaQuery } from "@mui/material";
import HorizontSocial from "../src/components/Auxiliary/HorizontSocial";
import VerticalSocial from "../src/components/Auxiliary/VerticalSocial";

const Help = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Head>
        <title>List of social channels for chat on the map</title>
        <meta
          name="description"
          content="List of social channels for chat on the map"
        />
      </Head>
      {isMatch ? <VerticalSocial /> : <HorizontSocial />}
    </>
  );
};

export default Help;

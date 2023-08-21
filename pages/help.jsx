// help.jsx
import Head from "next/head";
import { useTheme, useMediaQuery } from "@mui/material";
import HorizontHelp from "../src/components/Auxiliary/HorizontHelp";
import VerticalHelp from "../src/components/Auxiliary/VerticalHelp";

const Help = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <Head>
        <title>
          Инструкция по работе сервиса "Купим вместе" (чат на карте и поиск
          попутных машин)
        </title>
        <meta
          name="description"
          content='Инструкция по работе Сервиса "Купим вместе" (чат на карте и поиск попутных машин)'
        />
      </Head>
      {isMatch ? <VerticalHelp /> : <HorizontHelp />}
    </>
  );
};

export default Help;

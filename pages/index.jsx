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
        <title>
          Сервис "Купим вместе" (чат на карте и поиск попутных машин)
        </title>
        <meta
          name="description"
          content="Купим вместе — это сервис для совместных покупок (чат на карте) и поиска попутных машин"
        />
      </Head>
      {isMatch ? <VerticalHome /> : <HorizontHome />}
    </>
  );
}

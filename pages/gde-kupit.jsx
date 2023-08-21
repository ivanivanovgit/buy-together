// gde-kupit.jsx
import Head from "next/head";
import pool from "../src/utils/db";
import { useTheme, useMediaQuery } from "@mui/material";
import DifferentMaps from "../src/components/Map/DifferentMaps";
import HorizontTabsGde from "../src/components/Auxiliary/HorizontTabsGde";
import VerticalTabsGde from "../src/components/Auxiliary/VerticalTabsGde";

const Gdekupit = ({ markers }) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const HorOrVer = (st) => {
    const tabs = [
      {
        title: "Карта строительных рынков Московской области",
        content: (
          <div>
            <DifferentMaps markers={markers} st={st} idTab={1} />
          </div>
        ),
      },
      {
        title: "Карта торфяных карьеров Московской и Смоленской областях",
        content: (
          <div>
            <DifferentMaps markers={markers} st={st} idTab={2} />
          </div>
        ),
      },
    ];
    return tabs;
  };

  return (
    <div>
      <Head>
        <title>
          Где купить: карта торфяных карьеров Московской и Смоленской областях,
          карта строительных рынков Московской области
        </title>
        <meta
          name="description"
          content="Где купить: карта торфяных карьеров Московской и Смоленской областях, карта строительных рынков Московской области"
        />
      </Head>
      {isMatch ? (
        <VerticalTabsGde tabs={HorOrVer("mapStyleVerticalTabs")} />
      ) : (
        <HorizontTabsGde tabs={HorOrVer("mapStyleHorizonTabs")} />
      )}
    </div>
  );
};

export default Gdekupit;

export async function getStaticProps() {
  const { rows: markers } = await pool.query("SELECT * FROM markers");

  return {
    props: { markers },
    revalidate: 60,
  };
}

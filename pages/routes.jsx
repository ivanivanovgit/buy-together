// routes.jsx
import Head from "next/head";
import { useTheme, useMediaQuery } from "@mui/material";
import HorizontRoute from "../src/components/Auxiliary/HorizontRoute";
import VerticalRoute from "../src/components/Auxiliary/VerticalRoute";
import MapRoute from "../src/components/Map/MapRoute";

const Routes = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const HorOrVer = (mapStyle) => {
    const mapRoute = <MapRoute mapStyle={mapStyle} />;
    return mapRoute;
  };

  return (
    <>
      <Head>
        <title>
          The 'routes' service, where you can view or add a route by message.
        </title>
        <meta
          name="description"
          content="You can find or add information about routes."
        />
      </Head>
      {isMatch ? (
        <VerticalRoute mapRoute={HorOrVer("mapStyleVerticalMapRoute")} />
      ) : (
        <HorizontRoute mapRoute={HorOrVer("mapStyleHorizontMapRoute")} />
      )}
    </>
  );
};

export default Routes;

// VerticalRoute.js
import styles from "../../../styles/VerticalRouteMap.module.scss";
import RouteMapLayout from "./RouteMapLayout";
import ScrollTopButton from "../../components/Auxiliary/ScrollTopButton";
function VerticalRoute({ mapRoute }) {
  return (
    <>
      <RouteMapLayout mapRoute={mapRoute} layoutStyles={styles} />
      <ScrollTopButton />
    </>
  );
}

export default VerticalRoute;

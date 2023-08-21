// HorizontRoute.js
import styles from "../../../styles/HorizontRouteMap.module.scss";
import RouteMapLayout from "./RouteMapLayout";

function HorizontRoute({ mapRoute }) {
  return <RouteMapLayout mapRoute={mapRoute} layoutStyles={styles} />;
}

export default HorizontRoute;

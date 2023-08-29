// getAddress.js
import { setIsMarkerPlaced } from "../redux/slices/chatSlices/chatMapSlice";

export function getAddress(
  ymaps,
  coords,
  myPlacemark,
  onAddressChange,
  selectedAddress,
  dispatch
) {
  if (!myPlacemark) {
    return;
  }

  ymaps.geocode(coords).then(function (res) {
    var firstGeoObject = res.geoObjects.get(0);

    const address = [
      firstGeoObject.getLocalities().length
        ? firstGeoObject.getLocalities()
        : firstGeoObject.getAdministrativeAreas(),
      firstGeoObject.getThoroughfare() || firstGeoObject.getPremise() || "",
    ]
      .filter(Boolean)
      .join(", ");

    myPlacemark.properties.set({
      iconCaption: address,
    });

    if (typeof onAddressChange === "function" && !selectedAddress) {
      onAddressChange(address);
    }
    if (dispatch) {
      dispatch(setIsMarkerPlaced(true));
    }
  });
}

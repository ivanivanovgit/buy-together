// getShareCoordsZoom.js

export const getShareCoordsZoom = async (
  shareMarkerId,
  shareMarkerTheme,
  getShareMarker,
  coords,
  zoom,
  zoomMax
) => {
  if (shareMarkerId && shareMarkerTheme) {
    try {
      const sharedMarker = await getShareMarker(shareMarkerId);
      if (sharedMarker && sharedMarker.lat && sharedMarker.lng) {
        coords = [sharedMarker.lat, sharedMarker.lng];
        zoom = zoomMax;
      }
    } catch (error) {
      console.error(
        "Error when retrieving information about the marker: ",
        error
      );
    }
  }
};

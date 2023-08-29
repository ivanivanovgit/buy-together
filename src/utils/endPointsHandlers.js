// endPointsHandlers.js

import axios from "axios";

export async function getShareMarker(markerId) {
  try {
    const response = await axios.get(
      `/api/chat-markers/share-marker/${markerId}`
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (error) {
    console.error(error);

    throw new Error("There is no marker with the specified theme and message");
  }
}

export async function checkDuplicateMarkerCoords(lat, lng) {
  try {
    const response = await axios.post(
      `/api/chat-markers/check-duplicate-coords`,
      {
        lat,
        lng,
      }
    );
    const { isDuplicateCoords } = response.data;
    return isDuplicateCoords;
  } catch (error) {
    console.error(
      "Error while checking duplicate markers with the same coords: ",
      error
    );
    throw error;
  }
}

export async function checkDuplicateMarker(lat, lng, message) {
  try {
    const response = await axios.post(`/api/chat-markers/check-duplicate`, {
      lat,
      lng,
      message,
    });
    const { isDuplicate } = response.data;
    return isDuplicate;
  } catch (error) {
    console.error("Error while checking duplicate markers: ", error);
    throw error;
  }
}

export async function checkThemeHasMarkers(theme) {
  try {
    const response = await axios.get(`/api/chat-markers/has-markers/${theme}`);
    const { hasMarkers } = response.data;
    return hasMarkers;
  } catch (error) {
    console.error("Error while checking markers for theme: ", error);
    throw error;
  }
}

export async function removeMarkerFromDB(markerId) {
  try {
    const response = await axios.delete(
      `/api/chat-markers/delete-marker/${markerId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchMarkersByTheme(theme) {
  try {
    const response = await axios.get(`/api/chat-markers/${theme}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchThemes() {
  try {
    const response = await axios.get("/api/chat-markers/themes");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getMarkersFromDatabase() {
  try {
    const response = await axios.get("/api/chat-markers");
    return response.data;
  } catch (error) {
    console.error(`Error in fetchMarkersFromDatabase: ${error.message}`);
    return [];
  }
}

export const addMarkerToDatabase = async (lat, lng, theme, message_markers) => {
  try {
    const response = await axios.post("/api/chat-markers", {
      lat: lat,
      lng: lng,
      theme: theme,
      message_markers: message_markers,
    });
    return response.data;
    /*  console.log("Маркер успешно добавлен в БД с markerId: " + response.data.markerId); */
  } catch (error) {
    console.error("Error when adding the marker to the database: ", error);
  }
};

export async function getRoutes() {
  try {
    const response = await axios.get("/api/routes");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function addRoute(route) {
  const {
    first_latitude,
    first_longitude,
    second_latitude,
    second_longitude,
    message,
  } = route;

  try {
    const existingRoutesResponse = await axios.get("/api/routes");
    const existingRoutes = existingRoutesResponse.data;

    for (let existingRoute of existingRoutes) {
      if (
        existingRoute.first_latitude === first_latitude &&
        existingRoute.first_longitude === first_longitude &&
        existingRoute.second_latitude === second_latitude &&
        existingRoute.second_longitude === second_longitude
      ) {
        return "A route with these coordinates already exists";
      }
    }

    const response = await axios.post("/api/routes", {
      first_latitude,
      first_longitude,
      second_latitude,
      second_longitude,
      message,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteRoute(routeId) {
  try {
    await axios.delete(`/api/routes/${routeId}`);
  } catch (error) {
    console.error(error);
  }
}

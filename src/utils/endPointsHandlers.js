// endPointsHandlers.js

import axios from "axios";

// Получение маркера из БД по id
export async function getShareMarker(markerId) {
  try {
    const response = await axios.get(
      `/api/chat-markers/share-marker/${markerId}`
    );
    // Проверяем, есть ли в ответе ошибка
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    return response.data;
  } catch (error) {
    console.error(error);
    // Если возникла ошибка, возвращаем сообщение об ошибке
    throw new Error("Маркера с заданной темой и сообщением не существует");
  }
}

// Проверка наличия дубликата маркера с одинаковыми координатами в БД
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

// Проверка наличия дубликата маркера в БД
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

// Проверка наличия маркеров в БД по теме
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

// Удаление маркера из БД
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

// Извлечение записей chat_markers по теме из БД
export async function fetchMarkersByTheme(theme) {
  try {
    const response = await axios.get(`/api/chat-markers/${theme}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Извлечение тем из БД
export async function fetchThemes() {
  try {
    const response = await axios.get("/api/chat-markers/themes");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Получить все маркеры с сообщениями
export async function getMarkersFromDatabase() {
  try {
    const response = await axios.get("/api/chat-markers");
    return response.data;
  } catch (error) {
    console.error(`Error in fetchMarkersFromDatabase: ${error.message}`);
    return [];
  }
}

// Добавить маркер с сообшением
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
    console.error("Ошибка при добавлении маркера в БД: ", error);
  }
};

// Получить все маршруты
export async function getRoutes() {
  try {
    const response = await axios.get("/api/routes");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Добавить новый маршрут
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
        // Маршрут уже существует
        return "Маршрут с такими координатами уже существует";
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

// Удалить маршрут
export async function deleteRoute(routeId) {
  try {
    await axios.delete(`/api/routes/${routeId}`);
  } catch (error) {
    console.error(error);
  }
}

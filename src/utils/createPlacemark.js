// createPlacemark.js

// функция для создания метки
export function createPlacemark(ymaps, coords, MyIconContentLayout) {
  const placemark = new ymaps.Placemark(
    coords,
    {
      ///
      /*  iconCaption: "Поиск...", */
      ///
    },
    {
      ///
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: "default#imageWithContent",
      // Своё изображение иконки метки.
      iconImageHref: "images/marker.png",
      // Размеры метки.
      iconImageSize: [30, 43],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-18, -43],
      // Смещение слоя с содержимым относительно слоя с картинкой.
      iconContentOffset: [35, -10],
      // Макет содержимого.
      iconContentLayout: MyIconContentLayout,
      ///
    }
  );

  return placemark;
}

// createPlacemark.js

export function createPlacemark(ymaps, coords, MyIconContentLayout) {
  const placemark = new ymaps.Placemark(
    coords,
    {
      ///
      ///
    },
    {
      ///

      iconLayout: "default#imageWithContent",

      iconImageHref: "images/marker.png",

      iconImageSize: [30, 43],

      iconImageOffset: [-18, -43],

      iconContentOffset: [35, -10],

      iconContentLayout: MyIconContentLayout,
      ///
    }
  );

  return placemark;
}

// placemarkOptions.js
import { setShowMessage } from "../redux/slices/chatSlices/chatMapSlice";

export const balloonContentTemplate = `
  <div class="custom-balloon">
    $[properties.balloonContent]
    <div class="button-delete-marker">
      <button id="delete-marker-button">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Удалить
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </button>
    </div>
    <div class="button-share-marker">
      <button id="share-marker-button">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Поделиться
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </button>
    </div>
    <div class="custom-orange-balloon__close">&times;</div>
  </div>
`;

export function buildFunction() {
  this.constructor.superclass.build.call(this);

  const deleteButton = this.getParentElement().querySelector(
    "#delete-marker-button"
  );
  deleteButton.addEventListener("click", this.onButtonClick);

  const shareButton = this.getParentElement().querySelector(
    "#share-marker-button"
  );
  shareButton.addEventListener("click", this.onShareButtonClick);

  const closeButton = this.getParentElement().querySelector(
    ".custom-orange-balloon__close"
  );
  closeButton.addEventListener("click", this.onCloseButtonClick);
}

export function clearFunction() {
  const deleteButton = this.getParentElement().querySelector(
    "#delete-marker-button"
  );
  deleteButton.removeEventListener("click", this.onButtonClick);

  const shareButton = this.getParentElement().querySelector(
    "#share-marker-button"
  );
  shareButton.removeEventListener("click", this.onShareButtonClick);

  const closeButton = this.getParentElement().querySelector(
    ".custom-orange-balloon__close"
  );
  closeButton.removeEventListener("click", this.onCloseButtonClick);

  this.constructor.superclass.clear.call(this);
}

export const balloonContentTemplateRoute = `
  <div class="custom-balloon">
    $[properties.balloonContent]
    <div class="button-delete-marker">
      <button id="delete-marker-button">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Удалить
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </button>
    </div>
    <div class="custom-orange-balloon__close">&times;</div>
  </div>
`;

export function buildFunctionRoute() {
  this.constructor.superclass.build.call(this);

  const deleteButton = this.getParentElement().querySelector(
    "#delete-marker-button"
  );
  deleteButton.addEventListener("click", this.onButtonClick);

  const closeButton = this.getParentElement().querySelector(
    ".custom-orange-balloon__close"
  );
  closeButton.addEventListener("click", this.onCloseButtonClick);
}

export function clearFunctionRoute() {
  const deleteButton = this.getParentElement().querySelector(
    "#delete-marker-button"
  );
  deleteButton.removeEventListener("click", this.onButtonClick);

  const closeButton = this.getParentElement().querySelector(
    ".custom-orange-balloon__close"
  );
  closeButton.removeEventListener("click", this.onCloseButtonClick);

  this.constructor.superclass.clear.call(this);
}

export function getPlacemarkOptions(MyBalloonContentLayout, ymaps) {
  return {
    // balloon settings
    balloonLayout: "default#imageWithContent",
    balloonAutoPan: true,
    balloonPanelMaxMapArea: 0,
    hideIconOnBalloonOpen: false,
    balloonOffset: [18, -90],
    balloonContentLayout: MyBalloonContentLayout,
    balloonCloseButton: false,

    // icon settings
    iconLayout: "default#image",
    iconImageHref: "images/Orangemarker.png",
    iconImageSize: [30, 43],
    iconImageOffset: [-18, -43],
    iconContentLayout: ymaps.templateLayoutFactory.createClass(
      "<div>$[properties.iconContent]</div>"
    ),
  };
}

// Получить ID маркера и поделиться ссылкой на маркер
export async function shareMarker(addPlacemark, getShareMarker, dispatch) {
  if (!addPlacemark || !getShareMarker || !setShowMessage) return;

  const markerId = addPlacemark.properties.get("id");

  if (typeof window !== "undefined") {
    try {
      const markerData = await getShareMarker(markerId);
      const theme = markerData.theme; // получаем тему маркера
      const host_name = window.location.host;

      // Создаем ссылку на маркер с темой
      const url = `${host_name}/chat-na-karte?id=${markerId}&theme=${theme}`;

      // Копировать ссылку в буфер обмена
      navigator.clipboard.writeText(url).then(() => {});

      dispatch(setShowMessage("Маркер скопирован в буфер обмена"));

      setTimeout(() => {
        dispatch(setShowMessage(""));
      }, 3000);
    } catch (error) {
      console.error("Ошибка при получении информации о маркере: ", error);
    }
  }
}

// HomeLayout.js
import Image from "next/image";
import mainMap from "../../../public/images/main-map.png";
import ActiveLink from "./ActiveLink";

function HomeLayout({ stylesHome }) {
  return (
    <div className={stylesHome.container}>
      <div
        className={`${stylesHome.imageContainerHome} ${stylesHome.imageContainerMainMap}`}
      >
        <div className={stylesHome.widthMainMap}>
          <Image
            src={mainMap}
            alt="Чат на карте: карты онлайн с чатом"
            width="auto"
            height="auto"
            priority
          />
        </div>
      </div>
      <p className={`${stylesHome.text} ${stylesHome.textMainMap}`}>
        <span className={stylesHome.bold}>Купим вместе</span> — это сервис для
        совместных покупок (чат на карте) и поиска попутных машин.
      </p>
      <p className={stylesHome.text}>
        Функционал сервиса включает три ключевые вкладки: "Чат на карте", "Поиск
        попутных машин" и "Где купить", которые работают без регистрациии.
        Использование сервиса абсолютно бесплатно.
      </p>

      <ul className={stylesHome.bulletList}>
        <li>
          <ActiveLink href="/chat-on-the-map">
            <span
              className={`${stylesHome.subsectionTitle} ${stylesHome.homeLink}`}
            >
              Чат на карте:{" "}
            </span>
          </ActiveLink>
          это основная вкладка сервиса, на ней можно обмениваться сообщениями,
          размещая их на карте. Таким образом, удобно объединяться для
          совместных покупок (покупок вскладчину).
        </li>
        <li>
          <ActiveLink href="/passing-cars">
            <span
              className={`${stylesHome.subsectionTitle} ${stylesHome.homeLink}`}
            >
              Поиск попутных машин:{" "}
            </span>
          </ActiveLink>
          на данной вкладке Вы можете посмотреть или добавить информацию о
          попутных машинах для перевозки грузов.
        </li>
      </ul>

      <p className={stylesHome.text}>
        В разделе{" "}
        <ActiveLink href="/social">
          <span
            className={`${stylesHome.subsectionTitle} ${stylesHome.homeLink}`}
          >
            "Social channels"
          </span>
        </ActiveLink>{" "}
        You can find a list of channels that are useful for the construction
      </p>
      <div className={`${stylesHome.sectionTitle} ${stylesHome.sectionMt6}`}>
        Примеры использования сервиса
      </div>

      <ol className={stylesHome.numberedList}>
        <li>
          Например, Вы стали собственником квартиры в новом комплексе или дачи в
          садовом товариществе. Тогда с помощью данного сервиса можно легко
          спланировать совместную покупку (покупку вскладчину) строительных
          материалов, экономя на доставке крупногабаритных товаров.
        </li>
        <li>
          Если после ремонта у Вас остались стройматериалы, которые вы хотите
          продать, то Вы можете оставить объявление на вкладке "Чат на карте",
          чтобы найти поблизости желающих купить их.
        </li>
        <li>
          Например, Вы регулярно следуете определённому маршруту на работу или
          перевозите груз. Тогда, можно добавить информацию о вашем маршруте на
          вкладке "Поиск попутных машин" и получить возможность заработать на
          этом.
        </li>
      </ol>

      <p className={stylesHome.text}>
        Делитесь данным сервисом с друзьями, соседями и знакомыми в общих чатах
        и группах.
      </p>
    </div>
  );
}

export default HomeLayout;

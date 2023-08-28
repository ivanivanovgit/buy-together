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
            alt="Chat on the map: maps online with chat"
            width="auto"
            height="auto"
            priority
          />
        </div>
      </div>
      <p className={`${stylesHome.text} ${stylesHome.textMainMap}`}>
        Using the <span className={stylesHome.bold}>'Chat on the map'</span>{" "}
        service, you can leave a message on the map and share it with other
        people.
      </p>
      <p className={stylesHome.text}>
        The service's functionality includes two key tabs: "Chat on the map" and
        "Routes", which operate without registration. The use of the service is
        completely free.
      </p>

      <ul className={stylesHome.bulletList}>
        <li>
          <ActiveLink href="/chat-on-the-map">
            <span
              className={`${stylesHome.subsectionTitle} ${stylesHome.homeLink}`}
            >
              Chat on the map:{" "}
            </span>
          </ActiveLink>
          this is the main tab of the service, where you can exchange messages
          by placing them on the map. In this way, it's convenient to come
          together for various things, such as group purchases, choosing a
          restaurant, and so on
        </li>
        <li>
          <ActiveLink href="/routes">
            <span
              className={`${stylesHome.subsectionTitle} ${stylesHome.homeLink}`}
            >
              Routes{" "}
            </span>
          </ActiveLink>
          on this tab, you can view or add information about routes with a
          message. It's convenient for planning a route on a trip with friends,
          finding rideshare vehicles, and so on.
        </li>
      </ul>

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

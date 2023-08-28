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
        Examples of using the service
      </div>

      <ol className={stylesHome.numberedList}>
        <li>
          For instance, if you've become the owner of an apartment in a new
          complex or a summer house in a gardening association, then with the
          help of this service, you can easily plan a joint purchase of building
          materials, saving on the delivery of bulky goods.
        </li>
        <li>
          For example, if you and your friends are choosing a cafe, with the
          help of this service, you can easily exchange messages on the map, and
          in this way, more conveniently and quickly select a suitable place.
        </li>
        <li>
          For example, if you regularly follow a specific route to work, you can
          add information about your route in the "Routes" tab and get the
          opportunity to earn money by delivering cargo on the way
        </li>
      </ol>

      <p className={stylesHome.text}>
        Share this service with friends, neighbors, and acquaintances in common
        chats and groups.
      </p>
    </div>
  );
}

export default HomeLayout;

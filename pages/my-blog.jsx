// my-blog.jsx
import Head from "next/head";
import styles from "../styles/Blog.module.scss";
/* import Accordion from "../src/components/Auxiliary/Accordion";
import CityList from "../src/components/Auxiliary/CityList"; */
import ActiveLink from "../src/components/Auxiliary/ActiveLink";
import { Constants } from "../src/CONSTANTS";

const MyBlog = () => {
  return (
    <>
      <Head>
        <title>
          Blog with examples of using the 'Chat on the map' service.'
        </title>
        <meta
          name="description"
          content="Blog with examples of using the 'Chat on the map' service.'"
        />
      </Head>
      <div className={styles.container}>
        <div>
          <div className={styles.sectionTitle}>
            Service usage: examples and options
          </div>
          <ul className={styles.bulletList}>
            <ActiveLink
              href="/blog-service-map-chat-restaurant"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Choosing a restaurant using the "Chat on the map" service
                </span>
              </li>
            </ActiveLink>
            <ActiveLink
              href="/blog-hitchhiking"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Hitchhiking journey using the "Chat on the map" service
                </span>
              </li>
            </ActiveLink>
            <ActiveLink
              href="/blog-service-map-chat-delivery"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Turning Your Daily Route into a Profitable Journey with "Chat
                  on the Map"
                </span>
              </li>
            </ActiveLink>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MyBlog;

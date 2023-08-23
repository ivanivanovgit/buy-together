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
          Блог с примерами использования сервиса "Купим вместе" (чат на карте,
          поиск попутных машин, совместные покупки)
        </title>
        <meta
          name="description"
          content='Блог с примерами использования сервиса "Купим вместе" (чат на карте, поиск попутных машин, совместные покупки)'
        />
      </Head>
      <div className={styles.container}>
        <div>
          <div className={styles.sectionTitle}>
            Использование сервиса: примеры и варианты
          </div>
          <ul className={styles.bulletList}>
            <ActiveLink
              href="/blog-servis-map-chat"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Сервис "Map-чат" поможет, если остались стройматериалы после
                  ремонта
                </span>
              </li>
            </ActiveLink>
            <ActiveLink
              href="/blog-puteshestvie-po-rossii-na-poputnyh-mashinah"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Путешествие по России на попутных машинах
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

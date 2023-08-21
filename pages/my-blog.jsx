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
              href="/blog-sovmestnaya-pokupka-torfa"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Совместная покупка торфа или плодородного грунта на дачу
                </span>
              </li>
            </ActiveLink>
            <ActiveLink
              href="/blog-zarabotok-na-prodazhe-meshkov"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Заработок на продаже мешков с торфом и грунтом
                </span>
              </li>
            </ActiveLink>
            <ActiveLink
              href="/blog-priobretenie-vintovyh-svaj"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Приобретение винтовых свай и экономия на доставке
                </span>
              </li>
            </ActiveLink>
            <ActiveLink
              href="/blog-sovmestnaya-pokupka-plodovyh"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Совместная покупка плодовых деревьев на участок.
                </span>
              </li>
            </ActiveLink>
            <ActiveLink
              href="/blog-barter-pri-pomoshchi-servisa-chat-na-karte"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Бартер при помощи сервиса "Чат на карте"
                </span>
              </li>
            </ActiveLink>
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
              href="/blog-pokupka-vskladchinu-dlya-prodazhi-tovarov-na-wildberries"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Покупка вскладчину для продажи товаров на Wildberries
                </span>
              </li>
            </ActiveLink>
            <ActiveLink
              href="/blog-karty-onlajn-s-chatom-dlya-poiska-strojmaterialov-poblizosti"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Карта онлайн с чатом для поиска стройматериалов поблизости
                </span>
              </li>
            </ActiveLink>
            <ActiveLink
              href="/blog-stroitelstvo-zabora"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Экономия на строительстве забора при помощи сервиса "Купим
                  вместе".
                </span>
              </li>
            </ActiveLink>
            <ActiveLink
              href="/blog-sovmestnaya-pokupka-vskladchinu-obreznogo-pilomateriala"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Совместная покупка (вскладчину) обрезного пиломатериала
                </span>
              </li>
            </ActiveLink>
            <ActiveLink
              href="/blog-ekonomiya-na-pokupkah-s-aliExpress"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Экономия на покупках с AliExpress при помощи сервиса "Купим
                  вместе"
                </span>
              </li>
            </ActiveLink>
            <ActiveLink
              href="/blog-poisk-poputnoj-mashiny-dlya-perevozki-sypuchih-materialov"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Поиск попутной машины для перевозки сыпучих материалов
                </span>
              </li>
            </ActiveLink>
            <ActiveLink
              href="/blog-otpravka-gruza-poputnoj-mashinoj"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Отправка груза попутной машиной
                </span>
              </li>
            </ActiveLink>
            <ActiveLink
              href="/blog-kak-najti-poputnuyu-mashinu"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  "Сарафанное радио" среди водителей или как найти попутную
                  машину в своем городе
                </span>
              </li>
            </ActiveLink>
            <ActiveLink
              href="/blog-ekonomiya-na-dostavke-pri-pomoshchi-poputnoj-mashiny"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Экономия на доставке при помощи попутной машины
                </span>
              </li>
            </ActiveLink>
            <ActiveLink
              href="/blog-zakaz-podhodyashchego-torfa-s-karera"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Заказ подходящего торфа с карьера
                </span>
              </li>
            </ActiveLink>
            <ActiveLink
              href="/blog-besplatnoe-i-bez-registracii-razmeshchenie-obyavlenij"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Бесплатное и без регистрации размещение объявлений на сервисе
                  "Купим вместе"
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
            <ActiveLink
              href="/blog-sovmestnaya-pokupka-na-optovyh-produktovyh-rynkah"
              hoverStyle={{ color: Constants.thirdColor }}
            >
              <li>
                <span className={styles.subsectionTitle}>
                  Совместная покупка на оптовых продуктовых рынках для экономии
                  семейного бюджета
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

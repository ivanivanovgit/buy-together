// blog-servis-map-chat.jsx
import Head from "next/head";
import styles from "../styles/Blog.module.scss";
import Accordion from "../src/components/Auxiliary/Accordion";
import CityList from "../src/components/Auxiliary/CityList";

function blogServisMapChat() {
  return (
    <>
      <Head>
        <title>Map-чат без регистрации</title>
        <meta name="description" content="Map-чат без регистрации" />
      </Head>
      <div className={styles.container}>
        <div className={`${styles.sectionTitle} ${styles.centerText}`}>
          Сервис "Map-чат" поможет, если остались стройматериалы после ремонта
        </div>
        <div className={styles.text}>
          После завершения ремонтных работ часто остаются лишние стройматериалы.
          Куда деть обрезки ламината, остатки краски или несколько лишних плиток
          керамогранита? Сервис "Map-чat" приходит на помощь, предлагая решение
          этой распространенной проблемы.
        </div>
        <div className={styles.subsectionTitle}>
          Что делать с остатками стройматериалов?
        </div>
        <div className={styles.text}>
          Вместо того чтобы выбрасывать оставшиеся после ремонта материалы или
          хранить их годами в гараже, вы можете обменять их или даже продать.
          Неиспользуемые стройматериалы могут пригодиться кому-то еще. Кто
          знает, возможно, вашими остатками керамогранита кто-то закончит
          облицовку ванной, а краска пригодится для обновления старой мебели.
        </div>
        <div className={styles.subsectionTitle}>
          Как сервис "Map-чat" может помочь?
        </div>
        <div className={styles.text}>
          "Map-чat" - это уникальная платформа, которая позволяет пользователям
          обмениваться, продавать или даже дарить ненужные им вещи. Это отличное
          решение для тех, у кого остались стройматериалы после ремонта. Вы
          можете разместить информацию о том, что у вас есть, и люди в вашем
          районе смогут связаться с вами для обмена или покупки.
        </div>
        <div className={styles.subsectionTitle}>Заключение</div>
        <div className={styles.text}>
          Не позволяйте остаткам стройматериалов занимать место в вашем доме или
          выбрасывайте их на свалку. Используйте сервис "Map-чat", чтобы найти
          им новое применение и, возможно, помочь другим людям сэкономить на их
          ремонтных проектах. Это удобно, экологично и может даже принести Вам
          небольшую прибыль.
        </div>
        <Accordion
          id="accordionBlog"
          title={<div>Возможно вы искали:</div>}
          open={true}
          /*    open={false} */
        >
          <CityList
            phrases={[
              "map-чат в CITY",
              "сервис map-чат без регистрации в CITY",
            ]}
            param="sortBegin"
          />
        </Accordion>
      </div>
    </>
  );
}

export default blogServisMapChat;

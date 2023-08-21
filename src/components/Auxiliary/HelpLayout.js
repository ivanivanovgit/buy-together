// HelpLayout.js
import ActiveLink from "./ActiveLink";
import InstructionChatMap from "./InstructionChatMap";
import InstructionRoute from "./InstructionRoute";
import InstructionGde from "./InstructionGde";
import ScrollTopButton from "./ScrollTopButton";
import stylesHelp from "../../../styles/Help.module.scss";

function HelpLayout({ stylesVideo }) {
  return (
    <div className={stylesHelp.container}>
      <div className={stylesHelp.sectionTitle}>
        Инструкция по работе сервиса "Купим вместе".
      </div>
      <ol className={stylesHelp.numberedMainListHelp}>
        <ActiveLink href="/help#chat-na-karte">
          <li>Раздел "Чат на карте"?</li>
        </ActiveLink>
        <ol className={stylesHelp.numberedSubListHelp}>
          <ActiveLink href="/help#search-adress">
            <li>Выбор адреса для маркера</li>
          </ActiveLink>
          <ActiveLink href="/help#choice-theme">
            <li>Выбор темы</li>
          </ActiveLink>
          <ActiveLink href="/help#adding-theme">
            <li>Добавление темы</li>
          </ActiveLink>
          <ActiveLink href="/help#deleting-theme">
            <li>Удаление темы</li>
          </ActiveLink>
          <ActiveLink href="/help#show-all-markers">
            <li>Показать маркеры по всем темам</li>
          </ActiveLink>
          <ActiveLink href="/help#add-marker">
            <li>Добавление маркера с сообщением на карту</li>
          </ActiveLink>
          <ActiveLink href="/help#delete-marker">
            <li>Просмотр и удаление сообщений с карты</li>
          </ActiveLink>
          <ActiveLink href="/help#share-marker">
            <li>Поделиться маркером</li>
          </ActiveLink>
        </ol>
        <ActiveLink href="/help#search-route">
          <li>Раздел "Поиск попутных машин"</li>
        </ActiveLink>
        <ol className={stylesHelp.numberedSubListHelp}>
          <ActiveLink href="/help#add-route">
            <li>Добавление маршрута</li>
          </ActiveLink>
          <ActiveLink href="/help#delete-route">
            <li>Удаление маршрута</li>
          </ActiveLink>
          <ActiveLink href="/help#clear-fields">
            <li>Очищение полей</li>
          </ActiveLink>
        </ol>
        <ActiveLink href="/help#gde-kupit">
          <li>Раздел "Где купить"</li>
        </ActiveLink>
        <ActiveLink href="/help#error-loading-map">
          <li>Ошибка загрузки карты</li>
        </ActiveLink>
      </ol>
      <InstructionChatMap stylesVideo={stylesVideo} />
      <InstructionRoute stylesVideo={stylesVideo} />
      <InstructionGde />
      <ScrollTopButton />
    </div>
  );
}

export default HelpLayout;

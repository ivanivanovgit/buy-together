// HorizontChatMap.js

import styles from "../../../styles/HorizontChatMap.module.scss";
import ChatMapLayout from "./ChatMapLayout";

function HorizontChatMap({ mapChat }) {
  return <ChatMapLayout mapChat={mapChat} layoutStyles={styles} />;
}

export default HorizontChatMap;

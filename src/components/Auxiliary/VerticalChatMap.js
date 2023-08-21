// VerticalChatMap.js
import styles from "../../../styles/VerticalChatMap.module.scss";
import ChatMapLayout from "./ChatMapLayout";
import ScrollTopButton from "../../components/Auxiliary/ScrollTopButton";

function VerticalChatMap({ mapChat }) {
  return (
    <>
      <ChatMapLayout mapChat={mapChat} layoutStyles={styles} />
      <ScrollTopButton />
    </>
  );
}

export default VerticalChatMap;

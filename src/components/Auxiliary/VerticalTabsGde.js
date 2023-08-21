import styles from "../../../styles/VerticalTabsGde.module.scss";
import { useState } from "react";
import ScrollTopButton from "../../components/Auxiliary/ScrollTopButton";

const HorizontakTabsGde = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.tabs}>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`${styles.tab} ${
                activeTab === index ? styles.active : ""
              }`}
              onClick={() => handleTabClick(index)}
            >
              <div key={index} className={styles.tabContent}>
                {tab.title}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.content}>
          <div className={styles.contentForMap}>{tabs[activeTab].content}</div>
        </div>
      </div>
      <ScrollTopButton />
    </>
  );
};

export default HorizontakTabsGde;

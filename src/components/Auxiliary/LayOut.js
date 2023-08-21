import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";
import { Constants } from "../../CONSTANTS";

const linksArray = [
  { name: "Главная", id: 0, href: "/" },
  { name: "Чат на карте", id: 1, href: "/chat-na-karte" },
  {
    name: "Поиск попутных машин",
    id: 2,
    href: "/poisk-poputnyh-mashin-dlya-perevozki-gruza",
  },
  { name: "Где купить", id: 3, href: "/gde-kupit" },
  { name: "Помощь/F.A.Q.", id: 4, href: "/help" },
  ,
  { name: "Блог", id: 5, href: "/my-blog" },
  ,
];

const LayOut = ({ children }) => {
  return (
    <>
      <Box
        sx={{
          minHeight: `calc(100vh - ${Constants.footerHeight})`,
          backgroundColor: Constants.LayoutColor,
        }}
      >
        <Header links={linksArray} />
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default LayOut;

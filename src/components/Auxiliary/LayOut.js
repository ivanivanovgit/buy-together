import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@mui/material";
import { Constants } from "../../CONSTANTS";

const linksArray = [
  { name: "Home page", id: 0, href: "/" },
  { name: "Chat on the map", id: 1, href: "/chat-on-the-map" },
  {
    name: "Routes",
    id: 2,
    href: "/routes",
  },
  { name: "Blog", id: 3, href: "/my-blog" },
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

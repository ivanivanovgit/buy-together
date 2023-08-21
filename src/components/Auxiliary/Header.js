// Header.js
import Image from "next/image";
import { Box, Grid, useTheme, useMediaQuery } from "@mui/material";
import DrawerComp from "./DrawerComp";
import ActiveLink from "./ActiveLink";
import logo2 from "../../../public/images/logo2.png";
import { Constants } from "../../CONSTANTS";

const Header = ({ links }) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        backgroundColor: Constants.secondColor,
        zIndex: "2",
        minHeight: Constants.menuHeight,
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: "0",
        padding: Constants.menuPadding,
      }}
    >
      {isMatch ? (
        <>
          <ActiveLink href="/">
            <Image
              src={logo2}
              alt="logo2"
              width={Constants.widthLogo}
              height={Constants.heightLogo}
              priority
            />
          </ActiveLink>
          <DrawerComp links={links} />
        </>
      ) : (
        <Grid sx={{ placeItems: "center" }} container>
          <Grid item xs={3}>
            <ActiveLink href="/">
              <Image
                src={logo2}
                alt="logo2"
                width={Constants.widthLogo}
                height={Constants.heightLogo}
                priority
              />
            </ActiveLink>
          </Grid>
          <Grid item xs={9}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              {links.map(({ name, id, href }) => (
                <ActiveLink key={id} href={href}>
                  {name}
                </ActiveLink>
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Header;

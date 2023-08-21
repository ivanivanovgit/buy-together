// ActiveListItemButton.js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ListItemButton, ListItemIcon, ListItemText, Box } from "@mui/material";
import { Constants } from "../../CONSTANTS";

const ActiveListItemButton = ({ children, href, name }) => {
  const router = useRouter();
  const [color, setColor] = useState(Constants.firstColor);

  useEffect(() => {
    setColor(
      router.asPath === href ? Constants.thirdColor : Constants.firstColor
    );
  }, [router.asPath, href]);

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <ListItemButton onClick={handleClick} divider>
      <ListItemIcon>
        <ListItemText sx={{ color: color }}>{name}</ListItemText>
      </ListItemIcon>
      {children}
    </ListItemButton>
  );
};

export default ActiveListItemButton;

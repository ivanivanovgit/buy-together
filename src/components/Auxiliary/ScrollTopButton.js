// ScrollTopButton.js
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
/* import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import UpgradeOutlinedIcon from "@mui/icons-material/UpgradeOutlined"; */
import UploadSharpIcon from "@mui/icons-material/UploadSharp";
import { Box } from "@mui/system";

function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "18%",
        right: "3%",
        zIndex: "9999",
      }}
    >
      {isVisible && (
        <Button onClick={scrollToTop} color="thirdColor">
          <UploadSharpIcon
            sx={{
              fontSize: "2.5rem",
            }}
          />
        </Button>
      )}
    </Box>
  );
}

export default ScrollTopButton;

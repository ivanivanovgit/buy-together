// ActiveLink.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Constants } from "../../CONSTANTS";

function ActiveLink({ children, href, hoverStyle }) {
  const router = useRouter();

  const [color, setColor] = useState(Constants.firstColor);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setColor(
      router.asPath === href ? Constants.thirdColor : Constants.firstColor
    );
  }, [router.asPath, href]);

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  const defaultStyle = {
    textDecoration: "none",
    color: color,
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={isHovered ? { ...defaultStyle, ...hoverStyle } : defaultStyle}
    >
      {children}
    </a>
  );
}

export default ActiveLink;

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { Constants } from "../../CONSTANTS";

function ActiveButton({ children, href }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  const color =
    router.asPath === href ? Constants.thirdColor : Constants.firstColor;

  const ColorButton = styled(Button)({
    color: color,
  });

  return (
    <ColorButton href={href} onClick={handleClick}>
      {children}
    </ColorButton>
  );
}

export default ActiveButton;

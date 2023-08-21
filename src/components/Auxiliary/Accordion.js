// Accordion.js
/* import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; */

import { useState } from "react";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const Accordion = ({ title, children, open = true }) => {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <div>
      <div
        className="cursor-pointer flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <KeyboardDoubleArrowDownIcon
            className={`transition-all duration-500 ease-in-out transform ${
              isOpen ? "" : "rotate-[-90deg]"
            } `}
          />
        </div>
        <div>{title}</div>
      </div>
      <div
        style={{ maxHeight: isOpen ? "2000rem" : "0" }}
        className={`transition-all duration-500 ease-in-out overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;

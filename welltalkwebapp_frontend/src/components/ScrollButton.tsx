import React, { useState } from "react";
import { BsArrowUpCircleFill } from "react-icons/bs";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <button>
      <BsArrowUpCircleFill
        className=" fixed h-5 bottom-5 right-5 text-primary cursor-pointer overflow-y-auto"
        style={{ display: visible ? "inline" : "none" }}
        onClick={scrollToTop}
      />
    </button>
  );
};

export default ScrollButton;

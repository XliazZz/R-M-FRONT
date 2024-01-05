import { useEffect } from "react";
import style from "./ScrollTop.module.css"
import { GrLinkTop } from "react-icons/gr"

const ScrollTop = ({ id }) => {
  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  useEffect(() => {
    let botonTop = document.getElementById(id);

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      const totalHeight = document.documentElement.scrollHeight;

      const visibleHeight = window.innerHeight;

      const isAtBottom = scrollY + visibleHeight >= totalHeight;

      botonTop.style.display = isAtBottom ? "block" : "none";
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [id]);

    return(
        <button className={style.botonTop} onClick={scrollToTop} ><GrLinkTop></GrLinkTop></button>
    );
}

export default ScrollTop;
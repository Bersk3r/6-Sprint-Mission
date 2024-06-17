import React, { useEffect, useState } from "react";
import style from "./styles.module.scss";
import SignupForm from "../../components/SignupPage/SignupForm";
import PandaMarketLogoLarge from "../../src/assets/images/logo/logo-lg.svg";
import PandaMarketLogoSmall from "../../src/assets/images/logo/logo-sm.svg";
import { debounce } from "../../lib/debounce";

export default function Signup() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const debouncedHandleResize = debounce(handleResize, 300);

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [windowWidth]);

  return (
    <div className={style.container}>
      {windowWidth > 376 ? <PandaMarketLogoLarge /> : <PandaMarketLogoSmall />}
      <SignupForm />
    </div>
  );
}

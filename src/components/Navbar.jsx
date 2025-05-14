import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { ebenai, background } from "../assets"; // Removed yourlogo import
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const navigation = [
  { id: "0", key: "navigation.services", url: "#services" },
  { id: "1", key: "navigation.about", url: "#sobre" },
  { id: "2", key: "navigation.contact", url: "#contato" },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        {/* Logo link with image and text */}
        <a className="flex items-center w-auto xl:mr-8" href="#hero">
          <img
            src={ebenai}
            width={60}
            height={60}
            alt="Eben AI Solutions Logo"
            className="mr-1" // Added margin for spacing
          />
          <span className="font-bold text-2xl text-white hidden sm:inline">
            Eben AI Solutions
          </span>
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-white transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-white"
                    : "lg:text-white/50"
                } lg:leading-5 lg:hover:text-white xl:px-12`}
              >
                {t(item.key)}
              </a>
            ))}
          </div>

          <div className="absolute inset-0 pointer-events-none lg:hidden">
            <div className="absolute inset-0 opacity-[.03]">
              <img
                className="w-full h-full object-cover"
                src={background}
                width={688}
                height={953}
                alt=""
              />
            </div>

            <div className="absolute top-1/2 left-1/2 w-[51.375rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2">
              <div className="absolute top-1/2 left-1/2 w-[36.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-[23.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="absolute top-0 left-5 w-0.25 h-full bg-n-6"></div>
            <div className="absolute top-0 right-5 w-0.25 h-full bg-n-6"></div>

            <div className="absolute top-[4.4rem] left-16 w-3 h-3 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full"></div>
            <div className="absolute top-[12.6rem] right-16 w-3 h-3 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full"></div>
            <div className="absolute top-[26.8rem] left-12 w-6 h-6 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full"></div>
          </div>
        </nav>
        <div className="ml-auto relative mr-4 lg:mr-6">
          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            value={i18n.language}
            className="appearance-none bg-n-8/90 text-white py-2 px-4 pr-8 rounded-lg border border-n-6 hover:bg-n-7 focus:outline-none focus:ring-2 focus:ring-color-1 transition-colors"
          >
            <option value="pt-PT">🇵🇹 Português</option>
            <option value="en">🇬🇧 English</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 flex items-center pl-2 right-2 lg:right-0 lg:pl-0 lg:pr-3">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* <a href="#signup" className="button hidden mr-8 text-white/50 transition-colors hover:text-white lg:block">
                    New account
                </a> */}
        <Button className="hidden lg:flex" href="#services">
            {t("button.learnMore")}
        </Button>

        <Button className="ml-auto lg:hidden" onClick={toggleNavigation}>
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;

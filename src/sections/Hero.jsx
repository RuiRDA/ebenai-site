import {
  curve,
  file02,
  heroBackground,
  homeSmile,
  loading,
  plusSquare,
  robot,
  searchMd,
  biblein,
  ericeiraproperty,
  grupo_das_casas,
  htailors,
} from "../assets";

import Button from "../components/Button";
import Section from "../components/Section";
import { MouseParallax, ScrollParallax } from "react-just-parallax";
import { useEffect, useRef, useState } from "react";
import Notification from "../components/Notification";
import PlusSvg from "../assets/svg/PlusSvg";

import { useTranslation } from "react-i18next";

const BackgroundCircles = ({ parallaxRef }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute -top-[42.375rem] left-1/2 w-[78rem] aspect-square border border-n-2/5 rounded-full -translate-x-1/2 md:-top-[38.5rem] xl:-top-[32rem]">
      <div className="absolute top-1/2 left-1/2 w-[65.875rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[51.375rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[36.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[23.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />

      <MouseParallax strength={0.07} parallaxContainerRef={parallaxRef}>
        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[46deg]">
          <div
            className={`w-2 h-2 -ml-1 -mt-36 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[56deg]">
          <div
            className={`w-4 h-4 -ml-1 -mt-32 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[54deg]">
          <div
            className={`hidden w-4 h-4 -ml-1 mt-[12.9rem] bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full xl:block transit transition-transform duration-500 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[65deg]">
          <div
            className={`w-3 h-3 -ml-1.5 mt-52 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[85deg]">
          <div
            className={`w-6 h-6 -ml-3 -mt-3 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[70deg]">
          <div
            className={`w-6 h-6 -ml-3 -mt-3 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          />
        </div>
      </MouseParallax>
    </div>
  );
};

const Hero = () => {
  const parallaxRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const { t } = useTranslation();
  // Mount effect to ensure stable initial rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
            {t("hero.title")} {` `}
            <span className="inline-block relative">
              Eben AI{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt=""
              />
            </span>
          </h1>
          {/* Fixed height text block with overflow handling */}
          <div className="h-[6rem] flex items-center justify-center overflow-visible">
            <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
              {t("hero.description")}
            </p>
          </div>
          <Button href="#pricing" white>
            {t("button.learnMore")}
          </Button>
        </div>
        <div
          className={`relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24 transition-opacity duration-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-[#43435C] rounded-t-[0.9rem]" />

              <div className="aspect-[23/14] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/390] lg:aspect-[1024/390]">
                {/* Original mobile: aspect-[33/40] -> New: aspect-[33/32] (or any value less than 40) */}
                {/* Original md: aspect-[688/490] -> New: md:aspect-[688/390] (or any value less than 490) */}
                {/* Original lg: aspect-[1024/490] -> New: lg:aspect-[1024/390] (or any value less than 490) */}
                <img
                  src={robot} // Assuming 'robot' is your image source
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  alt="Robot" // Added alt text for accessibility
                />

                <div className="flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2 text-base">
                  <img className="w-5 h-5 mr-4" src={loading} alt="" />
                  {t("hero.processing")}
                </div>

                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-[#474060]/40 backdrop-blur border border-white/10 rounded-2xl xl:flex">
                    <li className="p-5">
                      <img src={homeSmile} width={24} height={25} alt="" />
                    </li>
                    <li className="p-5">
                      <img src={file02} width={24} height={25} alt="" />
                    </li>
                    <li className="p-5">
                      <img src={searchMd} width={24} height={25} alt="" />
                    </li>
                    <li className="p-5">
                      <img src={plusSquare} width={24} height={25} alt="" />
                    </li>
                  </ul>
                </ScrollParallax>

                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[18rem] xl:flex"
                    title={t("hero.clientsServed")}
                    time={t("hero.time")}
                  />
                </ScrollParallax>
              </div>
            </div>

            <div className="relative z-1 h-6 mx-2.5 bg-[#1B1B2E] shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-8" />
            <div className="relative z-1 h-6 mx-6 bg-[#1B1B2E]/70 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-20" />
          </div>
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>

          <BackgroundCircles parallaxRef={parallaxRef} />
        </div>

        <div className="hidden relative z-10 mt-20 lg:block">
          <h5 className="tagline mb-6 text-center text-white/50">
            {t("hero.companiesUsing")}
          </h5>
          <ul className="flex">
            <li className="flex items-center justify-center flex-1 h-[8.5rem]">
              <img src={biblein} width={134} height={28} alt="" />
            </li>
            <li className="flex items-center justify-center flex-1 h-[8.5rem]">
              <img src={ericeiraproperty} width={134} height={28} alt="" />
            </li>
            <li className="flex items-center justify-center flex-1 h-[8.5rem]">
              <img src={grupo_das_casas} width={134} height={28} alt="" />
            </li>
            <li className="flex items-center justify-center flex-1 h-[8.5rem]">
              <img src={htailors} width={134} height={28} alt="" />
            </li>
          </ul>
        </div>
      </div>

      <div className="hidden absolute top-[55.25rem] left-10 right-10 h-0.25 bg-n-6 pointer-events-none xl:block" />
      <PlusSvg className="hidden absolute top-[54.9375rem] left-[2.1875rem] z-2 pointer-events-none xl:block" />
      <PlusSvg className="hidden absolute top-[54.9375rem] right-[2.1875rem] z-2 pointer-events-none xl:block" />
    </Section>
  );
};

export default Hero;

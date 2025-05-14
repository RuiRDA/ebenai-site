import Section from "./Section";
import {
  discordBlack,
  facebook,
  instagram,
  telegram,
  twitter,
  ebenai,
} from "../assets";
import { useTranslation } from "react-i18next";

const socials = [
  {
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];

// Navigation keys for i18n
const footerNavLinks = [
  { key: "navigation.home", url: "#hero" },
  { key: "navigation.services", url: "#services" },
  { key: "navigation.about", url: "#sobre" },
  { key: "navigation.contact", url: "#contato" },
  { key: "navigation.terms", url: "#termos" },
];

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Section crosses id="eben-ai-footer" className="!px-0 !py-16">
      <div className="container flex flex-col gap-12">
        {/* Main Footer Content */}
        <div className="flex sm:justify-between justify-center items-start gap-10 max-sm:flex-col">
          {/* Company Info with Logo */}
          <div className="text-center sm:text-left max-w-sm">
            <a
              className="flex items-center justify-center sm:justify-start w-auto mb-4"
              href="#hero"
            >
              <img
                src={ebenai}
                width={40}
                height={40}
                alt="Eben AI Solutions Logo"
                className="mr-1"
              />
              <span className="font-bold text-xl text-white hidden sm:inline">
                Eben AI Solutions
              </span>
            </a>
            <p className="caption text-n-4 mb-2">
              {t("footer.emailUs")}:{" "}
              <a
                href="mailto:geral@ebenaisolutions.pt"
                className="hover:text-color-1"
              >
                geral@ebenaisolutions.pt
              </a>
            </p>
            <p className="caption text-n-4 mb-2">
              {t("footer.phone")}:{" "}
              <a href="tel:+351915796429" className="hover:text-color-1">
                +351 915 796 429
              </a>
            </p>
            {/* <p className="caption text-n-4">
              Endereço: Rua da Inovação, 123, Lisboa, Portugal
            </p> */}
          </div>

          {/* Navigation Links */}
          <ul className="flex gap-5 flex-wrap justify-center">
            {footerNavLinks.map((item, i) => (
              <li key={i}>
                <a
                  href={item.url}
                  className="caption text-n-4 hover:text-white transition-colors"
                >
                  {t(item.key)}
                </a>
              </li>
            ))}
          </ul>

          {/* Social Media Icons */}
          <ul className="flex gap-5 flex-wrap">
            {socials.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                className="flex items-center justify-center w-10 h-10 bg-[#15131D] rounded-full transition-colors hover:bg-n-6"
              >
                <img
                  src={item.iconUrl}
                  width={16}
                  height={16}
                  alt={item.title}
                />
              </a>
            ))}
          </ul>
        </div>

        {/* Newsletter Signup */}
        {/* <div className="flex flex-col items-center gap-4">
          <h4 className="text-lg font-semibold text-white">
            Inscreva-se na nossa Newsletter
          </h4>
          <div className="flex gap-2 max-w-md w-full">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="w-full px-4 py-2 rounded-lg bg-[#15131D] text-n-4 border border-n-6 focus:outline-none focus:border-color-1"
            />

   
            <button className="px-6 py-2 bg-gradient-to-r from-sky-500 to-sky-500 text-white rounded-lg hover:bg-[#437dfc] transition-colors">
              Inscrever
            </button>
          </div>
        </div> */}

        {/* Copyright */}
        <div className="text-center">
          <p className="caption text-n-4">
            {t("footer.copyright", { year: new Date().getFullYear() })} IA
            SOLUTIONS
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Footer;

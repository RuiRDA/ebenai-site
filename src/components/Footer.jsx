import Section from "./Section";
import {
  discordBlack,
  facebook,
  instagram,
  telegram,
  twitter,
} from "../assets";

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

const footerNavLinks = [
  { title: "Início", url: "#hero" }, // Assuming #hero is the top/home
  { title: "Serviços", url: "#services" },
  { title: "Sobre", url: "#sobre" },
  { title: "Contato", url: "#contato" },
  { title: "Termos", url: "#termos" }, // Assuming a #termos section or a separate page
];

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10">
      <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
        <div className="text-center sm:text-left">
          <p className="caption text-n-4 mb-2">
            Envie-nos um e-mail:{" "}
            <a
              href="mailto:geral@ebenaisolutions.pt"
              className="hover:text-color-1"
            >
              geral@ebenaisolutions.pt
            </a>
          </p>
          <p className="caption text-n-4">
            © {new Date().getFullYear()}. Todos Os Direitos Reservados Por EBEN
            IA SOLUTIONS
          </p>
        </div>

        <ul className="flex gap-5 flex-wrap justify-center">
          {footerNavLinks.map((item, i) => (
            <li key={i}>
              <a
                href={item.url}
                className="caption text-n-4 hover:text-white transition-colors"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>

        <ul className="flex gap-5 flex-wrap">
          {socials.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              className="flex items-center justify-center w-10 h-10 bg-[#15131D] rounded-full transition-colors hover:bg-n-6"
            >
              <img src={item.iconUrl} width={16} height={16} alt={item.title} />
            </a>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Footer;

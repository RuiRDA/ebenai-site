import Heading from "../components/Heading";
import Section from "../components/Section";
import Arrow from "../assets/svg/Arrow";
import ClipPath from "../assets/svg/ClipPath";
import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitImage2,
} from "../assets";

const benefits = [
  {
    title: "Processos Internos Automatizados",
    text: "Criamos um agente de IA que utiliza as aplicações utilizadas na sua empresa para agir como um funcionário real, economizando tempo na gestão de documentos e de processos internos.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    title: "Conversas com Agentes IA",
    text: "Criamos funcionários digitais realistas para conversar e converter os seus leads 24/7 por texto ou áudio, 365 dias por ano, sem tirar férias e sem reclamar.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    title: "Redes Sociais em Piloto Automático",
    text: "Criamos um agente de IA que cria conteúdos personalizados e faz a gestão automática das suas redes sociais, para uma presença digital cada vez melhor.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
  // {
  //     title: "Fast responding",
  //     text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
  //     backgroundUrl: "./src/assets/benefits/card-4.svg",
  //     iconUrl: benefitIcon4,
  //     imageUrl: benefitImage2,
  //     light: true,
  // },
  // {
  //     title: "Ask anything",
  //     text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
  //     backgroundUrl: "./src/assets/benefits/card-5.svg",
  //     iconUrl: benefitIcon1,
  //     imageUrl: benefitImage2,
  // },
  // {
  //     title: "Improve everyday",
  //     text: "The app uses natural language processing to understand user queries and provide accurate and relevant responses.",
  //     backgroundUrl: "./src/assets/benefits/card-6.svg",
  //     iconUrl: benefitIcon2,
  //     imageUrl: benefitImage2,
  // },
];

const Services = () => {
  return (
    <Section id="services">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Os Nossos Serviços"
        />

        <div className="flex flex-wrap gap-10 mb-10">
          {benefits.map((item, i) => (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] group"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={i}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem]">
                <h5 className="h5 mb-5">{item.title}</h5>
                <p className="body-2 mb-6 text-n-3">{item.text}</p>
                <div className="flex items-center mt-auto">
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  />
                  <p className="ml-auto font-code text-xs font-bold text-white uppercase tracking-wider"></p>
                  <Arrow />
                </div>
              </div>

              {item.light && (
                <div className="absolute top-0 left-1/4 w-full aspect-square bg-radial-gradient from-[#28206C] to-[#28206C]/0 to-70% pointer-events-none" />
              )}

              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-10">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Services;

import Heading from "../components/Heading";
import Section from "../components/Section";
import { gradient } from "../assets";
import Button from "../components/Button"; // Added Button back for the form

const faqs = [
  {
    question: "Como a Eben AI pode ajudar o meu negócio?",
    answer:
      "Podemos economizar centenas de horas de trabalho manual para os seus funcionários, automatizando tarefas repetitivas e entediantes, como prospecção outbound, atendimento ao cliente, agendamentos, criação de conteúdo, entre outros. Ao implementar estas soluções, não apenas aumentamos a eficiência, mas também fazemos com que a sua equipa tenha mais tempo disponível para se concentrar em atividades mais estratégicas e criativas, gerando resultados ainda mais impactantes para o seu negócio.",
  },
  {
    question: "Quanto tempo demora a criar o meu projeto?",
    answer:
      "Normalmente, as nossas soluções são totalmente implementadas entre 1 a 2 semanas, englobando todo o processo de desenvolvimento e integração. Com uma abordagem ágil e eficiente, garantimos que a sua equipa possa começar a beneficiar dos nossos serviços rapidamente, sem comprometer a qualidade ou a precisão das entregas.",
  },
  {
    question: "Qual é a minha garantia?",
    answer:
      "Oferecemos 30 dias de garantia após a implementação da sua solução de IA, com reembolso total caso não fique totalmente satisfeito com os resultados obtidos. Queremos garantir que a sua experiência seja positiva e que os benefícios da nossa solução atendam plenamente às suas necessidades.",
  },
  {
    question: "Como é que as Soluções de IA são criadas?",
    answer:
      "Nós passamos pelo processo de planeamento e arquitetura do projeto com a nossa equipa e levamos o projeto para plataformas de integração de sistemas e IA, como o make.com, n8n, flowise, entre outros.",
  },
  {
    question: "Como será a nossa comunicação?",
    answer:
      "Para a maioria das empresas, a nossa comunicação será feita diretamente pelo WhatsApp. Além disso, durante o desenvolvimento do projeto e fase de testes, oferecemos suporte contínuo para acompanhar atualizações, resolver possíveis erros de sistema e garantir que o progresso esteja sempre alinhado com os objetivos estabelecidos.",
  },
  {
    question: "E se der algum erro na automação?",
    answer:
      "Seremos notificados imediatamente sempre que ocorrer algum problema no sistema e resolveremos rapidamente, garantindo que a operação continue a funcionar sem interrupções.",
  },
  {
    question:
      "Preciso de conhecimentos técnicos para usar os sistemas automatizados?",
    answer:
      "Nós temos um processo de entrega simples e transparente que instrui a sua equipa a utilizar os sistemas que entregamos, sem precisar de saber programar ou investir dezenas de horas para aprender novas ferramentas.",
  },
];

const FAQ = () => (
  <Section className="overflow-hidden" id="contato">
    <div className="container md:pb-10">
      {/* FAQ Section */}
      <div className="mt-20">
        <Heading title="Perguntas frequentes" />
        <div className="max-w-3xl mx-auto mt-10 space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-6 bg-n-7 rounded-lg border border-n-6"
            >
              <h5 className="h5 mb-3 text-white">{faq.question}</h5>
              <p className="body-2 text-n-3">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute top-[18.25rem] -left-[30.375rem] w-[56.625rem] opacity-60 mix-blend-color-dodge pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[58.85rem] h-[58.85rem] -translate-x-3/4 -translate-y-1/2">
          <img
            className="w-full"
            src={gradient}
            width={942}
            height={942}
            alt="Gradient"
          />
        </div>
      </div>
    </div>
  </Section>
);

// Renaming component for clarity, though file name remains Roadmap.jsx for now
export default FAQ;

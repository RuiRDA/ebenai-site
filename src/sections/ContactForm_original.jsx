import Heading from "../components/Heading";
import Section from "../components/Section";
import Button from "../components/Button"; // Added Button back for the form

const ContactForm = () => (
  <Section className="overflow-hidden" id="contato">
    <div className="container md:pb-10">
      <Heading title="Vamos Conversar?" />

      <p className="body-1 max-w-3xl mx-auto mb-12 text-n-2 lg:mb-16 text-center">
        Investimos fortemente no início de cada projeto, assumindo 100% do risco
        para que você não precise (eses projetos podem levar semanas ou até
        meses). Por causa disso, trabalhamos com apenas um número reduzido de
        empresas em cada mês, para entregar resultados incomparáveis e com a
        máxima qualidade. Comece por preencher o nosso formulário:
      </p>

      {/* Contact Form */}
      <div className="max-w-xl mx-auto bg-n-7 p-8 rounded-lg border border-n-6">
        <form onSubmit={(e) => e.preventDefault()}>
          {" "}
          {/* Basic form, no actual submission logic */}
          <div className="mb-6">
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm font-medium text-n-2"
            >
              Nome Completo *
            </label>
            <input
              type="text"
              id="fullName"
              className="bg-n-8 border border-n-5 text-n-1 text-sm rounded-lg focus:ring-color-1 focus:border-color-1 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-n-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              className="bg-n-8 border border-n-5 text-n-1 text-sm rounded-lg focus:ring-color-1 focus:border-color-1 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="whatsapp"
              className="block mb-2 text-sm font-medium text-n-2"
            >
              WhatsApp *
            </label>
            <input
              type="tel"
              id="whatsapp"
              className="bg-n-8 border border-n-5 text-n-1 text-sm rounded-lg focus:ring-color-1 focus:border-color-1 block w-full p-2.5"
              placeholder="Digite seu número WhatsApp português (9 dígitos)"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-n-2"
            >
              Mensagem
            </label>
            <textarea
              id="message"
              rows="4"
              className="bg-n-8 border border-n-5 text-n-1 text-sm rounded-lg focus:ring-color-1 focus:border-color-1 block w-full p-2.5"
            ></textarea>
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-n-5 rounded bg-n-8 focus:ring-3 focus:ring-color-1/50"
                required
              />
            </div>
            <label
              htmlFor="terms"
              className="ml-2 text-sm font-medium text-n-3"
            >
              Concordo com o processamento dos meus dados pessoais de acordo com
              a{" "}
              <a href="#privacidade" className="text-color-1 hover:underline">
                Política de Privacidade
              </a>
              *
            </label>{" "}
            {/* Assuming a #privacidade link */}
          </div>
          <Button type="submit" className="w-full" white>
            Enviar Mensagem
          </Button>
        </form>
      </div>
    </div>
  </Section>
);

// Renaming component for clarity, though file name remains Roadmap.jsx for now
export default ContactForm;

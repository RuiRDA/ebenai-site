import { useState } from "react";
import Heading from "../components/Heading";
import Section from "../components/Section";
import CalComWidget from "../components/CalComWidget";

const CallForm = () => {
  return (
    <Section className="overflow-hidden" id="contato">
      <div className="container md:pb-10">
        <Heading title="Vamos Conversar?" />

        <p className="body-1 max-w-3xl mx-auto mb-12 text-n-2 lg:mb-16 text-center">
          Investimos fortemente no início de cada projeto, assumindo 100% do
          risco para que você não precise (eses projetos podem levar semanas ou
          até meses). Por causa disso, trabalhamos com apenas um número reduzido
          de empresas em cada mês, para entregar resultados incomparáveis e com
          a máxima qualidade. Dê o primeiro passo agora! Agende uma call para
          começarmos a construir algo incrível juntos.
        </p>
        <CalComWidget />
      </div>
    </Section>
  );
};

export default CallForm;

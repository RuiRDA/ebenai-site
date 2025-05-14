import { useState } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../components/Heading";
import Section from "../components/Section";
import CalComWidget from "../components/CalComWidget";

const CallForm = () => {
  const { t } = useTranslation();

  return (
    <Section className="overflow-hidden" id="contato">
      <div className="container md:pb-10">
        <Heading title={t('callForm.heading')} />

        <p className="body-1 max-w-3xl mx-auto mb-12 text-n-2 lg:mb-16 text-center">
          {t('callForm.description')}
        </p>
        <CalComWidget />
      </div>
    </Section>
  );
};

export default CallForm;

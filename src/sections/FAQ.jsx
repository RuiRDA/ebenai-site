import Heading from "../components/Heading";
import Section from "../components/Section";
import { gradient } from "../assets";
import Button from "../components/Button"; // Added Button back for the form

import { useTranslation } from "react-i18next";

const faqs = [
  {
    questionKey: "faq.q1_question",
    answerKey: "faq.q1_answer",
  },
  {
    questionKey: "faq.q2_question",
    answerKey: "faq.q2_answer",
  },
  {
    questionKey: "faq.q3_question",
    answerKey: "faq.q3_answer",
  },
  {
    questionKey: "faq.q4_question",
    answerKey: "faq.q4_answer",
  },
  {
    questionKey: "faq.q5_question",
    answerKey: "faq.q5_answer",
  },
  {
    questionKey: "faq.q6_question",
    answerKey: "faq.q6_answer",
  },
  {
    questionKey: "faq.q7_question",
    answerKey: "faq.q7_answer",
  },
];

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <Section className="overflow-hidden" id="contato">
      <div className="container md:pb-10">
        {/* FAQ Section */}
        <div className="mt-20">
          <Heading title={t("faq.heading")} />
          <div className="max-w-3xl mx-auto mt-10 space-y-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 bg-n-7 rounded-lg border border-n-6"
              >
                <h5 className="h5 mb-3 text-white">{t(faq.questionKey)}</h5>
                <p className="body-2 text-n-3">{t(faq.answerKey)}</p>
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
};

// Renaming component for clarity, though file name remains Roadmap.jsx for now
export default FAQ;

import { useState } from "react";
import Heading from "../components/Heading";
import Section from "../components/Section";
import Button from "../components/Button";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    message: "",
    countryCode: "351", // Default to Portugal
    gdprConsent: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle"); // 'idle' | 'success' | 'error'

  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Nome completo é obrigatório";
    }

    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Email inválido";
    }

    // Remove spaces before validation
    const whatsappNumber = formData.whatsapp.replace(/\s/g, "");

    if (!whatsappNumber) {
      errors.whatsapp = "WhatsApp é obrigatório";
    } else if (
      formData.countryCode === "351" &&
      !/^9\d{8}$/.test(whatsappNumber)
    ) {
      // Portugal: 9 digits starting with 9
      errors.whatsapp =
        "Número português inválido (deve ter 9 dígitos e começar por 9)";
    } else if (
      formData.countryCode === "55" &&
      !/^\d{2}9?\d{8}$/.test(whatsappNumber)
    ) {
      // Brazil: 10 or 11 digits (XX XXXXXXXX or XX 9XXXXXXXX)
      errors.whatsapp =
        "Número brasileiro inválido (formato: XX 9XXXX XXXX ou XX XXXX XXXX)";
    }

    if (!formData.gdprConsent) {
      errors.gdprConsent = "Deve aceitar a política de privacidade";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Construct payload ensuring whatsapp includes country code without '+'
    const payload = {
      ...formData,
      whatsapp: `${formData.countryCode}${formData.whatsapp.replace(
        /\s/g,
        ""
      )}`, // Combine code and number
    };

    try {
      const response = await fetch(
        "https://n8n.ebenaisolutions.pt/webhook/form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // Send combined payload
        }
      );

      if (!response.ok) {
        // Attempt to read error message from response body
        let errorBody = "Erro desconhecido";
        try {
          const errorData = await response.json();
          errorBody = errorData.message || JSON.stringify(errorData);
        } catch (parseError) {
          // If response is not JSON or empty
          errorBody =
            (await response.text()) || `HTTP error! status: ${response.status}`;
        }
        throw new Error(errorBody);
      }

      setSubmitStatus("success");
      setFormData({
        fullName: "",
        email: "",
        whatsapp: "",
        message: "",
        countryCode: "351", // Reset to default
        gdprConsent: false,
      });
      setFormErrors({}); // Clear errors on success
    } catch (error) {
      console.error("Form submission error:", error);
      // Display specific error from backend if available
      setFormErrors((prev) => ({
        ...prev,
        submit: error.message || "Ocorreu um erro ao enviar.",
      }));
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));
    // Clear specific error when user interacts with the field
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
    // Also clear general submit error when user interacts with any field
    if (formErrors.submit) {
      setFormErrors((prev) => ({ ...prev, submit: "" }));
    }
  };

  const handleWhatsAppChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits

    const maxLength = formData.countryCode === "55" ? 11 : 9;
    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
    }

    // Apply formatting with spaces
    if (formData.countryCode === "55") {
      // Brazil format: XX 9XXXX XXXX or XX XXXX XXXX
      if (value.length > 2) {
        const ddd = value.substring(0, 2);
        const rest = value.substring(2);
        if (rest.length > 5) {
          value = `${ddd} ${rest.substring(
            0,
            rest.length - 4
          )} ${rest.substring(rest.length - 4)}`;
        } else if (rest.length > 0) {
          value = `${ddd} ${rest}`;
        } else {
          value = ddd;
        }
      }
    } else {
      // Portugal format: 9XX XXX XXX
      if (value.length > 6) {
        value = `${value.substring(0, 3)} ${value.substring(
          3,
          6
        )} ${value.substring(6)}`;
      } else if (value.length > 3) {
        value = `${value.substring(0, 3)} ${value.substring(3)}`;
      }
    }

    setFormData((prev) => ({ ...prev, whatsapp: value }));
    if (formErrors.whatsapp) {
      setFormErrors((prev) => ({ ...prev, whatsapp: "" }));
    }
    if (formErrors.submit) {
      setFormErrors((prev) => ({ ...prev, submit: "" }));
    }
  };

  const handleCountryChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      countryCode: e.target.value,
      whatsapp: "", // Clear WhatsApp number when country changes
    }));
    setFormErrors((prev) => ({ ...prev, whatsapp: "" })); // Clear WhatsApp error
    if (formErrors.submit) {
      setFormErrors((prev) => ({ ...prev, submit: "" }));
    }
  };

  return (
    <Section className="overflow-hidden" id="contato">
      <div className="container md:pb-10">
        <Heading title="Vamos Conversar?" />




        

        <p className="body-1 max-w-3xl mx-auto mb-12 text-n-2 lg:mb-16 text-center">
          Investimos fortemente no início de cada projeto, assumindo 100% do
          risco para que você não precise (eses projetos podem levar semanas ou
          até meses). Por causa disso, trabalhamos com apenas um número reduzido
          de empresas em cada mês, para entregar resultados incomparáveis e com
          a máxima qualidade. Comece por preencher o nosso formulário:
        </p>

        {/* Contact Form */}
        <div className="max-w-xl mx-auto bg-n-7 p-8 rounded-lg border border-n-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium text-n-2"
              >
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`bg-n-8 border ${
                  formErrors.fullName ? "border-red-500" : "border-n-5"
                } text-n-1 text-sm rounded-lg focus:ring-color-1 focus:border-color-1 block w-full p-2.5`}
                placeholder="João Silva"
              />
              {formErrors.fullName && (
                <p className="mt-1 text-sm text-red-500">
                  {formErrors.fullName}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-n-2"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`bg-n-8 border ${
                  formErrors.email ? "border-red-500" : "border-n-5"
                } text-n-1 text-sm rounded-lg focus:ring-color-1 focus:border-color-1 block w-full p-2.5`}
                placeholder="joao.silva@empresa.com"
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="whatsapp"
                className="block mb-2 text-sm font-medium text-n-2"
              >
                WhatsApp <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  id="countryCode"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleCountryChange}
                  className="bg-n-8 border border-n-5 text-n-1 text-sm rounded-lg focus:ring-color-1 focus:border-color-1 p-2.5"
                >
                  <option value="351">🇵🇹 +351</option>
                  <option value="55">🇧🇷 +55</option>
                </select>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleWhatsAppChange}
                  className={`bg-n-8 border ${
                    formErrors.whatsapp ? "border-red-500" : "border-n-5"
                  } text-n-1 text-sm rounded-lg focus:ring-color-1 focus:border-color-1 block w-full p-2.5`}
                  placeholder={
                    formData.countryCode === "351"
                      ? "912 345 678"
                      : "11 98765 4321"
                  }
                />
              </div>
              {formErrors.whatsapp && (
                <p className="mt-1 text-sm text-red-500">
                  {formErrors.whatsapp}
                </p>
              )}
              <p className="mt-1 text-xs text-n-3">
                {formData.countryCode === "351"
                  ? "Digite seu número WhatsApp português (9 dígitos)"
                  : "Digite seu número WhatsApp brasileiro (com DDD)"}
              </p>
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
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className="bg-n-8 border border-n-5 text-n-1 text-sm rounded-lg focus:ring-color-1 focus:border-color-1 block w-full p-2.5"
              ></textarea>
            </div>

            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="gdprConsent"
                  name="gdprConsent"
                  type="checkbox"
                  checked={formData.gdprConsent}
                  onChange={handleInputChange}
                  className={`w-4 h-4 border ${
                    formErrors.gdprConsent ? "border-red-500" : "border-n-5"
                  } rounded bg-n-8 focus:ring-3 focus:ring-color-1/50`}
                />
              </div>
              <label
                htmlFor="gdprConsent"
                className="ml-2 text-sm font-medium text-n-3"
              >
                Concordo com o processamento dos meus dados pessoais de acordo
                com a{" "}
                <a href="#privacidade" className="text-color-1 hover:underline" >
                  Política de Privacidade
                </a>
                <span className="text-red-500 ml-1">*</span>
              </label>
            </div>
            {formErrors.gdprConsent && (
              <p className="mt-1 mb-4 text-sm text-red-500">
                {formErrors.gdprConsent}
              </p>
            )}



            <Button
              type="submit"
              className={`hidden lg:flex w-full ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
              white
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </Button>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <p className="mt-4 text-green-500 text-center">
                Mensagem enviada com sucesso! Entraremos em contato em breve.
              </p>
            )}
            {/* Display general submit error OR specific backend error */}
            {(submitStatus === "error" || formErrors.submit) && (
              <p className="mt-4 text-red-500 text-center">
                {formErrors.submit ||
                  "Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente."}
              </p>
            )}
          </form>
        </div>
      </div>
    </Section>
  );
};

export default ContactForm;

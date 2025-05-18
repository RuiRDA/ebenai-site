function createDebugButton(messagesContainer, displayBotMessagesSequentially) {
  const debugButton = document.createElement("button");
  debugButton.textContent = "test";
  debugButton.style.cssText = `
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
  `;

  debugButton.addEventListener("click", () => {
    const mockResponse = [
      {
        output: {
          messages: [
            {
              text: "Olá! A Eben AI Solutions oferece soluções de automação inteligente para otimizar o seu negócio.",
            },
            {
              text: "As nossas principais áreas de atuação são:",
            },
            {
              text: "*   **Automação de Conteúdos**: Criação e agendamento de posts para redes sociais.",
            },
            {
              text: "*   **Chatbots Inteligentes**: Desenvolvimento de chatbots para WhatsApp e websites, para um atendimento ao cliente mais eficiente.",
            },
            {
              text: "*   **Follow-ups Automáticos**: Implementação de sistemas para envio de reviews, ofertas personalizadas e recomendações.",
            },
            {
              text: "*   **Automação de Documentos**: Simplificação da gestão de contratos e processos de submissão de documentos.",
            },
            {
              text: "Gostaria de saber mais detalhes sobre alguma destas áreas?",
            },
          ],
        },
      },
    ];

    displayBotMessagesSequentially(mockResponse[0].output.messages, 2000, true);
  });

  return debugButton;
}

export { createDebugButton };

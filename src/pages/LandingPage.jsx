import { useState } from "react";
import CalComWidget from "../components/CalComWidget";
import "./LandingPage.css";

const Icon = ({ name, size = 25 }) => {
  const shared = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  const paths = {
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></>,
    play: <><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4z" /></>,
    settings: <><path d="M10 2h4l.7 2.4 2.1.9 2.2-1.2 2.8 2.8-1.2 2.2.9 2.1L24 12v0l-2.5.8-.9 2.1 1.2 2.2-2.8 2.8-2.2-1.2-2.1.9L14 22h-4l-.7-2.4-2.1-.9L5 19.9l-2.8-2.8 1.2-2.2-.9-2.1L0 12l2.5-.8.9-2.1-1.2-2.2L5 4.1l2.2 1.2 2.1-.9z" transform="translate(2 2) scale(.83)" /><circle cx="12" cy="12" r="3" /></>,
    message: <><path d="M21 11.5a8.8 8.8 0 0 1-9 8.5 10 10 0 0 1-4-.8L3 21l1.8-4.6a8.5 8.5 0 0 1-1.8-5A8.8 8.8 0 0 1 12 3a8.8 8.8 0 0 1 9 8.5Z" /></>,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5" /></>,
    file: <><path d="M7 2h7l5 5v15H5V2h2Z"/><path d="M14 2v6h5M9 12h6M9 16h6"/></>,
    rocket: <><path d="M4 15c2-6 8-10 16-11 0 8-5 14-11 16l-5-5Z"/><path d="M12 12l-6 6M7 20l-4 1 1-4M9 6l-3-1-2 4M18 15l1 3-4 2"/><circle cx="15" cy="9" r="1.5"/></>,
    arrow: <><path d="M4 12h16m-7-7 7 7-7 7"/></>,
    chevron: <><path d="m6 9 6 6 6-6"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="M5 5l14 14M19 5 5 19"/></>
  };
  return <svg {...shared}>{paths[name]}</svg>;
};

const sections = [
  { icon: "settings", title: "Processos internos automatizados", description: "Automatizamos tarefas repetitivas e ligamos as ferramentas da sua empresa." },
  { icon: "message", title: "Conversas com agentes IA", description: "Atendimento inteligente e acompanhamento de clientes, 24 horas por dia." },
  { icon: "layers", title: "Redes sociais em piloto automático", description: "Conteúdos e fluxos de publicação para uma presença digital consistente." },
];

const faq = [
  { q: "O que é um agente de IA?", a: "É um assistente digital que utiliza inteligência artificial para conversar com clientes, responder a perguntas e executar tarefas de acordo com os processos da sua empresa." },
  { q: "Que tipo de processos podem ser automatizados?", a: "Atendimento, qualificação de leads, seguimentos, atualização de CRM, organização de informação, notificações e muitos outros processos repetitivos." },
  { q: "Quanto tempo demora a implementação?", a: "Depende da complexidade e das integrações necessárias. Na consultoria analisamos o seu caso e apresentamos um plano e uma estimativa realista." },
  { q: "É adaptado ao meu negócio?", a: "Sim. Cada solução é pensada para os objetivos, ferramentas e forma de trabalhar da sua empresa." }
];

const testimonials = [
  { name: "Keith", quote: "Excelente experiência! A Eben ajudou-nos a simplificar processos e a ganhar tempo.", initials: "K" },
  { name: "Rui C. Santos", quote: "Profissionais, organizados e sempre disponíveis. Recomendo totalmente.", initials: "RS" },
  { name: "Omar", quote: "Soluções práticas e eficazes, com um acompanhamento próximo e transparente.", initials: "O" },
];

const Brand = () => <a href="/#inicio" className="eb-brand" aria-label="Eben AI Solutions — Início"><img src="/ebenai-symbol.svg" alt="" /><span>EBEN AI<br />SOLUTIONS</span></a>;

function Crystal() {
  return <svg className="eb-crystal" viewBox="0 0 570 430" role="img" aria-label="Cristal azul de inteligência artificial com circuitos luminosos">
    <defs>
      <linearGradient id="ebFace1" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#36f5fc"/><stop offset=".7" stopColor="#0979d8"/><stop offset="1" stopColor="#0753b6"/></linearGradient>
      <linearGradient id="ebFace2" x1="0" y1="0" x2=".9" y2="1"><stop stopColor="#116fce"/><stop offset="1" stopColor="#001d91"/></linearGradient>
      <linearGradient id="ebFace3" x1="0" y1="0" x2=".9" y2="1"><stop stopColor="#23dafa"/><stop offset="1" stopColor="#0071e7"/></linearGradient>
      <linearGradient id="ebPlinth" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#5deefa"/><stop offset=".5" stopColor="#14b2fa"/><stop offset="1" stopColor="#0864ce"/></linearGradient>
      <filter id="ebGlow"><feGaussianBlur stdDeviation="8"/></filter>
      <filter id="ebSoft"><feGaussianBlur stdDeviation="3"/></filter>
    </defs>
    <ellipse cx="285" cy="362" rx="170" ry="29" fill="#12cffa" opacity=".29" filter="url(#ebGlow)"/>
    <g transform="rotate(-9 285 220)">
      <ellipse cx="285" cy="216" rx="232" ry="55" fill="none" stroke="#ffffff" strokeWidth="4" opacity=".88" filter="url(#ebSoft)"/>
      <ellipse cx="285" cy="216" rx="232" ry="55" fill="none" stroke="#f3ffff" strokeWidth="1.8" opacity=".95"/>
    </g>
    <path d="M153 345v25c0 17 264 17 264 0v-25" fill="url(#ebPlinth)" stroke="#0094ee" strokeWidth="1.5"/>
    <ellipse cx="285" cy="345" rx="132" ry="21" fill="#9ffaff"/><ellipse cx="285" cy="346" rx="109" ry="12" fill="#13dcff" opacity=".36"/>
    <g transform="translate(0 -6)">
      <path d="M285 53 354 89 392 218 355 306 287 337 209 306 178 218 215 70Z" fill="url(#ebFace2)"/>
      <path d="M285 53 215 70 178 218 255 221 310 170Z" fill="url(#ebFace1)"/>
      <path d="M285 53 354 89 392 218 310 170Z" fill="#0869c7"/>
      <path d="M178 218 209 306 287 337 255 221Z" fill="#0587d8"/>
      <path d="M255 221 287 337 355 306 392 218 310 170Z" fill="#0047b8"/>
      <path d="M215 70 285 53 310 170 255 221 178 218Z" fill="url(#ebFace3)" opacity=".18"/>
      <g fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M176 125h62l17 14h25M184 177h92M179 247h78M392 232h-64l-13-12" stroke="#3deeff"/>
        <path d="M392 262h-83M365 291h-83" stroke="#25b5ff"/>
      </g>
      <g fill="#006bea" stroke="#35eaff" strokeWidth="5"><circle cx="176" cy="125" r="7"/><circle cx="280" cy="139" r="7"/><circle cx="276" cy="177" r="7"/><circle cx="257" cy="247" r="7"/><circle cx="315" cy="220" r="7"/><circle cx="309" cy="262" r="7"/><circle cx="282" cy="291" r="7"/></g>
      <g fill="#0860d7" stroke="#17baff" strokeWidth="4"><circle cx="392" cy="262" r="6"/><circle cx="365" cy="291" r="6"/></g>
    </g>
    <g fill="#fff" opacity=".9"><circle cx="446" cy="90" r="2"/><circle cx="112" cy="192" r="2"/><circle cx="480" cy="183" r="3"/></g>
  </svg>;
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [activeService, setActiveService] = useState(null);
  const closeMenu = () => setMenuOpen(false);

  return <div className="eb-site" id="inicio">
    <header className="eb-header">
      <div className="eb-shell eb-header-inner">
        <Brand />
        <button className="eb-menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} /></button>
        <nav className={`eb-nav ${menuOpen ? "eb-nav-open" : ""}`} aria-label="Navegação principal">
          <a href="#servicos" onClick={closeMenu}>Serviços</a><a href="#como-funciona" onClick={closeMenu}>Como funciona</a><a href="#faq" onClick={closeMenu}>FAQ</a><a href="#agendar" onClick={closeMenu} className="eb-button eb-button-small">Agendar consultoria</a>
        </nav>
      </div>
    </header>
    <main>
      <section className="eb-hero" aria-labelledby="eb-title">
        <div className="eb-hero-ambient" aria-hidden="true" />
        <div className="eb-shell eb-hero-grid">
          <div className="eb-hero-copy">
            <h1 id="eb-title">Conheça o seu<br />funcionário digital</h1>
            <p>Automatize processos, responda a clientes<br className="eb-desktop-break"/> e ganhe tempo para o que realmente importa.</p>
            <div className="eb-hero-actions">
              <a href="#agendar" className="eb-button"><Icon name="calendar" size={19}/>Agendar consultoria gratuita</a>
              <a href="#como-funciona" className="eb-button eb-button-outline"><Icon name="play" size={19}/>Ver como funciona</a>
            </div>
          </div>
          <div className="eb-hero-art"><div className="eb-wave eb-wave-one"/><div className="eb-wave eb-wave-two"/><Crystal/></div>
        </div>
      </section>
      <section className="eb-section eb-services" id="servicos" aria-labelledby="eb-services-title">
        <div className="eb-shell">
          <h2 id="eb-services-title" className="eb-heading">Os nossos serviços</h2>
          <div className="eb-service-grid">
            {sections.map((service, index) => <article className={`eb-service-card ${activeService === index ? "eb-service-active" : ""}`} key={service.title}>
              <div className="eb-service-top"><span className="eb-icon-tile"><Icon name={service.icon} size={34}/></span><h3>{service.title}</h3></div>
              {activeService === index && <p className="eb-service-description">{service.description}</p>}
              <button className="eb-card-arrow" aria-label={`Saber mais sobre ${service.title}`} aria-expanded={activeService === index} onClick={() => setActiveService(activeService === index ? null : index)}><Icon name="arrow" size={20}/></button>
            </article>)}
          </div>
        </div>
      </section>
      <section className="eb-section eb-process" id="como-funciona" aria-labelledby="eb-process-title">
        <div className="eb-shell"><h2 id="eb-process-title" className="eb-heading">Como funciona</h2>
          <div className="eb-steps">
            {[["calendar","Consultoria gratuita"],["file","Análise e proposta"],["rocket","Início do projeto"]].map(([icon,label],i)=><div className="eb-step" key={label}><span className="eb-step-count">{i+1}</span><span className="eb-step-icon"><Icon name={icon} size={38}/></span><h3>{label}</h3></div>)}
          </div>
        </div>
      </section>
      <section className="eb-section eb-testimonials" aria-labelledby="eb-testimonials-title">
        <div className="eb-shell"><h2 id="eb-testimonials-title" className="eb-heading">O que os nossos clientes dizem</h2>
          <div className="eb-testimonial-grid">{testimonials.map(t=><blockquote className="eb-testimonial" key={t.name}><span className="eb-quote-mark">“</span><p>“{t.quote}”</p><footer><span className="eb-avatar" aria-hidden="true">{t.initials}</span><strong>{t.name}</strong></footer></blockquote>)}</div>
        </div>
      </section>
      <section className="eb-shell eb-cta" aria-labelledby="eb-cta-title">
        <div><h2 id="eb-cta-title">Vamos conversar?</h2><p>Descubra como a IA pode ajudar o seu negócio.</p></div>
        <a href="#agendar" className="eb-button eb-button-white"><Icon name="calendar" size={20}/>Agendar consultoria gratuita <Icon name="arrow" size={19}/></a>
      </section>
      <section className="eb-section eb-faq" id="faq" aria-labelledby="eb-faq-title">
        <div className="eb-shell"><h2 id="eb-faq-title" className="eb-heading">Perguntas frequentes</h2>
          <div className="eb-faq-list">{faq.map(({q,a},i)=><div className="eb-faq-item" key={q}><button aria-expanded={activeFAQ === i} aria-controls={`eb-faq-answer-${i}`} onClick={()=>setActiveFAQ(activeFAQ===i?null:i)}>{q}<span className={activeFAQ===i?"eb-rotated":""}><Icon name="chevron" size={21}/></span></button><div id={`eb-faq-answer-${i}`} hidden={activeFAQ!==i} className="eb-faq-answer">{a}</div></div>)}</div>
        </div>
      </section>
      <section id="agendar" className="eb-section eb-booking"><div className="eb-shell"><h2 className="eb-heading">Agende a sua consultoria gratuita</h2><p className="eb-booking-subtitle">Escolha um horário para conversarmos sobre o seu negócio.</p><div className="eb-booking-widget"><CalComWidget /></div></div></section>
    </main>
    <footer className="eb-footer"><div className="eb-shell eb-footer-inner"><Brand/><div><a href="mailto:geral@ebenaisolutions.pt">geral@ebenaisolutions.pt</a><a href="tel:+351915796429">+351 915 796 429</a></div><div><a href="/terms">Termos e privacidade</a><span>© {new Date().getFullYear()} Eben AI Solutions</span></div></div></footer>
  </div>;
}

// src/sections/Footer.jsx
import { useEffect, useState } from 'react';
import { siteData } from '../data/luxuryData';
import { ArrowUp, Clock, MapPin, Phone } from 'lucide-react';

// ===== TUA CONFIGURAÇÃO DE CONTATO =====
const PHONE_DISPLAY = '(89) 98143-3161'; 
const PHONE_TEL = '+5589981433161';       
const DEV_LINK = 'https://carlos-emanuel.vercel.app'; 

// Horário de funcionamento: dia da semana (0 = domingo) -> [abre, fecha] em horas
const SCHEDULE = { 2: [9, 19], 3: [9, 19], 4: [9, 19], 5: [9, 19], 6: [9, 19] };
// =======================================

const WEEKDAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

// Ícone SVG limpo do WhatsApp
const WhatsappIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

// Ícone SVG limpo do Instagram
const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

// Mensagem pronta no WhatsApp
const buildWhatsappLink = (baseUrl, message) => {
  if (!baseUrl) return '#';
  return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}text=${encodeURIComponent(message)}`;
};

// Está aberto agora? (sempre no horário de Brasília)
const getOpenStatus = () => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date());

  const get = (type) => parts.find((p) => p.type === type)?.value;
  const day = WEEKDAYS[get('weekday')];
  const minutes = Number(get('hour')) * 60 + Number(get('minute'));
  const hours = SCHEDULE[day];

  return !!hours && minutes >= hours[0] * 60 && minutes < hours[1] * 60;
};

export default function Footer() {
  const [isOpen, setIsOpen] = useState(getOpenStatus);

  // Atualiza a cada minuto
  useEffect(() => {
    const id = setInterval(() => setIsOpen(getOpenStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      id="contato"
      className="relative pt-24 sm:pt-32 pb-10 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-[#9f8ec5] to-[#8c7ab5] text-purple-950 overflow-hidden"
    >
      {/* Efeito de luz ambiente ao fundo */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* CARD DE AGENDAMENTO (CTA) */}
        <div className="relative mb-16 sm:mb-24 p-8 sm:p-14 rounded-3xl bg-white/30 backdrop-blur-2xl border border-white/50 shadow-[0_30px_70px_rgba(40,20,60,0.15)] text-center overflow-hidden">
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-purple-950 leading-tight">
              Pronta para renovar o seu <span className="italic font-normal text-purple-900">estilo e autoestima?</span>
            </h2>
            <p className="text-purple-950/80 text-base sm:text-lg font-light leading-relaxed">
              Agende o seu horário de forma rápida e prática diretamente pelo WhatsApp.
            </p>
            <div className="pt-2">
              <a
                href={buildWhatsappLink(siteData.whatsappUrl, 'Olá! Gostaria de agendar um horário.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-purple-950 hover:bg-purple-900 text-white font-medium text-xs sm:text-sm uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 ring-4 ring-white/30"
              >
                <WhatsappIcon className="w-5 h-5 text-green-400" />
                <span>Agendar Experiência VIP</span>
              </a>
            </div>
          </div>
        </div>

        {/* MARCA, CONTATO E HORÁRIOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 pb-12 border-b border-white/30 text-purple-950 font-light text-sm">

          {/* MARCA */}
          <div className="space-y-4">
            <h3 className="text-2xl font-light tracking-wider text-purple-950 uppercase">
              {siteData.name}
            </h3>
            <p className="text-xs uppercase tracking-widest text-purple-900 font-medium">
              {siteData.tagline}
            </p>
            <p className="text-purple-950/85 leading-relaxed max-w-xs text-xs sm:text-sm">
              O seu espaço exclusivo de beleza, estética e cuidado refinado para unhas.
            </p>
          </div>

          {/* ATENDIMENTO */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-widest text-purple-950 uppercase">
              Atendimento
            </h4>
            <address className="not-italic">
              <ul className="space-y-3.5 text-xs sm:text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-purple-900 shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-purple-950/90">Brasília - DF (Atendimento com Hora Marcada)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-purple-900 shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="text-purple-950/90 hover:text-purple-950 underline-offset-4 hover:underline font-medium"
                  >
                    {PHONE_DISPLAY}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <WhatsappIcon className="w-4 h-4 text-green-800 shrink-0" />
                  <a
                    href={siteData.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-950/90 hover:text-purple-950 underline-offset-4 hover:underline font-medium"
                  >
                    WhatsApp Direto
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <InstagramIcon className="w-4 h-4 text-purple-900 shrink-0" />
                  <a
                    href={siteData.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-950/90 hover:text-purple-950 underline-offset-4 hover:underline font-medium"
                  >
                    {siteData.instagramHandle}
                  </a>
                </li>
              </ul>
            </address>
          </div>

          {/* HORÁRIOS */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h4 className="text-xs font-semibold tracking-widest text-purple-950 uppercase">
                Horários
              </h4>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                  isOpen
                    ? 'bg-green-100/70 text-green-900 border-green-700/20'
                    : 'bg-white/30 text-purple-950/80 border-white/50'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isOpen ? 'bg-green-600 animate-pulse' : 'bg-purple-900/50'
                  }`}
                />
                {isOpen ? 'Aberto agora' : 'Fechado agora'}
              </span>
            </div>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-purple-900 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-purple-950/90">Terça a Sábado: 09h às 19h</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-purple-900 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-purple-950/90">Domingo e Segunda: Fechado</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CRÉDITOS + VOLTAR AO TOPO */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-950/85 font-light">
          <p>© {new Date().getFullYear()} {siteData.name}. Todos os direitos reservados.</p>

          <p className="flex items-center gap-1.5 font-medium">
            Desenvolvido por{' '}
            {DEV_LINK ? (
              <a
                href={DEV_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-950 underline decoration-purple-900 decoration-2 underline-offset-4 hover:text-purple-800"
              >
                Carlos Emanuel
              </a>
            ) : (
              <span className="text-purple-950 underline decoration-purple-900 decoration-2 underline-offset-4">
                Carlos Emanuel
              </span>
            )}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 hover:bg-white/50 border border-white/50 text-purple-950 text-[10px] font-semibold uppercase tracking-widest transition-colors"
          >
            Topo <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
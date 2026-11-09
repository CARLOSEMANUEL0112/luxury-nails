// src/components/Header.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteData } from '../data/luxuryData';
import logoHeader from '../assets/logo_header.png';

const navLinks = [
  { name: 'Início', href: '#inicio' },
  { name: 'Serviços', href: '#servicos' },
  { name: 'Galeria', href: '#galeria' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Contato', href: '#contato' },
];

// Ícone SVG limpo do WhatsApp
const WhatsappIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

// Link do WhatsApp com mensagem pronta
const buildWhatsappLink = (baseUrl, message) => {
  if (!baseUrl) return '#';
  return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}text=${encodeURIComponent(message)}`;
};

export default function Header() {
  const reduceMotion = useReducedMotion();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const whatsappLink = buildWhatsappLink(
    siteData.whatsappUrl,
    'Olá! Gostaria de agendar um horário.'
  );

  // Header fica um pouco mais compacto e firme depois que a página rola
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Destaca no menu a seção que está no meio da tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    navLinks.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Fecha o menu do celular com ESC ou se a tela virar "desktop"
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setIsMobileMenuOpen(false);
    const onResize = () => window.innerWidth >= 768 && setIsMobileMenuOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [isMobileMenuOpen]);

  // Rolagem suave até a seção (e fecha o menu do celular)
  const handleNavClick = (e, href) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', href);
  };

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-white/20 px-6 flex justify-between items-center transition-[padding,background-color,box-shadow] duration-300 ${
        isScrolled
          ? 'py-3 bg-[#b4a5d3]/95 shadow-md'
          : 'py-4 bg-[#b4a5d3]/80 shadow-sm'
      }`}
    >
      {/* LOGO */}
      <a
        href="#inicio"
        onClick={(e) => handleNavClick(e, '#inicio')}
        aria-label="Ir para o início"
        className="flex items-center gap-3 group"
      >
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:border-white transition-all duration-300 overflow-hidden p-0.5">
          <img
            src={logoHeader}
            alt="Logo Luxury Nails"
            className="w-full h-full object-contain filter drop-shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-light text-base tracking-[0.25em] text-purple-950 uppercase leading-none">
            LUXURY <span className="font-semibold text-white">NAILS</span>
          </span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-purple-950/70 font-medium mt-1">
            Beauty Experience
          </span>
        </div>
      </a>

      {/* NAVEGAÇÃO DESKTOP */}
      <nav aria-label="Principal" className="hidden md:flex gap-8 text-sm font-medium text-purple-950/80">
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.slice(1);
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              aria-current={isActive ? 'true' : undefined}
              className={`hover:text-purple-950 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-purple-900 after:transition-all after:duration-300 ${
                isActive
                  ? 'text-purple-950 after:w-full'
                  : 'after:w-0 hover:after:w-full'
              }`}
            >
              {link.name}
            </a>
          );
        })}
      </nav>

      {/* BOTÃO CTA WHATSAPP (DESKTOP) */}
      <div className="hidden md:flex items-center">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-purple-950 text-white px-5 py-2.5 rounded-full font-semibold text-xs tracking-wider uppercase hover:bg-purple-900 hover:scale-105 transition-all shadow-lg shadow-purple-950/20"
        >
          <WhatsappIcon className="w-4 h-4 text-green-400" />
          <span>Agendar Horário</span>
        </a>
      </div>

      {/* CELULAR: atalho de agendar sempre visível + hambúrguer */}
      <div className="flex items-center gap-2 md:hidden">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agendar horário pelo WhatsApp"
          className="w-10 h-10 rounded-full bg-purple-950 text-white flex items-center justify-center shadow-lg shadow-purple-950/20 active:scale-95 transition-all"
        >
          <WhatsappIcon className="w-4 h-4 text-green-400" />
        </a>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="p-1.5 text-purple-950 hover:text-white transition-colors"
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
        </button>
      </div>

      {/* MENU DROPDOWN MOBILE COM ANIMAÇÃO */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-full left-0 w-full bg-[#b4a5d3] backdrop-blur-xl border-b border-white/30 px-6 py-6 space-y-4 shadow-2xl md:hidden overflow-hidden"
          >
            <nav aria-label="Menu do celular" className="space-y-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`block text-base font-semibold border-b pb-2 transition-colors ${
                      isActive
                        ? 'text-white border-white/40'
                        : 'text-purple-950 hover:text-white border-white/10'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 mt-4 rounded-full bg-purple-950 text-white text-xs font-semibold uppercase tracking-wider shadow-lg active:scale-95 transition-all"
            >
              <WhatsappIcon className="w-4 h-4 text-green-400" />
              <span>Agendar Horário</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
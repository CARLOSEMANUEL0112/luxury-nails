// src/sections/Hero.jsx
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, ArrowDown } from 'lucide-react';
import { siteData } from '../data/luxuryData';
import heroFoto from '../assets/hero_foto.png';

// Link do WhatsApp com mensagem pronta
const buildWhatsappLink = (baseUrl, message) => {
  if (!baseUrl) return '#';
  return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}text=${encodeURIComponent(message)}`;
};

export default function Hero() {
  // Respeita quem desativou animações no aparelho
  const reduceMotion = useReducedMotion();

  const goToServices = (e) => {
    const target = document.querySelector('#servicos');
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-[#b4a5d3]"
    >
      {/* --- IMAGEM DE FUNDO DO HERO (decorativa) --- */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src={heroFoto}
          alt=""
          className="w-full h-full object-cover object-right lg:object-center filter brightness-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#b4a5d3]/40 via-transparent to-transparent lg:from-[#b4a5d3]/10" />
      </div>

      {/* --- CONTEÚDO DO TEXTO À ESQUERDA --- */}
      <div className="max-w-7xl mx-auto px-6 z-20 w-full relative grid lg:grid-cols-12 gap-12 items-center">

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="lg:col-span-7 space-y-8 text-center lg:text-left bg-white/10 p-6 rounded-3xl backdrop-blur-sm border border-white/20 lg:bg-transparent lg:p-0 lg:border-none"
        >
          <div className="inline-flex items-center gap-2 border border-purple-400/40 px-4 py-1.5 rounded-full bg-white/30 text-purple-950 text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-sm">
            <span>Beleza • Cuidado • Autoestima</span>
          </div>

          {/* ATENÇÃO: o frasco flutuante (App.jsx) se posiciona pelas linhas deste h1.
              Pode mudar o texto e o estilo, mas mantenha 2 linhas e a tag <h1>. */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight text-purple-950 leading-[1.1]">
            Suas unhas, <br />
            ainda mais <span className="font-serif italic text-white drop-shadow-lg">especiais.</span>
          </h1>

          <p className="text-purple-900/95 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
            Experimente o cuidado de um salão premium, com técnicas modernas e um toque inconfundível de sofisticação.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
            <a
              href={buildWhatsappLink(siteData.whatsappUrl, 'Olá! Gostaria de agendar um horário.')}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-white text-purple-950 font-semibold px-8 py-4 rounded-full text-sm uppercase tracking-wider shadow-xl hover:bg-purple-950 hover:text-white active:scale-95 transition-all duration-300"
            >
              <Calendar className="w-4 h-4 text-purple-700 group-hover:text-white transition-colors" aria-hidden="true" />
              <span>Agendar Horário</span>
            </a>

            <a
              href="#servicos"
              onClick={goToServices}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-purple-950/40 bg-purple-950/15 backdrop-blur-md text-purple-950 font-semibold text-sm uppercase tracking-wider hover:bg-purple-950 hover:text-white hover:border-purple-950 active:scale-95 transition-all duration-300 shadow-sm"
            >
              Ver serviços
            </a>
          </div>

          <a
            href="#servicos"
            onClick={goToServices}
            className="pt-8 flex items-center justify-center lg:justify-start gap-2 text-xs text-purple-900/90 tracking-widest uppercase font-medium hover:text-purple-950 transition-colors"
          >
            <ArrowDown className="w-4 h-4 motion-safe:animate-bounce text-purple-800" aria-hidden="true" />
            <span>Role e descubra nossos serviços</span>
          </a>
        </motion.div>

        <div className="lg:col-span-5 h-[480px] hidden lg:block" />

      </div>
    </section>
  );
}
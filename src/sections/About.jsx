// src/sections/About.jsx
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Award, MessageCircle } from 'lucide-react';
import { siteData } from '../data/luxuryData';

// ===== TROQUE PELA FOTO REAL DA PROFISSIONAL =====
// 1) coloque a foto em src/assets/ (ex.: sobre_foto.jpg)
// 2) importe no topo:  import aboutFoto from '../assets/sobre_foto.jpg';
// 3) use:              const ABOUT_PHOTO = aboutFoto;
// (link externo do Pinterest pode sair do ar a qualquer momento)
const ABOUT_PHOTO =
  'https://i.pinimg.com/736x/c3/0f/eb/c30febdc54591c032084dbb02accb871.jpg';
// =================================================

const highlights = [
  {
    icon: ShieldCheck,
    title: 'Biossegurança Rígida',
    desc: 'Materiais 100% esterilizados em autoclave e descartáveis individuais para a sua total proteção.',
  },
  {
    icon: HeartHandshake,
    title: 'Atendimento Exclusivo',
    desc: 'Experiência individualizada num ambiente acolhedor, calmo e pensado para o seu máximo conforto.',
  },
  {
    icon: Award,
    title: 'Técnicas de Alta Precisão',
    desc: 'Acabamentos impecáveis com produtos premium de altíssima durabilidade e brilho inconfundível.',
  },
];

const whatsappLink = (baseUrl, message) => {
  if (!baseUrl) return '#';
  return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}text=${encodeURIComponent(message)}`;
};

export default function About() {
  // Respeita quem desativou animações no aparelho
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="sobre"
      className="relative py-20 sm:py-32 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-[#7b69a4] to-[#6a5893] text-purple-950 overflow-hidden"
    >
      {/* Efeito sutil de brilho ao fundo */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">

        {/* COLUNA ESQUERDA: FOTO DA PROFISSIONAL */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-5 relative"
        >
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(30,10,60,0.4)] border border-white/50 bg-purple-950/20 group">
              <img
                src={ABOUT_PHOTO}
                alt={siteData.ownerName ? `${siteData.ownerName}, nail designer` : 'Nail designer profissional'}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-transparent to-transparent" />

              {/* Nome da profissional (aparece se existir siteData.ownerName) */}
              {siteData.ownerName && (
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-lg font-medium tracking-wide">{siteData.ownerName}</p>
                  <p className="text-[10px] uppercase tracking-widest text-purple-200 font-semibold">
                    Nail Designer
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* COLUNA DIREITA: CONTEÚDO E CARDS */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-8"
        >
          {/* Cabeçalho */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-xl text-xs font-semibold tracking-widest uppercase text-purple-950 border border-white/60 mb-5 shadow-sm">
              Minha Essência
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6 leading-[1.15] drop-shadow-sm">
              A arte de transformar unhas numa <span className="italic font-normal text-purple-950">experiência única</span>.
            </h2>
            <p className="text-white/95 text-base sm:text-lg font-light leading-relaxed max-w-2xl drop-shadow-sm">
              Acredito que a manicure vai muito além da estética: é um momento de pausa, cuidado e reafirmação da sua autoestima. Cada atendimento é planejado com precisão e sensibilidade artística para entregar um resultado impecável.
            </p>
          </div>

          {/* Cards de Destaque */}
          <ul className="space-y-4 pt-2">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.title}
                  whileHover={reduceMotion ? undefined : { scale: 1.02, x: 4 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/50 shadow-lg"
                >
                  <div className="p-3.5 rounded-xl bg-purple-950 text-white shrink-0 shadow-md">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-medium text-purple-950 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-950/90 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>

          {/* Chamada para agendar: fecha a seção levando o cliente à ação */}
          <div className="pt-2">
            <a
              href={whatsappLink(siteData.whatsappUrl, 'Olá! Vi o seu trabalho e gostaria de agendar um horário.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-purple-950 text-xs sm:text-sm font-semibold uppercase tracking-widest shadow-xl hover:bg-purple-950 hover:text-white active:scale-95 transition-all duration-300"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Quero agendar o meu horário
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
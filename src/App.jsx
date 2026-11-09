// src/App.jsx
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Gallery from './sections/Gallery';
import About from './sections/About';
import Footer from './components/Footer';
import { siteData } from './data/luxuryData';

gsap.registerPlugin(ScrollTrigger);

// Retângulo (em px, relativo à tela) de uma linha do texto de um elemento
const getLine = (el, which) => {
  const range = document.createRange();
  range.selectNodeContents(el);
  const rects = Array.from(range.getClientRects()).filter((r) => r.width > 0);
  if (!rects.length) return null;
  const tops = rects.map((r) => r.top);
  const refTop = which === 'last' ? Math.max(...tops) : Math.min(...tops);
  const line = rects.filter((r) => Math.abs(r.top - refTop) < 8);
  return {
    right: Math.max(...line.map((r) => r.right)),
    top: Math.min(...line.map((r) => r.top)),
    bottom: Math.max(...line.map((r) => r.bottom)),
  };
};

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const easeInOut = gsap.parseEase('power2.inOut');

export default function App() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    // O frasco nasce ao lado do título do hero, vai até o título de "Serviços"
    // e, ao chegar, fica COLADO nele (acompanha a posição real do título).
    // Tudo é calculado a partir da rolagem, sem animações separadas que possam
    // se atrapalhar ou ficar desencontradas.
    const setupBottle = ({
      // --- partida (hero) ---
      START_LINE, // 'first' | 'last': ao lado do fim de qual linha do h1
      START_GAP,  // espaço entre o texto e o frasco (px)
      START_FILL, // quanto da largura da imagem é frasco de verdade
      START_DY,   // sobe (-) ou desce (+) em relação ao centro da linha
      // --- chegada (título de Serviços) ---
      TRIGGER_AT, // altura da tela (0 a 1) onde o título "para"
      GAP,
      OFFSET_Y,   // desce (+) ou sobe (-) em relação ao topo do título
      SCALE,
      BOTTLE_FILL,
      LINE,       // 'first' | 'last': ao lado do fim de qual linha do título
      ROTATE,
    }) => {
      const bottleEl = document.querySelector('#active-floating-bottle');
      const titleEl = document.querySelector('#services-title');
      const heroTitleEl = document.querySelector('#inicio h1');
      if (!bottleEl || !titleEl) return;

      const ROTATE_START = 12; // o rotate-12 do CSS
      const FADE_START = 140;  // px entre header e título onde o frasco começa a sumir
      const FADE_END = 40;     // px entre header e título onde ele já sumiu por completo
      let m = null; // medidas em cache (refeitas a cada refresh)

      const measure = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const scrollY = window.scrollY;

        // centro do frasco na posição original do CSS
        const baseX = bottleEl.offsetLeft + bottleEl.offsetWidth / 2;
        const baseY = bottleEl.offsetTop + bottleEl.offsetHeight / 2;

        // partida: ao lado do título do hero (como se a página estivesse no topo)
        let startX = baseX;
        let startY = baseY;
        const heroLine = heroTitleEl ? getLine(heroTitleEl, START_LINE) : null;
        if (heroLine) {
          const halfBoxStart = (bottleEl.offsetWidth * 1.25) / 2;
          startX = heroLine.right + START_GAP + halfBoxStart * START_FILL;
          startY = (heroLine.top + heroLine.bottom) / 2 + scrollY + START_DY;
        }

        // chegada: ao lado do fim do texto do título de Serviços
        const titleRect = titleEl.getBoundingClientRect();
        const titleLine = getLine(titleEl, LINE);
        const textRight = titleLine ? titleLine.right : titleRect.right;
        const halfBox = (bottleEl.offsetWidth * 1.25 * SCALE) / 2;
        const endX = Math.min(
          textRight + GAP + halfBox * BOTTLE_FILL,
          vw - halfBox - 6
        );

        m = {
          baseX,
          baseY,
          startX,
          startY,
          endX,
          endY: vh * TRIGGER_AT + OFFSET_Y, // posição na tela quando o título "para"
          // rolagem necessária para o título chegar em TRIGGER_AT da tela
          distance: Math.max(1, titleRect.top + scrollY - vh * TRIGGER_AT),
        };
      };

      const update = () => {
        if (!m) return;
        const p = clamp(window.scrollY / m.distance, 0, 1);
        const e = easeInOut(p);

        // Antes de chegar: caminho suave até o ponto de parada.
        // Depois de chegar: fica preso ao topo REAL do título (rola junto com ele).
        const y =
          p < 1
            ? lerp(m.startY, m.endY, e)
            : titleEl.getBoundingClientRect().top + OFFSET_Y;

        // Some antes de chegar no header: o frasco sai de cena junto com o título,
        // em vez de ficar espiando por baixo da borda do header.
        // gap = distância entre o fim do header e o topo do título.
        const headerEl = document.querySelector('header');
        const headerBottom = headerEl ? headerEl.getBoundingClientRect().bottom : 72;
        const gap = titleEl.getBoundingClientRect().top - headerBottom;
        const alpha = clamp((gap - FADE_END) / (FADE_START - FADE_END), 0, 1);

        gsap.set(bottleEl, {
          x: lerp(m.startX, m.endX, e) - m.baseX,
          y: y - m.baseY,
          scale: lerp(1, SCALE, e),
          rotate: lerp(ROTATE_START, ROTATE, e),
          autoAlpha: alpha, // opacidade + esconde de vez quando chega a 0
        });
      };

      const onRefresh = () => {
        measure();
        update();
      };

      measure();
      update();

      const st = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: update,
      });
      ScrollTrigger.addEventListener('refresh', onRefresh);

      return () => {
        st.kill();
        ScrollTrigger.removeEventListener('refresh', onRefresh);
      };
    };

    // 1. COMPUTADOR / TABLET
    mm.add('(min-width: 768px)', () =>
      setupBottle({
        START_LINE: 'last',
        START_GAP: 16,
        START_FILL: 0.22,
        START_DY: -50,
        TRIGGER_AT: 0.4,
        GAP: 14,
        OFFSET_Y: 24,
        SCALE: 0.32,
        BOTTLE_FILL: 0.25,
        LINE: 'last',
        ROTATE: -8,
      })
    );

    // 2. CELULAR
    mm.add('(max-width: 767px)', () =>
      setupBottle({
        START_LINE: 'first',
        START_GAP: 8,
        START_FILL: 0.3,
        START_DY: -16,
        TRIGGER_AT: 0.35,
        GAP: 6,
        OFFSET_Y: 22,
        SCALE: 0.75,
        BOTTLE_FILL: 0.4,
        LINE: 'first',
        ROTATE: -8,
      })
    );

    // O texto do hero entra com animação (framer-motion, ~1s) e as fontes/imagens
    // carregam depois: recalcula as posições quando tudo estiver assentado.
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 1200);
    window.addEventListener('load', refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);

    return () => {
      clearTimeout(t);
      window.removeEventListener('load', refresh);
      mm.revert();
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#b4a5d3] text-purple-950 overflow-x-hidden selection:bg-purple-400 selection:text-white">
      {/* FRASCO FLUTUANTE RESPONSIVO */}
      <div
        id="active-floating-bottle"
        className="fixed top-[27%] right-[12%] sm:top-[16%] sm:right-[23%] w-[110px] sm:w-[450px] lg:w-[650px] z-40 pointer-events-none block rotate-12 drop-shadow-[-10px_15px_20px_rgba(0,0,0,0.25)]"
      >
        <img
          src={siteData.images.floatingBottle}
          alt="Luxury Active Polish"
          className="w-full h-auto object-contain filter brightness-105 scale-125"
        />
      </div>

      <Header />
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Footer />
    </main>
  );
}
// src/sections/Gallery.jsx
import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { siteData } from '../data/luxuryData';
import { MessageCircle, X } from 'lucide-react';

const MIN_SET = 8; // mínimo de cards por "volta" da fita, para nunca sobrar espaço vazio
const SECONDS_PER_CARD = 4; // velocidade: mesma em qualquer filtro

const whatsappLink = (baseUrl, message) => {
  if (!baseUrl) return '#';
  return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}text=${encodeURIComponent(message)}`;
};

export default function Gallery() {
  const reduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [hoverPaused, setHoverPaused] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);

  // Categorias vêm dos próprios dados: nunca aparece um filtro vazio
  const categories = useMemo(
    () => ['Todos', ...new Set(siteData.gallery.map((i) => i.category).filter(Boolean))],
    []
  );

  const filteredItems = useMemo(
    () =>
      selectedCategory === 'Todos'
        ? siteData.gallery
        : siteData.gallery.filter((item) => item.category === selectedCategory),
    [selectedCategory]
  );

  // Uma "volta" com pelo menos MIN_SET cards; a fita tem 2 voltas e anda -50%
  const baseSet = useMemo(() => {
    if (!filteredItems.length) return [];
    const out = [];
    while (out.length < MIN_SET) out.push(...filteredItems);
    return out;
  }, [filteredItems]);

  // Fecha o zoom com ESC e trava a rolagem da página enquanto ele está aberto
  useEffect(() => {
    if (!lightboxItem) return;
    const onKey = (e) => e.key === 'Escape' && setLightboxItem(null);
    window.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxItem]);

  const paused = hoverPaused || lightboxItem !== null;

  const renderCard = (item, hidden = false) => (
    <button
      type="button"
      onClick={() => setLightboxItem(item)}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden || undefined}
      aria-label={`Ampliar foto: ${item.title}`}
      className="group text-left w-[280px] sm:w-[350px] lg:w-[400px] flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-950 rounded-3xl"
    >
      {/* IMAGEM COM ZOOM */}
      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/40 bg-purple-950/10">
        <img
          src={item.image}
          alt={hidden ? '' : item.title}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
        />
      </div>

      {/* LEGENDA */}
      <div className="mt-3.5 px-2">
        <h3 className="text-lg sm:text-xl font-medium text-purple-950 tracking-wide">
          {item.title}
        </h3>
      </div>
    </button>
  );

  return (
    <section
      id="galeria"
      className="relative py-20 sm:py-28 bg-gradient-to-b from-[#9f8ec5] to-[#8c7ab5] text-purple-950 overflow-hidden w-full"
    >
      {/* Animação da fita em CSS: pausa e retoma exatamente de onde parou */}
      <style>{`
        @keyframes gallery-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>

      {/* CABEÇALHO DA GALERIA */}
      <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14 px-6">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-md text-xs font-medium tracking-widest uppercase text-purple-900 border border-white/40 mb-4 shadow-sm">
         Portfólio Exclusivo
        </span>
        <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-purple-950 mb-4">
          Galeria de <span className="italic font-normal">Inspirações</span>
        </h2>
        <p className="text-purple-950/80 text-base sm:text-lg max-w-xl mx-auto font-light">
          Explore os nossos acabamentos de precisão e descubra a arte em cada detalhe.
        </p>

        {/* FILTROS DE CATEGORIA */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={isActive}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-purple-950 text-white shadow-xl scale-105 ring-2 ring-white/40'
                    : 'bg-white/25 text-purple-950 hover:bg-white/40 border border-white/30 backdrop-blur-md'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* FITA DE FOTOS */}
      {reduceMotion ? (
        // Quem desativou animações no aparelho: faixa rolável com o dedo/mouse
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 pb-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="snap-center shrink-0">
              {renderCard(item)}
            </div>
          ))}
        </div>
      ) : (
        <div
          className="relative w-full overflow-hidden py-4"
          // bordas suaves: as fotos surgem e somem com fade
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
            maskImage:
              'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          }}
          onMouseEnter={() => setHoverPaused(true)}
          onMouseLeave={() => setHoverPaused(false)}
          onTouchStart={() => setHoverPaused(true)}
          onTouchEnd={() => setHoverPaused(false)}
          onTouchCancel={() => setHoverPaused(false)}
        >
          <div
            key={selectedCategory} // reinicia a fita limpa ao trocar o filtro
            className="flex w-max"
            style={{
              animation: `gallery-marquee ${baseSet.length * SECONDS_PER_CARD}s linear infinite`,
              animationPlayState: paused ? 'paused' : 'running',
              willChange: 'transform',
            }}
          >
            {[0, 1].flatMap((copy) =>
              baseSet.map((item, index) => (
                // pr (e não gap): garante que a volta termina exatamente onde começa
                <div key={`${copy}-${item.id}-${index}`} className="shrink-0 pr-6 sm:pr-8">
                  {renderCard(item, copy === 1)}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* CHAMADA PARA AGENDAR */}
      <div className="mt-10 sm:mt-14 text-center px-6">
        <a
          href={whatsappLink(
            siteData.whatsappUrl,
            'Olá! Vi a galeria e gostaria de um design parecido.'
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-purple-950 text-white text-xs sm:text-sm font-semibold uppercase tracking-widest shadow-xl hover:bg-purple-900 active:scale-95 transition-all duration-300"
        >
          <MessageCircle size={18} aria-hidden="true" />
          Quero um design assim
        </a>
      </div>

      {/* ZOOM DA FOTO (clique no card) */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/80 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md flex flex-col items-center gap-4"
          >
            <button
              type="button"
              onClick={() => setLightboxItem(null)}
              aria-label="Fechar"
              className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-white text-purple-950 flex items-center justify-center shadow-xl hover:bg-purple-100 transition-colors"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <img
              src={lightboxItem.image}
              alt={lightboxItem.title}
              className="w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/30"
            />

            <p className="text-white text-lg font-medium tracking-wide text-center">
              {lightboxItem.title}
            </p>

            <a
              href={whatsappLink(
                siteData.whatsappUrl,
                `Olá! Gostaria de agendar o design "${lightboxItem.title}" que vi na galeria.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-purple-950 text-xs font-semibold uppercase tracking-widest shadow-xl hover:bg-purple-200 transition-colors"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Quero esse design
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
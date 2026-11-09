// src/sections/Services.jsx
import { useEffect, useState } from 'react';
import { siteData } from '../data/luxuryData';
import { Calendar, ChevronRight, ChevronUp, } from 'lucide-react';

const buildWhatsappLink = (baseUrl, serviceTitle) => {
  if (!baseUrl) return '#';
  const text = encodeURIComponent(`Olá! Gostaria de agendar: ${serviceTitle}`);
  return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}text=${text}`;
};

export default function Services() {
  const [activeService, setActiveService] = useState(siteData.services[0]);

  // No computador a foto grande nunca fica vazia, mesmo que no celular
  // o cliente tenha fechado todos os cartões e depois girado/redimensionado a tela
  const displayService = activeService ?? siteData.services[0];

  // Pré-carrega as fotos: ao abrir um cartão no celular a foto já está pronta
  // (imagem com loading="lazy" dentro de área fechada demora a carregar)
  useEffect(() => {
    siteData.services.forEach((service) => {
      const img = new Image();
      img.src = service.nailPhoto;
    });
  }, []);

  const handleSelect = (service, e) => {
    if (window.innerWidth < 1024 && activeService?.id === service.id) {
      setActiveService(null);
      return;
    }

    setActiveService(service);

    if (window.innerWidth < 1024) {
      const card = e.currentTarget.closest('[data-service-card]');
      // espera a animação do cartão anterior fechar (duration-500) antes de rolar
      setTimeout(() => {
        card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 520);
    }
  };

  return (
    <section
      id="servicos"
      className="relative py-20 sm:py-28 px-6 sm:px-12 lg:px-24 bg-gradient-to-b from-[#9f8ec5] to-[#7b69a4] text-purple-950"
    >
      {/* CABEÇALHO DA SEÇÃO */}
      <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-16">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-md text-xs font-medium tracking-widest uppercase text-purple-900 border border-white/40 mb-4 shadow-sm">
        Experiência Visual Imersiva
        </span>
        <h2
          id="services-title"
          className="text-4xl sm:text-5xl font-light tracking-tight text-purple-950 mb-4"
        >
          O toque final que transforma o <span className="italic font-normal">visual</span>
        </h2>
        <p className="text-purple-950/80 text-base sm:text-lg max-w-xl mx-auto font-light">
          Assista à aplicação dos nossos tons exclusivos e escolha a sua experiência favorita.
        </p>
      </div>

      {/* GRID PRINCIPAL */}
      <div className="max-w-6xl mx-auto flex flex-col gap-4 lg:grid lg:grid-cols-12 lg:gap-10 lg:items-center">

        {/* FOTO EM DESTAQUE (computador) */}
        <div className="hidden lg:block lg:col-span-6">
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/40 bg-purple-900/10">
            {siteData.services.map((service) => (
              <img
                key={service.id}
                src={service.nailPhoto}
                alt={service.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  displayService.id === service.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}

            <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-5 rounded-2xl bg-purple-950/60 backdrop-blur-xl border border-white/20 text-white flex items-center justify-between gap-4 shadow-xl">
              <div className="min-w-0 pr-2">
                <span className="text-[10px] tracking-widest uppercase text-purple-300 font-semibold block mb-0.5">
                  Serviço selecionado
                </span>
                <h3 className="text-base sm:text-lg font-medium tracking-wide truncate">
                  {displayService.title}
                </h3>
              </div>
              <a
                href={buildWhatsappLink(siteData.whatsappUrl, displayService.title)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Agendar ${displayService.title}`}
                className="shrink-0 inline-flex items-center gap-2 h-10 px-5 rounded-full bg-gradient-to-r from-purple-900 to-purple-950 text-white text-xs font-semibold uppercase tracking-wider shadow-lg shadow-purple-950/30 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Calendar size={16} aria-hidden="true" />
                <span>Agendar</span>
              </a>
            </div>
          </div>
        </div>

        {/* CARTÕES DE SERVIÇOS */}
        <div className="lg:col-span-6 flex flex-col gap-4 sm:gap-5">
          {siteData.services.map((service, index) => {
            const isActive = activeService?.id === service.id;
            return (
              <div
                key={service.id}
                data-service-card
                className={`rounded-2xl transition-all duration-300 border ${
                  isActive
                    ? 'bg-white/50 backdrop-blur-xl border-white shadow-xl ring-2 ring-purple-950/20'
                    : 'bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 hover:border-white/50'
                }`}
              >
                <button
                  type="button"
                  onClick={(e) => handleSelect(service, e)}
                  aria-expanded={isActive}
                  className="group w-full text-left p-4 sm:p-6 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-950"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <span className="text-xs font-semibold tracking-wider text-purple-900/60 uppercase block mb-1">
                        0{index + 1}
                      </span>
                      <h3 className="text-lg sm:text-xl font-medium text-purple-950">
                        {service.title}
                      </h3>
                      <p className="text-sm text-purple-950/80 sm:text-base mt-1 font-light">
                        {service.desc}
                      </p>

                      {/* Duração e preço: aparecem se existirem em siteData.services */}
                      {(service.duration || service.price) && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {service.duration && (
                            <span className="px-3 py-1 rounded-full bg-white/40 border border-white/50 text-[11px] font-semibold uppercase tracking-wider text-purple-950">
                              {service.duration}
                            </span>
                          )}
                          {service.price && (
                            <span className="px-3 py-1 rounded-full bg-purple-950 text-[11px] font-semibold uppercase tracking-wider text-white">
                              {service.price}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div
                      className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-purple-950 text-white shadow-lg'
                          : 'bg-white/40 text-purple-950 group-hover:bg-purple-950 group-hover:text-white'
                      }`}
                    >
                      {isActive ? (
                        <ChevronUp size={20} aria-hidden="true" />
                      ) : (
                        <ChevronRight size={20} aria-hidden="true" />
                      )}
                    </div>
                  </div>
                </button>

                {/* FOTO DO SERVIÇO DENTRO DO CARTÃO (celular/tablet) */}
                <div
                  aria-hidden={!isActive}
                  className={`lg:hidden grid transition-all duration-500 ease-in-out ${
                    isActive ? 'grid-rows-[1fr] opacity-100 pb-2' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-3 pt-1">
                      <img
                        src={service.nailPhoto}
                        alt={service.title}
                        className="w-full h-[220px] sm:h-[320px] object-cover rounded-xl shadow-lg border border-white/40"
                      />
                      <a
                        href={buildWhatsappLink(siteData.whatsappUrl, service.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={isActive ? 0 : -1}
                        className="relative group/btn overflow-hidden flex items-center justify-center gap-2 w-full h-12 rounded-full bg-gradient-to-r from-purple-900 via-purple-950 to-purple-900 text-white text-xs font-semibold uppercase tracking-wider shadow-lg shadow-purple-950/30 active:scale-95 transition-all duration-300"
                      >
                        <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                        <Calendar size={16} aria-hidden="true" className="relative z-10 transition-transform duration-300 group-hover/btn:scale-110" />
                        <span className="relative z-10">Agendar este serviço</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
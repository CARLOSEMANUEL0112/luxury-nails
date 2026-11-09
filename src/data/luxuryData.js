// src/data/luxuryData.js
import bottleImg from '../assets/bottle.png';

export const siteData = {
  name: "LUXURY NAILS",
  tagline: "Beauty Experience",
  // Número corrigido com o DDD 89
  whatsappUrl: "https://wa.me/5589981433161?text=Olá!%20Vim%20pelo%20site%20e%20quero%20agendar%20minha%20experiência.",
  instagramUrl: "https://instagram.com/carlos_emanuelrf",
  instagramHandle: "@carlos_emanuelrf",
  
  images: {
    floatingBottle: bottleImg,
  },
  
  gallery: [
    {
      id: 1,
      title: 'Azul Celeste',
      category: 'Manicure',
      image: 'https://i.pinimg.com/1200x/c9/a2/d8/c9a2d80b6d47721aad3dab3059261e52.jpg',
    },
    {
      id: 2,
      title: 'Estrutura em Gel',
      category: 'Alongamento',
      image: 'https://i.pinimg.com/736x/c0/52/45/c0524511898f937d0c348232abc0c320.jpg',
    },
    {
      id: 3,
      title: 'Detalhes com Laços',
      category: 'Design',
      image: 'https://i.pinimg.com/1200x/87/b4/4c/87b44c9e77579db2ae9adaddc345fb60.jpg',
    },
    {
      id: 4,
      title: 'Efeito Degradé Rosé',
      category: 'Manicure',
      image: 'https://i.pinimg.com/736x/80/e8/63/80e8637b453350f6df7d257c9ded5df1.jpg',
    },
    {
      id: 5,
      title: 'Espaço Exclusivo',
      category: 'Spa',
      image: 'https://i.pinimg.com/1200x/4e/ca/20/4eca20e9a246ecb8c0bb13576fa33bc2.jpg',
    },
    {
      id: 6,
      title: 'Francesinha Colorida',
      category: 'Design',
      image: 'https://i.pinimg.com/736x/cb/53/27/cb532723ff8e52afd7ff10448e45d9da.jpg',
    },
  ],

  services: [
    {
      id: 1,
      title: "Manicure",
      desc: "Acabamento impecável, cuticulagem perfeita e alta durabilidade.",
      colorHex: "#a78bfa",
      nailPhoto: "https://i.pinimg.com/1200x/c9/a2/d8/c9a2d80b6d47721aad3dab3059261e52.jpg"
    },
    {
      id: 2,
      title: "Pedicure",
      desc: "Cuidado minucioso, higiene rigorosa e bem-estar para os pés.",
      colorHex: "#8b5cf6",
      nailPhoto: "https://i.pinimg.com/736x/d1/75/23/d1752380c1730c0f429026282463fce6.jpg"
    },
    {
      id: 3,
      title: "Alongamento em Gel",
      desc: "Formato perfeito, resistência e brilho impecável.",
      colorHex: "#c4b5fd",
      nailPhoto: "https://i.pinimg.com/736x/c0/52/45/c0524511898f937d0c348232abc0c320.jpg"
    },
    {
      id: 4,
      title: "Spa dos Pés",
      desc: "Hidratação profunda e experiência relaxante completa.",
      colorHex: "#ddd6fe",
      nailPhoto: "https://i.pinimg.com/1200x/4e/ca/20/4eca20e9a246ecb8c0bb13576fa33bc2.jpg"
    }
  ]
};
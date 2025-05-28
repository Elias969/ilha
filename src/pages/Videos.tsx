import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PlayCircle, Search, Filter } from 'lucide-react';
import { SectionTitle, Button } from '../components/ui/UIComponents';

// Interface para VOD
interface Vod {
  id: number;
  titulo: string;
  thumbnail: string; // Placeholder
  link: string; // Link para YouTube/Twitch
  tipo: 'React' | 'Gameplay' | 'Podcast' | 'Especial';
  data: string; // Data de publicação
  descricaoCurta: string;
}

// Dados de exemplo para VODs
const mockVods: Vod[] = [
  {
    id: 1,
    titulo: "REACT COMPLETO: Final CBLOL 2025",
    thumbnail: "/assets/images/demonstracao/placeholder_vod_cblol.png",
    link: "#", // Substituir pelo link real
    tipo: "React",
    data: "28/05/2025",
    descricaoCurta: "Análise completa da grande final com Baiano, Jukes e Mylon."
  },
  {
    id: 2,
    titulo: "Gameplay Insana: Jukes de Master Yi",
    thumbnail: "/assets/images/demonstracao/placeholder_vod_jukes_yi.png",
    link: "#",
    tipo: "Gameplay",
    data: "27/05/2025",
    descricaoCurta: "Jukes mostrando como carregar de Master Yi no high elo."
  },
  {
    id: 3,
    titulo: "Ilha Cast #15: Meta Atual e Tier List",
    thumbnail: "/assets/images/demonstracao/placeholder_vod_podcast.png",
    link: "#",
    tipo: "Podcast",
    data: "26/05/2025",
    descricaoCurta: "Discussão sobre os campeões mais fortes do patch atual."
  },
  {
    id: 4,
    titulo: "Showmatch Lendário: Ilha vs Convidados",
    thumbnail: "/assets/images/demonstracao/placeholder_vod_showmatch.png",
    link: "#",
    tipo: "Especial",
    data: "25/05/2025",
    descricaoCurta: "Melhores momentos do showmatch com participação especial."
  },
  {
    id: 5,
    titulo: "React MSI 2025 - Dia 3",
    thumbnail: "/assets/images/demonstracao/placeholder_vod_msi.png",
    link: "#",
    tipo: "React",
    data: "24/05/2025",
    descricaoCurta: "Análise das partidas do terceiro dia do Mid-Season Invitational."
  },
  {
    id: 6,
    titulo: "Guia Completo: Como Sair do Bronze com Mylon",
    thumbnail: "/assets/images/demonstracao/placeholder_vod_guia_mylon.png",
    link: "#",
    tipo: "Gameplay",
    data: "23/05/2025",
    descricaoCurta: "Mylon ensina os fundamentos para subir de elo na top lane."
  }
];

// Componente VideoCard
interface VideoCardProps {
  vod: Vod;
}

const VideoCard: React.FC<VideoCardProps> = ({ vod }) => {
  return (
    <motion.a
      href={vod.link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-background-purple/30 rounded-lg shadow-lg overflow-hidden block group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 selection-line-animated"
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative w-full h-40 bg-background-purple">
        <img 
          src={vod.thumbnail} 
          alt={vod.titulo} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          onError={(e) => (e.currentTarget.src = '/assets/images/demonstracao/placeholder_default.png')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayCircle size={48} className="text-white" />
        </div>
        <span className="absolute top-2 right-2 bg-primary-purple px-2 py-0.5 rounded-full text-xs font-medium">{vod.tipo}</span>
      </div>
      <div className="p-4">
        <h3 className="text-md font-bold mb-1 line-clamp-2 group-hover:text-primary-purple transition-colors">{vod.titulo}</h3>
        <p className="text-gray-400 text-sm mb-2 line-clamp-2">{vod.descricaoCurta}</p>
        <p className="text-gray-500 text-xs">{vod.data}</p>
      </div>
    </motion.a>
  );
};

const Videos: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="min-h-screen pt-24 pb-16 bg-gradient-main"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div variants={itemVariants}>
          <SectionTitle title="Hub de" highlight="Vídeos" />
        </motion.div>

        {/* Filtros e Busca (Simulado) */}
        <motion.div variants={itemVariants} className="mb-8 flex flex-col md:flex-row gap-4 items-center bg-background-purple/30 p-4 rounded-lg">
          <div className="flex items-center border border-primary-purple/30 rounded-lg px-3 py-2 flex-grow w-full md:w-auto">
            <Search size={20} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Buscar por título ou conteúdo..." 
              className="bg-transparent focus:outline-none text-white placeholder-gray-400 w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-primary-purple"/>
            <span className="text-sm font-medium">Filtrar por tipo:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="text-sm px-3 py-1.5">Todos</Button>
            <Button variant="outline" className="text-sm px-3 py-1.5">React</Button>
            <Button variant="outline" className="text-sm px-3 py-1.5">Gameplay</Button>
            <Button variant="outline" className="text-sm px-3 py-1.5">Podcast</Button>
            <Button variant="outline" className="text-sm px-3 py-1.5">Especial</Button>
          </div>
        </motion.div>

        {/* Grade de Vídeos */}
        <motion.div 
          variants={containerVariants} 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {mockVods.map((vod) => (
            <motion.div key={vod.id} variants={itemVariants}>
              <VideoCard vod={vod} />
            </motion.div>
          ))}
        </motion.div>

        {/* Paginação (Simulada) */}
        <motion.div variants={itemVariants} className="mt-12 flex justify-center">
          <div className="flex gap-2">
            <Button variant="outline" className="px-4 py-2">Anterior</Button>
            <Button variant="primary" className="px-4 py-2">1</Button>
            <Button variant="outline" className="px-4 py-2">2</Button>
            <Button variant="outline" className="px-4 py-2">3</Button>
            <Button variant="outline" className="px-4 py-2">Próxima</Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Videos;


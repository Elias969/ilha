import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Youtube, Twitch, Twitter, ExternalLink } from 'lucide-react';

interface Canal {
  id: number;
  nome: string;
  url: string;
  icon: React.ReactNode;
  cor: string;
  descricao: string;
}

const Canais: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('todos');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Lista de canais
  const canais: Canal[] = [
    {
      id: 1,
      nome: "YouTube Oficial",
      url: "https://youtube.com/ilhadaslendas",
      icon: <Youtube size={24} />,
      cor: "bg-red-600",
      descricao: "Canal oficial com todos os vídeos, reacts e conteúdos editados da Ilha das Lendas."
    },
    {
      id: 2,
      nome: "Twitch Oficial",
      url: "https://twitch.tv/ilhadaslendas",
      icon: <Twitch size={24} />,
      cor: "bg-purple-600",
      descricao: "Canal de transmissões ao vivo com reacts, gameplays e eventos especiais."
    },
    {
      id: 3,
      nome: "Twitter",
      url: "https://x.com/ilhadaslendas",
      icon: <Twitter size={24} />,
      cor: "bg-blue-500",
      descricao: "Atualizações, notícias e interações com a comunidade."
    },
    {
      id: 4,
      nome: "Kick",
      url: "https://kick.com/ilhadaslendas",
      icon: <ExternalLink size={24} />,
      cor: "bg-green-500",
      descricao: "Canal alternativo para transmissões ao vivo e conteúdos exclusivos."
    }
  ];

  // Lista de canais individuais dos membros
  const canaisMembros: Canal[] = [
    {
      id: 5,
      nome: "YouTube Lenda 1",
      url: "https://youtube.com/lenda1",
      icon: <Youtube size={24} />,
      cor: "bg-red-600",
      descricao: "Canal pessoal com conteúdos exclusivos e vlogs."
    },
    {
      id: 6,
      nome: "Twitch Lenda 1",
      url: "https://twitch.tv/lenda1",
      icon: <Twitch size={24} />,
      cor: "bg-purple-600",
      descricao: "Streams diários com gameplays e interação com inscritos."
    },
    {
      id: 7,
      nome: "YouTube Lenda 2",
      url: "https://youtube.com/lenda2",
      icon: <Youtube size={24} />,
      cor: "bg-red-600",
      descricao: "Conteúdos educativos sobre League of Legends e análises de partidas."
    },
    {
      id: 8,
      nome: "Twitch Lenda 2",
      url: "https://twitch.tv/lenda2",
      icon: <Twitch size={24} />,
      cor: "bg-purple-600",
      descricao: "Streams de alta elo com comentários técnicos."
    }
  ];

  // Filtrar canais com base na aba ativa
  const getCanaisFiltrados = () => {
    if (activeTab === 'todos') {
      return [...canais, ...canaisMembros];
    } else if (activeTab === 'oficiais') {
      return canais;
    } else {
      return canaisMembros;
    }
  };

  // Animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nossos <span className="text-primary-purple">Canais</span></h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Acompanhe a Ilha das Lendas em todas as plataformas e não perca nenhum conteúdo.
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="bg-background-purple/30 p-2 rounded-lg inline-flex">
            <button 
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'todos' ? 'bg-primary-purple text-white' : 'text-gray-300 hover:text-white'}`}
              onClick={() => setActiveTab('todos')}
            >
              Todos
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'oficiais' ? 'bg-primary-purple text-white' : 'text-gray-300 hover:text-white'}`}
              onClick={() => setActiveTab('oficiais')}
            >
              Canais Oficiais
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === 'membros' ? 'bg-primary-purple text-white' : 'text-gray-300 hover:text-white'}`}
              onClick={() => setActiveTab('membros')}
            >
              Canais dos Membros
            </button>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCanaisFiltrados().map((canal) => (
            <motion.a
              key={canal.id}
              href={canal.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-background-purple/30 p-6 rounded-lg shadow-lg border border-primary-purple/20 transition-all duration-300 hover:shadow-xl selection-line-animated"
            >
              <div className={`${canal.cor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                {canal.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{canal.nome}</h3>
              <p className="text-gray-300 mb-4">{canal.descricao}</p>
              <div className="flex items-center text-primary-purple">
                <ExternalLink size={16} className="mr-2" />
                <span>Visitar canal</span>
              </div>
            </motion.a>
          ))}
        </div>
        
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Não perca <span className="text-primary-purple">nenhuma atualização</span></h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Ative as notificações em todos os nossos canais para ser avisado sempre que um novo conteúdo for ao ar.
          </p>
          
          <div className="bg-primary-purple p-8 rounded-lg max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Inscreva-se na nossa newsletter</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-purple-light"
              />
              <motion.button 
                className="bg-primary-purple-light px-6 py-3 rounded-lg text-white whitespace-nowrap selection-line-animated"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Inscrever-se
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Canais;

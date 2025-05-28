import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Youtube, Twitch, Twitter, ExternalLink } from 'lucide-react';

interface Lenda {
  id: number;
  nome: string;
  apelido: string;
  funcao: string;
  descricao: string;
  imagem: string;
  redesSociais: {
    youtube?: string;
    twitch?: string;
    twitter?: string;
    instagram?: string;
  };
}

const Lendas: React.FC = () => {
  const [lendaSelecionada, setLendaSelecionada] = useState<Lenda | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const lendas: Lenda[] = [
    {
      id: 1,
      nome: "Lenda Um",
      apelido: "Lenda1",
      funcao: "Fundador",
      descricao: "Ex-jogador profissional com vasta experiência...",
      imagem: "/assets/images/baiano.jpg",
      redesSociais: {
        youtube: "https://youtube.com/lenda1",
        twitch: "https://twitch.tv/lenda1",
        twitter: "https://twitter.com/lenda1",
      }
    },
    {
      id: 2,
      nome: "Lenda Dois",
      apelido: "Lenda2",
      funcao: "Streamer",
      descricao: "Especialista em estatísticas e análise de dados...",
      imagem: "/assets/images/esa.jpg",
      redesSociais: {
        youtube: "https://youtube.com/lenda2",
        twitch: "https://twitch.tv/lenda2",
        twitter: "https://twitter.com/lenda2",
      }
    },
    {
      id: 3,
      nome: "Lenda Três",
      apelido: "Lenda3",
      funcao: "Streamer",
      descricao: "Conhecido pelo humor afiado e personalidade carismática...",
      imagem: "/assets/images/minerva.jpg",
      redesSociais: {
        youtube: "https://youtube.com/lenda3",
        twitch: "https://twitch.tv/lenda3",
        twitter: "https://twitter.com/lenda3",
      }
    },
    {
      id: 4,
      nome: "Lenda Quatro",
      apelido: "Lenda4",
      funcao: "Streamer",
      descricao: "Especialista em meta-game e estratégias competitivas...",
      imagem: "/assets/images/mylon.png",
      redesSociais: {
        youtube: "https://youtube.com/lenda4",
        twitch: "https://twitch.tv/lenda4",
        twitter: "https://twitter.com/lenda4",
      }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Conheça as <span className="text-gradient">Lendas</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Os criadores de conteúdo que formam a Ilha das Lendas...
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lendas.map((lenda) => (
            <motion.div
              key={lenda.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-background-purple/30 rounded-lg shadow-lg overflow-hidden cursor-pointer selection-line-animated"
              onClick={() => setLendaSelecionada(lenda)}
            >
              <div className="relative aspect-[4/5]">
                <img
                  src={lenda.imagem}
                  alt={lenda.nome}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent z-10"></div>
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-xl font-bold text-white">{lenda.apelido}</h3>
                  <p className="text-primary-lime">{lenda.funcao}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-300 mb-4 line-clamp-3">{lenda.descricao}</p>
                <div className="flex space-x-3">
                  {lenda.redesSociais.youtube && (
                    <a href={lenda.redesSociais.youtube} target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400">
                      <Youtube size={20} />
                    </a>
                  )}
                  {lenda.redesSociais.twitch && (
                    <a href={lenda.redesSociais.twitch} target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:text-purple-400">
                      <Twitch size={20} />
                    </a>
                  )}
                  {lenda.redesSociais.twitter && (
                    <a href={lenda.redesSociais.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">
                      <Twitter size={20} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Junte-se à <span className="text-gradient">Comunidade</span>
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Participe de eventos exclusivos, partidas personalizadas...
          </p>

          <motion.a
            href="https://discord.gg/ilhadaslendas"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-button inline-flex items-center gap-2 px-8 py-3 rounded-lg text-white selection-line-animated"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Entrar no Discord <ExternalLink size={18} />
          </motion.a>
        </motion.div>
      </div>

      {/* Modal */}
      {lendaSelecionada && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-background-purple max-w-2xl w-full rounded-lg overflow-hidden relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button
              className="absolute top-4 right-4 bg-background-dark/50 p-2 rounded-full text-white hover:bg-primary-purple"
              onClick={() => setLendaSelecionada(null)}
            >
              X
            </button>

            <img src={lendaSelecionada.imagem} alt={lendaSelecionada.nome} className="w-full max-h-[400px] object-contain bg-black" />

            <div className="p-6">
              <h3 className="text-2xl font-bold">{lendaSelecionada.nome}</h3>
              <p className="text-primary-lime">{lendaSelecionada.apelido} • {lendaSelecionada.funcao}</p>
              <p className="text-gray-300 my-4">{lendaSelecionada.descricao}</p>

              <h4 className="text-lg font-bold mb-3">Redes Sociais</h4>
              <div className="flex flex-wrap gap-4">
                {lendaSelecionada.redesSociais.youtube && (
                  <a href={lendaSelecionada.redesSociais.youtube} target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-red-700">
                    <Youtube size={20} /> YouTube
                  </a>
                )}
                {lendaSelecionada.redesSociais.twitch && (
                  <a href={lendaSelecionada.redesSociais.twitch} target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-purple-700">
                    <Twitch size={20} /> Twitch
                  </a>
                )}
                {lendaSelecionada.redesSociais.twitter && (
                  <a href={lendaSelecionada.redesSociais.twitter} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-blue-600">
                    <Twitter size={20} /> Twitter
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Lendas;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageSquare, Users, Clock, Heart } from 'lucide-react';
import { SectionTitle, Button } from '../components/ui/UIComponents';

// Interfaces para o Fórum
interface Topico {
  id: number;
  titulo: string;
  autor: string;
  autorAvatar: string; // Placeholder
  dataPostagem: string;
  numRespostas: number;
  numVisualizacoes: number;
  categoria: string;
  ultimaResposta?: {
    autor: string;
    data: string;
  };
}

interface Post {
  id: number;
  topicoId: number;
  conteudo: string;
  autor: string;
  autorAvatar: string; // Placeholder
  dataPostagem: string;
  likes: number;
}

// Dados de exemplo para Tópicos
const mockTopicos: Topico[] = [
  {
    id: 1,
    titulo: "Guia completo para jogar de Yasuo no patch atual",
    autor: "FãLenda1",
    autorAvatar: "/assets/images/demonstracao/placeholder_avatar1.png",
    dataPostagem: "27/05/2025",
    numRespostas: 24,
    numVisualizacoes: 342,
    categoria: "Guias",
    ultimaResposta: {
      autor: "FãLenda7",
      data: "Hoje, 10:45"
    }
  },
  {
    id: 2,
    titulo: "Discussão: Quem é o melhor top laner do CBLOL?",
    autor: "FãLenda2",
    autorAvatar: "/assets/images/demonstracao/placeholder_avatar2.png",
    dataPostagem: "26/05/2025",
    numRespostas: 56,
    numVisualizacoes: 789,
    categoria: "Discussão",
    ultimaResposta: {
      autor: "FãLenda5",
      data: "Hoje, 09:30"
    }
  },
  {
    id: 3,
    titulo: "Próximo evento da Ilha das Lendas - Sugestões",
    autor: "FãLenda3",
    autorAvatar: "/assets/images/demonstracao/placeholder_avatar3.png",
    dataPostagem: "25/05/2025",
    numRespostas: 18,
    numVisualizacoes: 256,
    categoria: "Eventos",
    ultimaResposta: {
      autor: "FãLenda9",
      data: "Ontem, 22:15"
    }
  },
  {
    id: 4,
    titulo: "Análise do último react ao MSI - O que acharam?",
    autor: "FãLenda4",
    autorAvatar: "/assets/images/demonstracao/placeholder_avatar4.png",
    dataPostagem: "24/05/2025",
    numRespostas: 32,
    numVisualizacoes: 421,
    categoria: "Reacts",
    ultimaResposta: {
      autor: "FãLenda8",
      data: "Ontem, 18:20"
    }
  },
  {
    id: 5,
    titulo: "Dúvida sobre o programa de cartinhas",
    autor: "FãLenda5",
    autorAvatar: "/assets/images/demonstracao/placeholder_avatar5.png",
    dataPostagem: "23/05/2025",
    numRespostas: 7,
    numVisualizacoes: 134,
    categoria: "Cartinhas",
    ultimaResposta: {
      autor: "FãLenda2",
      data: "24/05/2025"
    }
  }
];

// Dados de exemplo para Posts (de um tópico específico)
const mockPosts: Post[] = [
  {
    id: 1,
    topicoId: 1,
    conteudo: "Olá pessoal! Criei este guia completo para jogar de Yasuo no patch atual. Depois de muitas partidas, descobri que a melhor rota para ele agora é mid, com algumas aparições no top contra matchups específicos. As runas ideais são Conquistador, Triunfo, Lenda: Tenacidade e Golpe de Misericórdia, com Gosto de Sangue e Caçador Incansável como secundárias. O build deve começar com Grevas de Berserker e Matakraken, seguido de Dançarina Fantasma e Anjo Guardião. Comentem o que acharam e compartilhem suas experiências!",
    autor: "FãLenda1",
    autorAvatar: "/assets/images/demonstracao/placeholder_avatar1.png",
    dataPostagem: "27/05/2025, 14:30",
    likes: 15
  },
  {
    id: 2,
    topicoId: 1,
    conteudo: "Excelente guia! Tenho usado Yasuo com essa build e realmente funciona muito bem. Uma dica que posso acrescentar é sobre o timing do muro de vento contra campeões específicos. Contra Lux, por exemplo, é melhor guardar para o ultimate dela em vez de usar no Q.",
    autor: "FãLenda6",
    autorAvatar: "/assets/images/demonstracao/placeholder_avatar6.png",
    dataPostagem: "27/05/2025, 15:45",
    likes: 8
  },
  {
    id: 3,
    topicoId: 1,
    conteudo: "Discordo um pouco sobre a rota. Acho que Yasuo está mais forte no bot lane agora, especialmente com suportes que têm knock-up como Alistar ou Rakan. O resto do guia está perfeito!",
    autor: "FãLenda7",
    autorAvatar: "/assets/images/demonstracao/placeholder_avatar7.png",
    dataPostagem: "Hoje, 10:45",
    likes: 3
  }
];

// Componente TopicListItem
interface TopicListItemProps {
  topico: Topico;
  onClick: () => void;
}

const TopicListItem: React.FC<TopicListItemProps> = ({ topico, onClick }) => {
  return (
    <motion.div 
      className="bg-background-purple/30 p-4 rounded-lg border border-primary-purple/20 cursor-pointer hover:border-primary-purple/50 transition-all duration-300 selection-line-animated"
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-background-purple overflow-hidden flex-shrink-0">
          <img 
            src={topico.autorAvatar} 
            alt={topico.autor} 
            className="w-full h-full object-cover" 
            onError={(e) => (e.currentTarget.src = '/assets/images/demonstracao/placeholder_avatar_default.png')}
          />
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-bold mb-1 hover:text-primary-purple transition-colors">{topico.titulo}</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-primary-purple px-2 py-0.5 rounded-full text-xs font-medium">{topico.categoria}</span>
            <span className="text-gray-400 text-xs flex items-center">
              <Users size={12} className="mr-1" /> {topico.autor}
            </span>
            <span className="text-gray-400 text-xs flex items-center">
              <Clock size={12} className="mr-1" /> {topico.dataPostagem}
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center">
                <MessageSquare size={12} className="mr-1" /> {topico.numRespostas} respostas
              </span>
              <span className="flex items-center">
                <Users size={12} className="mr-1" /> {topico.numVisualizacoes} visualizações
              </span>
            </div>
            {topico.ultimaResposta && (
              <span>
                Última resposta por <span className="text-primary-purple">{topico.ultimaResposta.autor}</span> • {topico.ultimaResposta.data}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Componente PostComponent
interface PostComponentProps {
  post: Post;
}

const PostComponent: React.FC<PostComponentProps> = ({ post }) => {
  return (
    <motion.div 
      className="bg-background-purple/30 p-4 rounded-lg border border-primary-purple/20 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-background-purple overflow-hidden flex-shrink-0">
          <img 
            src={post.autorAvatar} 
            alt={post.autor} 
            className="w-full h-full object-cover" 
            onError={(e) => (e.currentTarget.src = '/assets/images/demonstracao/placeholder_avatar_default.png')}
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-primary-purple">{post.autor}</span>
            <span className="text-gray-400 text-xs">{post.dataPostagem}</span>
          </div>
          <p className="text-gray-300 mb-4">{post.conteudo}</p>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <button className="flex items-center hover:text-primary-purple transition-colors">
              <Heart size={14} className="mr-1" /> {post.likes}
            </button>
            <button className="hover:text-primary-purple transition-colors">Responder</button>
            <button className="hover:text-primary-purple transition-colors">Citar</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Forum: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [visualizandoTopico, setVisualizandoTopico] = useState<Topico | null>(null);

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
          <SectionTitle title="Fórum da" highlight="Comunidade" />
        </motion.div>

        {!visualizandoTopico ? (
          <>
            {/* Categorias do Fórum */}
            <motion.div variants={itemVariants} className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <span className="bg-primary-purple w-2 h-2 rounded-full"></span> Todos os Tópicos
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <span className="bg-blue-500 w-2 h-2 rounded-full"></span> Discussões
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <span className="bg-green-500 w-2 h-2 rounded-full"></span> Guias
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <span className="bg-yellow-500 w-2 h-2 rounded-full"></span> Eventos
              </Button>
            </motion.div>

            {/* Botão Novo Tópico */}
            <motion.div variants={itemVariants} className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold">Tópicos Recentes</h2>
              <Button variant="primary" className="flex items-center gap-2">
                <MessageSquare size={16} /> Novo Tópico
              </Button>
            </motion.div>

            {/* Lista de Tópicos */}
            <motion.div variants={containerVariants} className="space-y-4">
              {mockTopicos.map((topico) => (
                <motion.div key={topico.id} variants={itemVariants}>
                  <TopicListItem 
                    topico={topico} 
                    onClick={() => setVisualizandoTopico(topico)} 
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <>
            {/* Visualização de Tópico */}
            <motion.div variants={itemVariants} className="mb-6">
              <Button 
                variant="outline" 
                className="mb-4"
                onClick={() => setVisualizandoTopico(null)}
              >
                Voltar para o Fórum
              </Button>
              <h2 className="text-2xl font-bold mb-2">{visualizandoTopico.titulo}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-primary-purple px-2 py-0.5 rounded-full text-xs font-medium">{visualizandoTopico.categoria}</span>
                <span className="text-gray-400 text-xs flex items-center">
                  <Users size={12} className="mr-1" /> Iniciado por {visualizandoTopico.autor}
                </span>
                <span className="text-gray-400 text-xs flex items-center">
                  <Clock size={12} className="mr-1" /> {visualizandoTopico.dataPostagem}
                </span>
              </div>
            </motion.div>

            {/* Posts do Tópico */}
            <div className="space-y-4 mb-8">
              {mockPosts.map((post) => (
                <PostComponent key={post.id} post={post} />
              ))}
            </div>

            {/* Formulário de Resposta */}
            <motion.div variants={itemVariants} className="bg-background-purple/30 p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Responder ao Tópico</h3>
              <textarea 
                className="w-full bg-background-purple/50 border border-primary-purple/30 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary-purple/70 min-h-32 mb-4"
                placeholder="Digite sua resposta aqui..."
              ></textarea>
              <div className="flex justify-end">
                <Button variant="primary">Enviar Resposta</Button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Forum;

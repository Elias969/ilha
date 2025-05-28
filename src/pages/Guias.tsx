import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookText, Brain, BarChart, ArrowRight, ChevronLeft } from 'lucide-react';
import { SectionTitle, Button, GradientText, Card } from '../components/ui/UIComponents';

// Interface para Guia
interface Guia {
  id: number;
  titulo: string;
  resumo: string;
  conteudo: string; // Conteúdo completo (simulado)
  autor: string;
  autorAvatar: string; // Placeholder
  categoria: 'Campeões' | 'Roles' | 'Estratégias' | 'Geral';
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado';
  imagem: string; // Placeholder
}

// Dados de exemplo para Guias
const mockGuias: Guia[] = [
  {
    id: 1,
    titulo: "Guia Completo: Dominando a Jungle",
    resumo: "Aprenda os segredos da jungle, desde rotas eficientes até controle de objetivos e ganks eficazes.",
    conteudo: "Conteúdo detalhado sobre rotas de clear, tipos de gank, controle de dragão/barão, counter jungle...",
    autor: "Ranger da Ilha",
    autorAvatar: "/assets/images/demonstracao/placeholder_avatar_ranger.png",
    categoria: "Roles",
    nivel: "Intermediário",
    imagem: "/assets/images/demonstracao/placeholder_guia_jungle.png"
  },
  {
    id: 2,
    titulo: "Como Jogar de ADC: Posicionamento e Kiting",
    resumo: "Domine a arte de se posicionar e causar dano como atirador nas team fights.",
    conteudo: "Explicação sobre posicionamento seguro, técnicas de kiting, escolha de itens e sinergia com suportes...",
    autor: "Atirador da Ilha",
    autorAvatar: "/assets/images/demonstracao/placeholder_avatar_adc.png",
    categoria: "Roles",
    nivel: "Avançado",
    imagem: "/assets/images/demonstracao/placeholder_guia_adc.png"
  },
  {
    id: 3,
    titulo: "Entendendo o Controle de Wave para Top Laners",
    resumo: "Aprenda a manipular as waves de minions para ganhar vantagem na rota superior.",
    conteudo: "Conceitos de freeze, slow push, fast push, como usar a wave para dive, roaming e controle de mapa...",
    autor: "Mylon da Ilha",
    autorAvatar: "/assets/images/demonstracao/placeholder_avatar_mylon.png",
    categoria: "Estratégias",
    nivel: "Intermediário",
    imagem: "/assets/images/demonstracao/placeholder_guia_wave.png"
  },
  {
    id: 4,
    titulo: "Guia para Iniciantes: O Básico do League of Legends",
    resumo: "Tudo que você precisa saber para começar sua jornada em Summoner's Rift.",
    conteudo: "Explicação sobre mapa, objetivos, roles, fases do jogo, itens básicos e comunicação...",
    autor: "Comunidade Ilha",
    autorAvatar: "/assets/images/demonstracao/placeholder_avatar_ilha.png",
    categoria: "Geral",
    nivel: "Iniciante",
    imagem: "/assets/images/demonstracao/placeholder_guia_iniciante.png"
  },
  {
    id: 5,
    titulo: "Dominando Yasuo: Combos e Mecânicas Avançadas",
    resumo: "Aprenda os combos essenciais e truques mecânicos para masterizar o Imperdoável.",
    conteudo: "Detalhes sobre Q stack, E+Q, Airblade, Keyblade, matchups e dicas de team fight...",
    autor: "Mono Yasuo da Ilha",
    autorAvatar: "/assets/images/demonstracao/placeholder_avatar_yasuo.png",
    categoria: "Campeões",
    nivel: "Avançado",
    imagem: "/assets/images/demonstracao/placeholder_guia_yasuo.png"
  }
];

// Componente GuideCard
interface GuideCardProps {
  guia: Guia;
  onClick: () => void;
}

const GuideCard: React.FC<GuideCardProps> = ({ guia, onClick }) => {
  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'Avançado': return 'bg-red-500';
      case 'Intermediário': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <motion.div 
      className="bg-background-purple/30 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl selection-line-animated"
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="h-40 bg-background-purple relative">
        <img 
          src={guia.imagem} 
          alt={guia.titulo} 
          className="w-full h-full object-cover" 
          onError={(e) => (e.currentTarget.src = '/assets/images/demonstracao/placeholder_default.png')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
        <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium text-white ${getNivelColor(guia.nivel)}`}>
          {guia.nivel}
        </span>
      </div>
      <div className="p-4">
        <span className="text-xs text-primary-purple font-medium mb-1 block">{guia.categoria}</span>
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{guia.titulo}</h3>
        <p className="text-gray-300 text-sm mb-3 line-clamp-3">{guia.resumo}</p>
        <div className="flex justify-between items-center text-xs text-gray-400">
          <div className="flex items-center">
            <div className="w-5 h-5 rounded-full bg-background-purple overflow-hidden mr-1.5">
              <img 
                src={guia.autorAvatar} 
                alt={guia.autor} 
                className="w-full h-full object-cover" 
                onError={(e) => (e.currentTarget.src = '/assets/images/demonstracao/placeholder_avatar_default.png')}
              />
            </div>
            <span>{guia.autor}</span>
          </div>
          <span className="flex items-center text-primary-purple hover:underline">
            Ler Guia <ArrowRight size={14} className="ml-1" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Componente GuideView (Simulado)
interface GuideViewProps {
  guia: Guia;
  onClose: () => void;
}

const GuideView: React.FC<GuideViewProps> = ({ guia, onClose }) => {
  return (
    <motion.div 
      className="bg-background-purple/30 rounded-lg p-6 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Button 
        variant="outline" 
        className="mb-6 flex items-center gap-2"
        onClick={onClose}
      >
        <ChevronLeft size={16} /> Voltar para Guias
      </Button>

      <span className="text-sm text-primary-purple font-medium mb-2 block">{guia.categoria} - {guia.nivel}</span>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{guia.titulo}</h1>

      <div className="flex items-center gap-4 mb-6 text-gray-400">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-background-purple overflow-hidden mr-2">
            <img 
              src={guia.autorAvatar} 
              alt={guia.autor} 
              className="w-full h-full object-cover" 
              onError={(e) => (e.currentTarget.src = '/assets/images/demonstracao/placeholder_avatar_default.png')}
            />
          </div>
          <span>Por {guia.autor}</span>
        </div>
      </div>

      <div className="w-full h-64 bg-background-purple rounded-lg mb-8 overflow-hidden">
        <img 
          src={guia.imagem} 
          alt={guia.titulo} 
          className="w-full h-full object-cover" 
          onError={(e) => (e.currentTarget.src = '/assets/images/demonstracao/placeholder_default.png')}
        />
      </div>

      <div className="prose prose-lg prose-invert max-w-none">
        <p className="text-gray-300 mb-4">{guia.resumo}</p>
        <h3 className="text-xl font-bold text-primary-purple">Conteúdo do Guia</h3>
        <p className="text-gray-300 mb-4">{guia.conteudo}</p>
        {/* Adicionar mais conteúdo simulado aqui */}
        <p className="text-gray-300 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p className="text-gray-300 mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>

      <div className="mt-8 pt-8 border-t border-primary-purple/30">
        <h3 className="text-xl font-bold mb-4">Gostou do Guia?</h3>
        <Button variant="primary">Deixar um Comentário</Button>
      </div>
    </motion.div>
  );
};

const Guias: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [guiaSelecionado, setGuiaSelecionado] = useState<Guia | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState<'Todas' | 'Campeões' | 'Roles' | 'Estratégias' | 'Geral'>('Todas');

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

  const filtrarGuias = () => {
    if (filtroCategoria === 'Todas') return mockGuias;
    return mockGuias.filter(g => g.categoria === filtroCategoria);
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
          <SectionTitle title="Guias e" highlight="Tutoriais" />
        </motion.div>

        {!guiaSelecionado ? (
          <>
            {/* Filtros de Categoria */}
            <motion.div variants={itemVariants} className="mb-8 flex flex-wrap gap-3 justify-center">
              <Button 
                variant={filtroCategoria === 'Todas' ? 'primary' : 'outline'} 
                className="text-sm px-3 py-1.5"
                onClick={() => setFiltroCategoria('Todas')}
              >
                Todos
              </Button>
              <Button 
                variant={filtroCategoria === 'Campeões' ? 'primary' : 'outline'} 
                className="text-sm px-3 py-1.5"
                onClick={() => setFiltroCategoria('Campeões')}
              >
                Campeões
              </Button>
              <Button 
                variant={filtroCategoria === 'Roles' ? 'primary' : 'outline'} 
                className="text-sm px-3 py-1.5"
                onClick={() => setFiltroCategoria('Roles')}
              >
                Roles
              </Button>
              <Button 
                variant={filtroCategoria === 'Estratégias' ? 'primary' : 'outline'} 
                className="text-sm px-3 py-1.5"
                onClick={() => setFiltroCategoria('Estratégias')}
              >
                Estratégias
              </Button>
              <Button 
                variant={filtroCategoria === 'Geral' ? 'primary' : 'outline'} 
                className="text-sm px-3 py-1.5"
                onClick={() => setFiltroCategoria('Geral')}
              >
                Geral
              </Button>
            </motion.div>

            {/* Lista de Guias */}
            <motion.div 
              variants={containerVariants} 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtrarGuias().map((guia) => (
                <motion.div key={guia.id} variants={itemVariants}>
                  <GuideCard 
                    guia={guia} 
                    onClick={() => setGuiaSelecionado(guia)} 
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <GuideView 
            guia={guiaSelecionado} 
            onClose={() => setGuiaSelecionado(null)} 
          />
        )}
      </div>
    </motion.div>
  );
};

export default Guias;


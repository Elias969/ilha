import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Search, ShieldCheck, Users, Swords, MapPin, Award } from 'lucide-react';
import { SectionTitle, Button, GradientText } from '../components/ui/UIComponents';

// Interface para Cartinha Atualizada
interface Cartinha {
  id: number;
  nome: string;
  raridade: 'Comum' | 'Rara' | 'Épica' | 'Lendária';
  imagem: string; // Caminho da imagem completa da cartinha
  descricao: string;
  membro?: string; // Membro da Ilha associado
  time?: string; // Time do jogador (se aplicável)
  role?: 'Top' | 'Jungle' | 'Mid' | 'ADC' | 'Support'; // Role do jogador
  jogadorDaSemana?: boolean; // Destaque especial
}

// Dados de exemplo Atualizados
const mockCartinhas: Cartinha[] = [
  {
    id: 1,
    nome: "Carta do Grell - 90",
    raridade: 'Épica',
    imagem: "/assets/images/cartinha.png",
    descricao: "Nota Referente a semana 3  split 2 do CBLOL",
    membro: "Baiano",
    role: "Support", // Exemplo
    time: "Ilha das Lendas"
  },
  {
    id: 2,
    nome: "Carta do Netuno - 90",
    raridade: 'Rara',
    imagem: "/assets/images/cartinha2.png",
    descricao: "Nota Referente a semana 3  split 2 do CBLOL",
    membro: "Jukes",
    role: "Jungle",
    time: "Ilha das Lendas"
  },
  {
    id: 3,
    nome: "",
    raridade: 'Lendária',
    imagem: "/assets/images/cartinha.png",
    descricao: "Confere poder absoluto e domínio na rota superior.",
    membro: "Mylon",
    role: "Top",
    time: "Ilha das Lendas",
    jogadorDaSemana: true // Exemplo de Jogador da Semana
  },
  {
    id: 4,
    nome: "",
    raridade: 'Rara',
    imagem: "/assets/images/cartinha2.png",
    descricao: "Permite emboscadas inesperadas e garante abates.",
    membro: "Ranger",
    role: "Jungle",
    time: "Ilha das Lendas"
  },
  {
    id: 5,
    nome: "",
    raridade: 'Lendária',
    imagem: "/assets/images/cartinha.png",
    descricao: "Uma carta mística com poder ancestral de Ionia.",
   
  },
  {
    id: 6,
    nome: "",
    raridade: 'Comum',
    imagem: "/assets/images/cartinha2.png",
    descricao: "Um token básico para iniciar sua coleção e mostrar seu apoio."
  },
  {
    id: 7,
    nome: "Carta TitaN ",
    raridade: 'Épica',
    imagem: "/assets/images/cartinha.png", // Placeholder
    descricao: "Aumenta o dano crítico e a precisão dos ataques.",
    membro: "TitaN",
    role: "ADC",
    time: "RED Canids"
  },
  {
    id: 8,
    nome: "Carta Cariok ",
    raridade: 'Rara',
    imagem: "/assets/images/cartinha2.png", // Placeholder
    descricao: "Melhora o controle de objetivos e o ritmo de jogo.",
    membro: "Cariok",
    role: "Jungle",
    time: "paiN Gaming"
  }
];

// Componente CardComponent Redesenhado
interface CardComponentProps {
  cartinha: Cartinha;
  isJogadorDaSemana?: boolean;
}
const getRoleIcon = (role?: string) => {
    switch (role) {
      case 'Top': return <MapPin size={12} className="mr-1" />;
      case 'Jungle': return <Swords size={12} className="mr-1" />;
      case 'Mid': return <MapPin size={12} className="mr-1" />;
      case 'ADC': return <Swords size={12} className="mr-1" />;
      case 'Support': return <ShieldCheck size={12} className="mr-1" />;
      default: return null;
    }
  };
const CardComponent: React.FC<CardComponentProps> = ({ cartinha, isJogadorDaSemana = false }) => {
  const getRarityColor = (raridade: string) => {
    switch (raridade) {
      case 'Lendária': return 'border-yellow-400 shadow-yellow-400/30';
      case 'Épica': return 'border-purple-500 shadow-purple-500/30';
      case 'Rara': return 'border-blue-400 shadow-blue-400/30';
      default: return 'border-gray-500 shadow-gray-500/30';
    }
  };

  

  return (
    <motion.div
      className={`bg-background-purple/20 rounded-lg shadow-lg border-2 ${getRarityColor(cartinha.raridade)} 
                 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden group relative ${isJogadorDaSemana ? 'border-4' : ''}`}
      whileHover={{ scale: 1.03 }}
    >
      {/* Imagem em destaque */} 
      <img 
        src={cartinha.imagem} 
        alt={cartinha.nome} 
        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105" 
        onError={(e) => (e.currentTarget.src = '/assets/images/demonstracao/placeholder_default.png')}
      />

      {/* Overlay com informações (aparece no hover) */} 
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
        <h3 className="text-lg font-bold mb-1 text-white text-shadow">{cartinha.nome}</h3>
        <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium mb-2 self-center ${getRarityColor(cartinha.raridade).replace('border-', 'bg-').replace('text-', 'text-background-dark')}`}>
          <Star size={12} className="mr-1" /> {cartinha.raridade}
        </div>
        <p className="text-gray-300 text-sm mb-2 text-shadow">{cartinha.descricao}</p>
        <div className="flex justify-center items-center gap-3 text-xs text-primary-purple flex-wrap">
          {cartinha.membro && <span className="flex items-center"><Users size={12} className="mr-1" />{cartinha.membro}</span>}
          {cartinha.time && <span className="flex items-center"><ShieldCheck size={12} className="mr-1" />{cartinha.time}</span>}
          {cartinha.role && <span className="flex items-center">{getRoleIcon(cartinha.role)}{cartinha.role}</span>}
        </div>
      </div>

      {/* Informações visíveis (opcional, pode ser removido se preferir tudo no hover) */} 
      <div className="p-3 pt-2 w-full bg-background-purple/40 group-hover:hidden">
        <h4 className="text-sm font-semibold truncate">{cartinha.nome}</h4>
        <span className={`text-xs ${getRarityColor(cartinha.raridade).split(' ')[1]}`}>{cartinha.raridade}</span>
      </div>

      {isJogadorDaSemana && (
        <div className="absolute top-2 right-2 bg-yellow-400 text-background-dark p-1 rounded-full shadow-lg">
          <Award size={18} />
        </div>
      )}
    </motion.div>
  );
};

// Componente Principal Atualizado
const Cartinhas: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  type ViewMode = 'all' | 'teams' | 'roles';
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Mais rápido para cards
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  // Filtrar Jogador da Semana
  const jogadorDaSemana = mockCartinhas.find(c => c.jogadorDaSemana);

  // Filtrar e Agrupar Cartinhas
  const filteredCartinhas = mockCartinhas.filter(c => 
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.membro?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.time?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedByTeam = filteredCartinhas.reduce((acc, cartinha) => {
    const team = cartinha.time || 'Outros';
    if (!acc[team]) acc[team] = [];
    acc[team].push(cartinha);
    return acc;
  }, {} as Record<string, Cartinha[]>);

  const groupedByRole = filteredCartinhas.reduce((acc, cartinha) => {
    const role = cartinha.role || 'Outras';
    if (!acc[role]) acc[role] = [];
    acc[role].push(cartinha);
    return acc;
  }, {} as Record<string, Cartinha[]>);

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
          <SectionTitle title="Coleção de" highlight="Cartinhas Lendárias" />
        </motion.div>

        {/* Jogador da Semana Destaque */} 
        {jogadorDaSemana && (
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
              <GradientText>Jogador da Semana</GradientText>
            </h2>
            <div className="max-w-xs mx-auto">
              <CardComponent cartinha={jogadorDaSemana} isJogadorDaSemana={true} />
            </div>
          </motion.div>
        )}

        {/* Filtros, Busca e Navegação */} 
        <motion.div variants={itemVariants} className="mb-8 flex flex-col md:flex-row gap-4 items-center bg-background-purple/30 p-4 rounded-lg sticky top-20 z-20 shadow-lg">
          <div className="flex items-center border border-primary-purple/30 rounded-lg px-3 py-2 flex-grow w-full md:w-auto">
            <Search size={20} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Buscar por nome, membro, time..." 
              className="bg-transparent focus:outline-none text-white placeholder-gray-400 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant={viewMode === 'all' ? 'primary' : 'outline'} onClick={() => setViewMode('all')} className="text-sm px-3 py-1.5">Todas</Button>
            <Button variant={viewMode === 'teams' ? 'primary' : 'outline'} onClick={() => setViewMode('teams')} className="text-sm px-3 py-1.5">Por Time</Button>
            <Button variant={viewMode === 'roles' ? 'primary' : 'outline'} onClick={() => setViewMode('roles')} className="text-sm px-3 py-1.5">Por Role</Button>
          </div>
        </motion.div>

        {/* Galeria de Cartinhas Condicional */} 
        {viewMode === 'all' && (
          <motion.div 
            key="all-view" // Key para forçar re-animação
            variants={containerVariants} 
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
          >
            {filteredCartinhas.map((cartinha) => (
              <motion.div key={cartinha.id} variants={itemVariants}>
                <CardComponent cartinha={cartinha} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {viewMode === 'teams' && (
          <motion.div 
            key="teams-view"
            variants={containerVariants} 
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            {Object.entries(groupedByTeam).map(([team, cartinhas]) => (
              <div key={team}>
                <h3 className="text-xl font-bold mb-4 border-b-2 border-primary-purple/30 pb-2">{team}</h3>
                <motion.div 
                  variants={containerVariants}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
                >
                  {cartinhas.map((cartinha) => (
                    <motion.div key={cartinha.id} variants={itemVariants}>
                      <CardComponent cartinha={cartinha} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </motion.div>
        )}

        {viewMode === 'roles' && (
          <motion.div 
            key="roles-view"
            variants={containerVariants} 
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            {Object.entries(groupedByRole).map(([role, cartinhas]) => (
              <div key={role}>
                <h3 className="text-xl font-bold mb-4 border-b-2 border-primary-purple/30 pb-2 flex items-center gap-2">{getRoleIcon(role)} {role}</h3>
                <motion.div 
                  variants={containerVariants}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
                >
                  {cartinhas.map((cartinha) => (
                    <motion.div key={cartinha.id} variants={itemVariants}>
                      <CardComponent cartinha={cartinha} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Seção Minha Coleção (Mantida) */} 
        <motion.div variants={itemVariants} className="mt-16 text-center bg-background-purple/30 p-8 rounded-lg">
          <ShieldCheck size={40} className="mx-auto text-primary-purple mb-4" />
          <h3 className="text-2xl font-bold mb-3">Minha Coleção</h3>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">Conecte sua conta para visualizar e gerenciar sua coleção de cartinhas da Ilha das Lendas.</p>
          <Button variant="primary">Conectar Conta (Em Breve)</Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Cartinhas;


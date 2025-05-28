import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Search, ShieldCheck } from 'lucide-react';
import { SectionTitle, Card, Button, GradientText } from '../components/ui/UIComponents';

// Interface para Cartinha
interface Cartinha {
  id: number;
  nome: string;
  raridade: 'Comum' | 'Rara' | 'Épica' | 'Lendária';
  imagem: string; // Usaremos placeholders e a imagem salva
  descricao: string;
  membro?: string; // Membro da Ilha associado
}

// Dados de exemplo para Cartinhas
const mockCartinhas: Cartinha[] = [
  {
    id: 1,
    nome: "Carta do Baiano - Análise Tática",
    raridade: 'Épica',
    imagem: "/assets/images/demonstracao/placeholder_card_baiano.png", // Placeholder
    descricao: "Uma carta que concede visão estratégica superior.",
    membro: "Baiano"
  },
  {
    id: 2,
    nome: "Carta do Jukes - Full Clear Rápido",
    raridade: 'Rara',
    imagem: "/assets/images/demonstracao/placeholder_card_jukes.png", // Placeholder
    descricao: "Aumenta a velocidade de clear na jungle.",
    membro: "Jukes"
  },
  {
    id: 3,
    nome: "Carta da Mylon - Top Lane Dominante",
    raridade: 'Lendária',
    imagem: "/assets/images/demonstracao/placeholder_card_mylon.png", // Placeholder
    descricao: "Confere poder absoluto na rota superior.",
    membro: "Mylon"
  },
  {
    id: 4,
    nome: "Carta do Ranger - Gank Surpresa",
    raridade: 'Rara',
    imagem: "/assets/images/demonstracao/placeholder_card_ranger.png", // Placeholder
    descricao: "Permite emboscadas inesperadas e eficazes.",
    membro: "Ranger"
  },
  {
    id: 5,
    nome: "Carta Florescer Espiritual",
    raridade: 'Lendária',
    imagem: "/assets/images/demonstracao/flor_espiritual_conceito.jpeg", // Imagem salva
    descricao: "Uma carta mística com poder ancestral."
  },
  {
    id: 6,
    nome: "Token de Fã Comum",
    raridade: 'Comum',
    imagem: "/assets/images/demonstracao/placeholder_card_comum.png", // Placeholder
    descricao: "Um token básico para iniciar sua coleção."
  }
];

// Componente CardComponent (para cartinhas)
interface CardComponentProps {
  cartinha: Cartinha;
}

const CardComponent: React.FC<CardComponentProps> = ({ cartinha }) => {
  const getRarityColor = (raridade: string) => {
    switch (raridade) {
      case 'Lendária': return 'border-yellow-400 text-yellow-400';
      case 'Épica': return 'border-purple-500 text-purple-500';
      case 'Rara': return 'border-blue-400 text-blue-400';
      default: return 'border-gray-500 text-gray-500';
    }
  };

  return (
    <motion.div
      className={`bg-background-purple/50 p-4 rounded-lg shadow-lg border-2 ${getRarityColor(cartinha.raridade)} 
                 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 selection-line-animated`}
      whileHover={{ scale: 1.03 }}
    >
      <div className="w-full h-56 bg-background-purple mb-4 rounded flex items-center justify-center overflow-hidden">
        <img 
          src={cartinha.imagem} 
          alt={cartinha.nome} 
          className="w-full h-full object-cover text-gray-500" 
          onError={(e) => (e.currentTarget.src = '/assets/images/demonstracao/placeholder_default.png')}
        />
      </div>
      <h3 className="text-lg font-bold mb-1">{cartinha.nome}</h3>
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-2 ${getRarityColor(cartinha.raridade).replace('border-', 'bg-').replace('text-', 'text-background-dark')}`}>
        <Star size={12} className="mr-1" /> {cartinha.raridade}
      </div>
      <p className="text-gray-400 text-sm mb-3 flex-grow">{cartinha.descricao}</p>
      {cartinha.membro && <p className="text-xs text-primary-purple">Lenda: {cartinha.membro}</p>}
      <Button variant="secondary" className="w-full mt-3 text-sm px-3 py-1.5">
        Ver Detalhes
      </Button>
    </motion.div>
  );
};

const Cartinhas: React.FC = () => {
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
          <SectionTitle title="Coleção de" highlight="Cartinhas Lendárias" />
        </motion.div>

        {/* Filtros e Busca (Simulado) */}
        <motion.div variants={itemVariants} className="mb-8 flex flex-col md:flex-row gap-4 items-center bg-background-purple/30 p-4 rounded-lg">
          <div className="flex items-center border border-primary-purple/30 rounded-lg px-3 py-2 flex-grow w-full md:w-auto">
            <Search size={20} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Buscar por nome ou membro..." 
              className="bg-transparent focus:outline-none text-white placeholder-gray-400 w-full"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="text-sm px-3 py-1.5">Todas</Button>
            <Button variant="outline" className="text-sm px-3 py-1.5">Comum</Button>
            <Button variant="outline" className="text-sm px-3 py-1.5">Rara</Button>
            <Button variant="outline" className="text-sm px-3 py-1.5">Épica</Button>
            <Button variant="outline" className="text-sm px-3 py-1.5">Lendária</Button>
          </div>
        </motion.div>

        {/* Galeria de Cartinhas */}
        <motion.div 
          variants={containerVariants} 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {mockCartinhas.map((cartinha) => (
            <motion.div key={cartinha.id} variants={itemVariants}>
              <CardComponent cartinha={cartinha} />
            </motion.div>
          ))}
        </motion.div>

        {/* Seção Minha Coleção (Simulada) */}
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


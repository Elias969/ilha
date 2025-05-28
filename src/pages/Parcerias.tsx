import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Handshake, ExternalLink } from 'lucide-react';
import { SectionTitle, Card, Button } from '../components/ui/UIComponents';

// Interface para Parceiro
interface Parceiro {
  id: number;
  nome: string;
  logo: string; // Placeholder
  descricao: string;
  link: string;
  tipo: 'Patrocinador Oficial' | 'Apoiador' | 'Parceiro de Mídia';
}

// Dados de exemplo para Parceiros
const mockParceiros: Parceiro[] = [
  {
    id: 1,
    nome: "Marca Gamer X",
    logo: "/assets/images/demonstracao/placeholder_logo_parceiro1.png",
    descricao: "Patrocinador oficial da Ilha das Lendas, fornecendo equipamentos de alta performance para nossos criadores.",
    link: "#",
    tipo: "Patrocinador Oficial"
  },
  {
    id: 2,
    nome: "Plataforma de Streaming Y",
    logo: "/assets/images/demonstracao/placeholder_logo_parceiro2.png",
    descricao: "Plataforma parceira onde você encontra transmissões exclusivas e interações com as Lendas.",
    link: "#",
    tipo: "Parceiro de Mídia"
  },
  {
    id: 3,
    nome: "Empresa de Bebidas Z",
    logo: "/assets/images/demonstracao/placeholder_logo_parceiro3.png",
    descricao: "Apoiador dos nossos eventos e torneios, garantindo a energia da comunidade.",
    link: "#",
    tipo: "Apoiador"
  },
  {
    id: 4,
    nome: "Loja de Jogos W",
    logo: "/assets/images/demonstracao/placeholder_logo_parceiro4.png",
    descricao: "Parceiro que oferece descontos exclusivos em jogos e periféricos para os seguidores da Ilha.",
    link: "#",
    tipo: "Apoiador"
  }
];

// Componente PartnerCard
interface PartnerCardProps {
  parceiro: Parceiro;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ parceiro }) => {
  return (
    <motion.div 
      className="bg-background-purple/30 p-6 rounded-lg shadow-lg border border-primary-purple/20 flex flex-col md:flex-row items-center gap-6 transition-all duration-300 hover:shadow-xl selection-line-animated"
      whileHover={{ y: -5 }}
    >
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-background-purple flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-primary-purple/50">
        <img 
          src={parceiro.logo} 
          alt={`Logo ${parceiro.nome}`} 
          className="max-h-full max-w-full object-contain p-2" 
          onError={(e) => (e.currentTarget.src = '/assets/images/demonstracao/placeholder_default.png')}
        />
      </div>
      <div className="text-center md:text-left">
        <span className="bg-primary-purple px-3 py-1 rounded-full text-xs font-medium mb-2 inline-block">{parceiro.tipo}</span>
        <h3 className="text-xl font-bold mb-2">{parceiro.nome}</h3>
        <p className="text-gray-300 mb-4">{parceiro.descricao}</p>
        <a href={parceiro.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary-purple hover:underline">
          Visitar Site <ExternalLink size={16} className="ml-1" />
        </a>
      </div>
    </motion.div>
  );
};

const Parcerias: React.FC = () => {
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
        <motion.div variants={itemVariants}>
          <SectionTitle title="Nossos" highlight="Parceiros" />
          <p className="text-center text-lg text-gray-300 -mt-12 mb-16 max-w-3xl mx-auto">
            A Ilha das Lendas agradece o apoio fundamental de nossos parceiros e patrocinadores, que tornam nosso conteúdo e eventos possíveis.
          </p>
        </motion.div>

        {/* Lista de Parceiros */}
        <motion.div 
          variants={containerVariants} 
          className="space-y-8"
        >
          {mockParceiros.map((parceiro) => (
            <motion.div key={parceiro.id} variants={itemVariants}>
              <PartnerCard parceiro={parceiro} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action para Novas Parcerias */}
        <motion.div variants={itemVariants} className="mt-16 text-center bg-background-purple/30 p-8 rounded-lg max-w-3xl mx-auto">
          <Handshake size={40} className="mx-auto text-primary-purple mb-4" />
          <h3 className="text-2xl font-bold mb-3">Seja um Parceiro</h3>
          <p className="text-gray-300 mb-6">Interessado em colaborar com a Ilha das Lendas? Entre em contato conosco para explorar oportunidades de parceria.</p>
          <Button variant="primary">Entre em Contato</Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Parcerias;


import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Lock, Star, Crown, Video, Mic, Ticket } from 'lucide-react';
import { SectionTitle, Button, GradientText, Card } from '../components/ui/UIComponents';

// Interface para Benefício Premium
interface Beneficio {
  id: number;
  titulo: string;
  descricao: string;
  icon: React.ReactNode;
}

// Dados de exemplo para Benefícios
const mockBeneficios: Beneficio[] = [
  {
    id: 1,
    titulo: "Conteúdo Exclusivo",
    descricao: "Acesso a vídeos, artigos e guias disponíveis apenas para membros premium.",
    icon: <Video size={24} />
  },
  {
    id: 2,
    titulo: "Emotes Personalizados",
    descricao: "Use emotes exclusivos da Ilha das Lendas no chat das transmissões.",
    icon: <Star size={24} />
  },
  {
    id: 3,
    titulo: "Acesso Antecipado",
    descricao: "Assista a vídeos e participe de eventos antes do público geral.",
    icon: <Ticket size={24} />
  },
  {
    id: 4,
    titulo: "Cargo Exclusivo no Discord",
    descricao: "Receba um cargo especial em nosso servidor do Discord e acesso a canais privados.",
    icon: <Mic size={24} />
  },
  {
    id: 5,
    titulo: "Sorteios Exclusivos",
    descricao: "Participe de sorteios de produtos, RP e outros prêmios incríveis.",
    icon: <Crown size={24} />
  }
];

// Componente ExclusiveContentCard (Simulado)
interface ExclusiveContentCardProps {
  title: string;
  type: string;
}

const ExclusiveContentCard: React.FC<ExclusiveContentCardProps> = ({ title, type }) => {
  return (
    <Card
      title={title}
      description={`Conteúdo exclusivo para membros Premium. Assine para desbloquear!`}
      className="relative overflow-hidden border-dashed border-primary-purple/50"
    >
      <div className="absolute inset-0 bg-background-dark/80 flex flex-col items-center justify-center z-10">
        <Lock size={32} className="text-primary-purple mb-4" />
        <p className="text-center font-semibold">Conteúdo Bloqueado</p>
        <Button variant="primary" className="mt-4 text-sm px-4 py-2">Assinar Agora</Button>
      </div>
      {/* Placeholder visual do conteúdo bloqueado */}
      <div className="w-full h-32 bg-background-purple/50 mb-4 rounded flex items-center justify-center">
        <span className="text-gray-600 text-sm">{type}</span>
      </div>
    </Card>
  );
};

const Membros: React.FC = () => {
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
          <SectionTitle title="Área de" highlight="Membros Premium" />
          <p className="text-center text-lg text-gray-300 -mt-12 mb-16 max-w-3xl mx-auto">
            Desbloqueie benefícios exclusivos e apoie a Ilha das Lendas tornando-se um membro Premium!
          </p>
        </motion.div>

        {/* Seção de Benefícios */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Benefícios <GradientText>Exclusivos</GradientText></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBeneficios.map((beneficio) => (
              <motion.div 
                key={beneficio.id} 
                variants={itemVariants}
                className="bg-background-purple/30 p-6 rounded-lg shadow-lg border border-primary-purple/20 flex items-start gap-4 selection-line-animated"
                whileHover={{ y: -5 }}
              >
                <div className="bg-primary-purple w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  {beneficio.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{beneficio.titulo}</h3>
                  <p className="text-gray-300 text-sm">{beneficio.descricao}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Seção de Conteúdo Exclusivo (Simulado) */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Conteúdo <GradientText>Premium</GradientText></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div variants={itemVariants}>
              <ExclusiveContentCard title="Guia Avançado: Controle de Wave" type="Artigo" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ExclusiveContentCard title="VOD Comentado: Análise de Replay High Elo" type="Vídeo" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ExclusiveContentCard title="Podcast Exclusivo: Entrevista com Pro Player" type="Áudio" />
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action para Assinatura */}
        <motion.div variants={itemVariants} className="text-center bg-gradient-subtle p-8 rounded-lg max-w-3xl mx-auto shadow-xl">
          <Crown size={40} className="mx-auto text-background-dark mb-4" />
          <h3 className="text-2xl font-bold mb-3 text-background-dark">Torne-se um Membro Premium Hoje!</h3>
          <p className="text-background-dark/80 mb-6">Escolha o plano que melhor se adapta a você e comece a aproveitar todos os benefícios exclusivos.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="secondary" className="bg-background-dark text-white hover:bg-background-dark/90">
              Ver Planos
            </Button>
            <Button variant="outline" className="border-background-dark text-background-dark hover:bg-background-dark/10">
              Já sou membro? Fazer Login
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Membros;


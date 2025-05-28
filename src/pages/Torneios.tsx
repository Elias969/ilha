import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Calendar, Users, Shield, ArrowRight } from 'lucide-react';
import { SectionTitle, Button, GradientText, Card } from '../components/ui/UIComponents';

// Interface para Torneio
interface Torneio {
  id: number;
  nome: string;
  dataInicio: string;
  dataFim?: string;
  status: 'Próximo' | 'Em Andamento' | 'Finalizado';
  formato: string;
  premio: string;
  inscritos: number;
  maxInscritos: number;
  imagem: string; // Placeholder
}

// Dados de exemplo para Torneios
const mockTorneios: Torneio[] = [
  {
    id: 1,
    nome: "Campeonato da Ilha - Edição Junho",
    dataInicio: "15/06/2025",
    status: "Próximo",
    formato: "5v5 Summoner's Rift",
    premio: "R$ 1000 + Produtos Oficiais",
    inscritos: 0,
    maxInscritos: 32,
    imagem: "/assets/images/demonstracao/placeholder_torneio_junho.png"
  },
  {
    id: 2,
    nome: "Torneio Relâmpago de ARAM",
    dataInicio: "01/06/2025",
    status: "Próximo",
    formato: "ARAM",
    premio: "RP + Ícones Exclusivos",
    inscritos: 0,
    maxInscritos: 64,
    imagem: "/assets/images/demonstracao/placeholder_torneio_aram.png"
  },
  {
    id: 3,
    nome: "Desafio dos Streamers",
    dataInicio: "20/05/2025",
    dataFim: "26/05/2025",
    status: "Em Andamento",
    formato: "Confronto entre times dos Lendas",
    premio: "Doação para Caridade",
    inscritos: 8,
    maxInscritos: 8,
    imagem: "/assets/images/demonstracao/placeholder_torneio_streamers.png"
  },
  {
    id: 4,
    nome: "Campeonato da Ilha - Edição Maio (Finalizado)",
    dataInicio: "10/05/2025",
    dataFim: "18/05/2025",
    status: "Finalizado",
    formato: "5v5 Summoner's Rift",
    premio: "R$ 1000",
    inscritos: 32,
    maxInscritos: 32,
    imagem: "/assets/images/demonstracao/placeholder_torneio_maio.png"
  }
];

// Componente TournamentCard
interface TournamentCardProps {
  torneio: Torneio;
  onClick: () => void;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ torneio, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Em Andamento': return 'bg-yellow-500';
      case 'Próximo': return 'bg-green-500';
      default: return 'bg-gray-500';
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
          src={torneio.imagem} 
          alt={torneio.nome} 
          className="w-full h-full object-cover" 
          onError={(e) => (e.currentTarget.src = '/assets/images/demonstracao/placeholder_default.png')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
        <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(torneio.status)}`}>
          {torneio.status}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{torneio.nome}</h3>
        <div className="text-sm text-gray-400 space-y-1 mb-3">
          <p className="flex items-center"><Calendar size={14} className="mr-2" /> Início: {torneio.dataInicio}</p>
          <p className="flex items-center"><Shield size={14} className="mr-2" /> Formato: {torneio.formato}</p>
          <p className="flex items-center"><Trophy size={14} className="mr-2" /> Prêmio: {torneio.premio}</p>
          <p className="flex items-center"><Users size={14} className="mr-2" /> Inscritos: {torneio.inscritos}/{torneio.maxInscritos}</p>
        </div>
        <Button variant="primary" className="w-full text-sm">
          Ver Detalhes <ArrowRight size={16} className="ml-1" />
        </Button>
      </div>
    </motion.div>
  );
};

// Componente TournamentDetails (Simulado)
interface TournamentDetailsProps {
  torneio: Torneio;
  onClose: () => void;
}

const TournamentDetails: React.FC<TournamentDetailsProps> = ({ torneio, onClose }) => {
  return (
    <motion.div 
      className="bg-background-purple/50 p-6 rounded-lg shadow-lg border border-primary-purple/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Button variant="outline" onClick={onClose} className="mb-4">Voltar</Button>
      <h2 className="text-2xl font-bold mb-4">{torneio.nome}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Informações</h3>
          <p><span className="font-medium text-primary-purple">Status:</span> {torneio.status}</p>
          <p><span className="font-medium text-primary-purple">Data:</span> {torneio.dataInicio} {torneio.dataFim ? `- ${torneio.dataFim}` : ''}</p>
          <p><span className="font-medium text-primary-purple">Formato:</span> {torneio.formato}</p>
          <p><span className="font-medium text-primary-purple">Prêmio:</span> {torneio.premio}</p>
          <p><span className="font-medium text-primary-purple">Inscrições:</span> {torneio.inscritos} / {torneio.maxInscritos}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Regras (Resumo)</h3>
          <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
            <li>Nível mínimo: 30</li>
            <li>Comunicação via Discord obrigatória</li>
            <li>Fair play é essencial</li>
            <li>Regras completas no link abaixo</li>
          </ul>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">Chaveamento (Bracket)</h3>
      <div className="w-full h-64 bg-background-purple rounded flex items-center justify-center text-gray-500 mb-6">
        (Visualização do Bracket - Em breve)
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="primary" disabled={torneio.status !== 'Próximo' || torneio.inscritos >= torneio.maxInscritos}>
          Inscrever-se Agora
        </Button>
        <Button variant="outline">Ver Regras Completas</Button>
      </div>
    </motion.div>
  );
};

const Torneios: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [torneioSelecionado, setTorneioSelecionado] = useState<Torneio | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<'Todos' | 'Próximo' | 'Em Andamento' | 'Finalizado'>('Todos');

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

  const filtrarTorneios = () => {
    if (filtroStatus === 'Todos') return mockTorneios;
    return mockTorneios.filter(t => t.status === filtroStatus);
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
          <SectionTitle title="Torneios da" highlight="Comunidade" />
        </motion.div>

        {!torneioSelecionado ? (
          <>
            {/* Filtros de Status */}
            <motion.div variants={itemVariants} className="mb-8 flex flex-wrap gap-3 justify-center">
              <Button 
                variant={filtroStatus === 'Todos' ? 'primary' : 'outline'} 
                className="text-sm px-3 py-1.5"
                onClick={() => setFiltroStatus('Todos')}
              >
                Todos
              </Button>
              <Button 
                variant={filtroStatus === 'Próximo' ? 'primary' : 'outline'} 
                className="text-sm px-3 py-1.5"
                onClick={() => setFiltroStatus('Próximo')}
              >
                Próximos
              </Button>
              <Button 
                variant={filtroStatus === 'Em Andamento' ? 'primary' : 'outline'} 
                className="text-sm px-3 py-1.5"
                onClick={() => setFiltroStatus('Em Andamento')}
              >
                Em Andamento
              </Button>
              <Button 
                variant={filtroStatus === 'Finalizado' ? 'primary' : 'outline'} 
                className="text-sm px-3 py-1.5"
                onClick={() => setFiltroStatus('Finalizado')}
              >
                Finalizados
              </Button>
            </motion.div>

            {/* Lista de Torneios */}
            <motion.div 
              variants={containerVariants} 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtrarTorneios().map((torneio) => (
                <motion.div key={torneio.id} variants={itemVariants}>
                  <TournamentCard 
                    torneio={torneio} 
                    onClick={() => setTorneioSelecionado(torneio)} 
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <TournamentDetails 
            torneio={torneioSelecionado} 
            onClose={() => setTorneioSelecionado(null)} 
          />
        )}
      </div>
    </motion.div>
  );
};

export default Torneios;


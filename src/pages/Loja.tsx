import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShoppingCart, Filter } from 'lucide-react';
import { SectionTitle, Card, Button } from '../components/ui/UIComponents';

// Interface para os produtos
interface Produto {
  id: number;
  nome: string;
  preco: number;
  imagem: string; // Usaremos placeholders por enquanto
  descricao: string;
  categoria: string;
}

// Dados de exemplo para produtos
const mockProdutos: Produto[] = [
  {
    id: 1,
    nome: "Camiseta Ilha das Lendas - Logo Roxa",
    preco: 79.90,
    imagem: "/assets/images/camisa1.png", // Placeholder
    descricao: "Camiseta oficial com o logo da Ilha das Lendas em destaque roxo.",
    categoria: "Vestuário"
  },
  {
    id: 2,
    nome: "Moletom Ilha das Lendas - Edição Limitada",
    preco: 149.90,
    imagem: "/assets/images/camisa2.png", // Placeholder
    descricao: "Moletom confortável com design exclusivo da temporada.",
    categoria: "Vestuário"
  },
  {
    id: 3,
    nome: "Caneca Ilha das Lendas - Gradiente",
    preco: 39.90,
    imagem: "/assets/images/caneca.jpg", // Placeholder
    descricao: "Caneca com o gradiente oficial da Ilha das Lendas.",
    categoria: "Acessórios"
  },
  {
    id: 4,
    nome: "Boné Ilha das Lendas - Preto",
    preco: 59.90,
    imagem: "/assets/images/demonstracao/placeholder_bone.png", // Placeholder
    descricao: "Boné ajustável com logo bordado.",
    categoria: "Acessórios"
  },
  {
    id: 5,
    nome: "Mousepad Ilha das Lendas - Grande",
    preco: 89.90,
    imagem: "/assets/images/demonstracao/placeholder_mousepad.png", // Placeholder
    descricao: "Mousepad gamer extra grande com estampa da Ilha.",
    categoria: "Acessórios"
  },
  {
    id: 6,
    nome: "Chaveiro Ilha das Lendas - Metal",
    preco: 24.90,
    imagem: "/assets/images/demonstracao/placeholder_chaveiro.png", // Placeholder
    descricao: "Chaveiro de metal resistente com o logo da Ilha.",
    categoria: "Acessórios"
  }
];

// Componente ProductCard (simplificado)
interface ProductCardProps {
  produto: Produto;
}

const ProductCard: React.FC<ProductCardProps> = ({ produto }) => {
  return (
    <Card
      title={produto.nome}
      description={`R$ ${produto.preco.toFixed(2)}`}
      className="flex flex-col justify-between"
    >
      <div className="w-full aspect-[4/3] bg-background-purple mb-4 rounded flex items-center justify-center">
  <img
    src={produto.imagem}
    alt={produto.nome}
    className="max-h-full max-w-full object-contain"
  />
</div>
      <p className="text-gray-400 text-sm mb-4 flex-grow">{produto.descricao}</p>
      <Button variant="primary" className="w-full mt-auto">
        Adicionar ao Carrinho <ShoppingCart size={18} className="ml-2" />
      </Button>
    </Card>
  );
};

const Loja: React.FC = () => {
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
          <SectionTitle title="Loja Oficial" highlight="Ilha das Lendas" />
        </motion.div>

        {/* Filtros (Simulado) */}
        <motion.div variants={itemVariants} className="mb-8 flex flex-wrap gap-4 items-center">
          <Filter size={20} className="text-primary-purple"/>
          <h3 className="text-lg font-semibold mr-4">Filtrar por:</h3>
          <Button variant="outline" className="text-sm px-4 py-2">Todos</Button>
          <Button variant="outline" className="text-sm px-4 py-2">Vestuário</Button>
          <Button variant="outline" className="text-sm px-4 py-2">Acessórios</Button>
        </motion.div>

        {/* Grade de Produtos */}
        <motion.div 
          variants={containerVariants} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mockProdutos.map((produto) => (
            <motion.div key={produto.id} variants={itemVariants}>
              <ProductCard produto={produto} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loja;


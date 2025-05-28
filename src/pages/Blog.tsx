import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Calendar, Tag, User, Clock, ArrowRight } from 'lucide-react';
import { SectionTitle, Button } from '../components/ui/UIComponents';

// Interface para Post do Blog
interface BlogPost {
  id: number;
  titulo: string;
  resumo: string;
  conteudo: string;
  imagem: string; // Placeholder
  autor: string;
  autorAvatar: string; // Placeholder
  data: string;
  categorias: string[];
  tempoLeitura: number;
}

// Dados de exemplo para Posts do Blog
const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    titulo: "Análise do Meta Atual: Os Campeões Dominantes",
    resumo: "Uma análise detalhada dos campeões mais fortes do patch atual e como utilizá-los para subir de elo.",
    conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
    imagem: "/assets/images/demonstracao/placeholder_blog_meta.png",
    autor: "Analista da Ilha",
    autorAvatar: "/assets/images/demonstracao/placeholder_avatar1.png",
    data: "27/05/2025",
    categorias: ["Meta", "Análise", "Guia"],
    tempoLeitura: 8
  },
  {
    id: 2,
    titulo: "Bastidores do Último Showmatch da Ilha das Lendas",
    resumo: "Confira os momentos mais divertidos e curiosidades dos bastidores do nosso último evento especial.",
    conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
    imagem: "/assets/images/demonstracao/placeholder_blog_bastidores.png",
    autor: "Produtor da Ilha",
    autorAvatar: "/assets/images/demonstracao/placeholder_avatar2.png",
    data: "25/05/2025",
    categorias: ["Eventos", "Bastidores"],
    tempoLeitura: 5
  },
  {
    id: 3,
    titulo: "Guia Completo: Como Melhorar sua Mecânica no LoL",
    resumo: "Dicas práticas e exercícios para aprimorar sua mecânica e dominar os campeões mais complexos do jogo.",
    conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
    imagem: "/assets/images/demonstracao/placeholder_blog_mecanica.png",
    autor: "Coach da Ilha",
    autorAvatar: "/assets/images/demonstracao/placeholder_avatar3.png",
    data: "22/05/2025",
    categorias: ["Guia", "Mecânica", "Dicas"],
    tempoLeitura: 12
  },
  {
    id: 4,
    titulo: "Novidades do Programa de Cartinhas: Próxima Coleção",
    resumo: "Revelamos em primeira mão detalhes da próxima coleção de cartinhas da Ilha das Lendas.",
    conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
    imagem: "/assets/images/demonstracao/placeholder_blog_cartinhas.png",
    autor: "Coordenador de Cartinhas",
    autorAvatar: "/assets/images/demonstracao/placeholder_avatar4.png",
    data: "20/05/2025",
    categorias: ["Cartinhas", "Novidades"],
    tempoLeitura: 6
  }
];

// Componente BlogPostCard
interface BlogPostCardProps {
  post: BlogPost;
  onClick: () => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onClick }) => {
  return (
    <motion.div 
      className="bg-background-purple/30 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl selection-line-animated"
      whileHover={{ y: -10 }}
      onClick={onClick}
    >
      <div className="h-48 bg-background-purple relative">
        <img 
          src={post.imagem} 
          alt={post.titulo} 
          className="w-full h-full object-cover" 
          onError={(e) => (e.currentTarget.src = '/assets/images/demonstracao/placeholder_default.png')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {post.categorias.map((categoria, index) => (
            <span key={index} className="bg-primary-purple px-2 py-0.5 rounded-full text-xs font-medium">
              {categoria}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.titulo}</h3>
        <p className="text-gray-300 mb-4 line-clamp-3">{post.resumo}</p>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-background-purple overflow-hidden mr-2">
              <img 
                src={post.autorAvatar} 
                alt={post.autor} 
                className="w-full h-full object-cover" 
                onError={(e) => (e.currentTarget.src = '/assets/images/demonstracao/placeholder_avatar_default.png')}
              />
            </div>
            <span>{post.autor}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" /> {post.data}
            </span>
            <span className="flex items-center">
              <Clock size={14} className="mr-1" /> {post.tempoLeitura} min
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Blog: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [postSelecionado, setPostSelecionado] = useState<BlogPost | null>(null);

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
          <SectionTitle title="Blog da" highlight="Ilha" />
        </motion.div>

        {!postSelecionado ? (
          <>
            {/* Categorias do Blog */}
            <motion.div variants={itemVariants} className="mb-8 flex flex-wrap gap-3 justify-center">
              <Button variant="outline" className="text-sm px-3 py-1.5">Todos</Button>
              <Button variant="outline" className="text-sm px-3 py-1.5">Meta</Button>
              <Button variant="outline" className="text-sm px-3 py-1.5">Guias</Button>
              <Button variant="outline" className="text-sm px-3 py-1.5">Eventos</Button>
              <Button variant="outline" className="text-sm px-3 py-1.5">Bastidores</Button>
              <Button variant="outline" className="text-sm px-3 py-1.5">Novidades</Button>
            </motion.div>

            {/* Post em Destaque */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="bg-background-purple/30 rounded-lg overflow-hidden shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-64 md:h-auto bg-background-purple relative">
                    <img 
                      src={mockBlogPosts[0].imagem} 
                      alt={mockBlogPosts[0].titulo} 
                      className="w-full h-full object-cover" 
                      onError={(e) => (e.currentTarget.src = '/assets/images/demonstracao/placeholder_default.png')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background-dark to-transparent"></div>
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {mockBlogPosts[0].categorias.map((categoria, index) => (
                        <span key={index} className="bg-primary-purple px-2 py-0.5 rounded-full text-xs font-medium">
                          {categoria}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">{mockBlogPosts[0].titulo}</h2>
                    <p className="text-gray-300 mb-4">{mockBlogPosts[0].resumo}</p>
                    <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-background-purple overflow-hidden mr-2">
                          <img 
                            src={mockBlogPosts[0].autorAvatar} 
                            alt={mockBlogPosts[0].autor} 
                            className="w-full h-full object-cover" 
                            onError={(e) => (e.currentTarget.src = '/assets/images/demonstracao/placeholder_avatar_default.png')}
                          />
                        </div>
                        <span>{mockBlogPosts[0].autor}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" /> {mockBlogPosts[0].data}
                        </span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" /> {mockBlogPosts[0].tempoLeitura} min
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="primary"
                      onClick={() => setPostSelecionado(mockBlogPosts[0])}
                    >
                      Ler Artigo Completo
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Lista de Posts */}
            <motion.div 
              variants={containerVariants} 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {mockBlogPosts.slice(1).map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <BlogPostCard 
                    post={post} 
                    onClick={() => setPostSelecionado(post)} 
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Paginação (Simulada) */}
            <motion.div variants={itemVariants} className="mt-12 flex justify-center">
              <div className="flex gap-2">
                <Button variant="outline" className="px-4 py-2">Anterior</Button>
                <Button variant="primary" className="px-4 py-2">1</Button>
                <Button variant="outline" className="px-4 py-2">2</Button>
                <Button variant="outline" className="px-4 py-2">3</Button>
                <Button variant="outline" className="px-4 py-2">Próxima</Button>
              </div>
            </motion.div>
          </>
        ) : (
          <>
            {/* Visualização de Post */}
            <motion.div 
              variants={itemVariants} 
              className="bg-background-purple/30 rounded-lg p-6 md:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Button 
                variant="outline" 
                className="mb-6"
                onClick={() => setPostSelecionado(null)}
              >
                Voltar para o Blog
              </Button>

              <div className="flex flex-wrap gap-2 mb-4">
                {postSelecionado.categorias.map((categoria, index) => (
                  <span key={index} className="bg-primary-purple px-2 py-0.5 rounded-full text-xs font-medium">
                    {categoria}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{postSelecionado.titulo}</h1>

              <div className="flex items-center gap-4 mb-6 text-gray-400">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-background-purple overflow-hidden mr-2">
                    <img 
                      src={postSelecionado.autorAvatar} 
                      alt={postSelecionado.autor} 
                      className="w-full h-full object-cover" 
                      onError={(e) => (e.currentTarget.src = '/assets/images/demonstracao/placeholder_avatar_default.png')}
                    />
                  </div>
                  <span>{postSelecionado.autor}</span>
                </div>
                <span className="flex items-center">
                  <Calendar size={16} className="mr-1" /> {postSelecionado.data}
                </span>
                <span className="flex items-center">
                  <Clock size={16} className="mr-1" /> {postSelecionado.tempoLeitura} min de leitura
                </span>
              </div>

              <div className="w-full h-80 bg-background-purple rounded-lg mb-8 overflow-hidden">
                <img 
                  src={postSelecionado.imagem} 
                  alt={postSelecionado.titulo} 
                  className="w-full h-full object-cover" 
                  onError={(e) => (e.currentTarget.src = '/assets/images/demonstracao/placeholder_default.png')}
                />
              </div>

              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 mb-4">{postSelecionado.resumo}</p>
                <p className="text-gray-300 mb-4">{postSelecionado.conteudo}</p>
                <p className="text-gray-300 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
                <p className="text-gray-300 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
              </div>

              <div className="mt-8 pt-8 border-t border-primary-purple/30">
                <h3 className="text-xl font-bold mb-4">Compartilhe este artigo</h3>
                <div className="flex gap-3">
                  <Button variant="outline" className="px-4 py-2">Twitter</Button>
                  <Button variant="outline" className="px-4 py-2">Facebook</Button>
                  <Button variant="outline" className="px-4 py-2">Copiar Link</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default Blog;

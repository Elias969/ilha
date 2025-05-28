import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, Button, GradientText, SectionTitle } from '../components/ui/UIComponents';

const ResponsiveDemo = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
      className="py-20 bg-gradient-main"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle 
          title="Validação de" 
          highlight="Responsividade" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <motion.div variants={itemVariants}>
            <Card 
              title="Desktop" 
              description="Visualização em telas grandes com todas as animações e efeitos."
              icon={<span className="text-2xl">💻</span>}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card 
              title="Tablet" 
              description="Layout adaptado para telas médias com navegação otimizada."
              icon={<span className="text-2xl">📱</span>}
              isSelected={true}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card 
              title="Mobile" 
              description="Experiência completa em dispositivos móveis com menu responsivo."
              icon={<span className="text-2xl">📱</span>}
            />
          </motion.div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary">
            Botão Primário
          </Button>
          
          <Button variant="secondary">
            Botão Secundário
          </Button>
          
          <Button variant="outline">
            Botão Outline
          </Button>
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Teste de <GradientText>Animações</GradientText></h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Passe o mouse sobre os elementos para ver as animações de linha colorida com degradê.
            Todos os componentes foram atualizados com as novas cores e efeitos visuais.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
            <a href="#" className="text-white hover:text-primary-lime transition-colors relative selection-line text-lg">
              Link com animação
            </a>
            <a href="#" className="text-white hover:text-primary-lime transition-colors relative selection-line text-lg">
              Outro link
            </a>
            <a href="#" className="text-white hover:text-primary-lime transition-colors relative selection-line-active text-lg">
              Link ativo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResponsiveDemo;

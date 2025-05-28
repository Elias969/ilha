import React from 'react';
import { motion } from 'framer-motion';

// Componente de visualização das novas cores e gradientes
const ColorPalette = () => {
  const colors = [
    { name: 'Roxo/Lilás', color: '#C27AFF', className: 'bg-primary-purple' },
    { name: 'Azul', color: '#2233CC', className: 'bg-primary-blue' },
    { name: 'Azul-turquesa', color: '#22AACC', className: 'bg-primary-teal' },
    { name: 'Verde-limão', color: '#AAFF00', className: 'bg-primary-lime' }
  ];

  const gradients = [
    { name: 'Gradiente Principal', className: 'bg-gradient-main' },
    { name: 'Gradiente de Destaque', className: 'bg-gradient-highlight' },
    { name: 'Gradiente de Botões', className: 'bg-gradient-button' },
    { name: 'Gradiente de Seleção', className: 'bg-gradient-selection' }
  ];

  return (
    <div className="py-20 bg-starry">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Nova <span className="text-gradient">Paleta de Cores</span>
        </h2>
        
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-4 text-white">Cores Principais</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colors.map((color, index) => (
              <motion.div
                key={index}
                className="rounded-lg overflow-hidden shadow-lg"
                whileHover={{ y: -5 }}
              >
                <div className={`h-24 ${color.className}`}></div>
                <div className="bg-background-purple/50 p-4">
                  <p className="font-medium text-white">{color.name}</p>
                  <p className="text-sm text-gray-300">{color.color}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-4 text-white">Gradientes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gradients.map((gradient, index) => (
              <motion.div
                key={index}
                className="rounded-lg overflow-hidden shadow-lg"
                whileHover={{ y: -5 }}
              >
                <div className={`h-24 ${gradient.className}`}></div>
                <div className="bg-background-purple/50 p-4">
                  <p className="font-medium text-white">{gradient.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Animação de Linha Colorida</h3>
          <div className="bg-background-purple/30 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row justify-center gap-8 items-center">
              <a href="#" className="text-white text-lg hover:text-primary-lime transition-colors relative selection-line">
                Passe o mouse aqui
              </a>
              
              <a href="#" className="text-white text-lg hover:text-primary-lime transition-colors relative selection-line-active">
                Linha ativa
              </a>
              
              <div className="relative">
                <button className="bg-gradient-button px-6 py-3 rounded-lg text-white selection-line-animated">
                  Botão com animação
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPalette;

import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'YouTube', url: 'https://youtube.com/ilhadaslendas' },
    { name: 'Twitch', url: 'https://twitch.tv/ilhadaslendas' },
    { name: 'Twitter', url: 'https://x.com/ilhadaslendas' },
    { name: 'Instagram', url: 'https://instagram.com/ilhadaslendas' },
    { name: 'Kick', url: 'https://kick.com/ilhadaslendas' },
  ];

  const footerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      className="bg-gradient-main text-white py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e Descrição */}
          <motion.div variants={itemVariants}>
            <img 
              src="/assets/logos/Ilha_das_Lendaslogo_profile.png" 
              alt="Ilha das Lendas" 
              className="h-16 mb-4"
            />
            <p className="text-gray-300 mb-4">
              A Ilha das Lendas é um grupo de criadores de conteúdo focado em League of Legends e outros jogos, 
              trazendo entretenimento de qualidade através de streams, reacts e conteúdo original.
            </p>
          </motion.div>
          
          {/* Links Rápidos */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 text-primary-lime">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-primary-purple transition-colors relative selection-line">
                  Início
                </a>
              </li>
              <li>
                <a href="/lendas" className="text-gray-300 hover:text-primary-purple transition-colors relative selection-line">
                  Lendas
                </a>
              </li>
              <li>
                <a href="/canais" className="text-gray-300 hover:text-primary-purple transition-colors relative selection-line">
                  Canais
                </a>
              </li>
              <li>
                <a href="/calendario" className="text-gray-300 hover:text-primary-purple transition-colors relative selection-line">
                  Agenda Lendária
                </a>
              </li>
            </ul>
          </motion.div>
          
          {/* Redes Sociais */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 text-primary-lime">Siga-nos</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link, index) => (
                <motion.a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-background-purple hover:bg-gradient-button transition-all duration-300 p-3 rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400"
          variants={itemVariants}
        >
          <p>&copy; {currentYear} Ilha das Lendas. Todos os direitos reservados.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

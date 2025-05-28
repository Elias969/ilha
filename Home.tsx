import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Calendar, Video, Users, Trophy } from 'lucide-react';

const Home: React.FC = () => {
  // Hero section animations
  const heroControls = useAnimation();
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  // About section animations
  const aboutControls = useAnimation();
  const [aboutRef, aboutInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  // Features section animations
  const featuresControls = useAnimation();
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  // Events section animations
  const eventsControls = useAnimation();
  const [eventsRef, eventsInView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (heroInView) {
      heroControls.start('visible');
    }
    if (aboutInView) {
      aboutControls.start('visible');
    }
    if (featuresInView) {
      featuresControls.start('visible');
    }
    if (eventsInView) {
      eventsControls.start('visible');
    }
  }, [heroInView, aboutInView, featuresInView, eventsInView, heroControls, aboutControls, featuresControls, eventsControls]);

  // Animation variants
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "React ao CBLOL - Final",
      date: "28 de Maio, 2025",
      time: "13:00",
      type: "React",
      image: "/assets/images/event-cblol.jpg"
    },
    {
      id: 2,
      title: "Partida Personalizada com Inscritos",
      date: "30 de Maio, 2025",
      time: "19:00",
      type: "Gameplay",
      image: "/assets/images/event-custom.jpg"
    },
    {
      id: 3,
      title: "Showmatch Ilha das Lendas",
      date: "2 de Junho, 2025",
      time: "20:00",
      type: "Especial",
      image: "/assets/images/event-showmatch.jpg"
    }
  ];

  // Features data
  const features = [
    {
      icon: <Video className="h-8 w-8 text-primary-lime" />,
      title: "Conteúdo Exclusivo",
      description: "Reacts, gameplays e conteúdos originais produzidos diariamente pelos melhores criadores."
    },
    {
      icon: <Users className="h-8 w-8 text-primary-lime" />,
      title: "Comunidade Engajada",
      description: "Faça parte de uma das maiores comunidades de League of Legends do Brasil."
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary-lime" />,
      title: "Eventos Regulares",
      description: "Partidas com inscritos, torneios e eventos especiais toda semana."
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary-lime" />,
      title: "Análise Profissional",
      description: "Comentários e análises das partidas competitivas por ex-jogadores profissionais."
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        initial="hidden"
        animate={heroControls}
        variants={containerVariants}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark/70 to-background-purple/90 z-10"></div>
          <div className="w-full h-full bg-starry"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
              variants={itemVariants}
            >
              Bem-vindo à <span className="text-gradient">Ilha das Lendas</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 mb-8"
              variants={itemVariants}
            >
              O lar dos maiores criadores de conteúdo de League of Legends do Brasil
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={itemVariants}
            >
              <motion.a 
                href="/lendas" 
                className="bg-gradient-button text-lg px-8 py-3 flex items-center justify-center gap-2 rounded-lg text-white selection-line-animated"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Conheça as Lendas <ArrowRight size={18} />
              </motion.a>
              
              <motion.a 
                href="/calendario" 
                className="bg-gradient-highlight text-lg px-8 py-3 flex items-center justify-center gap-2 rounded-lg text-white selection-line-animated"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Agenda <Calendar size={18} />
              </motion.a>
            </motion.div>
          </div>
        </div>
        
        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary-purple flex justify-center pt-2">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-primary-lime"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        ref={aboutRef}
        initial="hidden"
        animate={aboutControls}
        variants={containerVariants}
        className="py-20 bg-gradient-main"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sobre a <span className="text-primary-lime">Ilha das Lendas</span></h2>
            <div className="w-24 h-1 bg-gradient-selection mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary-purple"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-primary-lime"></div>
                <div className="w-full h-64 bg-background-purple rounded-lg"></div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-4 text-primary-lime">Nossa História</h3>
              <p className="text-gray-300 mb-6">
                A Ilha das Lendas nasceu da paixão por League of Legends e da vontade de criar conteúdo de qualidade para a comunidade brasileira. Reunindo alguns dos maiores talentos do cenário, o grupo se consolidou como referência em entretenimento e análise do jogo.
              </p>
              <p className="text-gray-300 mb-6">
                Com streams diárias, reacts aos principais campeonatos, partidas personalizadas e conteúdos exclusivos, a Ilha das Lendas se tornou um hub de entretenimento para fãs de LoL de todas as idades.
              </p>
              <motion.a 
                href="/lendas" 
                className="bg-gradient-button inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white selection-line-animated"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Conheça nossa equipe <ArrowRight size={18} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        ref={featuresRef}
        initial="hidden"
        animate={featuresControls}
        variants={containerVariants}
        className="py-20 bg-gradient-to-b from-background-purple to-background-blue"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que nos <span className="text-primary-lime">acompanhar</span>?</h2>
            <div className="w-24 h-1 bg-gradient-selection mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="bg-background-purple/30 p-6 rounded-lg shadow-lg border border-primary-purple/20 selection-line-animated"
              >
                <div className="bg-background-purple w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-300 text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Upcoming Events Section */}
      <motion.section 
        ref={eventsRef}
        initial="hidden"
        animate={eventsControls}
        variants={containerVariants}
        className="py-20 bg-gradient-main"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Próximos <span className="text-primary-lime">Eventos</span></h2>
            <div className="w-24 h-1 bg-gradient-selection mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div 
                key={event.id}
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                className="bg-background-purple/30 rounded-lg overflow-hidden shadow-lg selection-line-animated"
              >
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent z-10"></div>
                  <div className="w-full h-full bg-background-purple"></div>
                  <div className="absolute top-4 right-4 bg-gradient-button px-3 py-1 rounded-full text-sm font-medium z-20">
                    {event.type}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <div className="flex items-center text-gray-300 mb-4">
                    <Calendar size={16} className="mr-2" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <motion.a 
                    href="/calendario" 
                    className="bg-gradient-highlight w-full text-center inline-block py-2 px-4 rounded-lg text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ver Detalhes
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            variants={itemVariants}
          >
            <motion.a 
              href="/calendario" 
              className="bg-gradient-button inline-flex items-center gap-2 px-8 py-3 rounded-lg text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Calendário Completo <ArrowRight size={18} />
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-highlight"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Fique por dentro de todas as novidades</h2>
            <p className="text-xl text-gray-200 mb-8">
              Inscreva-se para receber atualizações sobre eventos, conteúdos exclusivos e muito mais!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-purple"
              />
              <motion.button 
                className="bg-gradient-button px-6 py-3 rounded-lg text-white whitespace-nowrap selection-line-animated"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Inscrever-se
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Floating Social Media Links */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col gap-4">
          <motion.a 
            href="https://youtube.com/ilhadaslendas" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-background-purple flex items-center justify-center text-white hover:bg-gradient-button transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            YT
          </motion.a>
          <motion.a 
            href="https://twitch.tv/ilhadaslendas" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-background-purple flex items-center justify-center text-white hover:bg-primary-purple transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
          >
            TW
          </motion.a>
          <motion.a 
            href="https://x.com/ilhadaslendas" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-background-purple flex items-center justify-center text-white hover:bg-primary-blue transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            X
          </motion.a>
          <motion.a 
            href="https://instagram.com/ilhadaslendas" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-background-purple flex items-center justify-center text-white hover:bg-gradient-highlight transition-colors duration-300"
            whileHover={{ scale: 1.2, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
          >
            IG
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default Home;

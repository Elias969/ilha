import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  type: string;
  description: string;
}

const Calendario: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState<Event[]>([]);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Dados de exemplo para eventos
  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: 1,
        title: "React ao CBLOL - Final",
        date: new Date(2025, 4, 28), // 28 de Maio, 2025
        time: "13:00",
        type: "React",
        description: "Acompanhe a final do CBLOL com comentários ao vivo dos membros da Ilha das Lendas."
      },
      {
        id: 2,
        title: "Partida Personalizada com Inscritos",
        date: new Date(2025, 4, 30), // 30 de Maio, 2025
        time: "19:00",
        type: "Gameplay",
        description: "Jogue com os membros da Ilha das Lendas em partidas personalizadas exclusivas para inscritos."
      },
      {
        id: 3,
        title: "Showmatch Ilha das Lendas",
        date: new Date(2025, 5, 2), // 2 de Junho, 2025
        time: "20:00",
        type: "Especial",
        description: "Confronto especial entre os membros da Ilha das Lendas com convidados surpresa."
      },
      {
        id: 4,
        title: "React ao MSI 2025",
        date: new Date(2025, 5, 5), // 5 de Junho, 2025
        time: "14:00",
        type: "React",
        description: "Acompanhe as partidas do MSI com análises detalhadas dos ex-profissionais."
      },
      {
        id: 5,
        title: "Podcast Ilha Cast",
        date: new Date(2025, 5, 7), // 7 de Junho, 2025
        time: "18:00",
        type: "Podcast",
        description: "Discussões sobre o meta atual, notícias e entrevistas com jogadores profissionais."
      }
    ];
    
    setEvents(mockEvents);
  }, []);

  // Atualiza os eventos para a data selecionada
  const getEventsForDate = (date: Date): Event[] => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  };

  useEffect(() => {
    setEventsForSelectedDate(getEventsForDate(selectedDate));
  }, [selectedDate, events]);

  // Funções para navegação do calendário
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Gera os dias do mês atual
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    // Renderiza os dias da semana
    const weekdaysRow = (
      <div className="grid grid-cols-7 mb-2">
        {weekdays.map((day, index) => (
          <div key={index} className="text-center py-2 text-gray-400 font-medium">
            {day}
          </div>
        ))}
      </div>
    );
    
    // Preenche os espaços vazios no início do mês
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="text-center py-2"></div>
      );
    }
    
    // Renderiza os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = selectedDate.toDateString() === date.toDateString();
      const hasEvents = getEventsForDate(date).length > 0;
      
      days.push(
        <motion.div 
          key={day}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`text-center py-2 rounded-full cursor-pointer transition-all duration-300 mx-1
                     ${isToday ? 'bg-primary-purple text-white' : ''}
                     ${isSelected ? 'bg-gradient-button text-white' : ''}
                     ${!isToday && !isSelected && hasEvents ? 'border border-primary-lime' : ''}
                     ${!isToday && !isSelected && !hasEvents ? 'hover:bg-background-purple/30' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          {day}
          {hasEvents && !isSelected && !isToday && (
            <div className="w-1 h-1 bg-primary-lime rounded-full mx-auto mt-1"></div>
          )}
        </motion.div>
      );
    }
    
    return (
      <div className="bg-background-purple/30 p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">
            {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex gap-2">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-background-purple hover:bg-primary-purple transition-colors"
              onClick={goToPreviousMonth}
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-background-purple hover:bg-primary-purple transition-colors"
              onClick={goToNextMonth}
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
        {weekdaysRow}
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

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
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Agenda <span className="text-gradient">Lendária</span></h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Acompanhe todos os eventos, streams e conteúdos especiais da Ilha das Lendas.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-1">
            {renderCalendar()}
          </motion.div>
          
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="bg-background-purple/30 p-6 rounded-lg shadow-lg h-full">
              <div className="flex items-center gap-3 mb-6">
                <Calendar size={24} className="text-primary-lime" />
                <h3 className="text-xl font-bold">
                  Eventos em {selectedDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </h3>
              </div>
              
              {eventsForSelectedDate.length > 0 ? (
                <div className="space-y-4">
                  {eventsForSelectedDate.map(event => (
                    <motion.div 
                      key={event.id}
                      whileHover={{ y: -5 }}
                      className="bg-background-purple/50 p-4 rounded-lg border-l-4 border-primary-lime selection-line-animated"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-lg font-bold">{event.title}</h4>
                          <p className="text-gray-300">{event.time} - {event.type}</p>
                        </div>
                        <span className="bg-gradient-button px-3 py-1 rounded-full text-sm font-medium">
                          {event.type}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-300">{event.description}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <Calendar size={48} className="text-gray-500 mb-4" />
                  <p className="text-gray-400 text-center">Nenhum evento programado para esta data.</p>
                  <p className="text-gray-500 text-center mt-2">Selecione outra data ou confira nossos canais para atualizações.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Próximos <span className="text-gradient">Eventos Especiais</span></h3>
          <div className="w-24 h-1 bg-gradient-selection mx-auto mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 3).map(event => (
              <motion.div 
                key={event.id}
                whileHover={{ y: -10 }}
                className="bg-background-purple/30 p-6 rounded-lg shadow-lg border border-primary-purple/20 selection-line-animated"
              >
                <div className="bg-gradient-button w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Calendar size={24} />
                </div>
                <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                <p className="text-gray-300 mb-4">
                  {event.date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })} • {event.time}
                </p>
                <span className="bg-gradient-highlight px-3 py-1 rounded-full text-sm font-medium">
                  {event.type}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Calendario;

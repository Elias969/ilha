import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Card = ({ 
  title, 
  description, 
  icon, 
  className = "", 
  onClick = null,
  isSelected = false
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className={`bg-background-purple/30 p-6 rounded-lg shadow-lg border border-primary-purple/20 
                 transition-all duration-300 hover:shadow-xl ${
                   isSelected ? 'selection-line-active' : 'selection-line'
                 } ${className}`}
      onClick={onClick}
      whileHover={{ y: -5 }}
    >
      {icon && (
        <div className="bg-gradient-button w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>
    </motion.div>
  );
};

const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  className = "",
  animated = true,
  icon = null
}) => {
  const getVariantClasses = () => {
    switch(variant) {
      case "secondary":
        return "bg-gradient-highlight";
      case "outline":
        return "bg-transparent border-2 border-primary-purple hover:bg-primary-purple/10";
      default: // primary
        return "bg-gradient-button";
    }
  };

  return (
    <motion.button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg text-white flex items-center justify-center gap-2 
                 ${getVariantClasses()} 
                 ${animated ? 'selection-line-animated' : ''} 
                 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      {icon && icon}
    </motion.button>
  );
};

const GradientText = ({ children, className = "" }) => {
  return (
    <span className={`text-gradient ${className}`}>
      {children}
    </span>
  );
};

const AnimatedLine = ({ className = "", width = "100%" }) => {
  return (
    <div className={`h-1 bg-gradient-selection rounded-full ${className}`} style={{ width }}>
      <div className="h-full w-full shimmer"></div>
    </div>
  );
};

const SectionTitle = ({ title, highlight, className = "" }) => {
  return (
    <div className={`text-center mb-16 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {title} <GradientText>{highlight}</GradientText>
      </h2>
      <AnimatedLine className="w-24 mx-auto" />
    </div>
  );
};

export { Card, Button, GradientText, AnimatedLine, SectionTitle };

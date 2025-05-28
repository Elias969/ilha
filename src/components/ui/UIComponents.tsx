import React, { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// ----------------------------
// Card
// ----------------------------
interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isSelected?: boolean;
  children?: React.ReactNode;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  className = '',
  onClick,
  isSelected = false,
  children,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.5 }}
      className={`bg-background-purple/30 p-6 rounded-lg shadow-lg border border-primary-purple/20 
                 transition-all duration-300 hover:shadow-xl ${
                   isSelected ? 'selection-line-active' : 'selection-line'
                 } ${className}`}
      onClick={onClick}
      whileHover={{ y: -5 }}
      layout
    >
      {icon && (
        <div className="bg-gradient-button w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold mb-2 text-center">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>

      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
};

// ----------------------------
// Button
// ----------------------------
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'animated-gradient';
  className?: string;
  animated?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  animated = true,
  icon = null,
  disabled = false,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-gradient-highlight';
      case 'outline':
        return 'bg-transparent border-2 border-primary-purple hover:bg-primary-purple/10';
      case 'animated-gradient':
        return 'btn-gradient-animated';
      default:
        return 'bg-gradient-button';
    }
  };

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      className={`px-6 py-3 rounded-lg text-white flex items-center justify-center gap-2 
                 ${getVariantClasses()} 
                 ${animated && !disabled ? 'selection-line-animated' : ''} 
                 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} 
                 ${className}`}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      disabled={disabled}
      type="button"
    >
      {children}
      {icon && icon}
    </motion.button>
  );
};

// ----------------------------
// GradientText
// ----------------------------
interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ children, className = '' }) => {
  return <span className={`text-gradient ${className}`}>{children}</span>;
};

// ----------------------------
// AnimatedLine
// ----------------------------
interface AnimatedLineProps {
  className?: string;
  width?: string;
}

const AnimatedLine: React.FC<AnimatedLineProps> = ({
  className = '',
  width = '100%',
}) => {
  return (
    <div
      className={`h-1 bg-gradient-selection rounded-full ${className}`}
      style={{ width }}
    >
      <div className="h-full w-full shimmer" />
    </div>
  );
};

// ----------------------------
// SectionTitle
// ----------------------------
interface SectionTitleProps {
  title: string;
  highlight: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  highlight,
  className = '',
}) => {
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

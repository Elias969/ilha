/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: "#C27AFF",
          blue: "#2233CC",
          teal: "#22AACC",
          lime: "#AAFF00",
        },
        background: {
          dark: "#000000",
          purple: "#1E0B4C",
          blue: "#0033FF",
          "blue-purple": "#2A1A8C",
        },
        ilha: {
          purple: {
            light: "#C27AFF",
            DEFAULT: "#9B4FFF",
            dark: "#7A2AE0",
          },
          blue: {
            light: "#4455FF",
            DEFAULT: "#2233CC",
            dark: "#1A1A99",
          },
          teal: {
            light: "#33CCEE",
            DEFAULT: "#22AACC",
            dark: "#1A88AA",
          },
          lime: {
            light: "#CCFF33",
            DEFAULT: "#AAFF00",
            dark: "#88CC00",
          },
        },
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(to bottom, #1E0B4C, #2A1A8C, #0033FF)',
        'gradient-highlight': 'linear-gradient(to bottom, #2233CC, #22AACC, #AAFF00)',
        'gradient-button': 'linear-gradient(to right, #C27AFF, #2233CC)',
        'gradient-selection': 'linear-gradient(to right, #C27AFF, #2233CC, #AAFF00)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'starry-sky': 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px), #000000',
        'hero-pattern': "url('/src/assets/hero-bg.jpg')",
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-line': 'gradient-line 0.8s ease forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(194, 122, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(194, 122, 255, 0.8)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'gradient-line': {
          '0%': { 
            width: '0%', 
            opacity: 0.7 
          },
          '100%': { 
            width: '100%', 
            opacity: 1 
          },
        },
        'shimmer': {
          '0%': { 
            backgroundPosition: '-200% 0' 
          },
          '100%': { 
            backgroundPosition: '200% 0' 
          },
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      backgroundSize: {
        'auto': 'auto',
        'cover': 'cover',
        'contain': 'contain',
        '200%': '200%',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.selection-line': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-2px',
            left: '0',
            height: '3px',
            width: '0%',
            background: 'linear-gradient(to right, #C27AFF, #2233CC, #AAFF00)',
            transition: 'width 0.3s ease',
          },
          '&:hover::after': {
            width: '100%',
          },
        },
        '.selection-line-active': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-2px',
            left: '0',
            height: '3px',
            width: '100%',
            background: 'linear-gradient(to right, #C27AFF, #2233CC, #AAFF00)',
          },
        },
        '.selection-line-animated': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-2px',
            left: '0',
            height: '3px',
            width: '0%',
            background: 'linear-gradient(to right, #C27AFF, #2233CC, #AAFF00)',
            opacity: 0.7,
            animation: 'gradient-line 0.8s ease forwards',
          },
        },
        '.bg-starry': {
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          backgroundColor: '#000000',
        },
        '.text-gradient': {
          background: 'linear-gradient(to right, #C27AFF, #2233CC, #AAFF00)',
          '-webkit-background-clip': 'text',
          'color': 'transparent',
        },
        '.shimmer': {
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s linear infinite',
        },
        '.btn-gradient-animated': {
  position: 'relative',
  background: 'linear-gradient(to right, #C27AFF, #2233CC, #AAFF00)',
  backgroundSize: '200% 100%',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  '&:hover': {
    animation: 'gradient-x 3s ease infinite',
  },
},
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 1s ease-out forwards',
        'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
        'modalPop': 'modalPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',

        // ✅ NEW animations
        'fadeInUp': 'fadeInUp 1s ease-out forwards',
        'fadeInUpDelay1': 'fadeInUp 1s ease-out 0.2s forwards',
        'fadeInUpDelay2': 'fadeInUp 1s ease-out 0.4s forwards',

        // ✅ ADD THIS ONLY (for popping text one-by-one)
        'popIn': 'popIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },

        'pulse-slow': {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.5)'
          },
          '50%': { 
            transform: 'scale(1.05)',
            boxShadow: '0 0 20px 10px rgba(34, 197, 94, 0.3)'
          },
        },

        modalPop: {
          '0%': { 
            opacity: '0', 
            transform: 'scale(0.9) translateY(20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'scale(1) translateY(0)' 
          },
        },

        // ✅ NEW keyframes
        fadeInUp: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },

        // ✅ ADD THIS ONLY (pop style)
        popIn: {
          '0%': { opacity: '0', transform: 'translateY(14px) scale(0.98)' },
          '60%': { opacity: '1', transform: 'translateY(-2px) scale(1.01)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
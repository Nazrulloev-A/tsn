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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1s ease-out forwards",
        "pulse-slow": "pulse-slow 2s ease-in-out infinite",
        modalPop: "modalPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",

        // ✅ existing
        fadeInUp: "fadeInUp 1s ease-out forwards",
        fadeInUpDelay1: "fadeInUp 1s ease-out 0.2s forwards",
        fadeInUpDelay2: "fadeInUp 1s ease-out 0.4s forwards",

        // ✅ existing (pop text)
        popIn: "popIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",

        // ✅ Home modal animations
        modalIn: "modalIn 250ms ease-out forwards",
        modalOut: "modalOut 200ms ease-in forwards",
        shake: "shake 300ms ease-in-out",

        // ✅ Toast progress bar
        toastbar: "toastbar 3.5s linear forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        "pulse-slow": {
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(34, 197, 94, 0.5)",
          },
          "50%": {
            transform: "scale(1.05)",
            boxShadow: "0 0 20px 10px rgba(34, 197, 94, 0.3)",
          },
        },

        modalPop: {
          "0%": { opacity: "0", transform: "scale(0.9) translateY(20px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },

        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        popIn: {
          "0%": { opacity: "0", transform: "translateY(14px) scale(0.98)" },
          "60%": { opacity: "1", transform: "translateY(-2px) scale(1.01)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },

        // ✅ Home modal
        modalIn: {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        modalOut: {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(10px) scale(0.98)" },
        },

        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-6px)" },
          "40%": { transform: "translateX(6px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(4px)" },
        },

        // ✅ Toast bar shrink
        toastbar: {
          "0%": { transform: "scaleX(1)", transformOrigin: "left" },
          "100%": { transform: "scaleX(0)", transformOrigin: "left" },
        },
      },
    },
  },
  plugins: [],
};
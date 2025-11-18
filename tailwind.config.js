/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        success: '#10b981',
        warning: '#f59e0b',
        background: '#f8fafc',
        'card-bg': '#ffffff',
        'text-primary': '#1e293b',
        'text-secondary': '#64748b',
        border: '#e2e8f0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-card-hover': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'gradient-success': 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)',
      },
    },
  },
  plugins: [],
}


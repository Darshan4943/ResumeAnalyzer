/** @type {import('tailwindcss').Config} */
module.exports = {

  plugins: [
    
    require('@tailwindcss/aspect-ratio'),
  ],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      scr1400:'1400px',
      scr1350:'1350px',
      scr1300:'1300px',
    
      scr1250:'1250px',
      scr1200:'1200px',
      scr1150:'1150px',
      scr1100:'1100px',
      scr1024:'1024px',
    },
    colors: {

      'white': '#fff',
      'blue': '#06A9EF',
      'blue-50': '#ebfaff',
      'black': '#333',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#828282',
      'gray-light': '#d3dce6',
      'gray-line': '#646464',
      'light-black' : '#333',
      'shadow-color': 'rgba(0, 0, 0, 0.25)',
      'efficient-back' : '#024e6e',
      'ui-c':'#262626',
      'ui-c2':'#646464'

    },
  
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      Montserrat:['Montserrat', 'sans-serif']
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',

      },
      fontSize:{
        
        '5.5xl':'3.25rem',
        
      },
    }
  }
}
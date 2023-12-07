module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#1E2A3B",
        "weather-secondary": "#004E71",
        'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
        
        "RealBg": "#1E2A3B",
        
      },

      backgoundimage: {
        'sharp': "url('src/assets/sharp.jpg')",
      },
    },


    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
      serif: ['ui-serif', 'Georgia'],
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    container: {
      padding: "20px",
      center: true,
      left: true,
      
    },
    screens: {
      sm: "640px",
      md: "768px",
      big: "1024px",
    },

    backgroundimage: {
      'fog': "url('src/assets/images/fog.png')",
    }


  },
  plugins: [],
};

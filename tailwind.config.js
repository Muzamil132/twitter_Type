/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

 
  mode:'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // transparent: 'transparent',
              'light4':"#657786",
             'light3':"#AAB8C2",
            'light2':"#E1E8ED",
           'light1':"#FAF9F6",
          'dtext1':'#e4e6eb',
         'dtext2':'#b0b3b8',
        'tw-blue':'#1DA1F2',
        'dark-main':'#18191a',
        'dark-second':'#242526',
        'dark-third':'#3a3b3c',
        'tw-white':'#ffffff',
        'tw-border':'#657786'
      },
    },
  },
  plugins: [],
}

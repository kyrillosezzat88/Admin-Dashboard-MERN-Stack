/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#0E9F6E',
        primary_light:'#DEF7EC',
        primary_dark:'#057A55',
        primary_darker:'#046c4e',
        secondary:'#F05252',
        grey_lighter:"#F9FAFB",
        grey_light:'#F4F5F7',
        grey:"#E5E7EB", 
        grey_dark:'#707275'
      }
    },
  },
  plugins: [],
}

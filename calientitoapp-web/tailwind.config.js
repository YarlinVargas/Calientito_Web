/** @type {import('tailwindcss').Config} */

import { colors } from './colors';

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      ringColor: {
        sky500: colors.blue,
        sky700: colors.deepBlue,
        graySilver: colors.lightGreySilver,
      },
      colors: {
        sky700: colors.deepBlue,
        neutral500: colors.gray,
        teal500: colors.turquoise,
        teal400: colors.lightTurquoise,
        neutral700: colors.darkGray,
        blue950: colors.purple,
        amber500: colors.lightOrange,
        orange500: colors.orange,
        neutral400: colors.stoneGray,
        sky500: colors.blue,
        zinc200: colors.lightGray,
        rose600: colors.red,
        indigo600: colors.skyBlue,
        indigo300: colors.pearlGray,
        cyan500: colors.lightBlue,
        cyan400: colors.lightTurquoise,
        paleBlue: colors.paleBlue,
        gray50: colors.snow,
        graySilver: colors.lightGreySilver,
        lightSkyBlue: colors.lightSkyBlue,
        lavenderBlue: colors.lavenderBlue,
        pink: colors.pink,
        yellow2:colors.yellow2,
        primary:'#FF6363',
        secondary:{
          100:'#E2E2D5',
          200:'#888883'
        }
      },
      textColor: {
        sky700: colors.deepBlue,
        teal500: colors.turquoise,
        neutral700: colors.darkGray,
        sky500: colors.blue,
        rose600: colors.red,
        gray1: colors.stoneGray,
        black:colors.black
      },
      backgroundImage: {
        'pacientes': "url('assets/img/fondoPacientes.png')",
        'empresa': "url('assets/img/fondoEmpresa.png')",
        'usuarios': "url('assets/img/fondoUsuarios.png')",
        'password': "url('assets/img/fondoRecuperarPassword.png')",
      },
      width: {
        '100': '28rem',
        '128': '34rem',
      },
      height: {
        '13': '3.25rem',
        '17': '4.5rem',
        '21': '5.8rem',
        '100': '28rem',
        '128': '32rem',
        '129': '36rem',
        '130': '42rem',
        '131': '48rem',
        '132': '56rem',
        '138': '64rem',
        '148': '80rem',
      },
      screens: {
        'sm': '425px',
        'lg': '768px',
        'xl': '1280px',
      },
      padding: {
        '116': '448px',
      },
      space: {
        '116': '448px',
      },
      fontSize: {
        xxs: '0.65rem',
        md: '1.1rem'
      },
      Keyframe: {
        'fade-down': {
          '0%': { transform: '-translate-y-16' },
          '100%': { transform: 'translate-y-0' },
        },
        'fade-left': {
          '0%': { transform: '-translate-x-16' },
          '100%': { transform: 'translate-y-0' },
        },
        'fade-right': {
          '0%': { transform: 'translate-x-16' },
          '100%': { transform: 'translate-y-0' },
        },
      },
      animation: {
        'fade-down': 'fade-down 1s linear',
        'fade-left': 'fade-left 1s linear',
        'fade-right': 'fade-right 1s linear',
      },
    },
  },
  variants: {
    width: ["responsive", "hover", "focus"],
    extend: {},
  },
  safelist: ['animate-[fade-in_1s_ease-in-out]', 'animate-[fade-in-down_1s_ease-in-out]'],
  plugins: [],
}




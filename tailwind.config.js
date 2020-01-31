module.exports = {
  corePlugins: {
    container: false,
    float: false,
    objectFit: false,
    objectPosition: false,
    overflow: false,
    visibility: false,
    zIndex: false,
    fontSmoothing: false,
    lineHeight: false,
    listStyleType: false,
    listStylePosition: false,
    textDecoration: false,
    textColor: false,
    verticalAlign: false,
    whitespace: false,
    wordBreak: false,
    backgroundAttachment: false,
    backgroundPosition: false,
    backgroundRepeat: false,
    backgroundSize: false,
    borderRadius: false,
    flexDirection: false,
    alignSelf: false,
    flexGrow: false,
    flexShrink: false,
    order: false,
    borderCollapse: false,
    tableLayout: false,
    opacity: false,
    appearance: false,
    placeholderColor: false
  },
  theme: {
    screens: {
      sm: { max: '767px' },
      nm: '768px'
    },
    fontFamily: {
      body: ['Source Code Pro', 'monospace']
    },
    textShadow: {
      title: '-0.1875rem -0.1875rem blue',
      page: '-3px -3px blue',
      tweet: '-1px -1px blue',
      'tweet-hover': '-2px -2px blue'
    },
    boxShadow: {
      default: '-1px -1px black'
    },
    letterSpacing: {
      default: '0.15em',
      button: '2px'
    },
    backgroundColor: {
      white: '#fff',
      modal: 'rgb(255, 255, 255, 0.9)'
    },
    borderWidth: {
      tweet: '0.0625rem'
    },
    borderColor: {
      black: '#000'
    },
    transitionProperty: {
      'letter-spacing': 'letter-spacing',
      'text-shadow': 'text-shadow'
    },
    transitionDuration: {
      default: '250ms',
      0: '0ms',
      100: '100ms',
      200: '200ms',
      250: '250ms',
      300: '300ms',
      500: '500ms',
      750: '750ms',
      1000: '1000ms'
    },
    transitionTimingFunction: {
      default: 'ease'
    },
    animations: {
      rainbow: {
        '0%': {
          color: 'rgb(255, 0, 0)'
        },
        '8%': {
          color: 'rgb(255, 127, 0)'
        },
        '16%': {
          color: 'rgb(255, 255, 0)'
        },
        '25%': {
          color: 'rgb(127, 255, 0)'
        },
        '33%': {
          color: 'rgb(0, 255, 0)'
        },
        '41%': {
          color: 'rgb(0, 255, 127)'
        },
        '50%': {
          color: 'rgb(0, 255, 255)'
        },
        '58%': {
          color: 'rgb(0, 127, 255)'
        },
        '66%': {
          color: 'rgb(0, 0, 255)'
        },
        '75%': {
          color: 'rgb(127, 0, 255)'
        },
        '83%': {
          color: 'rgb(255, 0, 255)'
        },
        '91%': {
          color: 'rgb(255, 0, 127)'
        },
        '100%': {
          color: 'rgb(255, 0, 0)'
        }
      }
    },
    animationDuration: {
      default: '1s',
      800: '800ms'
    },
    animationIterationCount: {
      default: 'infinite',
      once: '1',
      infinite: 'infinite'
    },
    extend: {
      fontSize: {
        'title-sm': '4.5vw',
        'title-nm': '2.5rem',
        'subtitle-sm': '1.17em',
        page: '2rem'
      },
      width: {
        '7/10': '70%',
        '8/10': '80%',
        '85/100': '85%',
        95: '95%'
      },
      margin: {
        '1em': '1em',
        button: '0.9375rem'
      },
      padding: {
        button: '0.9375rem 2.8125rem'
      },
      inset: {
        375: '0.375rem'
      }
    }
  },
  variants: {
    letterSpacing: ['responsive', 'hover'],
    textShadow: ['responsive', 'hover']
  },
  plugins: [
    require('tailwindcss-typography')({
      ellipsis: true,
      hyphens: true,
      textUnset: true,
      caps: true,
      nums: true,
      ligatures: true,
      componentPrefix: 'c-'
    }),
    require('tailwindcss-transitions')(),
    require('tailwindcss-animations')()
  ]
};

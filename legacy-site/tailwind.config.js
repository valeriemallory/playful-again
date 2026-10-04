module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: (theme) => {
        return {
          DEFAULT: {
            css: {
              a: {
                color: theme(`colors.blue.500`),
                textDecoration: null,
                "&:hover": {
                  textDecoration: `underline`,
                },
              },
              "code::before": null,
              "code::after": null,
              "blockquote p:first-of-type::before": null,
              "blockquote p:last-of-type::after": null,
            },
          },
        }
      },
      colors: {
        black: '#000',
        white: '#fff',
      },
    },
    container: {
      padding: '1rem'
    },
    fontFamily: {
      sans: [
        'Open Sans',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#213D77',
                primaryHover: '#2d5099',
                primaryDisabled: '#2d5099BF',
                secondary: '#9EA3AE',
                secondarySoftTrans: '#00092980',
                cadetBlue: '#A0AEC0',
                bgSoft: '#F3F7FF',
                link: '#1E86FF',
                softBlue: '#6192F8',
                borderPrimary: '#E5E5E5',
                bgNegative: '#FF0000',
                bgWarningBadge: '#FDF6B2',
                textWarningBadge: '#705700',
            },
            container: {
                center: true,
                padding: '2rem',
                screens: {
                    sm: '100%',
                    md: '100%',
                    lg: '1120px',
                    xl: '1280px',
                    '2xl': '1366px',
                    '3xl': '1440px',
                },
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
        },
    },
    // eslint-disable-next-line no-undef
    plugins: [require('daisyui')],
    daisyui: {
        themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
        darkTheme: 'light', // name of one of the included themes for dark mode
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
        prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    },
};

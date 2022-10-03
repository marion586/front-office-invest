/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            container: {
                center: true,
                screens: {
                    xl: '1280px',
                    // '2xl': '1280px',
                },
                padding: {
                    DEFAULT: '20px',
                    md: '20px',
                    lg: '30px',
                },
            },
        },
    },
    plugins: [],
};

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
            'landscape': { 'raw': '(orientation: landscape) and (max-height: 500px)' },
        },
        extend: {
            colors: {
                primary: "#D0323A",
                primaryDark: "#9F2743",
                gold: "#F6A016",
                yellow: "#F9DC00",
            },
        },
    },
    plugins: [],
};

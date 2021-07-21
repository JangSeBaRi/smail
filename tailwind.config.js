module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            minHeight: {
                "list": "calc(100vh - 117px)",
            },
            maxHeight: {
                "mail-list": "calc(100vh - 220px)",
            },
            backgroundImage: (theme) => ({
                background: "url('/winter.jpg')",
            }),
        },
    },
    plugins: [],
};

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("app-theme");
        if (savedTheme) {
            setTheme(savedTheme);
            document.body.className = savedTheme;
        }
    }, []);

    // Update body class and localStorage whenever theme changes
    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem("app-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    // Provide both naming conventions for flexibility
    const darkMode = theme === "dark";
    const toggleDarkMode = toggleTheme;

    return (
        <ThemeContext.Provider value={{
            theme,
            toggleTheme,
            darkMode,
            toggleDarkMode
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
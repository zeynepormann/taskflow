import { type ReactNode, useEffect, useState } from "react";
import { ThemeContext, type Theme } from "@/context/theme-context";

type ThemeProviderProps = {
    children : ReactNode;
    
};

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() =>
        localStorage.getItem("taskflow:theme") === "dark" ? "dark" : "light",
    );

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            theme === "dark",
        );
        localStorage.setItem("taskflow:theme", theme);
    }, [theme]);

    function toggleTheme() : void {
        setTheme ((currentTheme) => {
            if (currentTheme === "light"){
             return "dark"
            }

            return "light";
        });
    }

    return (
        <ThemeContext.Provider value = {{theme, toggleTheme}} >
            {children}
        </ThemeContext.Provider>
    );
}


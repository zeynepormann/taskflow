import {
    createContext,
    type ReactNode,
    useState,
    useContext,
    useEffect,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue ={
    theme : Theme;
    toggleTheme: () => void;
};

type ThemeProviderProps = {
    children : ReactNode;
    
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            theme === "dark",
        );
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

export function useTheme (): ThemeContextValue{
    const context = useContext(ThemeContext);

    if (context === undefined){
        throw new Error ("useTheme, ThemeProvider içinde kullanılmalıdır.");
    }
    
    return context;
}

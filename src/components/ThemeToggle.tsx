import { useTheme } from '../context/ThemeContext'
import {Moon, Sun} from "lucide-react"

function ThemeToggle(){
    const {theme, toggleTheme} = useTheme();

    return (
        <button 
         type = "button"
        onClick={toggleTheme}
        aria-label={
            theme === "light"
            ? "Koyu temaya geç"
            : "Açık temaya geç"
        }
        aria-pressed = {theme === "dark"}
        className="
            relative h-10 w-20 cursor-pointer rounded-full 
            border border-border bg-muted p-1
            transition-all duration-200 ease-out
            hover:-translate-x-0.5 hover:-translate-y-0.5
            hover:border-primary
            hover:shadow-[4px_4px_0_var(--primary)]
            active:translate-x-0 active:translate-y-0
            active:scale-95 active:shadow-none
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-indigo-500 focus-visible:ring-offset-2
            focus-visible:ring-offset-background
            "
        >
         <span 
            className={` absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${
                theme === "dark" ? "translate-x-10" : "translate-x-0"
            }`} 
        >
            {theme === "light" ? (
                    <Sun className="h-5 w-5 text-blue-500" aria-hidden="true" />
            ) : (
                    <Moon className="h-5 w-5 text-blue-800" aria-hidden="true" />
            )
        }
         </span>   
        </button>
    );
}

export default ThemeToggle
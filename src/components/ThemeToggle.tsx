import { useTranslation } from "react-i18next";
import { useTheme } from '../context/ThemeContext'
import {Moon, Sun} from "lucide-react"
import { Button } from "@/components/ui/button";

function ThemeToggle(){
  const { t } = useTranslation("common");
    const {theme, toggleTheme} = useTheme();

    return (
        <Button
         type = "button"
        onClick={toggleTheme}
        aria-label={
            theme === "light"
            ? t("darkTheme")
            : t("lightTheme")
        }
        aria-pressed = {theme === "dark"}
        variant="outline"
        className="relative h-10 w-20 rounded-full p-1"
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
        </Button>
    );
}

export default ThemeToggle

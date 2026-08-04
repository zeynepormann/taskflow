import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher(){
    const { i18n } = useTranslation();

    const currentLanguage = i18n.resolvedLanguage ?? i18n.language;

    const isTurkish = currentLanguage.startsWith("tr");

    function handleLanguageChange(): void{

        const nextLanguage = isTurkish ? "en" : "tr";

        void i18n.changeLanguage(nextLanguage);    
    }
    return (
      <button
        type="button"
        onClick={handleLanguageChange}
        aria-label={isTurkish ? "İngilizceye geç" : "Türkçeye geç"}
        className="
            flex items-center justify-around
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
            focus-visible:ring-offset-background "
      >
        <Languages
            size={18}
            aria-hidden="true"
        />
        <span>
            {isTurkish ? "EN" : "TR"}
        </span>
      </button>
    );
}
export default LanguageSwitcher;
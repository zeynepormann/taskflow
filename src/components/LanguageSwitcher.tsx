import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

type LanguageCode = "tr" | "en";

interface LanguageOption {
  code: LanguageCode;
  label: string;
  ariaLabel: string;
}

const TurkishLanguage: LanguageOption = {
    code: "tr",
    label: "TR",
    ariaLabel: "Türkçeye geç",
};

const EnglishLanguage: LanguageOption = {
    code: "en",
    label: "EN",
    ariaLabel: "İngilizceye geç",
};

function LanguageSwitcher(){
    const { i18n } = useTranslation();

    const nextLanguage: LanguageOption = 
        i18n.language === TurkishLanguage.code
            ? EnglishLanguage
            : TurkishLanguage;

    function handleLanguageChange(): void {
        void i18n.changeLanguage(
            nextLanguage.code,
        );
    }
    return (
      <button
        type="button"
        onClick={handleLanguageChange}
        aria-label={nextLanguage.ariaLabel}
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
        <span>{nextLanguage.label}</span>
      </button>

    );
}
export default LanguageSwitcher;
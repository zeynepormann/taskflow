import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

type LanguageCode = "tr" | "en";

interface LanguageOption {
  code: LanguageCode;
  label: string;
  ariaLabel: string;
}

const TurkishLanguage: LanguageOption = {
    code: "tr",
    label: "TR",
    ariaLabel: "common:switchTurkish",
};

const EnglishLanguage: LanguageOption = {
    code: "en",
    label: "EN",
    ariaLabel: "common:switchEnglish",
};

function LanguageSwitcher(){
    const { t, i18n } = useTranslation();

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
      <Button
        type="button"
        onClick={handleLanguageChange}
        aria-label={t(nextLanguage.ariaLabel)}
        variant="outline"
        className="h-10 w-20 justify-around"
      >
        <Languages
            size={18}
            aria-hidden="true"
        />
        <span>{nextLanguage.label}</span>
      </Button>

    );
}
export default LanguageSwitcher;

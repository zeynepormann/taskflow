import LanguageSwitcher from "../components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import {Outlet} from "react-router-dom"
import ThemeToggle from "../components/ThemeToggle"

function AuthLayout(){
  const { t } = useTranslation("common");
    return(
        <div className="min-h-dvh bg-background text-foreground transition-colors duration-300 lg:grid lg:grid-cols-[42%_58%]">
            <section className="hidden bg-brand px-16 py-16 text-brand-foreground transition-colors duration-300 lg:flex lg:flex-col">
                <p className="text-4xl font-semibold">
                    TaskFlow
                </p>
            
                <div className="my-auto max-w-118">
                    <p className="text-6xl font-semibold leading-tight">
                    {t("common:heroLine1")}
                    <br />
                    {t("common:heroLine2")}
                    </p>

                    <p className="mt-5 max-w-110 text-base leading-7 text-brand-muted">
                    {t("heroDescription")}
                    </p>
                </div>
            </section>

            <main className="relative flex min-h-dvh items-center justify-center p-6 sm:p-8">
                <div className="absolute right-6 top-6 flex items-center gap-3 sm:right-8 sm:top-8">
                    <LanguageSwitcher />
                    <ThemeToggle /> 
                </div>

                <Outlet /> 
                
            </main>
        </div>
    )
}
export default AuthLayout

import {Outlet} from "react-router-dom"
import ThemeToggle from "../components/ThemeToggle"

function AuthLayout(){
    return(
        <div className="min-h-dvh bg-background text-foreground transition-colors duration-300 lg:grid lg:grid-cols-[42%_58%]">
            <section className="hidden bg-brand px-16 py-16 text-brand-foreground transition-colors duration-300 lg:flex lg:flex-col">
                <p className="text-4xl font-semibold">
                    TaskFlow
                </p>
            
                <div className="my-auto max-w-118">
                    <p className="text-6xl font-semibold leading-tight">
                    İşlerinizi birlikte,
                    <br />
                    daha akıllı yönetelim.
                    </p>

                    <p className="mt-5 max-w-110 text-base leading-7 text-brand-muted">
                    Projelerinizi planlayın, görevlerinizi takip edin ve 
                    ekip ilerlemesini tek bir yerde görün.
                    </p>
                </div>
            </section>

            <main className="relative flex min-h-dvh items-center justify-center p-6 sm:p-8">
                <div className="absolute right-6 top-6 sm:right-8 sm:top-8">
                    <ThemeToggle /> 
                </div>

                <Outlet /> 
                
            </main>
        </div>
    )
}
export default AuthLayout
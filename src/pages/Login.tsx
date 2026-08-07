import { useState } from "react";
import { EyeClosed, Eye } from "lucide-react";
import Card from "../components/card/Card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginSchema, type LoginFormValues } from "../schema/loginSchema";

function Login() {
  const [visible, setVisible] = useState(false);
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  async function onSubmit(data: LoginFormValues): Promise<void> {
    const success = await login({
      username: data.username,
      password: data.password,
    });

    if (success) {
      navigate("/dashboard");
    }
  }

  return (
    <Card className="w-full max-w-170 p-8 sm:p-10">
      <h1 className="text-4xl font-semibold">Hoşgeldiniz</h1>
      <p className="mt-2 text-2xl leading-6 text-muted-foreground">
        Devam etmek için hesabınıza giriş yapın.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div>
          <label htmlFor="username" className="mb-2 block text-2xl font-medium">
            E-posta veya Kullanıcı adı
          </label>

          <input
            id="username"
            type="text"
            autoComplete="username"
            placeholder="Kullanıcı adınızı girin"
            {...register("username")}
            className="
                            h-12 w-full rounded-2xl border border-border
                            bg-input px-4 text-foreground
                            placeholder:text-muted-foreground
                            outline-none transition-colors
                            focus:border-ring focus:ring-2 focus:ring-ring
                        "
          />
          {errors.username?.message && (
            <p className="mt-2 text-sm text-red-300">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="self-center mb-2 block text-2xl font-medium"
          >
            Şifre
          </label>
          <div className="relative">
            <input
              id="password"
              type={visible ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Şifrenizi girin"
              {...register("password")}
              className="
                            
                            h-12 w-full rounded-2xl border border-border
                            bg-input px-4 text-foreground
                            placeholder:text-muted-foreground
                            outline-none transition-colors
                            focus:border-ring focus:ring-2 focus:ring-ring"
            ></input>
            <div
              className="cursor-pointer absolute right-3.5 top-3"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <Eye /> : <EyeClosed />}
            </div>
          </div>

          {errors.password?.message && (
            <p className="mt-2 text-sm text-red-300">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="
                            h-12 w-full cursor-pointer rounded-2xl
                            bg-primary px-4 text-2xl font-semibold
                            text-primary-foreground
                            transition-all duration-300
                            hover:bg-primary-hover
                            active:scale-[0.98]
                            focus-visible:outline-none focus-visible:ring-2
                            focus-visible:ring-ring focus-visible:ring-offset-2
                            focus-visible:ring-offset-card
                            disabled:cursor-not-allowed disabled:opacity-60
                        "
          >
            {loading ? "Giriş yapılıyor.." : "Giriş yap"}
          </button>
          {error && (
            <p className="mt-3 text-sm text-red-500" role="alert">
              {error}
            </p>
          )}
        </div>
      </form>
    </Card>
  );
}
export default Login;

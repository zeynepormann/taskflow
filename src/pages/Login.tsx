import { useTranslation } from "react-i18next";
import { useState } from "react";
import { EyeClosed, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginSchema, type LoginFormValues } from "../schema/loginSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Login() {
  const { t } = useTranslation("common");
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
      <h1 className="text-4xl font-semibold">{t("common:welcome")}</h1>
      <p className="mt-2 text-2xl leading-6 text-muted-foreground">
        {t("common:loginDescription")}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <div>
          <label htmlFor="username" className="mb-2 block text-2xl font-medium">
            {t("common:usernameLabel")}
          </label>

          <Input
            id="username"
            type="text"
            autoComplete="username"
            placeholder={t("common:usernamePlaceholder")}
            {...register("username")}
            className="h-12 rounded-xl"
          />
          {errors.username?.message && (
            <p className="mt-2 text-sm text-red-300">
              {t(errors.username.message)}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="self-center mb-2 block text-2xl font-medium"
          >
            {t("common:password")}
          </label>
          <div className="relative">
            <Input
              id="password"
              type={visible ? "text" : "password"}
              autoComplete="current-password"
              placeholder={t("common:passwordPlaceholder")}
              {...register("password")}
              className="h-12 rounded-xl"
            />
            <Button type="button" aria-label={t(visible ? "hidePassword" : "showPassword")}
              variant="ghost" size="icon-sm" className="absolute right-2 top-2"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <Eye /> : <EyeClosed />}
            </Button>
          </div>

          {errors.password?.message && (
            <p className="mt-2 text-sm text-red-300">
              {t(errors.password.message)}
            </p>
          )}
        </div>

        <div>
          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="h-12 w-full text-base"
          >
            {loading ? t("signingIn") : t("signIn")}
          </Button>
          {error && (
            <p className="mt-3 text-sm text-red-500" role="alert">
              {t(error)}
            </p>
          )}
        </div>
      </form>
    </Card>
  );
}
export default Login;

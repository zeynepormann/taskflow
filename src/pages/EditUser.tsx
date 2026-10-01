import { useTranslation } from "react-i18next";
import { useUserQuery } from "../hooks/useUserQuery"
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import { useUpdateUserMutation } from "../hooks/useUpdateUserMutation"
import { editUserSchema, type EditUserFormValues } from "../schema/editUserSchema"
import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function EditUser(){
  const { t } = useTranslation("common");
    const navigate = useNavigate();

    const { id } = useParams();

    const userId = Number(id);

    const { data: selectedUser,isPending,isError } = useUserQuery(userId);

    const updateUserMutation = useUpdateUserMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting, isDirty},
    } = useForm<EditUserFormValues>({
        resolver: zodResolver(editUserSchema),

        defaultValues: {
            firstname: "",
            lastname: "",
            username:"",
            email:"",
        },
    });

    useEffect(() => {
        if (!selectedUser){
            return;
        }
        reset({
            firstname: selectedUser.firstName,
            lastname: selectedUser.lastName,
            username: selectedUser.lastName,
            email: selectedUser.email,
        });
    }, [selectedUser, reset]);

    async function onSubmit(data:EditUserFormValues):Promise<void> {
        try{
            await updateUserMutation.mutateAsync({
                id: userId,
                values: data,
            });
            navigate("/users");
        } catch {}
    }

    if (isPending){
        return <p>{t("loading")}</p>
    }
    
    if (isError){
        return <p>{t("loadError")}</p>
    }

    if(!selectedUser){
        return <p>{t("userNotFound")}</p>
    }

    return (
      <div className="w-full px-50 py-4">
        <Card>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mt-6 space-y-5 mx-6"
          >
          <div className="flex flex-row items-start gap-4">
            <div className="flex-1">
              <label htmlFor="firstname" className="mb-2 block font-medium">
                {t("common:firstName")}
              </label>
              <Input
                id="firstname"            
                {...register("firstname")}
                className="h-10"
              />
              {errors.firstname?.message && (
                <p className="mt-2 text-sm text-red-500">
                  {t(`users:${errors.firstname.message}`)}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label htmlFor="lastname" className="mb-2 block font-medium">
                {t("common:lastName")}
              </label>
              <Input
                id="lastname"
                {...register("lastname")}
                className="h-10"
              />
              {errors.lastname?.message && (
                <p className="mt-2 text-sm text-red-500">
                  {t(`users:${errors.lastname.message}`)}
                </p>
              )}
            </div>
          </div>
            <div>
              <label htmlFor="username" className="mb-2 block font-medium">
                {t("common:username")}
              </label>
              <Input
                {...register("username")}
                className="h-10"
              />
              {errors.username?.message && (
                <p className="mt-2 text-sm text-red-500">
                  {t(`users:${errors.username.message}`)}
                </p>
              )}
            </div>
            <div> 
              <label htmlFor="email" className="mb-2 block font-medium">
                {t("email")}
              </label>
              <Input
                id="email"
                {...register("email")}
                className="h-10"
              />
              {errors.email?.message && (
                <p className="mt-2 text-sm text-red-500">
                  {t(`users:${errors.email.message}`)}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 mb-4">
              <Button
                type="button"
                onClick={() => navigate("/users")}
                variant="outline"
              >
                {t("common:cancel")}
              </Button>
              <Button
                type="submit"
                disabled={!isDirty || isSubmitting}
              >
                {isSubmitting ? t("saving") : t("save")}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
}
export default EditUser;

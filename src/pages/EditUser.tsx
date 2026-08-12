import { useUserQuery } from "../hooks/useUserQuery"
import { zodResolver } from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import { useUpdateUserMutation } from "../hooks/useUpdateUserMutation"
import { editUserSchema, type EditUserFormValues } from "../schema/editUserSchema"
import { useEffect } from "react"
import Card from "../components/card/Card"
import { useParams, useNavigate } from "react-router-dom"

function EditUser(){
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
        return <p>User Loading</p>
    }
    
    if (isError){
        return <p>{isError}</p>
    }

    if(!selectedUser){
        return <p>User bulunamadı</p>
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
                Ad
              </label>
              <input
                id="firstname"            
                {...register("firstname")}
                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground outline-none 
                                    focus:border-ring focus:ring-2 focus:ring-ring"
              />
              {errors.firstname?.message && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.firstname.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <label htmlFor="lastname" className="mb-2 block font-medium">
                Soyad
              </label>
              <input
                id="lastname"
                {...register("lastname")}
                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground outline-none 
                                    focus:border-ring focus:ring-2 focus:ring-ring"
              />
              {errors.lastname?.message && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>
            <div>
              <label htmlFor="username" className="mb-2 block font-medium">
                Kullanıcı Adı
              </label>
              <input
                {...register("username")}
                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground outline-none 
                                    focus:border-ring focus:ring-2 focus:ring-ring"
              />
              {errors.username?.message && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div> 
              <label htmlFor="email" className="mb-2 block font-medium">
                Email
              </label>
              <input
                id="email"
                {...register("email")}
                className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground outline-none 
                                    focus:border-ring focus:ring-2 focus:ring-ring"
              />
              {errors.email?.message && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 mb-4">
              <button
                type="button"
                onClick={() => navigate("/users")}
                className="rounded-xl border border-border px-5 py-3 transition-colors hover:bg-muted cursor-pointer "
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={!isDirty || isSubmitting}
                className="rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground
                              cursor-pointer transition-colors hover:bg-primary/90 duration-300"
              >
                {isSubmitting ? "Kaydediliyor" : "Kaydet"}
              </button>
            </div>
          </form>
        </Card>
      </div>
    );
}
export default EditUser;
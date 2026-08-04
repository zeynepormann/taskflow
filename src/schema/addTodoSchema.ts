import {z} from "zod"

export const addTodoSchema = z.object({
  todo: z
    .string()
    .trim()
    .min(1, "Görev açıklaması zorunludur"),

  dueDate: z
    .string()
    .min(1, "Son tarih zorunludur"),

  completed: z.boolean(),
});

export type AddTodoFormValues = z.infer<typeof addTodoSchema>
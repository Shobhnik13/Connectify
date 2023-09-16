import * as z from "zod"

export const postValidation = z.object({
   post:z.string().nonempty().min(3,{message:'min 3 characters'}),
    accountId:z.string()
  })
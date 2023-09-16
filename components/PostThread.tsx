'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import Image from "next/image"
import { Textarea } from "./ui/textarea"
import { ChangeEvent, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { postValidation } from "@/lib/validation/post"

// interface Props{
//     userId:string
// }
const PostThread = ({userId}:{userId:string}) => {
  const router=useRouter()
  const pathname=usePathname()
  // defining form 
  const form = useForm<z.infer<typeof postValidation>>({
    resolver: zodResolver(postValidation),
    defaultValues: {
     post:"",
     accountId:userId,
    },
  })
  return (
   <p>post thread</p>
  )
  }
export default PostThread
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
import { createPost } from "@/lib/actions/post.actions"

interface Props{
    userId:string
}


const PostThread = ({userId}:Props) => {
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
  //on submit
  const onSubmit=async(values: z.infer<typeof postValidation>) =>{
      await createPost({
        text:values.post,
        author:userId,
        communityId:null,
        path:pathname,
      })
      //after success 
      router.push('/')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex flex-col justify-start gap-10">
        
        {/* post  */}
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            // this FormItem wil contain formlable and a formcontrol(input) which will be in row
            <FormItem className="flex flex-col justify-center gap-3 w-full">
              {/* FormLabel */}
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              
             {/* formcontrol */}
              <FormControl className="nofocus">
                <Textarea
                rows={15}
                placeholder="Hola amigo!"
                className="account-form_input no-focus"
                {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      <Button type="submit" className='font-semibold bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-300'>Post</Button>
      </form>
    </Form>
  )
  }
export default PostThread
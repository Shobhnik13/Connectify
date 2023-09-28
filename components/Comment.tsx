'use client'
import { z } from "zod"
import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form"
import { Input } from "./ui/input"
import { useForm } from "react-hook-form"
import { usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { commentValidation } from "@/lib/validation/post"
import Image from "next/image"
import { addCommentToPost } from "@/lib/actions/post.actions"

interface Props{
    postId:string,
    currentUserImg:string,
    currentUserId:string,
}

const Comment = ({postId,currentUserImg,currentUserId}:Props) => {
    const router=useRouter()
    const pathname=usePathname()
    // defining form 
    const form = useForm<z.infer<typeof commentValidation>>({
      resolver: zodResolver(commentValidation),
      defaultValues: {
       post:"",
      },
    })
    //on submit
    const onSubmit=async(values: z.infer<typeof commentValidation>) =>{
        await addCommentToPost(postId,values.post,JSON.parse(currentUserId),pathname)
        //after success 
        form.reset()
    }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
      
      {/* post  */}
      <FormField
        control={form.control}
        name="post"
        render={({ field }) => (
          // this FormItem wil contain formlable and a formcontrol(input) which will be in row
          <FormItem className="flex items-center justify-center gap-3 w-full">
            {/* FormLabel */}
            <FormLabel className="text-base-semibold text-light-2">
                <Image src={currentUserImg} alt="Profile image" width={48} height={48} className="rounded-full object-cover"/>
            </FormLabel>
            
           {/* formcontrol */}
            <FormControl className="border-none bg-transparent">
              <Input type="text" placeholder="Comment.." className="no-focus text-light-1 outline-none"/>
            </FormControl>
          </FormItem>
        )}
      />
    <Button type="submit" className='font-semibold bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-300 rounded-3xl'>Reply</Button>
    </form>
  </Form>
  )
}

export default Comment




//what is difference bw post.create(await use then await save working) and new post(no await use and then await save working) when its promise so we can use 
//await post.create([bla bla])-> await save yes
//post.create({bla bla})-> no await save (error)
//await new post({bla bla}) -> awai save yes
//new post({bla bla})-> await save yes
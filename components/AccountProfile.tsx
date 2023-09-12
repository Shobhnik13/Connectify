'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { userValidation } from "@/lib/validation/user"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import Image from "next/image"
import { Textarea } from "./ui/textarea"
import { ChangeEvent, useState } from "react"
import { isBase64Image } from "@/lib/utils"
import { useUploadThing } from '@/lib/uploadthing'
interface props{
    user:{
        id:string,
        objectId:string,
        username:string,
        name:string,
        bio:string,
        image:string,
    },
    btnTitle:string,
}
const AccountProfile = ({user,btnTitle}:props) => {

  const {startUpload}=useUploadThing('media')
  const [files,setFiles]=useState<File[]>([])
  // defining form 
  const form = useForm<z.infer<typeof userValidation>>({
    resolver: zodResolver(userValidation),
    defaultValues: {
      profile_photo:user?.image || '',
      name:user?.name || '',
      username:user?.username || '',
      bio:user?.bio || "",
    },
  })
  const handleImage=(e:ChangeEvent<HTMLInputElement>,fieldChange:(value:string)=>void)=>{
    e.preventDefault()
    // for reading file create a new instance of filereader 
    const fileReader=new FileReader()
    //now check does file exists
    //fetch from the files state by using e->change event which can get html input elements also
    //as files state will contain html updated files
    if(e.target.files && e.target.files.length>0){
        const file=e.target.files[0];
        //setting all the files in the files state by getting the 0th element from files and converting an array from it by using Array.from(e.target.files)
        setFiles(Array.from(e.target.files));

        //if file we extracted from files[0] do not include any type called image->!file.type.includes(image)
        //then no need to perform anything just return 
        if(!file.type.includes('image')) return;
        //if file(extracted from e.target.files[0]) type includes type image then do some shit  
        //filereader will read the result of e.target and convert to string
        fileReader.onload=async(event)=>{
            const imageUrl=event.target?.result?.toString() || '';
            //now just change the field value that is rendering the form label below in form
            //this can be done by using fielChange(imageurl)
            //this will update te image url in the field and at time of rendering this will shiow up
            //whenever we wil use field.value this shows up
            fieldChange(imageUrl)
        }
        //now just read the change
        fileReader.readAsDataURL(file)
      }
  }
  const onSubmit=async(values: z.infer<typeof userValidation>) =>{
    // value from an image we get is called a blob 
    //the initial value would be a google image url
    const blob=values.profile_photo
    // this func wil tell whether the image is changed or not,it will take the val of img ie blob as parameter and tell that is image changed 
    const hasImageChanged=isBase64Image(blob)
    //as when we initially come the photo ould be a google image
    //so we chaneg the image 
    // so this func will tell the image is changed or not 
    //so when hasimagechanged would be true it means image is changed from initial
    //so we need to update the image by uploading it 
    //we will use upload thing 
    if(hasImageChanged){
      //uploading 
      const imgRes=await startUpload(files)
      //if uploaded success
      //then img res would be existing
      if(imgRes && imgRes[0].fileUrl){
        //now setting the values.profile_photo with imgres[0].fileurl which comes on succeed startupload
        values.profile_photo=imgRes[0].fileUrl
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">
        {/* 1->image  */}
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            // this FormItem wil contain formlable and a formcontrol(input) which will be in row
            <FormItem className="flex items-center gap-4">
              {/* FormLabel */}
              <FormLabel className="account-form_image-label">
                {field.value?(<Image src={field.value} width={94} height={94} alt="profile_photo" priority className="rounded-full object-contain"/>):(
                  <Image src={'/assets/profile.svg'} alt="profile_photo" width={24} height={24} className="rounded object-contain"/>
                )}
              </FormLabel>
              
             {/* formcontrol */}
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                type="file"
                accept="image/*"
                placeholder="Upload a photo"
                className="account-form_image-input"
                onChange={(e)=>handleImage(e,field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* 2->name  */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            // this FormItem wil contain formlable and a formcontrol(input) which will be in row
            <FormItem className="flex flex-col justify-center gap-3 w-full">
              {/* FormLabel */}
              <FormLabel className="text-base-semibold text-light-2">
                Name
              </FormLabel>
              
             {/* formcontrol */}
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                type="text"
                placeholder="John doe"
                className="account-form_input no-focus"
                {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* 3->username  */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            // this FormItem wil contain formlable and a formcontrol(input) which will be in row
            <FormItem className="flex flex-col justify-center gap-3 w-full">
              {/* FormLabel */}
              <FormLabel className="text-base-semibold text-light-2">
                Username
              </FormLabel>
              
             {/* formcontrol */}
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                type="text"
                placeholder="John007"
                className="account-form_input no-focus"
                {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* 4->bio  */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            // this FormItem wil contain formlable and a formcontrol(input) which will be in row
            <FormItem className="flex flex-col justify-center gap-3 w-full">
              {/* FormLabel */}
              <FormLabel className="text-base-semibold text-light-2">
                Bio
              </FormLabel>
              
             {/* formcontrol */}
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Textarea
                rows={10}
                placeholder="Hey! I am a frontend dev...."
                className="account-form_input no-focus"
                {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {/* btn  */}
        <Button type="submit" className="font-semibold bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-300">Submit</Button>
      </form>
    </Form>
  )
}

export default AccountProfile
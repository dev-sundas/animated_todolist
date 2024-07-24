"use client"
import { RegisterFormSchema, RegisterFormType } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Playball } from 'next/font/google';
import { Checkbox } from './ui/checkbox';
import Link from 'next/link';
const play = Playball({
    weight: "400",
    subsets: ["latin"],
  });

export interface IRegisterFormProps {
}

export default function RegisterForm (props: IRegisterFormProps) {
    const form = useForm<RegisterFormType>({
        resolver:zodResolver(RegisterFormSchema),
    });

   const addUser = async (data: RegisterFormType) => {  
    if (data.password == data.confirmPassword) {
        try {
            const res = await fetch("api/registerUser", {
              method: "POST",
              headers: { "Content-Type": "application/json" }, // Include headers to indicate JSON payload
              body: JSON.stringify({ email: data.email, password: data.password , username: data.username, confirmPassword: data.confirmPassword}),
            });
        
            if (!res.ok) {
              // Check if the response is not successful
              console.error("Failed to register user:", res.status, res.statusText);
              alert("Failed to register user. Please check your credentials.");
              return;
            }
        
            const response = await res.json();
            console.log(response);
            alert(response.message);
          } catch (error) {
            console.error("Error during register:", error);
            alert("An error occurred during register. Please try again.");
          }
        };
    }
  
    

    const OnSubmit = (data: RegisterFormType) => {
        console.log(data);
        addUser(data)
    }
  return (
    <div >
        <div className='flex items-center justify-center w-[100%] h-[100vh]'>
        <Card className='w-[500px] bg-transparent  backdrop-blur-md rounded-md border-[1px]'>
            <CardContent className='flex flex-col my-8'>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(OnSubmit)}>
            <span className={`${play.className} text-[32px] flex text-center justify-center font-bold hover:underline`}>
                <h1 className={`${play.className} text-[#621940] `}>Sign</h1>
               <h1 className={`${play.className} text-[#0b032d]`}>Up</h1></span>
                <FormField control={form.control} name='username' render={({field})=>(
                    <FormItem className='my-5'>
                        <FormControl>
                            <Input {...field} type='text' placeholder='Enter your username' required/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                 <FormField control={form.control} name='email' render={({field})=>(
                    <FormItem className='my-5'>
                        <FormControl>
                            <Input {...field} type='email' placeholder='Enter your email' required/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                 <FormField control={form.control} name='password' render={({field})=>(
                    <FormItem className='my-5'>
                        <FormControl>
                            <Input {...field} type='password' placeholder='Enter your password' required/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                 <FormField control={form.control} name='confirmPassword' render={({field})=>(
                    <FormItem className='my-5'>
                        <FormControl>
                            <Input {...field} type='password' placeholder='Enter your ConfirmPassword' required/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <div className='flex justify-between'>
                <FormField control={form.control} name='remember' render={({field})=>(
                    <FormItem className='flex items-center gap-1'>
                        <FormControl>
                        <Checkbox
                        className='mt-2'
                        checked={field.value}
                         onCheckedChange={(checked: boolean) => field.onChange(checked)}
                            />
                        </FormControl>
                        <FormLabel>Remember me</FormLabel>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <Link href={"/forgotpassword"}>Forgot Password?</Link>
                </div>
                <Button type="submit" className='flex justify-center items-center w-full font-bold mt-8'>SignUp</Button>
            </form>
        </Form>
            </CardContent>
        </Card>
        </div>
    </div>
  );
}
function elif(arg0: boolean) {
    throw new Error('Function not implemented.');
}


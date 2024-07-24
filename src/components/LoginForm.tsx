"use client"
import { LoginFormSchema, LoginFormType } from '@/lib/types';
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

export interface IloginFormProps {
}

export default function loginForm (props: IloginFormProps) {
    const form = useForm<LoginFormType>({
        resolver:zodResolver(LoginFormSchema),
    });

    

    const addUser = async (data: LoginFormType) => {
        try {
          const res = await fetch("api/loginUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // Include headers to indicate JSON payload
            body: JSON.stringify({ email: data.email, password: data.password }),
          });
      
          if (!res.ok) {
            // Check if the response is not successful
            console.error("Failed to login user:", res.status, res.statusText);
            alert("Failed to login user. Please check your credentials.");
            return;
          }
      
          const response = await res.json();
          console.log(response);
          alert(response.message);
        } catch (error) {
          console.error("Error during login:", error);
          alert("An error occurred during login. Please try again.");
        }
      };
      
    const OnSubmit = (data: LoginFormType) => {
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
               <h1 className={`${play.className} text-[#0b032d]`}>In</h1></span>
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
                <Button type="submit" className='flex justify-center items-center w-full font-bold mt-8'>SignIn</Button>
            </form>
        </Form>
            </CardContent>
        </Card>
        </div>
    </div>
  );
}

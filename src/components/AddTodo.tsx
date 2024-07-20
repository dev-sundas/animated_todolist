"use client"
import * as React from 'react';
import { TodoFormType, TodoSchema, todoType } from '@/lib/types';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { useState } from 'react';
import { todolist } from '@/lib/db';
import { motion } from "framer-motion"
import { Button } from './ui/button';
import {Loader2 } from 'lucide-react';
import { boolean } from 'drizzle-orm/mysql-core';


type Props = {
    addTodo: (data: TodoFormType) => void
    value?: string
}

const Todolist: todoType[] = todolist

export default function AddTodo({ addTodo, value = "" }: Props) {
    const[isloding, setIsloding] = useState(false)
    const form = useForm<TodoFormType>({
        resolver: zodResolver(TodoSchema),
        defaultValues: {
            title: "",
            status: false
        }
    })
   
    const OnSubmit = (data: TodoFormType) => {
        addTodo(data);
        setIsloding(true)
        form.reset({ title: "", status: false });
        setTimeout(() => {  setIsloding(false) }, 2000);
    };



    return (
        <div>
            <Form {...form}>
                <motion.form
                    onSubmit={form.handleSubmit(OnSubmit)}
                    className='flex items-center'
                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2, delay: 2 }}>
                    <div className='w-[85%]'>
                        <FormField control={form.control} name="title" render={({field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        value={field.value}
                                        onChange={(e)=> field.onChange(e.currentTarget.value)}
                                        placeholder='Enter your task'
                                        type='text' required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className='w-[10%]  m-auto'>
                        {isloding ? 
                        <Button type='submit' disabled><Loader2 className='animate'/></Button> :
                         <Button type='submit'>Add</Button>}
                    </div>
                </motion.form>
            </Form>

        </div>
    );
}

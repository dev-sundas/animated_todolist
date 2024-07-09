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
import ViewTodo from './ViewTodo';
import { Checkbox } from './ui/checkbox';


type Props = {
    addTodo: (data: TodoFormType) => void
    value?: string
}

const Todolist: todoType[] = todolist

export default function AddTodo({ addTodo, value = "" }: Props) {
    const form = useForm<TodoFormType>({
        resolver: zodResolver(TodoSchema)
    })

    const OnSubmit = (data: TodoFormType) => {
        addTodo(data);
        form.reset();
    };



    return (
        <div>
            <Form {...form}>
                <motion.form
                    onSubmit={form.handleSubmit(OnSubmit)}
                    className='flex items-center'
                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2, delay: 2 }}>
                    <div className='w-[80%]'>
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field}
                                        placeholder='Enter your task'
                                        type='text' required className='' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className='w-[15%]  m-auto'>
                        <Button type='submit' className='w-20'>ADD</Button>
                    </div>
                </motion.form>
            </Form>

        </div>
    );
}
